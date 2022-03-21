import 'package:flutter/material.dart';
import 'package:mynest/widgets/custom_text.dart';

import '../../constants/style.dart';

class PageNotFound extends StatelessWidget {
  @override
  Widget build(BuildContext context) {
    return Scaffold(
      body: Column(
        mainAxisAlignment: MainAxisAlignment.center,
        children: [
          Image.asset("assets/images/error.png", width: 350,),
          SizedBox(height: 10,),
          Row(
            mainAxisAlignment: MainAxisAlignment.center,
            children: [
              CustomText(text: "Page not found", size: 24, weight: FontWeight.bold, color: lightGrey ,),
            ],
          )
        ],
      ),
    );
  }
}
