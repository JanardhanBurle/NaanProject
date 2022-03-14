import 'dart:async';
import 'dart:developer' as developer;

import 'package:bloc/bloc.dart';

import 'index.dart';

class SampleBloc extends Bloc<SampleEvent, SampleState> {
  SampleBloc(SampleState initialState) : super(initialState);

  @override
  Stream<SampleState> mapEventToState(
    SampleEvent event,
  ) async* {
    try {
      yield* event.applyAsync(currentState: state, bloc: this);
    } catch (_, stackTrace) {
      developer.log('$_', name: 'SampleBloc', error: _, stackTrace: stackTrace);
      yield state;
    }
  }
}
