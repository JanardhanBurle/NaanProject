class OnboardingData {
  List<SlideInfo>? slides;
  OnboardingData({this.slides});
  OnboardingData.fromJson(Map<String, dynamic> json) {
    try {
      List<SlideInfo>? list = [];
      if (json['data'].isNotEmpty) {
        for (var i = 0; i < json['data'].length; i++) {
          list.add(SlideInfo.fromJson(json['data'][i]));
        }

        slides = list;
      } else {
        slides = [];
      }
    } on Exception {
      // print(ex);
    }
  }
}

class SlideInfo {
  String? url;
  String? title;
  String? description;
  SlideInfo({this.url, this.title, this.description});

  SlideInfo.fromJson(Map<String, dynamic> json) {
    try {
      url = json['url'];
      title = json['title'];
      description = json['description'];
    } on Exception {
      print('an exception occured');
    }
  }
}
