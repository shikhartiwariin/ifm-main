import 'dart:async';
import 'dart:convert';
import 'dart:io';

import 'package:http/http.dart' as http;
import 'package:mynest/models/login_request_model.dart';
import 'package:mynest/config.dart';

class APIService {
  static var client = http.Client();

  static FutureOr<bool> login(LoginRequestModel model) async {
    Map<String, String> requestHeaders = {
      'Content-Type': 'application/json',
    };

    var url = Uri.http(config.apiURL, config.loginAPI);

    var response = await client.post(
      url,
      headers: requestHeaders,
      body: jsonEncode(model.toJson()),
    );

    if(response.statusCode == 200) {
      return true;
    }
    else{
      return false;
    }
  }
}
