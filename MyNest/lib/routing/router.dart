import 'package:flutter/material.dart';
import 'package:mynest/pages/authentication/authentication.dart';
import 'package:mynest/pages/home.dart';
import 'package:mynest/routing/routes.dart';

import '../pages/LandingPage/app_view.dart';

class RouteGenerator {
  static Route<dynamic> generateRoute(RouteSettings settings) {
    switch (settings.name) {
      case routeAuth:
        return MaterialPageRoute(builder: (_) => AuthenticationPage());
        break;
      case routeHome:
        return MaterialPageRoute(builder: (_) => AppView(child : HomeScreen()));
        break;
      //case routeAbout:
      //  return MaterialPageRoute(builder: (_) => AboutPage());
      //  break;
     // case routeContacts:
        //return MaterialPageRoute(builder: (_) => ContactPage());
     //   break;
    }
    return MaterialPageRoute(builder: (_) => AuthenticationPage());
  }
}