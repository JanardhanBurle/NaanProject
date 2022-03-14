import 'package:equatable/equatable.dart';

abstract class SampleState extends Equatable {
  final List? propss;
  const SampleState([this.propss]);

  @override
  List<Object> get props => (propss as List<Object>? ?? []);
}

/// UnInitialized
class UnSampleState extends SampleState {
  const UnSampleState();

  @override
  String toString() => 'UnSampleState';
}

/// Initialized
class InSampleState extends SampleState {
  final String hello;

  InSampleState(this.hello) : super([hello]);

  @override
  String toString() => 'InSampleState $hello';
}

class ErrorSampleState extends SampleState {
  final String errorMessage;

  ErrorSampleState(this.errorMessage) : super([errorMessage]);

  @override
  String toString() => 'ErrorSampleState';
}
