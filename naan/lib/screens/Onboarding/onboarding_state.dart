import 'package:equatable/equatable.dart';
import 'package:naan/screens/Onboarding/models/onboarding.dart';

abstract class OnboardingState extends Equatable {
  final List? propss;
  const OnboardingState([this.propss]);

  @override
  List<Object> get props => (propss as List<Object>? ?? []);
}

/// UnInitialized
class UnOnboardingState extends OnboardingState {
  const UnOnboardingState();

  @override
  String toString() => 'UnOnboardingState';
}

/// Initialized
class InOnboardingState extends OnboardingState {
  final String hello;

  InOnboardingState(this.hello) : super([hello]);

  @override
  String toString() => 'InOnboardingState $hello';
}

/// Initialized
class LoadedOnboardingState extends OnboardingState {
  final OnboardingData onboardingData;

  LoadedOnboardingState(this.onboardingData) : super([onboardingData]);

  @override
  String toString() => 'LoadedOnboardingState';
}

class ErrorOnboardingState extends OnboardingState {
  final String errorMessage;

  ErrorOnboardingState(this.errorMessage) : super([errorMessage]);

  @override
  String toString() => 'ErrorOnboardingState';
}
