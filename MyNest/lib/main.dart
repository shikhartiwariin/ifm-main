// @dart=2.9
import 'dart:js';
import 'dart:io';
import 'dart:convert' show UTF8;
import 'package:firebase_core/firebase_core.dart';
import 'package:flutter/material.dart';
import 'package:mynest/pages/LandingPage/LandingPage.dart';
import 'package:mynest/pages/LandingPage/app_view.dart';
import 'package:mynest/pages/authentication/authentication.dart';
import 'package:mynest/pages/home.dart';
import 'package:mynest/providers/auth.dart';
import 'package:mynest/routing/router.dart';
import 'package:mynest/routing/routes.dart';
import 'package:provider/provider.dart';
import 'package:mynest/providers/app.dart';
import 'package:flutter_web_plugins/flutter_web_plugins.dart';

void main() async {
  setUrlStrategy(PathUrlStrategy());
  WidgetsFlutterBinding.ensureInitialized();
  //await initialization;
  await Firebase.initializeApp(
    options: const FirebaseOptions(
        apiKey: "AIzaSyBk8Tcl1TdUj_quY8nE3asnfOrx2_U59tQ",
        authDomain: "mynest-17be8.firebaseapp.com",
        projectId: "mynest-17be8",
        storageBucket: "mynest-17be8.appspot.com",
        messagingSenderId: "1036361841821",
        appId: "1:1036361841821:web:0043c591731e50de0ba874"
    ),
  );
  runApp(MultiProvider(providers: [
    ChangeNotifierProvider.value(value: AppProvider()),
    ChangeNotifierProvider.value(value: AuthProvider.init()),
  ], child: MaterialApp(
    debugShowCheckedModeBanner: false,
    title : "Mynest",
    theme : ThemeData (
       primarySwatch: Colors.blue,
      visualDensity: VisualDensity.adaptivePlatformDensity,
    ),
   // builder: (_, child) => AppView(
   //   child: child,
   // ),
    initialRoute: routeAuth,
    navigatorKey: navKey,
    onGenerateRoute: RouteGenerator.generateRoute,

    //home:SiteLayout()
  )));
}

class AppScreensController extends StatelessWidget{
  @override
  Widget build(BuildContext context) {
    AuthProvider authProvider = Provider.of<AuthProvider>(context);
    switch(authProvider.status){
      case Status.uninitialized:
        return AuthenticationPage();
      case Status.Authenticated:
        print('Authenticated');
        return HomeScreen();
      case Status.Authenticating:
        return AuthenticationPage();
      default :
        return AuthenticationPage();



    }
  }
}



//_getUserApi() async {
 // var httpClient = new HttpClient();
  //var uri = Uri.https('localhost:5000', 'localhost:5000/api/');
  //var request = await httpClient.getUrl(uri);
  //var response = await request.close();
  //var responseBody =  Utf8Decoder(allowMalformed: true).convert(response.bodyBytes);;
  //return responseBody;
//}