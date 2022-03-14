import 'package:flutter/material.dart';
import 'package:naan/dimentions.dart';

class FullSliderWidget extends StatefulWidget {
  const FullSliderWidget({Key? key}) : super(key: key);

  @override
  _FullSliderWidgetState createState() => _FullSliderWidgetState();
}

class _FullSliderWidgetState extends State<FullSliderWidget> {
  @override
  Widget build(BuildContext context) {
    return Column(
      children: [
        Container(height: responsiveHeight(528), child: Text('Hello')),
      ],
    );
  }
}
