import 'package:flutter/material.dart';

import '../../dimentions.dart';
import 'index.dart';

class SplashPage extends StatefulWidget {
  static const String routeName = '/splash';

  const SplashPage({Key? key}) : super(key: key);

  @override
  _SplashPageState createState() => _SplashPageState();
}

class _SplashPageState extends State<SplashPage> {
  final _splashBloc = SplashBloc(const UnSplashState());

  @override
  void initState() {
    super.initState();
  }

  @override
  Widget build(BuildContext context) {
    Dimention().init(context);
    return WillPopScope(
      child: Scaffold(
        backgroundColor: Colors.transparent,
        body: SplashScreen(splashBloc: _splashBloc),
      ),
      onWillPop: () async => false,
    );
  }
}
//