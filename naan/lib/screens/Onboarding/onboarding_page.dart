import 'package:flutter/material.dart';

import '../../dimentions.dart';
import 'index.dart';
import 'package:naan/colors.dart';

class OnboardingPage extends StatefulWidget {
  static const String routeName = '/Onboarding';

  const OnboardingPage({Key? key}) : super(key: key);

  @override
  _OnboardingPageState createState() => _OnboardingPageState();
}

class _OnboardingPageState extends State<OnboardingPage> {
  final _onboardingBloc = OnboardingBloc(const UnOnboardingState());

  @override
  void initState() {
    super.initState();
  }

  @override
  Widget build(BuildContext context) {
    Dimention().init(context);
    return WillPopScope(
      child: Scaffold(
        backgroundColor: AppColor().color1,
        body: Container(
          margin: EdgeInsets.only(top: responsiveHeight(43)),
          decoration: BoxDecoration(
              borderRadius: BorderRadius.only(
            bottomLeft: Radius.circular(responsiveWidth(20)),
            bottomRight: Radius.circular(responsiveWidth(20)),
          )),
          child: OnboardingScreen(onboardingBloc: _onboardingBloc),
        ),
      ),
      onWillPop: () async => false,
    );
  }
}
//