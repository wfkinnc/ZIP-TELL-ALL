 
      // This example requires the Places library. Include the libraries=places
      // parameter when you first load the API. For example:
      // <script src="https://maps.googleapis.com/maps/api/js?key=YOUR_API_KEY&libraries=places">
    $(document).ready(function(){




      $("#zip-finder").on("click",getData);

      var long = "";
      var lat  = "";
      
      var filter = [];

      function getData(){
        
        $("#map-canvas").empty();
        
        var zip = $("#zipCode").val().trim();
        console.log("zip:" + zip)
        
        var url = "https://maps.googleapis.com/maps/api/geocode/json?address=" + zip + "&key=AIzaSyDaPZ5HfKbDDaPol5zPsE7-zvfUopTe41I";

        $.ajax({
         url: url ,
         method: "GET"
        }).done(function(payload){
        console.log(payload);
        lat = payload.results[0].geometry.location.lat;
        long  = payload.results[0].geometry.location.lng
        initMap(lat,long);

        }).fail(function(){
        
        })// end ajax

        
      }// end getData

      })// end ready

      var map;
      var service;
      var infowindow;





      function initMap(passLat, passLong) {
        
        var uluru = {lat: passLat, lng: passLong};
        map = new google.maps.Map(document.getElementById("map-canvas"), {
          center: uluru,
          zoom: 12
        });

        var hospitalRequest = {
          location: uluru,
          radius: '500',
          query: "hospital"
        };

        var schoolRequest = {
          location: uluru,
          radius: '500',
          query: "school"
        };

        var entertainmentRequest = {
          location: uluru,
          radius: '500',
          query: "entertainment"
        };

        var amusementRequest = {
          location: uluru,
          radius: '500',
          query: "amusement"
        };

        var clubRequest = {
          location: uluru,
          radius: '500',
          query: "club"
        };

        var theaterRequest = {
          location: uluru,
          radius: '500',
          query: "cinema"
        };

        var musicRequest = {
          location: uluru,
          radius: '500',
          query: "music"
        };

        var mallRequest = {
          location: uluru,
          radius: '500',
          query: "mall"
        };

        var venueRequest = {
          location: uluru,
          radius: '500',
          query: "venue"
        };

        var parkRequest = {
          location: uluru,
          radius: '500',
          query: "parks"
        };

        
        service = new google.maps.places.PlacesService(map);
        if($("#hospital_checked").is(":checked")){  
          service.textSearch(hospitalRequest, callback);
        };

        if($("#school_checked").is(":checked")){  
          service.textSearch(schoolRequest, callback);
        };

        if($("#entertainment_checked").is(":checked")){  
          service.textSearch(entertainmentRequest, callback);
          service.textSearch(amusementRequest, callback);
          service.textSearch(clubRequest, callback);
          service.textSearch(theaterRequest, callback);
          service.textSearch(musicRequest, callback);
          service.textSearch(mallRequest, callback);
          service.textSearch(venueRequest, callback);
        };

        if($("#park_checked").is(":checked")){  
          service.textSearch(parkRequest, callback);
        };


        infowindow = new google.maps.InfoWindow();
      }

      function callback(results, status) {
        
        if (status === google.maps.places.PlacesServiceStatus.OK) {
          for (var i = 0; i < results.length; i++) {
            
            createMarker(results[i]);
          }
        }
      }

      function createMarker(place) {
        var placeLoc = place.geometry.location;
        var iconBase = 'https://maps.google.com/mapfiles/kml/shapes/';
        console.log("search is:" + service.textSearch);
        console.log("type is:" + place.types.indexOf("hospital"));
        if(place.types.indexOf("hospital") > -1 || place.types.indexOf("health") > -1){
          var marker = new google.maps.Marker({
            map: map,
            position: place.geometry.location,
            icon: iconBase + 'hospitals_maps.png'
          });
        };
        if(place.types.indexOf("park") > -1){
          var marker = new google.maps.Marker({
            map: map,
            position: place.geometry.location,
            icon: iconBase + 'picnic_maps.png'
          });
        };
        if(place.types.indexOf("school") > -1){
          var marker = new google.maps.Marker({
            map: map,
            position: place.geometry.location,
            icon: iconBase + 'schools_maps.png'
          });
        };
        if(place.types.indexOf("amusement_park") > -1){
          console.log("entertainment works");
          console.log(place);
          var marker = new google.maps.Marker({
            map: map,
            position: place.geometry.location,
            icon: iconBase + 'arts_maps.png'
          });
        };
        if(place.types.indexOf("night_club") > -1){
          console.log("entertainment works");
          console.log(place);
          var marker = new google.maps.Marker({
            map: map,
            position: place.geometry.location,
            icon: iconBase + 'arts_maps.png'
          });
        };
        if(place.types.indexOf("bar") > -1){
          console.log("entertainment works");
          console.log(place);
          var marker = new google.maps.Marker({
            map: map,
            position: place.geometry.location,
            icon: iconBase + 'arts_maps.png'
          });
        };


        google.maps.event.addListener(marker, 'click', function() {
          infowindow.setContent(place.name + '<br>' + place.formatted_address);
          console.log(place);
          infowindow.open(map, this);
        });
      }
