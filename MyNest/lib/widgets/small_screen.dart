import 'package:flutter/cupertino.dart';
import 'package:flutter/material.dart';
import 'package:mynest/helpers/local_navigator.dart';
import 'package:mynest/controllers/navigation_controller.dart';
class SmallScreen extends StatelessWidget {
  const SmallScreen({key}) : super(key : key);

  @override
  Widget build(BuildContext context){
    return localNavigator();
  }
}