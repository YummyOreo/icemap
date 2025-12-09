let loc = new URL(document.location)

let enabledFeatures = loc.searchParams.get("features").split(",")
let heatmap = loc.searchParams.get("heatmap")
let latlng = [loc.searchParams.get("lat"), loc.searchParams.get("lng")]
let y = loc.searchParams.get('y')
console.log(enabledFeatures)

// makeMap([41.848, -87.665], 10, 20)
makeMap(latlng, y, 20)

if (enabledFeatures.includes("default")) {
	renderDefaultFeatures();
}

fetch("sightings.json")
    .then((response) => response.json()) // Parse JSON
    .then((data) => {
        let builtData = buildData(data)
	    if (enabledFeatures.includes("sightings")) {
		renderFeaturesAll(builtData, "sightings")
	    }
	    if (enabledFeatures.includes("protests")) {
		renderFeaturesAll(builtData, "protests")
	    }
	    if (enabledFeatures.includes("helis")) {
		renderFeaturesAll(builtData, "helis")
	    }
	    if (enabledFeatures.includes("other")) {
		renderFeaturesAll(builtData, "other")
	    }
    }) // Work with JSON data
    .catch((error) => console.error("Error fetching JSON:", error));
