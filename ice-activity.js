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
    console.log("stuff");
    if (!event.target.matches(".wrapper-filter *")) {
        toggleMenu();
    }
});

function filterSighting(sighting) {
    if (activeFilter == "sightings" && (sighting.type != null && sighting.type != "unconfirmend")) {
        return true;
    }
    if (activeFilter == "protests" && (sighting.type != "protest" && sighting.type != "poly")) {
        return true;
    }
    if (activeFilter == "helicopters" && (sighting.type != "heli")) {
        return true;
    }
    return false;
}

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

function renderSighting(sighting, size) {
    let color = "red";
    if (sighting.type == "protest") {
        color = "blue";
    } else if (sighting.type == "unconfirmend") {
        color = "grey";
    }

    if (sighting.type == "poly") {
        console.log(date);
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

function renderSightings(data) {
    for (let i = 0; i < data.length; i++) {
        sighting = data[i];
        let date = new Date(sighting.date + "T12:00:00");

        if (filterDate != null) {
            if (!isSameDay(date, filterDate)) {
                continue;
            }
        }

        if (filterSighting(sighting)) {
            continue;
        }

        if (isSameDay(date, new Date()) || filterDate != null) {
            renderSighting(sighting, "large")
        } else {
            renderSighting(sighting, "small")
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
function renderHeatmap(data) {
    for (let i = 0; i < data.length; i++) {
        sighting = data[i];
        if (sighting.type == "poly") {
            continue;
        }

        let date = new Date(sighting.date + "T12:00:00");

        if (filterDate != null) {
            if (!isSameDay(date, filterDate)) {
                continue;
            }
        }

        if (activeFilter != "all") {
            if (filterSighting(sighting)) {
                continue;
            }
        } else {
            if (sighting.type == "protest" || sight.type == "heli") {
                continue;
            }
        }

        heat.addLatLng([sighting.latlng[0], sighting.latlng[1], 1]);
    }
}

function resetHeatmap() {
    heat.setLatLngs([]);
}

renderDefaultFeatures();

let heatmapButton = document.getElementById("heatmap");

function buildData(data) {
    let builtData = { "sightings": [], "protests": [], helis: [], other: [] };
    for (let i = 0; i < data.length; i++) {
        let entry = data[i];
        let entryBuilt = {}
        if (entry.type == null || entry.type == "unconfirmend") {
            entryBuilt.latlng = entry.latlng;
            entryBuilt.title = entry.title;
            let date = new Date(entry.date);
            if (entry.time != null) {
                date = new Date(`${entry.date}, ${entry.time}`)
                entryBuilt.date = date;
                entryBuilt.time = true;
            } else {
                entryBuilt.date = date;
                entryBuilt.time = false;
            }

            if (entry.type == null) {
                entryBuilt.type = "sighting"
            } else {
                entryBuilt.type = entry.type
            }

            if (builtData.sightings[entry.date] == null) {
                builtData.sightings[entry.date] = [entryBuilt]
            } else {
                builtData.sightings[entry.date].push(entryBuilt)
            }
        } else if (entry.type == "protest" || entry.type == "poly") {
            entryBuilt.latlng = entry.latlng;
            entryBuilt.title = entry.title;
            let date = new Date(entry.date);
            if (entry.time != null) {
                date = new Date(`${entry.date}, ${entry.time}`)
                entryBuilt.date = date;
                entryBuilt.time = true;
            } else {
                entryBuilt.date = date;
                entryBuilt.time = false;
            }

            entryBuilt.type = entry.type

            if (builtData.protests[entry.date] == null) {
                builtData.protests[entry.date] = [entryBuilt]
            } else {
                builtData.protests[entry.date].push(entryBuilt)
            }
        } else if (entry.type == "heli") {
            entryBuilt.latlng = entry.latlng;
            entryBuilt.title = entry.title;
            let date = new Date(entry.date);
            if (entry.time != null) {
                date = new Date(`${entry.date}, ${entry.time}`)
                entryBuilt.date = date;
                entryBuilt.time = true;
            } else {
                entryBuilt.date = date;
                entryBuilt.time = false;
            }

            entryBuilt.type = entry.type

            if (builtData.helis[entry.date] == null) {
                builtData.helis[entry.date] = [entryBuilt]
            } else {
                builtData.helis[entry.date].push(entryBuilt)
            }
        } else {
            entryBuilt.latlng = entry.latlng;
            entryBuilt.title = entry.title;
            let date = new Date(entry.date);
            if (entry.time != null) {
                date = new Date(`${entry.date}, ${entry.time}`)
                entryBuilt.date = date;
                entryBuilt.time = true;
            } else {
                entryBuilt.date = date;
                entryBuilt.time = false;
            }

            entryBuilt.type = entry.type

            if (builtData.other[entry.date] == null) {
                builtData.other[entry.date] = [entryBuilt]
            } else {
                builtData.other[entry.date].push(entryBuilt)
            }
        }
    }
    console.log(builtData)
}

fetch("sightings.json")
    .then((response) => response.json()) // Parse JSON
    .then((data) => {
        buildData(data)
        renderSightings(data);
        heatmapButton.onclick = () => {
            if (heatmapButton.classList.contains("button-subtle")) {
                heatmapButton.classList.remove("button-subtle");
                renderHeatmap(data);
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
            renderSightings(data);
            if (!heatmapButton.classList.contains("button-subtle")) {
                resetHeatmap();
                renderHeatmap(data);
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
                renderSightings(data);
                resetHeatmap();
                if (
                    !heatmapButton.classList.contains("button-subtle") &&
                    activeFilter != "protests"
                ) {
                    renderHeatmap(data);
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