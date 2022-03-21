import 'package:flutter/material.dart';
import 'package:mynest/Navbar/Nav_bar.dart';
class AppView extends StatelessWidget {

  final Widget child;

  const AppView({required this.child});

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
        child : Column(
        children: [NaviBar(), Expanded(child: child)],
      ),
      )
    );
  }
}