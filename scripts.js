$(document).ready(function() {
  L.mapbox.accessToken = mapboxAccessToken;

  var map = L.mapbox.map('map', mapboxMapID).setView([45.7,9.68],14);

  $.ajax({
    dataType: "json",
    url: 'http://api.citybik.es/v2/networks/bigi',
    success: function(data) {
      $.each(data['network']['stations'], function() {
        L.mapbox.featureLayer({
          type: 'Feature',
          geometry: {
            type: 'Point',
            coordinates: [
              this.longitude,
              this.latitude
            ]
          },
          properties: {
            title: this.name,
            description: 'Bikes: ' + this.free_bikes + ' ' + 'Free slots: ' + this.empty_slots,
            'marker-size': 'large',
            'marker-color': this.free_bikes==0 ? '#FF0000' : (this.empty_slots==0 ? '#FFFF00' : '#00FF00'),
            'marker-symbol': 'bicycle'
          }
        }).addTo(map);
      });
    }
  });
});
