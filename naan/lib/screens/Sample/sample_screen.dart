import 'package:flutter/material.dart';

import 'index.dart';

class SampleScreen extends StatefulWidget {
  const SampleScreen({
    Key? key,
    required SampleBloc splashBloc,
  })  : _splashBloc = splashBloc,
        super(key: key);

  final SampleBloc _splashBloc;

  @override
  _SampleScreenState createState() {
    return _SampleScreenState();
  }
}

class _SampleScreenState extends State<SampleScreen> {
  @override
  Widget build(BuildContext context) {
    return const Scaffold(
      body: Center(
        child: Text('Sample Page'),
      ),
    );
  }
}
