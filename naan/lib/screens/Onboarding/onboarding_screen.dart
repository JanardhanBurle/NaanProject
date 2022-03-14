import 'package:carousel_slider/carousel_slider.dart';
import 'package:flutter/material.dart';
import 'package:flutter_bloc/flutter_bloc.dart';
import 'package:flutter_svg/svg.dart';
import 'package:modal_progress_hud_nsn/modal_progress_hud_nsn.dart';
import 'package:naan/colors.dart';
import 'package:naan/dimentions.dart';
import 'package:naan/screens/Onboarding/models/onboarding.dart';
import 'package:naan/widgets/app_button.dart';
import 'package:naan/widgets/app_loader.dart';

import 'index.dart';

class OnboardingScreen extends StatefulWidget {
  const OnboardingScreen({
    Key? key,
    required OnboardingBloc onboardingBloc,
  })  : _onboardingBloc = onboardingBloc,
        super(key: key);

  final OnboardingBloc _onboardingBloc;

  @override
  _OnboardingScreenState createState() {
    return _OnboardingScreenState();
  }
}

class _OnboardingScreenState extends State<OnboardingScreen> {
  List<SlideInfo>? slides = [];
  CarouselController carouselController = CarouselController();
  bool isApiCall = false;
  @override
  void initState() {
    super.initState();
    widget._onboardingBloc.add(LoadOnboardingEvent());
  }

  @override
  Widget build(BuildContext context) {
    return BlocConsumer<OnboardingBloc, OnboardingState>(
        bloc: widget._onboardingBloc,
        listener: (
          BuildContext context,
          OnboardingState currentState,
        ) {
          if (currentState is InOnboardingState) {
            isApiCall = true;
          }
          if (currentState is LoadedOnboardingState) {
            slides = currentState.onboardingData.slides;
            isApiCall = false;
          }
        },
        builder: (
          BuildContext context,
          OnboardingState currentState,
        ) {
          return ModalProgressHUD(
              color: AppColor().color1,
              opacity: 0.9,
              progressIndicator: const AppLoader(),
              inAsyncCall: isApiCall,
              child: Scaffold(
                  body: CarouselSlider(
                      carouselController: carouselController,
                      options: CarouselOptions(
                        autoPlay: false,
                        autoPlayInterval: const Duration(seconds: 3),
                        autoPlayAnimationDuration:
                            const Duration(milliseconds: 800),
                        autoPlayCurve: Curves.fastOutSlowIn,
                        pauseAutoPlayOnTouch: true,
                        aspectRatio: 1.0,
                        height: responsiveHeight(792),
                        viewportFraction: 1.0,
                        enableInfiniteScroll: false,
                        onPageChanged: (index, reason) {
                          // setState(() {
                          //   _currentIndex = index;
                          // });
                        },
                      ),
                      items: [
                    for (int i = 0; i < slides!.length; i++)
                      Container(
                        margin: EdgeInsets.all(responsiveWidth(16)),
                        decoration: BoxDecoration(
                          color: AppColor().color2,
                          borderRadius: BorderRadius.all(
                            Radius.circular(responsiveWidth(20.0)),
                          ),
                        ),
                        child: Column(
                          mainAxisAlignment: MainAxisAlignment.spaceBetween,
                          crossAxisAlignment: CrossAxisAlignment.center,
                          children: [
                            Column(
                              children: [
                                ClipRRect(
                                  borderRadius: BorderRadius.only(
                                    topLeft:
                                        Radius.circular(responsiveWidth(20.0)),
                                    topRight:
                                        Radius.circular(responsiveWidth(20.0)),
                                  ),
                                  child: Image.asset(
                                    slides![i].url.toString(),
                                    width: responsiveHeight(380),
                                    fit: BoxFit.fill,
                                  ),
                                ),
                                Container(
                                  padding: EdgeInsets.all(responsiveWidth(16)),
                                  color: AppColor().color2,
                                  child: Column(
                                    mainAxisAlignment: MainAxisAlignment.start,
                                    crossAxisAlignment:
                                        CrossAxisAlignment.start,
                                    children: [
                                      Text(
                                        slides![i].title.toString(),
                                        textAlign: TextAlign.start,
                                        style: TextStyle(
                                            fontFamily: 'TitilliumWeb',
                                            fontSize: 24,
                                            color: AppColor().color3,
                                            fontWeight: FontWeight.w400),
                                      ),
                                      SizedBox(
                                        height: responsiveWidth(16),
                                      ),
                                      Text(
                                        slides![i].description.toString(),
                                        textAlign: TextAlign.start,
                                        style: TextStyle(
                                            fontFamily: 'TitilliumWeb',
                                            fontSize: 16,
                                            color: AppColor().color3,
                                            fontWeight: FontWeight.w400),
                                      ),
                                    ],
                                  ),
                                )
                              ],
                            ),
                            Container(
                              padding: EdgeInsets.all(responsiveWidth(16)),
                              child: Row(
                                mainAxisAlignment:
                                    MainAxisAlignment.spaceBetween,
                                crossAxisAlignment: CrossAxisAlignment.center,
                                children: [
                                  dots(slides, i),
                                  Column(
                                    children: [
                                      AppButton(
                                        text: 'Next',
                                        color: Colors.white,
                                        backgroundColor: AppColor().color1,
                                        onTap: () {
                                          carouselController.nextPage();
                                        },
                                      )
                                    ],
                                  )
                                ],
                              ),
                            )
                          ],
                        ),
                      ),
                  ])));
        });
  }

  dots(slides, activeIndex) {
    return Row(
      children: [
        for (var i = 0; i < slides!.length; i++)
          i == activeIndex
              ? Container(
                  height: responsiveWidth(8),
                  width: responsiveWidth(16),
                  margin: EdgeInsets.all(responsiveWidth(4)),
                  decoration: BoxDecoration(
                    color: AppColor().color1,
                    borderRadius: BorderRadius.circular(responsiveWidth(50)),
                  ))
              : Container(
                  height: responsiveWidth(8),
                  width: responsiveWidth(8),
                  margin: EdgeInsets.all(responsiveWidth(4)),
                  decoration: BoxDecoration(
                    color: AppColor().color4,
                    borderRadius: BorderRadius.circular(responsiveWidth(50)),
                  ))
      ],
    );
  }
}
