import 'package:flutter/material.dart';
import 'package:get/get.dart';
import 'package:mynest/controllers/countercontroller.dart';

class OtherScreen extends StatelessWidget {
    final CounterController _counterController = Get.find();
    @override

    Widget build(BuildContext context){
        return Scaffold (
          body:Column(
    mainAxisAlignment : MainAxisAlignment.center,
    children:[
        Text("screen was clicked : ${_counterController.counter.value} times"),
        SizedBox(
            height : 10
        ),
        ElevatedButton(onPressed :() {
            Get.back();
        }, child : Text("Open Other Screen"))
    ]
)
        );
    }
}