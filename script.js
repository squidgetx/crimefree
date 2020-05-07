let atlRedline;
let atl2018;
let map;

let data = {
  'atlanta': {
    'title': 'atlanta, GA',
    'intro': 'Welcome to Atlanta',
    'buttons': [{
      'color': '#aabb66',
      'buttonText': 'Show A Grade Areas',
      'description': '"A" areas are "hot spots" ... where good mortgage lenders ... are willing to make their maximum loans."',
      'function': () => map.addLayer({
          'id': 'atl_a_grade',
          'type': 'line',
          'source': 'atlRedline',
          'paint': {
            'line-color': '#77ee77',
            'line-width': 2
          },
          'filter': ['==', 'holc_grade', 'A']
        }),
      },{
        'color': '#aabb66',
        'buttonText': 'Show B Grade Areas',
        'description': 'B grade',
        'function': () => map.addLayer({
            'id': 'atl_b_grade',
            'type': 'line',
            'source': 'atlRedline',
            'paint': {
              'line-color': '#44ccff',
              'line-width': 2
            },
            'filter': ['==', 'holc_grade', 'B']
          }),
        }, {
          'color': '#aabb66',
          'buttonText': 'Show C Grade Areas',
          'description': 'B grade',
          'function': () => map.addLayer({
              'id': 'atl_c_grade',
              'type': 'line',
              'source': 'atlRedline',
              'paint': {
                'line-color': '#eecc00',
                'line-width': 2
              },
              'filter': ['==', 'holc_grade', 'C']
            }),
          }, {
        'color': '#4499AA',
        'buttonText': 'Show D Grade Areas',
        'description': '"D" areas have fully declined and are "characterized by detrimental influence in a pronounced degree."',
        'function': () => map.addLayer({
            'id': 'atl_d_grade',
            'type': 'line',
            'source': 'atlRedline',
            'paint': {
              'line-color': '#ee6655',
              'line-width': 2
            },
            'filter': ['==', 'holc_grade', 'D']
          }),
        }, {
          'color': '#aa22aa',
          'buttonText': '2018 Census Non Hispanic Black',
          'description': 'chloropleth',
          'function': () => map.addLayer({
              'id': 'atl_census_nhb',
              'type': 'fill',
              'source': 'atl2018',
              'paint': {
                'fill-color': [
                  'interpolate', ['linear'],
                  ['get', 'B03002004'],
                  0, '#E0AAFF',
                  2200,'#C77DFF',
                  4300,'#9D4EDD',
                  6500,'#7B2CBF',
                  8600,'#5A189A',
                  11000,'#3C096C'
                  ],
                  'fill-opacity': 0.4
              },
              'filter': [
                "all",
                ['!=', 'name', 'United States'],
                ['!=', 'name', 'Georgia'],
                ['!=', 'name', 'Fulton County, GA'],
              ]
            }),
          },{
            'color': '#aa22aa',
            'buttonText': '2018 Census Non Hispanic White',
            'description': 'chloropleth',
            'function': () => map.addLayer({
                'id': 'atl_census_nhw',
                'type': 'fill',
                'source': 'atl2018',
                'paint': {
                  'fill-color': [
                    'interpolate', ['linear'],
                    ['get', 'B03002003'],
                    0, '#E0AAFF',
                    2200,'#C77DFF',
                    4300,'#9D4EDD',
                    6500,'#7B2CBF',
                    8600,'#5A189A',
                    11000,'#3C096C'
                    ],
                    'fill-opacity': 0.4
                },
                'filter': [
                  "all",
                  ['!=', 'name', 'United States'],
                  ['!=', 'name', 'Georgia'],
                  ['!=', 'name', 'Fulton County, GA'],
                ]
              }),
            }
      ],
      'stories': "Lorem Ipsum...",
      'finalButton': {
        'color': ' #aa4466',
        'buttonText': 'Fly to Chicago',
        'function': () => {
          map.flyTo({
            center: [ -87.62, 41.87 ],
            essential: true});
          loadCard(data['chicago'])
        }
      },
  },
  'chicago': {
    'title': 'chicago, IL',
    'intro': 'Welcome to Chicago',
    'buttons': [{
        'color': '#aabb66',
        'buttonText': 'Click me',
        'description': 'Lorem Ipsum..',
        'function': () => alert('clicked me')
      }, {
        'color': '#4499AA',
        'buttonText': 'Click me',
        'description': 'dolor mosr',
        'function': () => alert('clicked me 2'),
      }],
      'stories': "Chicago is the windy city",
      'finalButton': {
        'color': ' #aa4466',
        'buttonText': 'Fly to Atlanta',
        'function': () => {
          map.flyTo({
            center: [ -84.38, 33.75 ],
            essential: true});
          loadCard(data['atlanta'])
        }
      }
  }
}

let loadCard = (card) => {
  let cardEl = document.getElementById('infoCard')
  let buttonSection = document.createElement('div')
  for(let i = 0; i < card['buttons'].length; i++) {
    let button = document.createElement('p');
    button.classList.add('button');
    button.addEventListener('click', card['buttons'][i]['function'])
    button.style.background = card['buttons'][i]['color']
    button.innerHTML = card['buttons'][i]['buttonText']
    let buttonContainer = document.createElement('div')
    buttonContainer.appendChild(button)
    let buttonDesc = document.createElement('p')
    buttonDesc.innerHTML = card['buttons'][i]['description']
    buttonContainer.appendChild(buttonDesc)
    buttonSection.appendChild(buttonContainer)
  }
  let stories = document.createElement('div')
  stories.innerHTML = `<p class='infoSubheader'>stories</p>`
  let story = document.createElement('p')
  story.innerHTML = card['stories']
  stories.appendChild(story)
  let finalButton = document.createElement('p')
  finalButton.classList.add('button');
  finalButton.addEventListener('click', card['finalButton']['function'])
  finalButton.style.background = card['finalButton']['color']
  finalButton.innerHTML = card['finalButton']['buttonText']

  cardEl.innerHTML = `<p class='infoHeader'>${card['title']}</p><p>${card['intro']}</p>`
  cardEl.appendChild(buttonSection)
  cardEl.appendChild(stories)
  cardEl.appendChild(finalButton)
}




window.onload = () => {
  fetch('./GAAtlanta1938.geojson')
    .then(resp => resp.json())
    .then(json => atlRedline = json)
    // .then(res => console.log(atlRedline))

  fetch('./atl2018.geojson')
    .then(resp => resp.json())
    .then(json => atl2018 = json)
    .then(res => console.log(atl2018))

  mapboxgl.accessToken = 'pk.eyJ1IjoiZHdmcmllcyIsImEiOiJjazlkMnFvNGIwOTV1M29yM2IxeDI4bHphIn0.kQk5hrC-EUxqzjlWxP43ew';

  map = new mapboxgl.Map({
        container: 'map', // container id
        style: 'mapbox://styles/dwfries/ck9w3bmxu02fw1into5h4yzua', // stylesheet location
        center: [-84.45, 33.75], // starting position [lng, lat]
        zoom: 11 // starting zoom
  });

  map.on('load', () => {
    // add all information sources here
    // pull from APIs, included files

    map.addSource('atlRedline', {
      'type': 'geojson',
      'data': atlRedline
    })
    map.addSource('atl2018',{
      'type' : 'geojson',
      'data' : atl2018
    })
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
    loadCard(data['atlanta'])
    document.getElementById('infoCard').classList.add('ready')
    document.getElementById('map').classList.add('ready')
  })
}
