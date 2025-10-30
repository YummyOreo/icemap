let mobile = window.screen.width <= 992;

/* filters */

let activateButton = document.getElementById("filter-activate");
let activeButtonInner = document.querySelector("#filter-activate span");

let filter = document.querySelector(".wrapper-filter menu");
let focused = null;
let buttons = document.querySelectorAll(".wrapper-filter menu button");

let wrapper = document.querySelector(".wrapper-filter");

let menuActive = false;

let activeFilter = "all";

function toggleMenu() {
    filter.classList.toggle("active");
    activateButton.classList.toggle("active");
    if (!menuActive) {
        focused = 0;
        if (!mobile) {
            buttons[0].focus();
        }
        menuActive = true;
    } else {
        menuActive = false;
    }
}

activateButton.onclick = () => {
    toggleMenu();
};

wrapper.addEventListener("keydown", (e) => {
    if (e.key === "Enter" || e.key === " ") {
        // Space or Enter key
        toggleMenu();
        return;
    }
    if (e.key == "ArrowDown") {
        e.preventDefault(); // Prevent the default action to stop scrolling when pressing Space
        focused++;
        if (focused == buttons.length) {
            focused = 0;
        }
        if (!mobile) {
            buttons[focused].focus();
        }
    }
    if (e.key == "ArrowUp") {
        e.preventDefault(); // Prevent the default action to stop scrolling when pressing Space
        focused--;
        if (focused == -1) {
            focused = buttons.length - 1;
        }
        if (!mobile) {
            buttons[focused].focus();
        }
    }

    if (e.key == "Tab") {
        toggleMenu();
    }
});

window.addEventListener("click", (event) => {
    if (!menuActive) {
        return;
    }
    if (!event.target.matches(".wrapper-filter *")) {
        toggleMenu();
    }
});

/* map */

let y = 11;

if (mobile) {
    y = 10;
}

var map = L.map("map").setView([41.848, -87.665], y);
googleHybrid = L.tileLayer(
    "http://{s}.google.com/vt/lyrs=s,h&x={x}&y={y}&z={z}",
    {
        maxZoom: 20,
        subdomains: ["mt0", "mt1", "mt2", "mt3"],
    },
).addTo(map);

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

function renderFeaturesAll(data, feature) {
    let features = data[feature];
    let today = new Date();
    for (let d = 0; d < Object.keys(features).length; d++) {
        let key = Object.keys(features)[d];
        let day = new Date(key + "T12:00:00");

        let size = "small";
        if (isSameDay(day, today)) {
            size = "large"
        }
        for (let i = 0; i < features[key].length; i++) {
            let feature = features[key][i]
            renderFeature(feature, size)
        }
    }
}

function renderFeatures(data) {
    if (filterDate != null) {
        if (activeFilter == "all" || activeFilter == "sightings") {
            renderFeaturesDay(data, filterDate, "sightings");
        }
        if (activeFilter == "all" || activeFilter == "protests") {
            renderFeaturesDay(data, filterDate, "protests");
        }
        if (activeFilter == "all" || activeFilter == "helicopters") {
            renderFeaturesDay(data, filterDate, "helis");
        }
        if (activeFilter == "all") {
            renderFeaturesDay(data, filterDate, "other");
        }
    } else {
        if (activeFilter == "all" || activeFilter == "sightings") {
            renderFeaturesAll(data, "sightings");
        }
        if (activeFilter == "all" || activeFilter == "protests") {
            renderFeaturesAll(data, "protests");
        }
        if (activeFilter == "all" || activeFilter == "helicopters") {
            renderFeaturesAll(data, "helis");
        }
        if (activeFilter == "all") {
            renderFeaturesAll(data, "other");
        }
    }
}

function resetSightings() {
    for (let i = 0; i < markers.length; i++) {
        map.removeLayer(markers[i]);
    }
    markers = [];
}

var heat = L.heatLayer([], { radius: 30, blur: 25, maxZoom: 13 }).addTo(map);

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

function renderHeatmap(data) {
    if (filterDate != null) {
        if (activeFilter == "all") {
            renderHeatmapDay(data, filterDate, "sightings");
        } else {
            if (activeFilter == "sightings") {
                renderHeatmapDay(data, filterDate, "sightings");
            }
            if (activeFilter == "protests") {
                renderHeatmapDay(data, filterDate, "protests");
            }
            if (activeFilter == "helicopters") {
                renderHeatmapDay(data, filterDate, "helis");
            }
        }
    } else {
        if (activeFilter == "all") {
            renderHeatmapAll(data, "sightings");
        } else {
            if (activeFilter == "sightings") {
                renderHeatmapAll(data, "sightings");
            }
            if (activeFilter == "protests") {
                renderHeatmapAll(data, "protests");
            }
            if (activeFilter == "helicopters") {
                renderHeatmapAll(data, "helis");
            }
        }
    }

}

function resetHeatmap() {
    heat.setLatLngs([]);
}

renderDefaultFeatures();

let heatmapButton = document.getElementById("heatmap");

Array.prototype.insert = function (index, ...items) {
    this.splice(index, 0, ...items);
};

function buildPiece(entry, builtData) {
    let entryBuilt = {}
    entryBuilt.latlng = entry.latlng;
    entryBuilt.title = entry.title;
    let date = new Date(entry.date);
    if (entry.time != null) {
        if (!entry.time.includes(":")) {
            if (entry.time.endsWith("pm")) {
                let halfs = entry.time.split("p");
                entry.time = `${halfs[0]}:00pm`;
            } else {
                let halfs = entry.time.split("a");
                entry.time = `${halfs[0]}:00am`;
            }
        }
        date = new Date(`${entry.date}, ${entry.time}`)
        entryBuilt.date = date;
        entryBuilt.time = true;
    } else {
        entryBuilt.date = date;
        entryBuilt.time = false;
    }

    let section = ""
    if (entry.type == null || entry.type == "unconfirmend") {
        section = "sightings"
        if (entry.type == null) {
            entryBuilt.type = "sighting"
        } else {
            entryBuilt.type = entry.type
        }
    } else if (entry.type == "protest" || entry.type == "poly") {
        section = "protests"
        entryBuilt.type = entry.type
    }
    else if (entry.type == "heli") {
        section = "helis"
        entryBuilt.type = entry.type
    } else {
        section = "other"
        entryBuilt.type = entry.type
    }

    if (builtData[section][entry.date] == null) {
        builtData[section][entry.date] = [entryBuilt]
    } else {
        let inserted = false;
        for (let x = 0; x < builtData[section][entry.date].length; x++) {
            let e = builtData[section][entry.date][x];
            if (!e.time || (entryBuilt.time && e.date > entryBuilt.date)) {
                builtData[section][entry.date].insert(x, entryBuilt);
                inserted = true;
                break;
            }
        }
        if (!inserted) {
            builtData[section][entry.date].push(entryBuilt)
        }
    }
}

function buildData(data) {
    let builtData = { "sightings": {}, "protests": {}, helis: {}, other: {} };
    for (let i = 0; i < data.length; i++) {
        let entry = data[i];
        buildPiece(entry, builtData)
    }
    console.log(builtData)
    return builtData;
}

fetch("sightings.json")
    .then((response) => response.json()) // Parse JSON
    .then((data) => {
        let builtData = buildData(data)
        renderFeatures(builtData);
        heatmapButton.onclick = () => {
            if (heatmapButton.classList.contains("button-subtle")) {
                heatmapButton.classList.remove("button-subtle");
                renderHeatmap(builtData);
            } else {
                heatmapButton.classList.add("button-subtle");
                resetHeatmap();
            }
        };

        dateSelector.addEventListener("change", () => {
            filterDate = new Date(dateSelector.value + "T12:00:00");

            if (filterDate.toString() == "Invalid Date") {
                filterDate = null;
            }
            resetSightings();
            renderFeatures(builtData);
            if (!heatmapButton.classList.contains("button-subtle")) {
                resetHeatmap();
                renderHeatmap(builtData);
            }
        });

        for (let i = 0; i < buttons.length; i++) {
            let button = buttons[i];
            button.addEventListener("click", (e) => {
                if (activeFilter != "all") {
                    document
                        .getElementById(activeFilter)
                        .classList.remove("active");
                }
                if (activeFilter == button.id) {
                    activeFilter = "all";
                } else {
                    activeFilter = button.id;
                }
                if (activeFilter != "all") {
                    document
                        .getElementById(activeFilter)
                        .classList.add("active");
                }

                let capitalizeFirst =
                    activeFilter[0].toUpperCase() + activeFilter.substring(1);
                activeButtonInner.innerText = capitalizeFirst;

                resetSightings();
                renderFeatures(builtData);
                resetHeatmap();
                if (
                    !heatmapButton.classList.contains("button-subtle")
                ) {
                    renderHeatmap(builtData);
                }
            });
        }
    }) // Work with JSON data
    .catch((error) => console.error("Error fetching JSON:", error));

// other shit
let headers = document.getElementsByTagName("h3");
for (let i = 0; i < headers.length; i++) {
    let header = headers[i];
    header.id = header.innerText.toLocaleLowerCase();
}


// /* timeline */

// let markerEl = document.querySelectorAll(".marker")
// for (let i = 0; i < markerEl.length; i++) {
//     let marker = markerEl[i];
//     console.log(marker)
//     let x = marker.offsetWidth / 2;
//     console.log(x)
//     marker.style.setProperty("--halfWidth", `${x}px`);
// }

// let cursor = document.getElementById('cursor')
// let inc = 1;
// let timelineBottomTimeout = null
// let timelineActive = true
// let x = 0
// function moveCursor() {
//     x = x + inc;
//     cursor.style.transform = `translate(${x}px, -5px)`;
//     timelineBottomTimeout = setTimeout(() => { moveCursor() }, 10)
// }

// window.addEventListener("keydown", (e) => {
//     if (e.key === " ") {
//         if (timelineActive) {
//             timelineActive = false;
//             clearTimeout(timelineBottomTimeout);
//         } else {
//             timelineActive = true;
//             moveCursor();
//         }
//         e.preventDefault();
//     }
// })
// moveCursor()