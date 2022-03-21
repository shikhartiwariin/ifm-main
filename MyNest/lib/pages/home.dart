import 'dart:html';

import 'package:flutter/material.dart';
import 'package:mynest/Navbar/Navbar.dart';

class HomeScreen extends StatelessWidget {
  @override
  Widget build(BuildContext context) {
    return Scaffold(
        body: Container(
            decoration: BoxDecoration(
                gradient: LinearGradient(
                    begin: Alignment.centerLeft,
                    end: Alignment.centerRight,
                    colors: [
                  Color.fromRGBO(195, 20, 50, 1.0),
                  Color.fromRGBO(30, 11, 54, 1.0)
                ])),
            child: Text(

                "Home",

            ),
        ));
  }
}
