
var map
var sightingsLayer;
var heat;

// var map = L.map("map").setView([41.848, -87.665], y);
// googleHybrid = L.tileLayer(
//     "http://{s}.google.com/vt/lyrs=s,h&x={x}&y={y}&z={z}",
//     {
//         maxZoom: 20,
//         subdomains: ["mt0", "mt1", "mt2", "mt3"],
//     },
// ).addTo(map);

function makeMap(latlng, y, maxZoom) {
    map = L.map("map").setView(latlng, y);
    googleHybrid = L.tileLayer(
        "http://{s}.google.com/vt/lyrs=s,h&x={x}&y={y}&z={z}",
        {
            maxZoom: maxZoom,
            subdomains: ["mt0", "mt1", "mt2", "mt3"],
        },
    ).addTo(map);

    sightingsLayer = L.layerGroup().addTo(map);

    heat = L.heatLayer([], { radius: 30, blur: 25, maxZoom: 13 }).addTo(map);
}

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
//
// map.on('click', onMapClick);

var features = [
    {
        latlng: [
            [41.86822305005433, -87.86620586650808],
            [41.868243023974124, -87.86544429383113],
            [41.86781558072845, -87.86540139201868],
            [41.86779960148629, -87.8662005070107],
        ],
        title: "ICE Detention Center",
        type: "poly",
        color: "yellow",
    },
    {
        latlng: [41.86829449423989, -87.86549785313011],
        title: "Broadview protests",
        type: "marker",
        color: "blue",
    },
    {
        latlng: [41.868033871118485, -87.86589144536441],
        title: "National Gaurd at Broadview facility as of 2025-10-09",
        type: "marker",
        color: "orange",
        size: "small",
    },
    {
        latlng: [
            [41.86824655686052, -87.86568003790573],
            [41.86921728178674, -87.86571221703294],
            [41.86924923955836, -87.8633202352448],
            [41.86912939783236, -87.86334168799627],
            [41.86911457988667, -87.86542796807605],
            [41.86825454642625, -87.86544405763965],
        ],
        title: "Broadview protests",
        type: "poly",
        color: "blue",
    },
    {
        latlng: [41.430142111832346, -88.10926291534555],
        title: "National Gaurd Stationed Here",
        type: "marker",
        color: "orange",
    },
    {
        latlng: [42.31200456338277, -87.83465556782477],
        title: "ICE Using Naval Facility",
        type: "marker",
        color: "yellow",
    },
];

function icon(color, type, size) {
    let url = `https://raw.githubusercontent.com/pointhi/leaflet-color-markers/master/img/marker-icon-2x-${color}.png`;
    if (size == "small") {
        url = `https://raw.githubusercontent.com/pointhi/leaflet-color-markers/master/img/marker-icon-${color}.png`;
    }
    let shadow = `https://cdnjs.cloudflare.com/ajax/libs/leaflet/0.7.7/images/marker-shadow.png`;
    if (type == "heli") {
        url = "./assets/heli.svg";
        shadow = "./assets/heli-shadow.svg"
    }

    if (size == "small") {
        return new L.Icon({
            iconUrl: url,
            shadowUrl: shadow,
            iconSize: [18.75, 30.75],
            iconAnchor: [12, 30.75],
            popupAnchor: [1, -34],
            shadowSize: [30.75, 30.75],
        });
    }
    return new L.Icon({
        iconUrl: url,
        shadowUrl: shadow,
        iconSize: [25, 41],
        iconAnchor: [12, 41],
        popupAnchor: [1, -34],
        shadowSize: [41, 41],
    });
}

function renderDefaultFeatures() {
    for (let i = 0; i < features.length; i++) {
        let feature = features[i];
        let type = feature["type"];
        let title = feature["title"];
        let latlng = feature["latlng"];
        if (type == "poly") {
            let f = L.polygon(latlng, { color: feature["color"] }).addTo(map);
            f.bindPopup(title);
        }
        if (type == "marker") {
            if (feature["size"] == "small") {
                let f = L.marker(latlng, {
                    icon: icon(feature["color"], null, "small"),
                    opacity: 0.75,
                }).addTo(map);
                f.bindPopup(title);
            } else {
                let f = L.marker(latlng, {
                    icon: icon(feature["color"], null, "large"),
                }).addTo(map);
                f.bindPopup(title);
            }
        }
    }
}


var markers = [];

function isSameDay(a, b) {
    return (
        a.getFullYear() === b.getFullYear() &&
        a.getMonth() === b.getMonth() &&
        a.getDate() === b.getDate()
    );
}

function renderFeature(sighting, size) {
    let color = "red";
    if (sighting.type == "protest") {
        color = "blue";
    } else if (sighting.type == "unconfirmend") {
        color = "grey";
    }

    if (sighting.type == "poly") {
        color = "blue";
        let f = L.polygon(sighting.latlng, { color: color }).addTo(map);
        f.bindPopup(sighting.title);
        markers.push(f);
        return;
    }

    let opacity = 1;
    if (size == "small") {
        opacity = 0.6;
    }

    let f = L.marker(sighting.latlng, { icon: icon(color, sighting.type, size), opacity }).addTo(map);
    f.bindPopup(sighting.title);
    markers.push(f);
}

function renderFeaturesDay(data, day, feature) {
    day = day.toISOString().split("T")[0]
    let features = data[feature][day];
    if (features == undefined) {
        return
    }
    for (let i = 0; i < features.length; i++) {
        let feature = features[i]
        renderFeature(feature, "large")
    }
}

function renderFeaturesAll(data, feature, focusAll) {
    let features = data[feature];
    let today = new Date();
    for (let d = 0; d < Object.keys(features).length; d++) {
        let key = Object.keys(features)[d];
        let day = new Date(key + "T12:00:00");

        let size = "small";
        if (isSameDay(day, today) || focusAll) {
            size = "large"
        }
        for (let i = 0; i < features[key].length; i++) {
            let feature = features[key][i]
            renderFeature(feature, size)
        }
    }
}

function resetSightings() {
    for (let i = 0; i < markers.length; i++) {
        map.removeLayer(markers[i]);
    }
    markers = [];
}


function renderHeatmapDay(data, day, feature) {
    day = day.toISOString().split("T")[0]
    let features = data[feature][day];
    if (features == undefined) {
        return
    }
    for (let i = 0; i < features.length; i++) {
        let feature = features[i]
        if (feature.type == "poly") {
            continue;
        }
        heat.addLatLng([feature.latlng[0], feature.latlng[1], 1]);
    }
}

function renderHeatmapAll(data, feature) {
    let features = data[feature];
    for (let d = 0; d < Object.keys(features).length; d++) {
        let key = Object.keys(features)[d];

        for (let i = 0; i < features[key].length; i++) {
            let feature = features[key][i]
            if (feature.type == "poly") {
                continue;
            }
            heat.addLatLng([feature.latlng[0], feature.latlng[1], 1]);
        }
    }
}

function resetHeatmap() {
    heat.setLatLngs([]);
}
