import 'package:flutter/material.dart';

import '../../dimentions.dart';
import 'index.dart';

class SamplePage extends StatefulWidget {
  static const String routeName = '/splash';

  const SamplePage({Key? key}) : super(key: key);

  @override
  _SamplePageState createState() => _SamplePageState();
}

class _SamplePageState extends State<SamplePage> {
  final _splashBloc = SampleBloc(const UnSampleState());

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
        body: SampleScreen(splashBloc: _splashBloc),
      ),
      onWillPop: () async => false,
    );
  }
}
//