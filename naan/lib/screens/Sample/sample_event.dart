import 'dart:async';
import 'dart:developer' as developer;
import 'package:flutter/material.dart';

import 'index.dart';

@immutable
abstract class SampleEvent {
  Stream<SampleState> applyAsync({SampleState? currentState, SampleBloc? bloc});
}

class UnSampleEvent extends SampleEvent {
  @override
  Stream<SampleState> applyAsync(
      {SampleState? currentState, SampleBloc? bloc}) async* {
    yield UnSampleState();
  }
}

class LoadSampleEvent extends SampleEvent {
  @override
  Stream<SampleState> applyAsync(
      {SampleState? currentState, SampleBloc? bloc}) async* {
    try {
      yield InSampleState('Hello world');
    } catch (_, stackTrace) {
      developer.log('$_',
          name: 'LoadSampleEvent', error: _, stackTrace: stackTrace);
      yield ErrorSampleState('sorry_cannot_proceed_your_request'.toString());
    }
  }
}
