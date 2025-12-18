let y = 11;

if (mobile) {
    y = 10;
}
makeMap([41.848, -87.665], y, 20)

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


let dateSelector = document.getElementById("date");
let filterDate = new Date(dateSelector.value + "T12:00:00");
dateSelector.setAttribute("max", new Date().toISOString().split("T")[0]);
dateSelector.setAttribute("min", "2025-10-03");
if (filterDate.toString() == "Invalid Date") {
    filterDate = null;
}

renderDefaultFeatures();

let heatmapButton = document.getElementById("heatmap");

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
