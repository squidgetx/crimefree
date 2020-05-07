let atlRedline;
let atl2018;
let map;

const layerToggle = (layerString) => {
  let vis = map.getLayoutProperty(layerString, 'visibility')
  if (vis === 'visible'){
    map.setLayoutProperty(layerString, 'visibility', 'none');
  } else {
    map.setLayoutProperty(layerString, 'visibility', 'visible');
  }
}

let data = {
  'atlanta': {
    'title': 'atlanta, GA',
    'intro': 'Welcome to Atlanta. In the 1950s, the Home Owners’ Loan Corporation (HOLC), instituted the practice of “red lining” minority areas—identifying them on color-coded maps as neighborhoods in decline and decay, where property values were in doubt and, therefore, where loans were strongly discouraged as a risky investment. The Federal Housing Administration (FHA) and, after 1944, the Veterans’ Administration (VA) adopted HOLC standards in their own massive loan programs to home builders and buyers. To prevent any possible mixture of “inharmonious races and classes” and thereby protect property values, the FHA encouraged the use of racial restrictions, such as restrictive covenants and even physical barriers, to keep blacks from lowering the value of “white” property. As housing expert Charles Abrams observed in the 1950s, the FHA embraced “a racial policy that could well have been culled from the Nuremburg laws.”',
    'buttons': [{
      'color': '#aabb66',
      'buttonText': 'Show HOLC A Grade Areas',
      'description': '"A" areas are "hot spots" ... where good mortgage lenders ... are willing to make their maximum loans."',
      'function': () => {
        layerToggle('atl_a_grade')
      }

      // map.addLayer({
      //     'id': 'atl_a_grade',
      //     'type': 'line',
      //     'source': 'atlRedline',
      //     'paint': {
      //       'line-color': '#77ee77',
      //       'line-width': 2
      //     },
      //     'filter': ['==', 'holc_grade', 'A']
      //   }),
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
        'buttonText': 'Show HOLC D Grade Areas',
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
                    0, '#EFCBFF',
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
      'stories': [
        {
          'text': "“I'm trying to hang on for two more years. But they keep building and you know taxes are going up,” Palmer said. According to county tax records, the fair market value of Palmer's home has gone from $64,500 in 2010 to $182K last year. Her yearly tax bill went up by more than $2K over that time. Palmer lives on Ralph McGill Boulevard in a small home passed down to her from her grandmother. Across the street for years was an old Ivan Allen furniture building. A little farther down is a former Coca-Cola bottling facility. Today, those structures are gone. In their place are new, luxury apartment buildings.",
          'name': 'Marteca Palmer',
          'place': 'Old Fourth Ward',
          'source': 'https://www.bisnow.com/atlanta/news/neighborhood/for-some-long-time-old-fourth-ward-residents-redevelopment-has-its-price-85257'
        },
        {
          'text': "Atlanta City Councilman Amir Farokhi, whose district covers the Old Fourth Ward, said other proposals need to be considered as well, including freezing home values for longtime residents or offering property tax or housing rehabilitation assistance. “One of our priorities needs to be ensuring that longtime homeowners don't feel like they're priced out of the neighborhood,” Farokhi said. Those programs would also go toward preserving the “diversity and authenticity” of the neighborhood, even as new residents continue to move in, he said.",
          'name': 'Amir Farokhi',
          'place': 'Old Fourth Ward',
          'source': 'https://www.bisnow.com/atlanta/news/neighborhood/for-some-long-time-old-fourth-ward-residents-redevelopment-has-its-price-85257',
        },
        {
          'text': '” In 1985, a reporter for Esquire magazine summed up the renewed relationship between the black mayor and the white establishment with praise that would have made the civil rights community cringe. “Andy Young,” the reporter noted, “is doing for Atlanta what Reagan has done for America: he’s making rich white people feel good again.”...To be sure, Mayor Young consciously thought of himself as a conduit between the two groups. “My job,” he told a reporter in 1985, “is to see that whites get some of the power and blacks get some of the money.”',
          'name': 'Kevin Kruse',
          'place': 'White Flight',
          'source': 'https://www.jstor.org/stable/j.ctt3fgx6p.14',
        }
      ],
      'finalButton': {
        'color': ' #aa4466',
        'buttonText': 'Fly to Faribault',
        'function': () => {
          map.flyTo({
            center: [ -93.27, 44.29 ],
          });
          loadCard(data['faribault'])
        }
      },
  },
  'faribault': {
    'title': 'faribault, MN',
    'intro': 'Welcome to Faribault',
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
      'stories': [
        {
          'text': 'Thelma moved to Faribault 10 years ago because it seemed like a safe and peaceful environment to raise her family. She worked hard as a home health aide and certified nursing assistant, and in Faribault, she was eventually able to move to a house big enough for her three teenage kids and the younger children she was raising. But Thelma and her family got evicted from their home because of Faribault’s Rental Licensing Ordinance and its so-called Crime Free Housing Program. Harassing calls to the police from Thelma’s white neighbors had brought the police to her home many times, like when her kids were jumping on the trampoline or when a group of Black teenagers was standing in her yard. One neighbor even told Thelma to her face that Thelma should “go back where she came from.” In response, the police labelled Thelma and her family “problem tenants.” They threatened Thelma’s landlord with criminal prosecution under the ordinance unless she kicked Thelma and her family out. In a matter of months, Thelma’s family lost their home. ',
          'name': 'ACLU',
          'place': '',
          'source': 'https://www.aclu.org/blog/racial-justice/race-and-economic-justice/minnesota-citys-ordinance-illegally-targets-people'
        },
        {
          'text': '"In 2015, Trotter-Ford (who is black) spanked one of his children and one of his then fiancée’s children with a belt. When a family member reported bruises on one child, the Rice County Social Services Department temporarily removed some of the children from the home. Less than two weeks later and (according to the lawsuit) before Trotter-Ford had been charged with anything, police ordered the whole family evicted. “It was all like, bam, bam, bam,” Trotter-Ford told me. “They”—social services—“came, then the eviction, and then I got charged.” (The lawyers for the City of Faribault contested some aspects of this account, saying that Trotter-Ford was not on the lease and that Trotter-Ford’s fiancée, Makayla, was already facing an eviction unrelated to the crime-free-housing ordinance which had been issued without “urging by the Faribault Police Department.” The ACLU acknowledged that Makayla had previously received a letter from her landlord about an eviction but argued that it did relate to the crime-free-housing program.) Once Trotter-Ford pled guilty to neglect and he and Makayla completed parenting classes, the Rice County Social Services Department returned the children to their care. The couple, who later married, struggled to find a new house in town—at least partly a result of criminal background checks mandated by Faribault’s crime-free-housing program, Trotter-Ford argued in his lawsuit. Eventually, the family left Faribault altogether."',
          'name': 'The Atlantic',
          'place': '',
          'source': 'https://www.theatlantic.com/politics/archive/2020/03/crime-free-housing-lets-police-influence-landlords/605728/',
        }
      ],
      'finalButton': {
        'color': ' #aa4466',
        'buttonText': 'Fly to Kansas City',
        'function': () => {
          map.flyTo({
            center: [ -94.34, 39.5 ],
            essential: true});
          loadCard(data['kansascity'])
        }
      },
    },
    'kansascity': {
    'title': 'kansas city, MO',
    'intro': 'Welcome to Kansas City',
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
      'stories': [
        {
          'text': 'On a february day last year in Kansas City, Missouri, Officer Aaron McKie sat at his desk in the back corner of the Metro Patrol Division, composing a letter to a landlord. “I have been notified by my Metro Patrol District Officers of ongoing issues at your rental property,” he typed on police-department letterhead. The property—a modest house a few doors down from a highway overpass—was home to a 31-year-old woman and her two small children. About a week earlier, according to a police report, officers had visited the house on a welfare check. But when the woman met them, one officer thought she smelled of PCP. Another spotted her boyfriend in a car nearby. In the car, the officers found a large bottle “filled with what appears to be PCP” (the report doesn’t elaborate) and arrested the woman and her boyfriend. “I need your help solving this problem,” McKie wrote to the woman’s landlord, inviting a follow-up phone call.',
          'name': 'The Atlantic',
          'place': '',
          'source': 'https://www.theatlantic.com/politics/archive/2020/03/crime-free-housing-lets-police-influence-landlords/605728/',
        },
        {
          'text': 'McKie said most evictions result from tenants falling behind on their rent, not from alleged criminal activity. Singer, his colleague, said that even if landlords believe there is a lease violation, it is easier to just evict for nonpayment of rent. An eviction notice doesn’t have to mention the crime-free-housing program at all.',
          'name': 'The Atlantic',
          'place': '',
          'source': 'https://www.theatlantic.com/politics/archive/2020/03/crime-free-housing-lets-police-influence-landlords/605728/',
        },
        {
          'text': 'One married couple told a story of their eviction after one was arrested for robbing a store nearby; charges were later dropped. Chiquita Smith said she gave officers her name and address when they were called to settle a dispute between her cousin and a neighbor. Days later she was evicted, along with her 14-year-old son, for being an unauthorized tenant in a sister’s house. None of the tenants knew for certain if the crime-free-housing program had anything to do with their evictions, but their experiences echoed those that crime-free officers described.',
          'name': 'The Atlantic',
          'place': '',
          'source': 'https://www.theatlantic.com/politics/archive/2020/03/crime-free-housing-lets-police-influence-landlords/605728/',
        }
      ],
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
  for(let i = 0; i < card['stories'].length; i++) {
    let storySection = document.createElement('div')
    let story = card['stories'][i]
    storySection.innerHTML = `<hr /><p>${story.text}</p><p><i>- ${story.name}<i>, ${story.place}</p><a href=${story.source}>read more</a>`
    stories.appendChild(storySection)
  }
  let finalButton = document.createElement('p')
  finalButton.classList.add('button');
  finalButton.addEventListener('click', card['finalButton']['function'])
  finalButton.style.background = card['finalButton']['color']
  finalButton.innerHTML = card['finalButton']['buttonText']

  cardEl.innerHTML = `<p class='infoHeader'>${card['title']}</p><p>${card['intro']}</p>`
  cardEl.appendChild(buttonSection)
  cardEl.appendChild(stories)
  cardEl.appendChild(finalButton)
  cardEl.scrollTop = 0
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

    map.addLayer({
        'id': 'atl_a_grade',
        'type': 'line',
        'source': 'atlRedline',
        'paint': {
          'line-color': '#77ee77',
          'line-width': 2
        },
        'layout' : { 'visibility' : 'none' },
        'filter': ['==', 'holc_grade', 'A']
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
