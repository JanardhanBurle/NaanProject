import 'package:flutter/cupertino.dart';
import 'package:flutter_svg/svg.dart';

import '../dimentions.dart';

class AppLoader extends StatefulWidget {
  const AppLoader({Key? key}) : super(key: key);

  @override
  _AppLoaderState createState() => _AppLoaderState();
}

class _AppLoaderState extends State<AppLoader> {
  @override
  Widget build(BuildContext context) {
    return Center(
        child: SvgPicture.asset(
      'assets/images/Logo.svg',
      width: responsiveWidth(170),
    ));
  }
}
