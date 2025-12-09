let loc = new URL(document.location)

let enabledFeatures = loc.searchParams.get("features").split(",")
let heatmap = loc.searchParams.get("heatmap")
let latlng = [loc.searchParams.get("lat"), loc.searchParams.get("lng")]
let y = loc.searchParams.get('y')
let date = loc.searchParams.get('date')
let focused = loc.searchParams.get("focused")

focused = focused == "true" ? true : false;

// makeMap([41.848, -87.665], 10, 20)
makeMap(latlng, y, 20, true)

if (enabledFeatures.includes("default")) {
	renderDefaultFeatures();
}

fetch("sightings.json")
	.then((response) => response.json()) // Parse JSON
	.then((data) => {
		let builtData = buildData(data)
		if (heatmap) {
			if (date) {
				renderHeatmapDay(builtData, new Date(date), "sightings")
			} else {
				renderHeatmapAll(builtData, "sightings")
			}
		}
		if (enabledFeatures.includes("sightings")) {
			if (date) {
				renderFeaturesDay(builtData, new Date(date), "sightings")
			} else {
				renderFeaturesAll(builtData, "sightings", focused)
			}
		}
		if (enabledFeatures.includes("protests")) {
			if (date) {
				renderFeaturesDay(builtData, new Date(date), "protests")
			} else {
				renderFeaturesAll(builtData, "protests", focused)
			}
		}
		if (enabledFeatures.includes("helis")) {
			if (date) {
				renderFeaturesDay(builtData, new Date(date), "helis")
			} else {
				renderFeaturesAll(builtData, "helis", focused)
			}
		}
		if (enabledFeatures.includes("other")) {
			if (date) {
				renderFeaturesDay(builtData, new Date(date), "other")
			} else {
				renderFeaturesAll(builtData, "other", focused)
			}
		}
	}) // Work with JSON data
	.catch((error) => console.error("Error fetching JSON:", error));
