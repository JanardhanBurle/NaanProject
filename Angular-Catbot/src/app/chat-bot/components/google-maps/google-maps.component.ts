import { Component, OnInit, ElementRef, ViewChild, EventEmitter, Output } from '@angular/core';

@Component({
  selector: 'app-google-maps',
  templateUrl: './google-maps.component.html',
  styleUrls: ['./google-maps.component.css']
})
export class GoogleMapsComponent implements OnInit {
  @ViewChild('map', { static: false }) mapElement: ElementRef;
  @Output() selectAddressEvent = new EventEmitter();

  map: google.maps.Map;
  marker: any;
  constructor() { }

  ngOnInit() { }

  ngAfterViewInit() {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition((p) => {
        let geocoder = new google.maps.Geocoder();
        let latLang = new google.maps.LatLng(p.coords.latitude, p.coords.longitude);
        const mapProperties = {
          center: latLang,
          zoom: 15,
          mapTypeId: google.maps.MapTypeId.ROADMAP
        };
        this.map = new google.maps.Map(this.mapElement.nativeElement, mapProperties);
        this.marker = new google.maps.Marker({
          position: latLang,
          map: this.map
        });

        // Create the search box and link it to the UI element.
        let input = <HTMLInputElement>document.getElementById('google-search');
        let searchBox = new google.maps.places.SearchBox(input);
        this.map.controls[google.maps.ControlPosition.TOP_LEFT].push(input);

        // Bias the SearchBox results towards current map's viewport.
        this.map.addListener('bounds_changed', () => {
          searchBox.setBounds(this.map.getBounds());
        });

        var markers = [];
        // Listen for the event fired when the user selects a prediction and retrieve
        // more details for that place.
        searchBox.addListener('places_changed', () => {
          var places = searchBox.getPlaces();

          if (places.length == 0) {
            return;
          }

          // For each place, get the icon, name and location.
          var bounds = new google.maps.LatLngBounds();
          places.forEach((place) => {
            if (!place.geometry) {
              console.log("Returned place contains no geometry");
              return;
            }
            var icon = {
              url: place.icon,
              size: new google.maps.Size(71, 71),
              origin: new google.maps.Point(0, 0),
              anchor: new google.maps.Point(17, 34),
              scaledSize: new google.maps.Size(25, 25)
            };

            // // Create a marker for each place.
            // markers.push(new google.maps.Marker({
            //   map: this.map,
            //   icon: icon,
            //   title: place.name,
            //   position: place.geometry.location
            // }));

            if (place.geometry.viewport) {
              // Only geocodes have viewport.
              bounds.union(place.geometry.viewport);
            } else {
              bounds.extend(place.geometry.location);
            }
          });
          this.map.fitBounds(bounds);
        });

        //Listen for any clicks on the map.
        google.maps.event.addListener(this.map, 'click', (event) => {
          this.marker.setMap(null);
          //Get the location that the user clicked.
          var clickedLocation = event.latLng;
          //If the marker hasn't been added.
          if (this.marker) {
            //Create the marker.
            this.marker = new google.maps.Marker({
              position: clickedLocation,
              map: this.map,
              draggable: true //make it draggable
            });
            //Listen for drag events!
            google.maps.event.addListener(this.marker, 'dragend', (event) => {
              // this.markerLocation();
            });
          } else {
            //Marker has already been added, so just change its location.
            this.marker.setPosition(clickedLocation);
          }
          //Get the marker's location.
          // this.markerLocation();


          geocoder.geocode({
            location: event.latLng
          }, (results, status) => {
            if (status == google.maps.GeocoderStatus.OK) {
              if (results[0]) {
                console.log(results[0].formatted_address);
                this.selectAddressEvent.emit(results[0].formatted_address);
              }
            }
          });
        });

      });
    } else {
      alert('Geo Location feature is not supported in this browser.');
    }
  }





  markerLocation() {
    //Get location.
    var currentLocation = this.marker.getPosition();
    //Add lat and lng values to a field that we can save.
    (<HTMLInputElement>document.getElementById('lat')).value = currentLocation.lat();
    (<HTMLInputElement>document.getElementById('lng')).value = currentLocation.lng();
  }

}
