import 'dart:async';
import 'dart:convert';
import 'dart:developer' as developer;
import 'package:dio/dio.dart';
import 'package:flutter/material.dart';
import 'package:flutter/services.dart';

import 'index.dart';
import 'models/onboarding.dart';

@immutable
abstract class OnboardingEvent {
  Stream<OnboardingState> applyAsync(
      {OnboardingState? currentState, OnboardingBloc? bloc});
}

class UnOnboardingEvent extends OnboardingEvent {
  @override
  Stream<OnboardingState> applyAsync(
      {OnboardingState? currentState, OnboardingBloc? bloc}) async* {
    yield const UnOnboardingState();
  }
}

class LoadOnboardingEvent extends OnboardingEvent {
  @override
  Stream<OnboardingState> applyAsync(
      {OnboardingState? currentState, OnboardingBloc? bloc}) async* {
    try {
      yield InOnboardingState('Hello world');
      // dynamic response = await Dio().get('assets/mock/onboarding.json');
      dynamic jsonText =
          await rootBundle.loadString('assets/mock/onboarding.json');
      yield LoadedOnboardingState(
          OnboardingData.fromJson(json.decode(jsonText)));
    } catch (_, stackTrace) {
      developer.log('$_',
          name: 'LoadOnboardingEvent', error: _, stackTrace: stackTrace);
      yield ErrorOnboardingState(
          'sorry_cannot_proceed_your_request'.toString());
    }
  }
}
