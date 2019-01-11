var pymChild = null;

var colors = {
    'brown': '#6b6256','tan': '#a5a585','ltgreen': '#70a99a','green': '#449970','dkgreen': '#31716e','ltblue': '#55b7d9','blue': '#358fb3','dkblue': '#006c8e','yellow': '#f1bb4f','orange': '#f6883e','tangerine': '#e8604d','red': '#cc203b','pink': '#c72068','maroon': '#8c1b52','purple': '#571751'
};

/*
 * Render the graphic
 */
function render(width) {

		var northEast = L.latLng(38.774452, -90.166725),
		    southWest = L.latLng(38.59892, -90.320518),
			bounds = L.latLngBounds(southWest, northEast);

			var map = L.map('map', {
				scrollWheelZoom: false,
				attribution: ''
			}).setView(bounds.getCenter(), 12).setMaxBounds(bounds);
		
		
			var tiles = L.tileLayer('https://{s}.tiles.mapbox.com/v3/stlpr.hi06d4b5/{z}/{x}/{y}.png', { attribution: "<a href='https://www.mapbox.com/about/maps/' target='_blank'>&copy; Mapbox &copy; OpenStreetMap</a> <a class='mapbox-improve-map' href='https://www.mapbox.com/map-feedback/' target='_blank'>Improve this map</a>"})
				.addTo(map);
		
			var svg = d3.select(map.getPanes().overlayPane).append("svg"),
				g = svg.append("g").attr("class", "leaflet-zoom-hide");
		
			// update filename, collection name
		
			d3.json("shootings.topojson", function (error, geodata) {
		
				var regions = topojson.feature(geodata, geodata.objects.incidents);
				var geojson;
		
				geojson = L.geoJson(regions, {
					
					pointToLayer: function (feature, latLng) {
						marker = L.marker(latLng)

						if (feature.properties.deaths) {
							marker.bindPopup('<b>' + feature.properties.block + '</b> <br>' + feature.properties.time + '<br> <em>Note: </em>' + feature.properties.deaths)
							return marker
						} else {
							marker.bindPopup('<b>' + feature.properties.block + '</b> <br>' + feature.properties.time)
							return marker
						}
						
					}
				})
		
				geojson.addTo(map)
		
			})
		
			if (pymChild) {
				pymChild.sendHeight();
			}
		}
		
		/*
		 * NB: Use window.load instead of document.ready
		 * to ensure all images have loaded
		 */
		$(window).load(function () {
			pymChild = new pym.Child({
				renderCallback: render
			});
		})