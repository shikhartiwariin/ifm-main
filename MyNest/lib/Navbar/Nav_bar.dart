import 'package:flutter/material.dart';
import 'package:mynest/Navbar/Navbar_Item.dart';
import 'package:mynest/routing/routes.dart';

class NaviBar extends StatefulWidget {
  const NaviBar({Key? key}) : super(key: key);
  //@override
  //Widget build(BuildContext context) {
  //return Container(
  //height: 100.0,
  //child: Row(
  //mainAxisAlignment: MainAxisAlignment.end,
  //mainAxisSize: MainAxisSize.max,
  //children: [
  //NavigationItem(title: 'Home'),
  //NavigationItem(title: 'About'),
  //NavigationItem(title: 'Contact'),
  //],
  //),
  //);
  //}

  @override
  _NavigationBarState createState() => _NavigationBarState();
}

class _NavigationBarState extends State<NaviBar> {

  int index = 0;

  @override
  Widget build(BuildContext context) {
    return Container(
      height: 100.0,
      child: Row(
        mainAxisAlignment: MainAxisAlignment.end,
        mainAxisSize: MainAxisSize.max,
        children: [
          NavigationItem(
            selected: index == 0,
            title: 'Home',
            routeName: routeHome,
            onHighlight: onHighlight
          ),
          NavigationItem(
            selected: index == 1,
            title: 'About',
            routeName: routeAbout,
            onHighlight: onHighlight,
          ),
          NavigationItem(
            selected: index == 2,
            title: 'Contact',
            routeName: routeContacts,
            onHighlight: onHighlight,
          ),
        ],
      ),
    );
  }

  void onHighlight(String route) {
    switch (route) {
      case routeHome:
        changeHighlight(0);
        break;
      case routeAbout:
        changeHighlight(1);
        break;
      case routeContacts:
        changeHighlight(2);
        break;
    }
  }

  void changeHighlight(int newIndex) {
    setState(() {
      index = newIndex;
    });
  }
}
