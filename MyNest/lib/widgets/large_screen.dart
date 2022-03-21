import 'package:flutter/cupertino.dart';
import 'package:flutter/material.dart';
import 'package:mynest/widgets/side_menu.dart';

import '../helpers/local_navigator.dart';
import 'package:mynest/controllers/navigation_controller.dart';

class LargeScreen extends StatelessWidget {
  const LargeScreen({key}) : super(key : key);

  @override
  Widget build(BuildContext context){
    return Row(
      children: [
        Expanded(
            child: SideMenu()),
        Expanded(
            flex: 5,
            child: localNavigator())
      ],


    );
  }
}