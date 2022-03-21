import 'package:flutter/material.dart';

class ResidentRegistration extends StatelessWidget {
  const ResidentRegistration({Key? key}) : super(key: key);

  @override
  Widget build(BuildContext context) {
    const appTitle = 'Resident Registration';

    return MaterialApp(
      title: appTitle,
      debugShowCheckedModeBanner: false,
      home: Scaffold(
        backgroundColor: Colors.grey[200],
        appBar: AppBar(
          title: const Text(appTitle),
        ),
        body: Center(
          child: Container(
            width: 800,
            child: Padding(
              padding: const EdgeInsets.only(top: 48, left: 48),
              child: Center(child: const ResidentForm()),
            ),
          ),
        ),
      ),
    );
  }
}

class ResidentForm extends StatefulWidget {
  const ResidentForm({Key? key}) : super(key: key);

  @override
  ResidentFormState createState() {
    return ResidentFormState();
  }
}

class ResidentFormState extends State<ResidentForm> {
  final _formKey = GlobalKey<FormState>();

  @override
  Widget build(BuildContext context) {
    return ListView(
      children: <Widget>[
        Form(
          key: _formKey,
          child: Column(
            crossAxisAlignment: CrossAxisAlignment.start,
            children: [
              Row(
                children: [
                  Flexible(
                    child: TextFormField(
                      decoration: const InputDecoration(
                        icon: Icon(Icons.add_card),
                        hintText: 'Auto Generated',
                        labelText: 'Resident ID *',
                      ),
                      onSaved: (String? value) {},
                      validator: (value) {
                        if (value == null || value.isEmpty) {
                          return 'Please enter some text';
                        }
                        return null;
                      },
                    ),
                  ),
                  const SizedBox(
                    width: 50,
                  ),
                  Flexible(
                    child: TextFormField(
                      decoration: const InputDecoration(
                        icon: Icon(Icons.person),
                        hintText: 'Please enter your first name',
                        labelText: 'First Name *',
                      ),
                      onSaved: (String? value) {},
                      validator: (value) {
                        if (value == null || value.isEmpty) {
                          return 'Please enter some text';
                        }
                        return null;
                      },
                    ),
                  ),
                ],
              ),
              Row(
                children: [
                  Flexible(
                    child: TextFormField(
                      decoration: const InputDecoration(
                        icon: Icon(Icons.person),
                        hintText: 'Please enter your last name',
                        labelText: 'Last Name *',
                      ),
                      onSaved: (String? value) {},
                      validator: (value) {
                        if (value == null || value.isEmpty) {
                          return 'Please enter some text';
                        }
                        return null;
                      },
                    ),
                  ),
                  const SizedBox(
                    width: 50,
                  ),
                  Flexible(
                    child: TextFormField(
                      decoration: const InputDecoration(
                        icon: Icon(Icons.question_answer),
                        hintText: 'Yes / No',
                        labelText: 'Is Primary *',
                      ),
                      onSaved: (String? value) {},
                      validator: (value) {
                        if (value == null || value.isEmpty) {
                          return 'Please enter some text';
                        }
                        return null;
                      },
                    ),
                  ),
                ],
              ),
              Row(
                children: [
                  Flexible(
                    child: TextFormField(
                      decoration: const InputDecoration(
                        icon: Icon(Icons.perm_identity),
                        hintText: 'If resident is not primary',
                        labelText: 'Primary Member ID *',
                      ),
                      onSaved: (String? value) {},
                      validator: (value) {
                        if (value == null || value.isEmpty) {
                          return 'Please enter some text';
                        }
                        return null;
                      },
                    ),
                  ),
                  const SizedBox(
                    width: 50,
                  ),
                  Flexible(
                    child: TextFormField(
                      decoration: const InputDecoration(
                        icon: Icon(Icons.email),
                        hintText: 'Please enter email ID',
                        labelText: 'Email ID *',
                      ),
                      onSaved: (String? value) {},
                      validator: (value) {
                        if (value == null || value.isEmpty) {
                          return 'Please enter some text';
                        }
                        return null;
                      },
                    ),
                  ),
                ],
              ),
              Row(
                children: [
                  Flexible(
                    child: TextFormField(
                      decoration: const InputDecoration(
                        icon: Icon(Icons.phone_android_rounded),
                        hintText: 'Enter mobile number',
                        labelText: 'Mobile No#1 *',
                      ),
                      onSaved: (String? value) {},
                      validator: (value) {
                        if (value == null || value.isEmpty) {
                          return 'Please enter some text';
                        }
                        return null;
                      },
                    ),
                  ),
                  const SizedBox(
                    width: 50,
                  ),
                  Flexible(
                    child: TextFormField(
                      decoration: const InputDecoration(
                        icon: Icon(Icons.phone_android_rounded),
                        hintText: 'Alternate mobile number',
                        labelText: 'Mobile No#2 *',
                      ),
                      onSaved: (String? value) {},
                      validator: (value) {
                        if (value == null || value.isEmpty) {
                          return 'Please enter some text';
                        }
                        return null;
                      },
                    ),
                  ),
                ],
              ),
              Row(
                children: [
                  Flexible(
                    child: TextFormField(
                      decoration: const InputDecoration(
                        icon: Icon(Icons.web_asset),
                        hintText: 'Please enter your aadhar number',
                        labelText: 'Aadhar Number *',
                      ),
                      onSaved: (String? value) {},
                      validator: (value) {
                        if (value == null || value.isEmpty) {
                          return 'Please enter some text';
                        }
                        return null;
                      },
                    ),
                  ),
                  const SizedBox(
                    width: 50,
                  ),
                  Flexible(
                    child: TextFormField(
                      decoration: const InputDecoration(
                        icon: Icon(Icons.home),
                        hintText: 'Please enter your addres',
                        labelText: 'Address *',
                      ),
                      onSaved: (String? value) {},
                      validator: (value) {
                        if (value == null || value.isEmpty) {
                          return 'Please enter some text';
                        }
                        return null;
                      },
                    ),
                  )
                ],
              ),
              Row(
                children: [
                  Flexible(
                    child: TextFormField(
                      decoration: const InputDecoration(
                        icon: Icon(Icons.comment),
                        hintText: 'Please enter property name',
                        labelText: 'Remarks *',
                      ),
                      onSaved: (String? value) {},
                      validator: (value) {
                        if (value == null || value.isEmpty) {
                          return 'Please enter some text';
                        }
                        return null;
                      },
                    ),
                  ),
                ],
              ),
              Padding(
                padding: const EdgeInsets.symmetric(vertical: 16.0),
                child: Padding(
                  padding: const EdgeInsets.only(left: 144, top: 24),
                  child: ElevatedButton(
                    onPressed: () {
                      if (_formKey.currentState!.validate()) {
                        ScaffoldMessenger.of(context).showSnackBar(
                          const SnackBar(content: Text('Processing Data')),
                        );
                      }
                    },
                    child: const Text('Submit'),
                  ),
                ),
              ),
            ],
          ),
        )
      ],
    );
  }
}
