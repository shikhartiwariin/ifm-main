import 'dart:async';
import 'package:mynest/helpers/constants.dart';
import 'package:mynest/models/user.dart';
import 'package:mynest/services/user.dart';
import 'package:flutter/material.dart';
import 'package:flutter/widgets.dart';
import 'package:firebase_auth/firebase_auth.dart';
import 'package:google_sign_in/google_sign_in.dart';
import 'package:shared_preferences/shared_preferences.dart';

enum Status { uninitialized, Authenticated, Authenticating, unauthenticated }

class AuthProvider with ChangeNotifier {
  late User _user;
  Status _status = Status.uninitialized;
  UserServices _userServices = UserServices();

  late UserModel _userModel;
  GoogleSignIn _googleSignIn = GoogleSignIn();

  UserModel get userModel => _userModel;

  Status get status => _status;

  User get user => _user;

  AuthProvider.init() {
    _fireSetUp();
  }

  _fireSetUp() async {
    await initialization.then((value) {
      auth.authStateChanges().listen(_onStateChanged(user));
    });
  }

  Future<Map<String, dynamic>> signInWithGoogle() async {
    try {
      final GoogleSignInAccount? googleUser = await _googleSignIn.signIn();
      final GoogleSignInAuthentication? googleAuth =
          await googleUser?.authentication;

      final AuthCredential credential = GoogleAuthProvider.credential(
        accessToken: googleAuth?.accessToken,
        idToken: googleAuth?.idToken,
      );

      await auth.signInWithCredential(credential).then((userCredentials) async {
        _user = userCredentials.user!;
        SharedPreferences prefs = await SharedPreferences.getInstance();
        await prefs.setString("id", _user.uid);
        if (!await _userServices.doesUserExist(_user.uid)) {
          _userServices.createUser(
              id: _user.uid, name: _user.displayName, photo: _user.photoURL);
          await initializeUseModel();
        } else {
          await initializeUseModel();
        }
      });
      return {'success': true, 'message': 'success'};
    } catch (e) {
      notifyListeners();
      return {'success': false, 'message': e.toString()};
    }
  }

  Future<bool> initializeUseModel() async {
    SharedPreferences preferences = await SharedPreferences.getInstance();
    String? _userId = preferences.getString('id');
    _userModel = await _userServices.getUserById(_userId!);
    notifyListeners();
    if (_userModel == null) {
      return false;
    } else {
      return true;
    }
  }

  Future signOut() async {
    auth.signOut();
    _status = Status.unauthenticated;
    notifyListeners();
    return Future.delayed(Duration.zero);
  }

  _onStateChanged(User firebaseUser) async {
    if(firebaseUser == null){
      _status = Status.unauthenticated;
      notifyListeners();
    } else {}
    _user = firebaseUser;
    initializeUseModel();
    Future.delayed(const Duration(seconds: 2),(){
      _status = Status.Authenticated;
    });
  }
}
