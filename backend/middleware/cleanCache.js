import { clearHash } from '../services/cache.js'

const ClearUserSpecificCache = async (req, res, next) => {
  await next()
  clearHash(req.user.id)
}
const ClearProductCache = async (req, res, next) => {
  await next() //Has to call this first to ensure clear Cache is called after executing the Mongo Functions
  clearHash('PRODUCTS')
}

export { ClearProductCache, ClearUserSpecificCache }
