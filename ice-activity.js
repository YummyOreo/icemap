window.mobileCheck = function() {
	let check = false;
	(function(a) { if (/(android|bb\d+|meego).+mobile|avantgo|bada\/|blackberry|blazer|compal|elaine|fennec|hiptop|iemobile|ip(hone|od)|iris|kindle|lge |maemo|midp|mmp|mobile.+firefox|netfront|opera m(ob|in)i|palm( os)?|phone|p(ixi|re)\/|plucker|pocket|psp|series(4|6)0|symbian|treo|up\.(browser|link)|vodafone|wap|windows ce|xda|xiino/i.test(a) || /1207|6310|6590|3gso|4thp|50[1-6]i|770s|802s|a wa|abac|ac(er|oo|s\-)|ai(ko|rn)|al(av|ca|co)|amoi|an(ex|ny|yw)|aptu|ar(ch|go)|as(te|us)|attw|au(di|\-m|r |s )|avan|be(ck|ll|nq)|bi(lb|rd)|bl(ac|az)|br(e|v)w|bumb|bw\-(n|u)|c55\/|capi|ccwa|cdm\-|cell|chtm|cldc|cmd\-|co(mp|nd)|craw|da(it|ll|ng)|dbte|dc\-s|devi|dica|dmob|do(c|p)o|ds(12|\-d)|el(49|ai)|em(l2|ul)|er(ic|k0)|esl8|ez([4-7]0|os|wa|ze)|fetc|fly(\-|_)|g1 u|g560|gene|gf\-5|g\-mo|go(\.w|od)|gr(ad|un)|haie|hcit|hd\-(m|p|t)|hei\-|hi(pt|ta)|hp( i|ip)|hs\-c|ht(c(\-| |_|a|g|p|s|t)|tp)|hu(aw|tc)|i\-(20|go|ma)|i230|iac( |\-|\/)|ibro|idea|ig01|ikom|im1k|inno|ipaq|iris|ja(t|v)a|jbro|jemu|jigs|kddi|keji|kgt( |\/)|klon|kpt |kwc\-|kyo(c|k)|le(no|xi)|lg( g|\/(k|l|u)|50|54|\-[a-w])|libw|lynx|m1\-w|m3ga|m50\/|ma(te|ui|xo)|mc(01|21|ca)|m\-cr|me(rc|ri)|mi(o8|oa|ts)|mmef|mo(01|02|bi|de|do|t(\-| |o|v)|zz)|mt(50|p1|v )|mwbp|mywa|n10[0-2]|n20[2-3]|n30(0|2)|n50(0|2|5)|n7(0(0|1)|10)|ne((c|m)\-|on|tf|wf|wg|wt)|nok(6|i)|nzph|o2im|op(ti|wv)|oran|owg1|p800|pan(a|d|t)|pdxg|pg(13|\-([1-8]|c))|phil|pire|pl(ay|uc)|pn\-2|po(ck|rt|se)|prox|psio|pt\-g|qa\-a|qc(07|12|21|32|60|\-[2-7]|i\-)|qtek|r380|r600|raks|rim9|ro(ve|zo)|s55\/|sa(ge|ma|mm|ms|ny|va)|sc(01|h\-|oo|p\-)|sdk\/|se(c(\-|0|1)|47|mc|nd|ri)|sgh\-|shar|sie(\-|m)|sk\-0|sl(45|id)|sm(al|ar|b3|it|t5)|so(ft|ny)|sp(01|h\-|v\-|v )|sy(01|mb)|t2(18|50)|t6(00|10|18)|ta(gt|lk)|tcl\-|tdg\-|tel(i|m)|tim\-|t\-mo|to(pl|sh)|ts(70|m\-|m3|m5)|tx\-9|up(\.b|g1|si)|utst|v400|v750|veri|vi(rg|te)|vk(40|5[0-3]|\-v)|vm40|voda|vulc|vx(52|53|60|61|70|80|81|83|85|98)|w3c(\-| )|webc|whit|wi(g |nc|nw)|wmlb|wonu|x700|yas\-|your|zeto|zte\-/i.test(a.substr(0, 4))) check = true; })(navigator.userAgent || navigator.vendor || window.opera);
	return check;
};

let y = 11;

if (window.mobileCheck()) {
	y = 10
}

var map = L.map('map').setView([41.8480, -87.6650], y);
googleHybrid = L.tileLayer('http://{s}.google.com/vt/lyrs=s,h&x={x}&y={y}&z={z}', {
	maxZoom: 20,
	subdomains: ['mt0', 'mt1', 'mt2', 'mt3']
}).addTo(map);

// var popup = L.popup();
//
// let polygon = []
//
// var p = L.polygon(polygon).addTo(map);
//
// function onMapClick(e) {
// 	polygon.push(e.latlng)
// 	console.log(polygon)
// 	p.setLatLngs(polygon)
// 	// popup
// 	// 	.setLatLng(e.latlng)
// 	// 	.setContent("You clicked the map at " + e.latlng.toString())
// 	// 	.openOn(map);
//
// }

var features = [{
	"latlng": [
		[41.86822305005433, -87.86620586650808],
		[41.868243023974124, -87.86544429383113],
		[41.86781558072845, -87.86540139201868],
		[41.86779960148629, -87.8662005070107],
	],
	"title": "ICE Detention Center",
	"type": "poly",
	"color": "yellow",

},
{
	"latlng": [41.86829449423989, -87.86549785313011],
	"title": "Broadview protests",
	"type": "marker",
	"color": "blue"
},
{
	"latlng": [41.868033871118485, -87.86589144536441],
	"title": "National Gaurd at Broadview facility as of 2025-10-09",
	"type": "marker",
	"color": "orange",
	"size": "small"
},
{
	"latlng": [
		[41.86824655686052, -87.86568003790573],
		[41.86921728178674, -87.86571221703294],
		[41.86924923955836, -87.8633202352448],
		[41.86912939783236, -87.86334168799627],
		[41.86911457988667, -87.86542796807605],
		[41.86825454642625, -87.86544405763965],
	],
	"title": "Broadview protests",
	"type": "poly",
	"color": "blue",
},
{
	"latlng": [41.7602604, -87.5573108],
	"title": "South Shore Helicopter Raid",
	"type": "marker",
	"color": "red",
	"size": "small"
},
{
	"latlng": [
		[41.82207417176527, -87.70439913091305],
		[41.82205018575847, -87.70460293205197],
		[41.82081889200704, -87.70455466336117],
		[41.82080689876964, -87.7043776781616],
	],
	"title": "September 4th protests - Feds",
	"type": "poly",
	"color": "yellow"
},
{
	"latlng": [
		[41.82081489426148, -87.70455740707838],
		[41.82069496177907, -87.70455204389052],
		[41.82068696627224, -87.70435896912736],
		[41.82079890327681, -87.7043696955031],
	],
	"title": "September 4th protests - Protesters",
	"type": "poly",
	"color": "blue"
},
{
	"latlng": [
		[41.82205618226101, -87.70459497461181],
		[41.8220821670989, -87.70440994463043],
		[41.822274054805895, -87.7044474869455],
		[41.82246794075915, -87.70438849187899],
		[41.822469939580344, -87.70457620345427],
		[41.82231603016513, -87.70461106417538],
	],
	"title": "September 4th protests - Protesters",
	"type": "poly",
	"color": "blue"
},
{
	"latlng": [41.821310612805824, -87.70450126029301],
	"title": "September 4th protests",
	"type": "marker",
	"color": "blue"
},
{

	"latlng": [41.91732182146367, -87.71675614487668],
	"title": "ICE Sighting 2025-10-06 12:10pm",
	"type": "marker",
	"color": "red",
	"size": "small"
},
{

	"latlng": [41.87828233024169, -87.78684051696536],
	"title": "ICE Sighting 2025-10-06 11:15am",
	"type": "marker",
	"color": "red",
	"size": "small"
},
{
	"latlng": [41.615864649059525, -87.85958772097479],
	"title": "ICE Sighting 2025-10-06 1pm",
	"type": "marker",
	"color": "red",
	"size": "small"
},
{
	"latlng": [41.84715380569649, -87.77854204125124],
	"title": "ICE Sighting & Possible Arrests 2025-10-07",
	"type": "marker",
	"color": "red",
	"size": "small"
},
{
	"latlng": [41.84705227446955, -87.78344689785419],
	"title": "ICE Sighting & Possible Arrests 2025-10-07",
	"type": "marker",
	"color": "red",
	"size": "small"
},
{
	"latlng": [41.837078341531395, -87.7145724745194],
	"title": "ICE Sighting & Possible Arrests 2025-10-07",
	"type": "marker",
	"color": "red",
	"size": "small"
},
{
	"latlng": [41.75822759448448, -87.7323247580811],
	"title": "ICE Sighting & Possible Arrests 2025-10-07",
	"type": "marker",
	"color": "red",
	"size": "small"
},
{
	"latlng": [41.7209536910353, -87.70217760345575],
	"title": "ICE Sighting & Possible Arrests 2025-10-07",
	"type": "marker",
	"color": "red",
	"size": "small"
},
{
	"latlng": [41.744909612220994, -87.76814014174018],
	"title": "ICE Sighting & Possible Arrests 2025-10-07",
	"type": "marker",
	"color": "red",
	"size": "small"
},
{
	"latlng": [41.70585523110536, -87.77937403414694],
	"title": "ICE Sighting & Possible Arrests 2025-10-07",
	"type": "marker",
	"color": "red",
	"size": "small"
},
{
	"latlng": [41.430142111832346, -88.10926291534555],
	"title": "National Gaurd Stationed Here",
	"type": "marker",
	"color": "orange",
},
{
	"latlng": [41.808527258531285, -87.68441628769672],
	"title": "ICE Sighting & Arrests 2025-10-07 - 4pm",
	"type": "marker",
	"color": "red",
	"size": "small"
},
{
	"latlng": [41.793163983733024, -87.72807346874357],
	"title": "ICE Sighting 2025-10-07 - 4pm",
	"type": "marker",
	"color": "red",
	"size": "small"
},
//
{
	"latlng": [41.67925609755027, -87.5025741449531],
	"title": "ICE Sighting & Arrest 2025-10-08 - 8:15am",
	"type": "marker",
	"color": "red",
	"size": "small"
},
{
	"latlng": [41.83689216248008, -87.72435505029904],
	"title": "ICE Sighting 2025-10-08 - 9:40am",
	"type": "marker",
	"color": "red",
	"size": "small"
},
{
	"latlng": [41.93917797624229, -87.72385731338971],
	"title": "ICE Sighting and Arrests 2025-10-08 - 8:45am",
	"type": "marker",
	"color": "red",
	"size": "small"
},
{
	"latlng": [41.67797903781519, -87.48791891635453],
	"title": "ICE Sighting & Arrests 2025-10-08 - 8:40am",
	"type": "marker",
	"color": "red",
	"size": "small"
},
{
	"latlng": [41.60933270110274, -88.14010884830824],
	"title": "ICE Sighting and Arrest 2025-10-08 - 8:02am",
	"type": "marker",
	"color": "red",
	"size": "small"
},
{
	"latlng": [41.84795261420471, -87.72220789153262],
	"title": "ICE Sighting 2025-10-08 - 10:55am",
	"type": "marker",
	"color": "red",
	"size": "small"
},
{
	"latlng": [41.78142132619188, -87.7203868996591],
	"title": "ICE Sighting 2025-10-08 - 1:30pm",
	"type": "marker",
	"color": "red",
	"size": "small"
},
{
	"latlng": [41.83018108220738, -87.69130437954416],
	"title": "ICE Sighting 2025-10-08 - 1:30pm",
	"type": "marker",
	"color": "red",
	"size": "small"
},
{
	"latlng": [41.86548854877734, -87.78373115832092],
	"title": "ICE Sighting & Arrests 2025-10-08 - 1pm",
	"type": "marker",
	"color": "red",
	"size": "small"
},
{
	"latlng": [41.865550661608474, -87.76924232159232],
	"title": "ICE Sighting 2025-10-08 - 12:30pm",
	"type": "marker",
	"color": "red",
	"size": "small"
},
{
	"latlng": [41.77605829496208, -87.71533176108983],
	"title": "ICE Sighting, Home Invasion, & Arrest 2025-10-08 - 7:30pm",
	"type": "marker",
	"color": "red",
	"size": "small"
},
//
{
	"latlng": [41.81401933514338, -87.66877008098797],
	"title": "ICE Sighting & Arrest 2025-10-09 - 7:30am",
	"type": "marker",
	"color": "red",
},
{
	"latlng": [41.81091752406796, -87.67614011672423],
	"title": "ICE Sighting 2025-10-09 - 8am",
	"type": "marker",
	"color": "red"
},
{
	"latlng": [41.83091411182272, -87.74626856097042],
	"title": "ICE Sighting 2025-10-09 - 8:20am",
	"type": "marker",
	"color": "red",
},
{
	"latlng": [41.99632743709588, -87.71357975002236],
	"title": "ICE Sighting & Arrest 2025-10-09 - ~8:30am",
	"type": "marker",
	"color": "red",
},
{
	"latlng": [41.79774908088916, -87.65983227589265],
	"title": "ICE Sighting & Arrest 2025-10-09 - 9am",
	"type": "marker",
	"color": "red",
},
{
	"latlng": [41.77779709847897, -88.2817605371943],
	"title": "ICE Sighting 2025-10-09 - 8am",
	"type": "marker",
	"color": "red",
},
{
	"latlng": [41.78219307026216, -88.3773389736608],
	"title": "ICE Sighting 2025-10-09 - 8–9am",
	"type": "marker",
	"color": "red",
},
]

function icon(color) {
	return new L.Icon({
		iconUrl: `https://raw.githubusercontent.com/pointhi/leaflet-color-markers/master/img/marker-icon-2x-${color}.png`,
		shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/0.7.7/images/marker-shadow.png',
		iconSize: [25, 41],
		iconAnchor: [12, 41],
		popupAnchor: [1, -34],
		shadowSize: [41, 41]
	});
}

function smallIcon(color) {
	return new L.Icon({
		iconUrl: `https://raw.githubusercontent.com/pointhi/leaflet-color-markers/master/img/marker-icon-${color}.png`,
		shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/0.7.7/images/marker-shadow.png',
		iconSize: [18.75, 30.75],
		iconAnchor: [12, 30.75],
		popupAnchor: [1, -34],
		shadowSize: [30.75, 30.75]
	});
}

for (let i = 0; i < features.length; i++) {
	let feature = features[i];
	let type = feature["type"];
	let title = feature["title"];
	let latlng = feature["latlng"]
	if (type == "poly") {
		let f = L.polygon(latlng, { "color": feature["color"] }).addTo(map);
		f.bindPopup(title)
	}
	if (type == "marker") {
		if (feature["size"] == "small") {
			let f = L.marker(latlng, { "icon": smallIcon(feature["color"]), "opacity": 0.75 }).addTo(map);
			f.bindPopup(title)
		} else {
			let f = L.marker(latlng, { "icon": icon(feature["color"]) }).addTo(map);
			f.bindPopup(title)
		}
	}
}

map.on('click', onMapClick);
