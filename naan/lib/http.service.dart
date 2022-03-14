import 'package:dio/dio.dart';

void getHttp() async {
  try {
    var response = await Dio().get('assets/mock/onboarding.json');
    print(response);
  } catch (e) {
    print(e);
  }
}
