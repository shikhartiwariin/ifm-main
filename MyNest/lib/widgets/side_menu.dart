import 'package:flutter/cupertino.dart';
import 'package:flutter/material.dart';
import 'package:get/get.dart';
import 'package:mynest/constants/controllers.dart';
import 'package:mynest/constants/style.dart';
import 'package:mynest/helpers/responsiveness.dart';
import 'package:mynest/widgets/custom_text.dart';
import 'package:mynest/widgets/horizontal_menu_item.dart';
import 'package:mynest/widgets/side_menu_item.dart';
import 'package:mynest/widgets/vertical_menu_item.dart';

import 'package:mynest/routing/routes.dart';
import 'package:mynest/routing/router.dart';


class SideMenu extends StatelessWidget {
  const SideMenu({ Key? key }) : super(key: key);

  get sideMenuItemRoutes => null;

  @override
  Widget build(BuildContext context) {
    double _width = MediaQuery.of(context).size.width;

    return Container(
            color: light,
            child: ListView(
              children: [
                if(ResponsiveWidget.isSmallScreen(context))
                Column(
                  mainAxisSize: MainAxisSize.min,
                  children: [
                    SizedBox(
                      height: 40,
                    ),
                    Row(
                      children: [
                        SizedBox(width: _width / 48),
                        Padding(
                          padding: const EdgeInsets.only(right: 12),
                          child: Image.asset("assets/icons/logo.png"),
                        ),
                        Flexible(
                          child: CustomText(
                            text: "Dash",
                            size: 20,
                            weight: FontWeight.bold,
                            color: active,
                          ),
                        ),
                        SizedBox(width: _width / 48),
                      ],
                    ),
                    SizedBox(
                      height: 30,
                    ),
                  ],
                ),
                    Divider(color: lightGrey.withOpacity(.1), ),

                Column(
                  mainAxisSize: MainAxisSize.min,
                  children: sideMenuItemRoutes
                      .map((item) => SideMenuItem(
                          itemName: item.name,
                          onTap: () {
                            //if(item.route == authenticationPageRoute){
                              //menuController.changeActiveItemTo(userRegistrationPageDisplayName);
                            // Get.offAllNamed(authenticationPageRoute);

//
                           //}
                            if (!menuController.isActive(item.name)) {
                              menuController.changeActiveItemTo(item.name);
                              if(ResponsiveWidget.isSmallScreen(context))
                              Get.back();
                              navigationController.navigateTo(item.route);
                            }
                          }, key: null,))
                      .toList(),
                )
              ],
            ),
          );
  }
}