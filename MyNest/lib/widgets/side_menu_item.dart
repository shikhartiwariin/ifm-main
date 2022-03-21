import 'package:flutter/cupertino.dart';
import 'package:flutter/material.dart';
import 'package:mynest/helpers/responsiveness.dart';
import 'package:mynest/widgets/horizontal_menu_item.dart';
import 'package:mynest/widgets/vertical_menu_item.dart';

class SideMenuItem extends StatelessWidget {
  final String itemName;
  final Function onTap;

  const SideMenuItem({  Key? key,required this.itemName,required this.onTap }) : super(key: key);

  @override
  Widget build(BuildContext context) {
    if(ResponsiveWidget.isCustomSize(context)){
      return VerticalMenuItem(itemName: itemName, onTap: onTap,);
    }else{
      return HorizontalMenuItem(itemName: itemName, onTap: onTap,);
    }
  }
}
