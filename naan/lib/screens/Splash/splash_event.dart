import 'dart:async';
import 'dart:developer' as developer;
import 'package:flutter/material.dart';

import 'index.dart';

@immutable
abstract class SplashEvent {
  Stream<SplashState> applyAsync({SplashState? currentState, SplashBloc? bloc});
}

class UnSplashEvent extends SplashEvent {
  @override
  Stream<SplashState> applyAsync(
      {SplashState? currentState, SplashBloc? bloc}) async* {
    yield UnSplashState();
  }
}

class LoadSplashEvent extends SplashEvent {
  @override
  Stream<SplashState> applyAsync(
      {SplashState? currentState, SplashBloc? bloc}) async* {
    try {
      yield InSplashState('Hello world');
    } catch (_, stackTrace) {
      developer.log('$_',
          name: 'LoadSplashEvent', error: _, stackTrace: stackTrace);
      yield ErrorSplashState('sorry_cannot_proceed_your_request'.toString());
    }
  }
}
