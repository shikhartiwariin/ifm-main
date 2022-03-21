import mongoose from 'mongoose'
import redis from 'redis'
import util from 'util'


//RVT_LEARNING
//We have to install redis server with brew first and start as service before trying to connect thru "brew services start redis"

const client = redis.createClient()
client.on('error', (err) => {
  // console.log('*********redis server not available************')S
})

client.on('ready', (err) => {
  console.log('*********redis server is up and running ')

  client.hget = util.promisify(client.hget)
  const exec = mongoose.Query.prototype.exec

  mongoose.Query.prototype.cache = function (options = {}) {
    this.useCache = true
    this.hashKey = JSON.stringify(options.key || '')

    return this
  }

  mongoose.Query.prototype.exec = async function () {
    if (!this.useCache) {
      return exec.apply(this, arguments)
    }

    const options = this.options

    const key = JSON.stringify(
      Object.assign({}, this.getQuery(), {
        collection: this.mongooseCollection.name,
        options, //RVT_LEARNING  : Added to consider the skip/limit/sort also into Caching considerations
      })
    )

    // See if we have a value for 'key' in redis
    const cacheValue = await client.hget(this.hashKey, key)

    // If we do, return that
    if (cacheValue) {
      const doc = JSON.parse(cacheValue)
      console.log('returning from Cache..', doc.length, this.hashKey, key)
      return Array.isArray(doc) ? doc.map((d) => new this.model(d)) : new this.model(doc)
    }

    // Otherwise, issue the query and store the result in redis
    const result = await exec.apply(this, arguments)

    client.hset(this.hashKey, key, JSON.stringify(result), 'EX', 10)

    //ADDED BY RAGHU for memory expire in one Day
    client.expire(this.hashKey, 86400) //1day

    //ADDED BY RAGHU: CAN BE REMOVED OR MAKE SOME LOGIC to do Flush redis based on consumption
    // client.info((err, info) => {
    //   if (err) throw err
    //   const used = info
    //     .split('\n')
    //     .find((line) => line.match(/used_memory_human/))
    //     .split(':')[1]
    //   console.log('Used Memory:', used)
    // })

    return result
  }
})

//RAGHU: This is called from middleware CleanCache . need to modify that later because it is hardcoded the key as userid

export const clearHash = (hashKey) => {
  return client.del(JSON.stringify(hashKey))
}
