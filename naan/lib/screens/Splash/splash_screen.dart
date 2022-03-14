import 'package:flutter/material.dart';
import 'package:flutter_svg/svg.dart';
import 'package:naan/screens/Onboarding/onboarding_page.dart';

import '../../dimentions.dart';
import 'index.dart';

class SplashScreen extends StatefulWidget {
  const SplashScreen({
    Key? key,
    required SplashBloc splashBloc,
  })  : _splashBloc = splashBloc,
        super(key: key);

  final SplashBloc _splashBloc;

  @override
  _SplashScreenState createState() {
    return _SplashScreenState();
  }
}

class _SplashScreenState extends State<SplashScreen> {
  @override
  void initState() {
    super.initState();
    Future.delayed(const Duration(seconds: 2)).then((_) async {
      Navigator.pushReplacement(
        context,
        PageRouteBuilder(
          pageBuilder: (c, a1, a2) => const OnboardingPage(),
          transitionsBuilder: (c, anim, a2, child) =>
              FadeTransition(opacity: anim, child: child),
          transitionDuration: const Duration(milliseconds: 700),
        ),
      );
    });
  }

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      body: Center(
          child: SvgPicture.asset(
        'assets/images/Logo.svg',
        width: responsiveWidth(170),
      )),
    );
  }
}
