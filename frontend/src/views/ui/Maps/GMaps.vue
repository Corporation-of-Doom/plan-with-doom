<template>
	<div class="page-gmaps scrollable">
		<div class="page-header">
			<h1>G Maps</h1>
			<el-breadcrumb separator="/">
				<el-breadcrumb-item :to="{ path: '/' }"><i class="mdi mdi-home-outline"></i></el-breadcrumb-item>
				<el-breadcrumb-item>Components</el-breadcrumb-item>
				<el-breadcrumb-item>Maps</el-breadcrumb-item>
				<el-breadcrumb-item>G Maps</el-breadcrumb-item>
			</el-breadcrumb>
		</div>

		<div class="card-base card-shadow--medium">
			<h2 class="ph-20">Click twice on the map</h2>
			<gmap-map ref="map" @click="clicked"
				:center="{lat:40.720917, lng:-74.001308}"
				:zoom="12"
				:options="{gestureHandling:'cooperative'}"
				map-type-id="roadmap"
				style="width: 100%; height: 500px"
			>
				<GmapMarker v-if="start" :position="start.latLng" label="S" />
				<GmapMarker v-if="end" :position="end.latLng" label="E" />
				<GmapPolyline v-if="curvedPath" :path="curvedPath" />
			</gmap-map>
		</div>

		<div class="card-base card-shadow--medium mt-30">
			<h2 class="ph-20">Terrain map</h2>
			<gmap-map
				:center="{lat:40.720917, lng:-74.001308}"
				:zoom="12"
				:options="{gestureHandling:'cooperative'}"
				map-type-id="terrain"
				style="width: 100%; height: 500px"
			></gmap-map>
		</div>

		<div class="card-base card-shadow--medium mt-30">
			<h2 class="ph-20">Overlay map</h2>
			<gmap-map 
				:center="{lat: 1.38, lng: 103.8}" 
				:zoom="12"
				:options="{gestureHandling:'cooperative'}"
				style="width: 100%; height: 500px"
			>
				<ground-overlay source="/static/maps/overlay.png" :bounds="{
						north: 1.502,
						south: 1.185,
						east: 104.0262,
						west: 103.5998,
					}" :opacity="0.5">
				</ground-overlay>
			</gmap-map>
		</div>

		<!--<div class="card-base card-shadow--medium mt-30 flex map-app">
			<div class="settings-panel box scrollable only-y ph-20">
				<h3>Map information</h3> 
				<ul>
					<li>Map center latitude: <strong>{{reportedCenter.lat}}</strong></li>
					<li>Map center longitude: <strong>{{reportedCenter.lng}}</strong></li>
					<li>Map bounds: <strong><pre>{{mapBounds}}</pre></strong></li>
					<li>Map zoom: <strong>{{zoom}}</strong></li>
					<li>Dragged times: <strong>{{drag}}</strong></li>
					<li>Left clicked times: <strong>{{mapClickedCount}}</strong></li>
					<li>Map type: 
						<select id="" name="" v-model="mapType">
							<option value="roadmap">roadmap</option>
							<option value="hybrid">hybrid</option>
							<option value="satellite">satellite</option>
							<option value="terrain">terrain</option>
						</select>
					</li>
					<li>Map style: 
						<select id="" name="" v-model="mapStyle">
							<option value="red">red</option>
							<option value="green">green</option>
							<option value="normal">normal</option>
						</select>
					</li>
					<li>Enable scrollwheel zooming on the map: <input type="checkbox" v-model="scrollwheel"></li>
					<li><button @click="addMarker"> Add a new Marker</button> (or right click on the map)</li>
				</ul>
					
				<h3>Clusters</h3> 
				<ul>
					<li>Enabled: <input type="checkbox" v-model="clustering" number></li>
					<li>Grid size: <input type="number" v-model="gridSize" number></li>
				</ul>

				<h3>Polyline</h3> 
				<ul>
					<li>Editable: <input type="checkbox" v-model="pleditable" number></li>
					<li>Visible: <input type="checkbox" v-model="plvisible" number></li>
					<li><button @click="resetPlPath">Reset path</button></li>
				</ul>

				<h3>Polygon</h3> 
				<ul>
					<li>Visible: <input type="checkbox" v-model="pgvisible" number></li>
					<li><button @click="pgPath = opgPath">Reset Polygon to pentagon</button></li>
					<li><button @click="pgPath = originalPlPath">Reset Polygon to a simple polygon</button></li>
					<li>Path: <strong><pre>{{pgPath}}</pre></strong></li>
				</ul>

				<h3>Circle</h3> 
				<ul>
					<li>Visible: <input type="checkbox" number v-model="displayCircle"></li>
					<li>Bounds: <strong><pre>{{circleBounds}}</pre></strong></li>
				</ul>

				<h3>Rectangle</h3> 
				<ul>
					<li>Visible: <input type="checkbox" number v-model="displayRectangle"></li>
					<li>Bounds: <strong><pre>{{rectangleBounds}}</pre></strong></li>
				</ul>

				<h3>PlaceInput</h3> 
				<ul>
					<li><gmap-place-input label="Add a marker at this place " :select-first-on-enter="true" @place_changed="updatePlace($event)"></gmap-place-input></li>
				</ul>

				<h3>Standalone infoWindow</h3> 
				<ul>
					<li>modal 1 : <input type="checkbox" number v-model="ifw"></li>
					<li>modal 2: <input type="checkbox" number v-model="ifw2"> <input type="text" v-model="ifw2text"></li>
				</ul>

				<h3>Markers</h3> 
				<ul>
					<li>Display only markers with even ID (to test filters) <input type="checkbox" number v-model="markersEven"></li>
				</ul>

				<ul class="marker-box" v-if="!markers.length">
					<li>no markers</li>
				</ul>

				<ul v-for="(m, index) in markers" :key="index" class="marker-box">
					<li>lat: <strong>{{m.position.lat}}</strong></li>
					<li>lng: <strong>{{m.position.lng}}</strong></li>
					<li>opacity: <strong>{{m.opacity}}</strong></li>
					<li>enabled: <input type="checkbox" v-model="m.enabled" number></li>
					<li>draggable: <input type="checkbox" v-model="m.draggable" number></li>
					<li>clicked: <strong>{{m.clicked}}</strong></li>
					<li>right: clicked <strong>{{m.rightClicked}}</strong></li>
					<li>drag-ended: <strong>{{m.dragended}}</strong></li>
					<li>open info window: <input type="checkbox" v-model="m.ifw" number></li>
					<li>infoWIndow text: <input type="text" v-model="m.ifw2text"></li>
					<li><button @click="markers.splice(markers.indexOf(m), 1)">delete me</button></li>
				</ul>
			</div>

			<gmap-map 
				:center="center" 
				:zoom="zoom" 
				:map-type-id="mapType" 
				:options="{styles: mapStyles, scrollwheel: scrollwheel, gestureHandling:'cooperative'}" 
				@rightclick="mapRclicked" 
				@drag="drag++" 
				@click="mapClickedCount++" 
				class="map-panel box grow" 
				@zoom_changed="update('zoom', $event)" 
				@center_changed="update('reportedCenter', $event)"
				@maptypeid_changed="update('mapType', $event)"
				@bounds_changed="update('bounds', $event)"
			>
				<gmap-cluster :grid-size="gridSize" v-if="clustering">
					<gmap-marker v-for="m in activeMarkers" :key="m.id" v-if="m.enabled" 
						:position="m.position" 
						:opacity="m.opacity" 
						:draggable="m.draggable" 
						@click="m.clicked++" 
						@rightclick="m.rightClicked++" 
						@dragend="m.dragended++"
						@position_changed="updateChild(m, 'position', $event)" 
					>
						<gmap-info-window :opened="m.ifw">{{m.ifw2text}}</gmap-info-window>
					</gmap-marker>
				</gmap-cluster>
				<div v-if="!clustering">
					<gmap-marker v-for="m in activeMarkers" :key="m.id" v-if="m.enabled"
						:position="m.position" 
						:opacity="m.opacity"
						:draggable="m.draggable" 
						@click="m.clicked++" 
						@rightclick="m.rightClicked++" 
						@dragend="m.dragended++" 
						@position_changed="updateChild(m, 'position', $event)"
					>
						<gmap-info-window :opened="m.ifw">{{m.ifw2text}}</gmap-info-window>
					</gmap-marker>
				</div>

				<gmap-info-window :position="reportedCenter" :opened="ifw">
					To show you the bindings are working
					<br/>I will stay on the center of the screen 
					<br/>whatever you do.<br>
					<br/>Map clicked: <b>{{mapClickedCount}}</b>
				</gmap-info-window>

				<gmap-info-window :position="reportedCenter" :opened="ifw2">{{ifw2text}}</gmap-info-window>

				<gmap-polyline v-if="plvisible" 
					:path="plPath" 
					:editable="pleditable" 
					:draggable="true" 
					:options="{geodesic:true, strokeColor:'#FF0000'}" 
					@path_changed="updatePolylinePath($event)"
				></gmap-polyline>
				<gmap-polygon v-if="pgvisible"
					:paths="pgPath" 
					:editable="true" 
					:options="{geodesic:true, strokeColor:'#FF0000', fillColor:'#000000'}"
					@paths_changed="updatePolygonPaths($event)"
				></gmap-polygon>
				<gmap-circle v-if="displayCircle" 
					:bounds="circleBounds" 
					:center="reportedCenter" 
					:radius="100000" 
					:options="{editable: true}" 
					@radius_changed="updateCircle('radius', $event)" 
					@bounds_changed="updateCircle('bounds', $event)"
				></gmap-circle>
				<gmap-rectangle v-if="displayRectangle" 
					:bounds="rectangleBounds" 
					:options="{editable: true}" 
					@bounds_changed="updateRectangle('bounds', $event)"
				></gmap-rectangle>
			</gmap-map>
		</div>-->

		<h4><a href="https://github.com/xkjyeah/vue-google-maps" target="_blank"><i class="mdi mdi-link-variant"></i> reference</a></h4>	

	</div>
</template>

<script>
import * as VueGoogleMaps from 'vue2-google-maps'

export default {
	name: 'GMapsPage',
	data () {
		return {
			start: null,
			end: null,
			lastId: 1,
			center: {
				lat: 48.8538302,
				lng: 2.2982161
			},
			reportedCenter: {
				lat: 48.8538302,
				lng: 2.2982161
			},
			mapBounds: {},
			clustering: true,
			zoom: 7,
			gridSize: 50,
			mapType: 'terrain',
			markers: [],
			markersEven: false,
			drag: 0,
			mapClickedCount: 0,
			ifw: true,
			ifw2: false,
			ifw2text: 'You can also use the content prop to set your modal',
			mapStyle: 'green',
			circleBounds: {},
			displayCircle: false,
			displayRectangle: false,
			rectangleBounds: {
				north: 33.685,
				south: 50.671,
				east: -70.234,
				west: -116.251
			},
			originalPlPath: [
				{ lat: 37.772, lng: -122.214 }, 
				{ lat: 21.291, lng: -157.821 }, 
				{ lat: -18.142, lng: 178.431 }, 
				{ lat: -27.467, lng: 153.027 }
			],
			plPath: [
				{ lat: 37.772, lng: -122.214 }, 
				{ lat: 21.291, lng: -157.821 }, 
				{ lat: -18.142, lng: 178.431 }, 
				{ lat: -27.467, lng: 153.027 }
			],
			pleditable: true,
			plvisible: false,
			pgvisible: false,
			pgPath: [
				[
					{ lat: 38.872886, lng: -77.054720 },
					{ lat: 38.872602, lng: -77.058046 },
					{ lat: 38.870080, lng: -77.058604 },
					{ lat: 38.868894, lng: -77.055664 },
					{ lat: 38.870598, lng: -77.053346 }
				],
				[
					{ lat: 38.871684, lng: -77.056780 },
					{ lat: 38.871867, lng: -77.055449 },
					{ lat: 38.870915, lng: -77.054891 },
					{ lat: 38.870113, lng: -77.055836 },
					{ lat: 38.870581, lng: -77.057037 }
				]
			],
			opgPath: [
				[
					{ lat: 38.872886, lng: -77.054720 },
					{ lat: 38.872602, lng: -77.058046 },
					{ lat: 38.870080, lng: -77.058604 },
					{ lat: 38.868894, lng: -77.055664 },
					{ lat: 38.870598, lng: -77.053346 }
				],
				[
					{ lat: 38.871684, lng: -77.056780 },
					{ lat: 38.871867, lng: -77.055449 },
					{ lat: 38.870915, lng: -77.054891 },
					{ lat: 38.870113, lng: -77.055836 },
					{ lat: 38.870581, lng: -77.057037 }
				]
			],
			scrollwheel: true
		}
	},
	computed: {
		curvedPath () {
			if (this.start && this.end) {
				return _.range(100).map(i => {
					const tick = i / 99

					/* Bezier curve -- set up the control points */
					const dlat = this.end.latLng.lat() - this.start.latLng.lat()
					const dlng = this.end.latLng.lng() - this.start.latLng.lng()

					const cp1 = {
						lat: this.start.latLng.lat() + 0.33 * dlat + 0.33 * dlng,
						lng: this.start.latLng.lng() - 0.33 * dlat + 0.33 * dlng,
					}

					const cp2 = {
						lat: this.end.latLng.lat() - 0.33 * dlat + 0.33 * dlng,
						lng: this.end.latLng.lng() - 0.33 * dlat - 0.33 * dlng,
					}

					/* Bezier curve formula */
					return {
						lat:
							(tick * tick * tick) * this.start.latLng.lat() +
							3 * ((1 - tick) * tick * tick) * cp1.lat +
							3 * ((1 - tick) * (1 - tick) * tick) * cp2.lat +
							((1 - tick) * (1 - tick) * (1 - tick)) * this.end.latLng.lat(),
						lng:
							(tick * tick * tick) * this.start.latLng.lng() +
							3 * ((1 - tick) * tick * tick) * cp1.lng +
							3 * ((1 - tick) * (1 - tick) * tick) * cp2.lng +
							((1 - tick) * (1 - tick) * (1 - tick)) * this.end.latLng.lng(),
					}
				})
			}
		},
		activeMarkers() {
			if (this.markersEven) {
				return this.markers.filter(
					(v, k) => k % 2 == 0
				)
			} else {
				return this.markers
			}
		},
		mapStyles() {
			switch (this.mapStyle) {
				case 'normal':
					return []
				case 'red':
					return [
						{
							stylers: [
								{ hue: '#890000' },
								{ visibility: 'simplified' },
								{ gamma: 0.5 },
								{ weight: 0.5 }
							]
						},
						{
							elementType: 'labels',
							stylers: [ { visibility: 'off' } ]
						},
						{
							featureType: 'water',
							stylers: [ { color: '#890000' } ]
						}
					];
				default:
					return [
						{
							stylers: [{ hue: '#899999' }, { visibility: 'on' }, { gamma: 0.5 }, { weight: 0.5 }]
						}, 
						{
							featureType: 'road',
							stylers: [{ visibility: 'off' }]
						},
						{
							featureType: 'transit.line',
							stylers: [{ color: '#FF0000' }]
						}, 
						{
							featureType: 'poi',
							elementType: 'labels.icon',
							stylers: [{ visibility: 'on' }, { weight: 10 }]
						},
						{
							featureType: 'water',
							stylers: [{ color: '#8900FF' }, { weight: 9999900000 }, ]
						}
					];
			}
		}
	},
	methods: {
		clicked (e) {
			if (!this.start && !this.end) {
				this.start = {
					latLng: e.latLng
				}
			} else if (this.start && !this.end) {
				this.end = {
					latLng: e.latLng
				}
			} else {
				this.start = {
					latLng: e.latLng
				}
				this.end = null
			}
		},
		mapClicked(mouseArgs) {
			console.log('map clicked', mouseArgs); // eslint-disable-line no-console
		},
		mapRclicked(mouseArgs) {
			const createdMarker = this.addMarker()
			createdMarker.position.lat = mouseArgs.latLng.lat()
			createdMarker.position.lng = mouseArgs.latLng.lng()
		},
		addMarker: function addMarker() {
			this.lastId++;
			this.markers.push({
				id: this.lastId,
				position: { lat: 48.8538302, lng: 2.2982161 },
				opacity: 1,
				draggable: true,
				enabled: true,
				clicked: 0,
				rightClicked: 0,
				dragended: 0,
				ifw: true,
				ifw2text: 'This text is bad please change me :( '
			})
			return this.markers[this.markers.length - 1]
		},
		resetPlPath() {
			this.plPath = this.originalPlPath;
		},
		update(field, event) {
			if (field === 'reportedCenter') {
				// N.B. It is dangerous to update this.center
				// Because the center reported by Google Maps is not exactly
				// the same as the center you pass it.
				// Instead we update this.center only when the input field is changed.
				this.reportedCenter = { lat: event.lat(), lng: event.lng() }
				// If you wish to test the problem out for yourself, uncomment the following
				// and see how your browser begins to hang:
				// this.center = _.clone(this.reportedCenter)
			} else if (field === 'bounds') {
				this.mapBounds = event
			} else {
				this.$set(this, field, event)
			}
		},
		updateChild(object, field, event) {
			if (field === 'position') {
				object.position = { lat: event.lat(), lng: event.lng() }
			}
		},
		updatePolygonPaths(paths) { //eslint-disable-line no-unused-vars
			console.log('updatePolygonPaths', paths)
		},
		updatePolylinePath(paths) { //eslint-disable-line no-unused-vars
			console.log('updatePolylinePath', paths)
		},
		updateCircle(prop, value) {
			if (prop === 'radius') {
				this.radius = value
			} else if (prop === 'bounds') {
				this.circleBounds = value
			}
		},
		updateRectangle(prop, value) {
			if (prop === 'bounds') {
				this.rectangleBounds = value
			}
		},
		updatePlace(place) {
			if (place && place.geometry && place.geometry.location) {
				var marker = this.addMarker()
				marker.position.lat = place.geometry.location.lat()
				marker.position.lng = place.geometry.location.lng()
			}
		}
	},
	components: {
		'ground-overlay': {
			render() {
				return '';
			},
			mixins: [VueGoogleMaps.MapElementMixin],
			props: ['source', 'bounds', 'opacity'],
			deferredReady: function() {
				this.$overlay = new google.maps.GroundOverlay(
					this.source,
					this.bounds
				)
				this.$overlay.setOpacity(this.opacity)
				this.$overlay.setMap(this.$map)
			},
			destroyed: function() {
				if(this.$overlay) this.$overlay.setMap(null)
			}
		}
	}

}
</script>

<style lang="scss" scoped>
@import '../../../assets/scss/_variables';

.page-gmaps {
	.map-app {
		max-height: 500px;

		.settings-panel {
			box-sizing: border-box;
			max-width: 400px;

			ul, li, select, button {
				font-size: 10px;
			}

			h3 {
				margin-bottom: 0px;
			}
			ul {
				margin-top: 15px;
			}
			[type="checkbox"] {
				position: relative;
				top: 2px;
			}
			li {
				margin-bottom: 2px;
			}
			pre {
				max-height: 200px;
				overflow: auto;
			}

			.marker-box {
				background: $background-color;
				padding: 10px;
				box-sizing: border-box;
				list-style: none;

				li, select, button {
					font-size: 14px;
				}
			}
		}
	}
}


@media (max-width: 768px) {
	.page-gmaps {
		.map-app {
			max-height: inherit !important;
			display: block;

			.settings-panel, .map-panel {
				display: block;
				overflow: hidden;
				width: 100%;
				max-width: 100%;
				height: 400px;
			}
			.settings-panel {
				overflow: auto;
			}
		}
	}
}
</style>
<style lang="scss">
.page-gmaps {
	.map-app {

		.settings-panel {

			[type="text"] { 
				background-color: rgba(255, 255, 255, 0.2);
				border: 1px solid rgba(255, 255, 255, 0.3);
			}
		}
	}
}
.gm-style .gm-style-iw {
	color: black;
}
</style>


