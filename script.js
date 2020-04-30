window.onload = () => {
  fetch('.GAAtlanta1938.geojson')
    .then(resp => resp.json())
    .then(console.log())

  mapboxgl.accessToken = 'pk.eyJ1IjoibWFwYm94IiwiYSI6ImNpejY4M29iazA2Z2gycXA4N2pmbDZmangifQ.-g_vE53SD2WrJ6tFX7QHmA';

  var map = new mapboxgl.Map({
        container: 'map', // container id
        style: 'mapbox://styles/mapbox/streets-v11', // stylesheet location
        center: [-84.45, 33.75], // starting position [lng, lat]
        zoom: 11 // starting zoom
  });

  map.on('load', () => {
    // add all information sources here
    // pull from APIs, included files

    // map.addSource('atlRedline', {
    //   'type': 'geojson',
    //   'data': atlRedline
    // })
    map.addSource('neighborhood',{
          'type': 'geojson',
          'data': {
            'type': 'FeatureCollection',
            'features': [{
              'type': 'Feature',
              'geometry': {
                'type': 'Point',
                'coordinates': [-84.39, 33.75]
              }
            },]
          }
      })
  })

  document.getElementsByClassName('content')[0].addEventListener('click', () => {
    // For now just trigger on any click
    // eventually we would take arguments with the ID or string of the city or something
    console.log(event.target.id)
    document.getElementById('infoCard').classList.toggle('visible');
    if (event.target.id == 'b1'){
      console.log('y')
      // show different information sources based on
      // events and local variables
      map.addLayer({
            'id': '1',
            'type': 'circle',
            'source': 'neighborhood',
            'paint': {
              'circle-radius': 100,
              'circle-color': '#22ff99',
              'circle-opacity': 0.2
            },
            'filter': ['==', '$type', 'Point']
          });
    }
    if (event.target.id == 'b2'){
      map.flyTo({
        center: [ -87.62, 41.87 ],
        essential: true})
    }
  });






}
