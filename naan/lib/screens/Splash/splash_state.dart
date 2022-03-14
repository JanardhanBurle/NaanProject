import 'package:equatable/equatable.dart';

abstract class SplashState extends Equatable {
  final List? propss;
  const SplashState([this.propss]);

  @override
  List<Object> get props => (propss as List<Object>? ?? []);
}

/// UnInitialized
class UnSplashState extends SplashState {
  const UnSplashState();

  @override
  String toString() => 'UnSplashState';
}

/// Initialized
class InSplashState extends SplashState {
  final String hello;

  InSplashState(this.hello) : super([hello]);

  @override
  String toString() => 'InSplashState $hello';
}

class ErrorSplashState extends SplashState {
  final String errorMessage;

  ErrorSplashState(this.errorMessage) : super([errorMessage]);

  @override
  String toString() => 'ErrorSplashState';
}
