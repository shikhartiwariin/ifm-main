import 'package:flutter/material.dart';
import 'package:mynest/constants/style.dart';
import 'package:mynest/pages/home.dart';
import 'package:mynest/providers/app.dart';
import 'package:mynest/routing/routes.dart';
import 'package:mynest/widgets/custom_text.dart';
import 'package:get/get.dart';
import 'package:google_fonts/google_fonts.dart';
import 'package:mynest/providers/auth.dart';
import 'package:provider/provider.dart';

import '../LandingPage/app_view.dart';



class AuthenticationPage extends StatelessWidget {
  const AuthenticationPage({Key? key}) : super(key: key);
  @override
  Widget build(BuildContext context) {
    final AuthProvider authProvider = Provider.of<AuthProvider>(context);
    final AppProvider appProvider = Provider.of<AppProvider>(context);

    return Scaffold(
      body: Center(
        child: Container(
          constraints: BoxConstraints(maxWidth: 400),
          padding: EdgeInsets.all(24),
          child: Column(
            mainAxisAlignment: MainAxisAlignment.center,
            children: [
              Row(
                children: [
                  Padding(
                    padding: const EdgeInsets.only(right: 12),
                    child: Image.asset("assets/icons/logo.png"),
                  ),
                  Expanded(child: Container()),
                ],
              ),
              SizedBox(
                height: 30,
              ),
              Row(
                children: [
                  Text("Login",
                      style: GoogleFonts.roboto(
                          fontSize: 30, fontWeight: FontWeight.bold)),
                ],
              ),
              SizedBox(
                height: 10,
              ),
              Row(
                children: [
                  CustomText(
                    text: "Welcome back to the admin panel.",
                    color: lightGrey,
                    size: 16,
                      weight: FontWeight.normal,
                      key: key
                  ),
                ],
              ),
              SizedBox(
                height: 15,
              ),
              TextField(
                decoration: InputDecoration(
                    labelText: "Email",
                    hintText: "abc@domain.com",
                    border: OutlineInputBorder(
                        borderRadius: BorderRadius.circular(20))),
              ),
              SizedBox(
                height: 15,
              ),
              TextField(
                obscureText: true,
                decoration: InputDecoration(
                    labelText: "Password",
                    hintText: "123",
                    border: OutlineInputBorder(
                        borderRadius: BorderRadius.circular(20))),
              ),
              SizedBox(
                height: 15,
              ),
              Row(
                mainAxisAlignment: MainAxisAlignment.spaceBetween,
                children: [
                  Row(
                    children: [
                      Checkbox(value: true, onChanged: (value) {}),
                      CustomText(
                          text: "Remeber Me",
                          size: 16,
                          color: lightGrey,
                          weight: FontWeight.normal,
                          key: key),
                    ],
                  ),
                  CustomText(
                      text: "Forgot password?",
                      color: active,
                      size: 16,
                      weight: FontWeight.normal,
                      key: key)
                ],
              ),
              SizedBox(
                height: 15,
              ),
              InkWell(
                onTap: () async {
                  //Get.offAllNamed(rootRoute);
                  appProvider.changeLoading();
                  Map result = await authProvider.signInWithGoogle();
                  bool success = result['success'];
                  String message = result['message'];
                  print(message);

                  if(!success){
                    ScaffoldMessenger.of(context).showSnackBar(SnackBar(content : Text(message)));
                    appProvider.changeLoading();
                  }else{
                    //appProvider.changeLoading();
                    print('HOME');
                    Navigator.push(
                        context,
                        MaterialPageRoute(builder: (context) => AppView(child: HomeScreen())));
                  }
                },
                child: Container(
                  decoration: BoxDecoration(
                      color: active, borderRadius: BorderRadius.circular(20)),
                  alignment: Alignment.center,
                  width: double.maxFinite,
                  padding: EdgeInsets.symmetric(vertical: 16),
                  child: CustomText(
                    text: "Login",
                    color: Colors.white,
                      size: 16,
                      weight: FontWeight.normal,
                      key: key
                  ),
                ),
              ),
              SizedBox(
                height: 15,
              ),
              RichText(
                  text: TextSpan(children: [
                TextSpan(text: "Do not have admin credentials? "),
                TextSpan(
                    text: "Request Credentials! ",
                    style: TextStyle(color: active))
              ]))
            ],
          ),
        ),
      ),
    );
  }
}
