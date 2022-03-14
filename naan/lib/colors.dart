import 'package:flutter/material.dart';

class AppColor {
  Color color1 = HexColor("#805600");
  Color color2 = HexColor('#f6f4ef');
  Color color3 = HexColor('#1f1b15');
  Color color4 = HexColor('#F9DFBB');
}

class HexColor extends Color {
  static int _getColorFromHex(String hexColor) {
    hexColor = hexColor.toUpperCase().replaceAll("#", "");
    if (hexColor.length == 6) {
      hexColor = "FF" + hexColor;
    }
    return int.parse(hexColor, radix: 16);
  }

  HexColor(final String hexColor) : super(_getColorFromHex(hexColor));
}
