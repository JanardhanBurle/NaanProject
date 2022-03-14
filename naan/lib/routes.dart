import 'package:flutter/material.dart';
import 'package:naan/screens/Onboarding/onboarding_page.dart';

import 'screens/Splash/splash_page.dart';

class Path {
  /// List of [Path] to for route matching. When a named route is pushed with
  /// [Navigator.pushNamed], the route name is matched with the [Path.pattern]
  /// in the list below. As soon as there is a match, the associated builder
  /// will be returned. This means that the paths higher up in the list will
  /// take priority.
  static List<Path> routes = [
    Path(SplashPage.routeName, (ctx, match) => const SplashPage()),
    Path(OnboardingPage.routeName, (ctx, match) => const OnboardingPage()),
  ];

  /// A RegEx string for route matching.
  final String pattern;

  /// The builder for the associated pattern route. The first argument is the
  /// [BuildContext] and the second argument is a RegEx match if it is
  /// included inside of the pattern.
  final Widget Function(BuildContext, String?) builder;

  const Path(this.pattern, this.builder);

  static bool isBenficiaryinfofilled = false;
}
