let mobile = window.screen.width <= 992;

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
