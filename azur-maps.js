(function($) {

  function azurMaps() {
    // possible shortcout layout
    // <div class="azur-map" data-center="28.0,-81.4" data-zoom="6" data-height="600" data-marker="1" data-sat="1">+ custom height</div>
    // required: class and data-center attribute

    $('.azur-map').each(function(index) {
      var $this = $(this);
      var dataCenter = $this.attr('data-center').split(',');    
      var dataZoom = $this.attr('data-zoom') || 6;    
      var dataHeight = Number($this.attr('data-height'));
      var dataMarker = $this.attr('data-marker');
      var dataMapType = $this.attr('data-type');
      var dataMarkerText = $this.text();
      var dataInfowindow = $this.attr('data-infowindow');
      var center = new google.maps.LatLng(dataCenter[0], dataCenter[1]);
      
      if(dataHeight) { $this.css('height', dataHeight); }
      var mapOptions = {
        zoom: Number(dataZoom),
        center: center,
        mapTypeId: google.maps.MapTypeId.ROADMAP,
        scrollwheel: false,
        //draggable: false,
        //panControl: true
      }
      
      var map = new google.maps.Map($this.get(0), mapOptions);
      
      if(dataMapType){     
        if(typeof google.maps.MapTypeId[dataMapType.toUpperCase()] != 'undefined') {
          map.setMapTypeId(dataMapType);
        }
      }
      if(dataMarker) {
        var markerPos = dataMarker.split(',');
        var marker = new google.maps.Marker({
          //position: center,
          position: new google.maps.LatLng(markerPos[0], markerPos[1]),
          map: map,
          title: dataMarkerText
        });
        if(dataInfowindow) {
          var infowindow = new google.maps.InfoWindow({
            content: '<div class="infowindowcontent">' + dataMarkerText + '</div>'
          }).open(map,marker);
        }
      }

      //google.maps.event.addListener(map, 'tilesloaded', function() {
      $this.addClass('ready');
      //});
    });
  }

  azurMaps(); 

  window.azurMaps = azurMaps;

})(jQuery);