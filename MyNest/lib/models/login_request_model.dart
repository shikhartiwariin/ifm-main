class LoginRequestModel {
   LoginRequestModel({
     required this.email,
     required this.password,
});

  late final String email;
  late final String  password;

   LoginRequestModel.fromJson(Map<String, dynamic> json) {
    email = json['email'];
    password = json['password'];
  }

  Map<String, dynamic> toJson() {
    final Map<String, dynamic> data = new Map<String, dynamic>();
    data['email'] = this.email;
    data['password'] = this.password;
    return data;
  }
}
