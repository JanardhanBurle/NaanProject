import 'package:flutter/material.dart';

class Dimention {
  static late MediaQueryData _mediaQueryData;
  static double? screenHeight;
  static double? screenWidth;
  static double? defaultHeight;
  static Orientation? orientation;

  void init(BuildContext context) {
    _mediaQueryData = MediaQuery.of(context);
    screenHeight = _mediaQueryData.size.height;
    screenWidth = _mediaQueryData.size.width;
    orientation = _mediaQueryData.orientation;
  }
}

double? screenHeight = Dimention.screenHeight;
double? screenWidth = Dimention.screenWidth;

double responsiveHeight(double height) {
  double screenHeight = Dimention.screenHeight!;
  return (height / 824.0) * screenHeight;
}

double responsiveWidth(double width) {
  double screenWidth = Dimention.screenWidth!;
  return (width / 412.0) * screenWidth;
}
