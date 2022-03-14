import 'package:flutter/cupertino.dart';
import 'package:flutter/material.dart';
import 'package:flutter/widgets.dart';
import 'package:flutter_svg/svg.dart';

import '../colors.dart';
import '../dimentions.dart';

class AppButton extends StatelessWidget {
  final String? text;
  final String? prefixIcon;
  final String? sufixIcon;
  final onTap;
  final Color? color;
  final bool? disabled;
  final Color? backgroundColor;
  final Color? borderColor;
  const AppButton(
      {this.text,
      this.color,
      this.backgroundColor,
      this.prefixIcon,
      this.sufixIcon,
      this.disabled,
      this.borderColor,
      this.onTap});
  @override
  Widget build(BuildContext context) {
    var isDisabled = disabled ?? false;
    var foreground = color ?? Colors.white;
    return Container(
      child: Material(
        child: InkWell(
            customBorder: RoundedRectangleBorder(
              borderRadius: BorderRadius.circular(responsiveWidth(100)),
            ),
            onTap: () {
              if (!isDisabled) {
                onTap();
              }
            },
            child: Container(
              padding: EdgeInsets.symmetric(
                  vertical: responsiveWidth(10),
                  horizontal: responsiveWidth(24)),
              alignment: Alignment.center,
              child: Row(
                  mainAxisAlignment: MainAxisAlignment.center,
                  crossAxisAlignment: CrossAxisAlignment.center,
                  children: [
                    prefixIcon != null
                        ? Padding(
                            padding: EdgeInsets.symmetric(
                                horizontal: responsiveWidth(10)),
                            child: SvgPicture.asset(prefixIcon!,
                                color: foreground,
                                width: responsiveWidth(25),
                                height: responsiveWidth(25)),
                          )
                        : Container(),
                    Text(
                      text!,
                      style: TextStyle(
                          fontFamily: 'TitilliumWeb',
                          fontSize: 14,
                          color: color,
                          fontWeight: FontWeight.w400),
                      textAlign: TextAlign.center,
                    ),
                    sufixIcon != null
                        ? Padding(
                            padding: EdgeInsets.symmetric(
                                horizontal: responsiveWidth(10)),
                            child: SvgPicture.asset(sufixIcon!,
                                width: responsiveWidth(25),
                                color: foreground,
                                height: responsiveWidth(25)),
                          )
                        : Container(),
                  ]),
            )),
        color: Colors.transparent,
      ),
      decoration: BoxDecoration(
        color: backgroundColor,
        border: Border.all(color: borderColor ?? Colors.transparent),
        borderRadius: BorderRadius.all(Radius.circular(responsiveWidth(100))),
        boxShadow: isDisabled != null && isDisabled == true
            ? null
            : [
                BoxShadow(
                  color: Colors.black.withOpacity(.1),
                  blurRadius: 6.0, // soften the shadow
                  spreadRadius: 0.0, //extend the shadow
                  offset: const Offset(
                    0.0,
                    1.0,
                  ),
                )
              ],
      ),
    );
  }
}
