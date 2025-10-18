window.mobileCheck = function () {
    let check = false;
    (function (a) { if (/(android|bb\d+|meego).+mobile|avantgo|bada\/|blackberry|blazer|compal|elaine|fennec|hiptop|iemobile|ip(hone|od)|iris|kindle|lge |maemo|midp|mmp|mobile.+firefox|netfront|opera m(ob|in)i|palm( os)?|phone|p(ixi|re)\/|plucker|pocket|psp|series(4|6)0|symbian|treo|up\.(browser|link)|vodafone|wap|windows ce|xda|xiino/i.test(a) || /1207|6310|6590|3gso|4thp|50[1-6]i|770s|802s|a wa|abac|ac(er|oo|s\-)|ai(ko|rn)|al(av|ca|co)|amoi|an(ex|ny|yw)|aptu|ar(ch|go)|as(te|us)|attw|au(di|\-m|r |s )|avan|be(ck|ll|nq)|bi(lb|rd)|bl(ac|az)|br(e|v)w|bumb|bw\-(n|u)|c55\/|capi|ccwa|cdm\-|cell|chtm|cldc|cmd\-|co(mp|nd)|craw|da(it|ll|ng)|dbte|dc\-s|devi|dica|dmob|do(c|p)o|ds(12|\-d)|el(49|ai)|em(l2|ul)|er(ic|k0)|esl8|ez([4-7]0|os|wa|ze)|fetc|fly(\-|_)|g1 u|g560|gene|gf\-5|g\-mo|go(\.w|od)|gr(ad|un)|haie|hcit|hd\-(m|p|t)|hei\-|hi(pt|ta)|hp( i|ip)|hs\-c|ht(c(\-| |_|a|g|p|s|t)|tp)|hu(aw|tc)|i\-(20|go|ma)|i230|iac( |\-|\/)|ibro|idea|ig01|ikom|im1k|inno|ipaq|iris|ja(t|v)a|jbro|jemu|jigs|kddi|keji|kgt( |\/)|klon|kpt |kwc\-|kyo(c|k)|le(no|xi)|lg( g|\/(k|l|u)|50|54|\-[a-w])|libw|lynx|m1\-w|m3ga|m50\/|ma(te|ui|xo)|mc(01|21|ca)|m\-cr|me(rc|ri)|mi(o8|oa|ts)|mmef|mo(01|02|bi|de|do|t(\-| |o|v)|zz)|mt(50|p1|v )|mwbp|mywa|n10[0-2]|n20[2-3]|n30(0|2)|n50(0|2|5)|n7(0(0|1)|10)|ne((c|m)\-|on|tf|wf|wg|wt)|nok(6|i)|nzph|o2im|op(ti|wv)|oran|owg1|p800|pan(a|d|t)|pdxg|pg(13|\-([1-8]|c))|phil|pire|pl(ay|uc)|pn\-2|po(ck|rt|se)|prox|psio|pt\-g|qa\-a|qc(07|12|21|32|60|\-[2-7]|i\-)|qtek|r380|r600|raks|rim9|ro(ve|zo)|s55\/|sa(ge|ma|mm|ms|ny|va)|sc(01|h\-|oo|p\-)|sdk\/|se(c(\-|0|1)|47|mc|nd|ri)|sgh\-|shar|sie(\-|m)|sk\-0|sl(45|id)|sm(al|ar|b3|it|t5)|so(ft|ny)|sp(01|h\-|v\-|v )|sy(01|mb)|t2(18|50)|t6(00|10|18)|ta(gt|lk)|tcl\-|tdg\-|tel(i|m)|tim\-|t\-mo|to(pl|sh)|ts(70|m\-|m3|m5)|tx\-9|up(\.b|g1|si)|utst|v400|v750|veri|vi(rg|te)|vk(40|5[0-3]|\-v)|vm40|voda|vulc|vx(52|53|60|61|70|80|81|83|85|98)|w3c(\-| )|webc|whit|wi(g |nc|nw)|wmlb|wonu|x700|yas\-|your|zeto|zte\-/i.test(a.substr(0, 4))) check = true; })(navigator.userAgent || navigator.vendor || window.opera);
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
//
// map.on('click', onMapClick);

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
    "latlng": [41.430142111832346, -88.10926291534555],
    "title": "National Gaurd Stationed Here",
    "type": "marker",
    "color": "orange",
},
{
    "latlng": [42.31200456338277, -87.83465556782477],
    "title": "ICE Using Naval Facility",
    "type": "marker",
    "color": "yellow"
}
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

function renderDefaultFeatures() {
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
}

let dateSelector = document.getElementById("date");
let filterDate = new Date(dateSelector.value + "T12:00:00");
dateSelector.setAttribute("max", new Date().toISOString().split("T")[0]);
dateSelector.setAttribute("min", "2025-10-06");
if (filterDate.toString() == "Invalid Date") {
    filterDate = null;
}

var sightingsLayer = L.layerGroup().addTo(map);

var markers = [];

function isSameDay(a, b) {
    return (
        a.getFullYear() === b.getFullYear() &&
        a.getMonth() === b.getMonth() &&
        a.getDate() === b.getDate()
    );
}

function renderSightings(data) {
    for (let i = 0; i < data.length; i++) {
        sighting = data[i]
        let date = new Date(sighting.date + "T12:00:00");

        if (filterDate != null) {
            if (!isSameDay(date, filterDate)) {
                continue;
            }
        }

        let color = "red"
        if (sighting.type == "protest") {
            color = "blue"
        }

        if (sighting.type == "poly") {
            color = "blue"
            let f = L.polygon(sighting.latlng, { "color": color }).addTo(map);
            f.bindPopup(sighting.title)
            continue;
        }

        if (isSameDay(date, new Date())) {
            let f = L.marker(sighting.latlng, { "icon": icon(color) }).addTo(map);
            f.bindPopup(sighting.title)
            markers.push(f)
        } else {
            let f = L.marker(sighting.latlng, { "icon": smallIcon(color), "opacity": 0.75 }).addTo(map);
            f.bindPopup(sighting.title)
            markers.push(f)
        }
    }
}

function resetSightings() {
    for (let i = 0; i < markers.length; i++) {
        map.removeLayer(markers[i]);
    }
    markers = []
}

var heat = L.heatLayer([], { radius: 30, blur: 25, maxZoom: 13 }).addTo(map);
function renderHeatmap(data) {
    for (let i = 0; i < data.length; i++) {
        sighting = data[i]
        let date = new Date(sighting.date + "T12:00:00");

        if (filterDate != null) {
            if (!isSameDay(date, filterDate)) {
                continue;
            }
        }

        if (sighting.type == "protest" || sighting.type == "poly") {
            continue;
        }

        heat.addLatLng([sighting.latlng[0], sighting.latlng[1], 1])
    }
}

function resetHeatmap() {
    heat.setLatLngs([])
}

renderDefaultFeatures();

let timelineButton = document.getElementById("timeline-play")
let timelineButtonImage = document.querySelector("#timeline-play img")
let timelineCurrentDay = document.getElementById("timeline-day")
let heatmapButton = document.getElementById("heatmap");

let timelineTimeout = null;

function playTimelineFrom(date, data) {
    let today = new Date();
    today.setHours(12);
    if (date > today) {
        timelineButton.classList.add("button-subtle");
        timelineButtonImage.src = "./assets/play.svg";
        filterDate = null;
        if (!heatmapButton.classList.contains("button-subtle")) {
            renderHeatmap(data)
        }
        renderSightings(data)
        timelineCurrentDay.innerHTML = "";
        dateSelector.value = null;
        return;
    }
    filterDate = date;
    resetHeatmap();
    resetSightings()
    renderSightings(data)
    timelineCurrentDay.innerHTML = date.toISOString().split("T")[0];
    if (!heatmapButton.classList.contains("button-subtle")) {
        renderHeatmap(data)
    }
    timelineTimeout = setTimeout(() => {
        date.setDate(date.getDate() + 1);
        playTimelineFrom(date, data)
    }, "1000")
}

fetch('sightings.json')
    .then(response => response.json()) // Parse JSON
    .then(data => {
        renderSightings(data)
        heatmapButton.onclick = () => {
            if (heatmapButton.classList.contains("button-subtle")) {
                heatmapButton.classList.remove("button-subtle");
                renderHeatmap(data)
            } else {
                heatmapButton.classList.add("button-subtle");
                resetHeatmap()
            }
        }

        dateSelector.addEventListener("change", () => {
            filterDate = new Date(dateSelector.value + "T12:00:00");

            if (filterDate.toString() == "Invalid Date") {
                filterDate = null;
            }
            resetSightings()
            renderSightings(data)
            if (!heatmapButton.classList.contains("button-subtle")) {
                resetHeatmap()
                renderHeatmap(data)
            }
        })

        timelineButton.addEventListener("click", (_) => {
            if (timelineButton.classList.contains("button-subtle")) {
                timelineButton.classList.remove("button-subtle");
                timelineButtonImage.src = "./assets/pause.svg";
                let date = new Date("2025-10-06T12:00:00");
                if (filterDate != null) {
                    date = filterDate
                }
                playTimelineFrom(new Date(date), data)
            } else {
                timelineButtonImage.src = "./assets/play.svg";
                timelineButton.classList.add("button-subtle");
                clearTimeout(timelineTimeout);
            }
        })
        // renderHeatmap(data)
    }) // Work with JSON data
    .catch(error => console.error('Error fetching JSON:', error));

// other shit
let headers = document.getElementsByTagName("h3");

for (index in headers) {
    let header = headers[index];
    header.id = header.innerText.toLocaleLowerCase()
}
