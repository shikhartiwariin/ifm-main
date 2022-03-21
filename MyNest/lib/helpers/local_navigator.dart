import 'package:flutter/cupertino.dart';
import 'package:mynest/constants/controllers.dart';
import 'package:mynest/routing/router.dart';
import 'package:mynest/routing/routes.dart';

Navigator localNavigator() =>   Navigator(
      key: navigationController.navigatorKey,
      //onGenerateRoute: generateRoute,
      //initialRoute: overviewPageRoute,
    );



