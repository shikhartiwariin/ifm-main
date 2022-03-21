import 'package:cloud_firestore/cloud_firestore.dart';

class UserModel {
  static const ID="id";
  static const NAME = "name";
  static const PHOTO = "photo";

  late String _id;
  late String _name;
  late String _photo;

  String get name => _name;
  String get photo => _photo;
  String get id => _id;

  UserModel.fromSnapshot(DocumentSnapshot snapshot){

   // _name = snapshot.get(NAME);//snapshot.data()[NAME];
   // _photo = snapshot.get(PHOTO);
   // _id = snapshot.get(ID);
  }


}