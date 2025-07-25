
const tagsList = document.getElementById('tagsList');
const ownersList = document.getElementById('ownersList');
const c_delimiter = "\u237C";

document.addEventListener("DOMContentLoaded", function () {
    var tagSet = new Set();
    var ownerSet = new Set();

    const gamesList = document.querySelectorAll('.filterable');
    gamesList.forEach(filterable => {
        const filters = filterable.getAttribute('filters');
        if (!filters) {
            return;
        }

        const filterArray = filters.toLowerCase().split("&");
        var tags = "";
        var owners = "";
        for (var i = 0; i < filterArray.length; i++) {
            const filter = filterArray[i].split("=");
            if (filter.length < 2) {
                continue;
            }
            if (filter[0] === "tags") {
                tags = filter[1];
            }
            if (filter[0] === "owners") {
                owners = filter[1];
            }
        }

        if (tags) {
            t = tags.split(c_delimiter)
            for (var i = 0; i < t.length; i++) {
                tagSet.add(t[i]);
            }
        }
        if (owners) {
            ownerSet.add(owners);
        }
    });

    var g_tags = Array.from(tagSet).sort()
    var g_owners = Array.from(ownerSet).sort()

    g_tags.forEach(tag => {
        var option = document.createElement("option");
        option.value = tag;
        tagsList.appendChild(option);
    });
    g_owners.forEach(owner => {
        var option = document.createElement("option");
        option.value = owner;
        ownersList.appendChild(option);
    });

});

function filterName() {
    filter("namefilter", "name")
}

function filterPlayers() {
    var input = document.getElementById('playersfilter').value.toLowerCase();
    const gamesList = document.querySelectorAll('.filterable');

    gamesList.forEach(filterable => {
        const filters = filterable.getAttribute('filters');
        if (!filters) {
            return;
        }

        const filterArray = filters.toLowerCase().split("&");
        var min, max = "";
        for (var i = 0; i < filterArray.length; i++) {
            const filter = filterArray[i].split("=");
            if (filter.length < 2) {
                continue;
            }
            if (filter[0] === "min") {
                min = filter[1];
            }
            if (filter[0] === "max") {
                max = filter[1];
            }
        }

        if (max.includes("+") || max === "teams") {
            max = Number.MAX_SAFE_INTEGER;
        }

        min = parseInt(min);
        max = parseInt(max);

        input = input.trim();
        input = input.replace(/-+$/, "").trim();
        const vals = input.split("-");

        var s_min = vals[0].trim();
        var s_max = s_min;
        if (vals.length === 2) {
            s_max = vals[1].trim();
        }

        var hide = false;
        if (vals.length > 2) {
            hide = true;
        }

        if (isNaN(s_min)) {
            s_min = Number.MAX_SAFE_INTEGER;
        }
        if (isNaN(s_max)) {
            s_max = 0;
        }

        if (s_min === Number.MAX_SAFE_INTEGER || s_max === 0) {
            hide = true;
        }

        if (s_min > max || s_max < min) {
            hide = true;
        }

        if (s_min < min || s_max > max) {
            hide = true;
        }

        if (!input) {
            hide = false;
        }

        const filteredBy = filterable.getAttribute('filtered');
        if (hide) {
            addFilter(filterable, filteredBy, "players");
            filterable.style.display = "none";
        } else {
            if (filteredBy.includes("players")) {
                filterable.setAttribute('filtered', filteredBy.replace("players", ""));
            } if (!filterable.getAttribute('filtered')) {
                filterable.style.display = "flex";
            }
        }

    });
}

function addFilter(filterable, filteredBy, key) {
    if (!filteredBy || !filteredBy.includes(key)) {
        filterable.setAttribute('filtered', filteredBy + key)
    }
}

function filterOwners() {
    filter("ownersfilter", "owners")
}

function filterTags() {
    filter("tagsfilter", "tags")
}

function filter(inputId, filterName) {
    const input = document.getElementById(inputId).value.toLowerCase();
    const gamesList = document.querySelectorAll('.filterable');

    gamesList.forEach(filterable => {
        const filters = filterable.getAttribute('filters')
        if (!filters) {
            return;
        }

        const filterArray = filters.toLowerCase().split("&");
        var match = "";
        for (var i = 0; i < filterArray.length; i++) {
            const filter = filterArray[i].split("=")
            if (filter.length < 2) {
                continue;
            }
            if (filter[0] === filterName) {
                match = filter[1];
                break;
            }
        }

        const filteredBy = filterable.getAttribute('filtered')
        if (match.includes(input)) {
            if (filteredBy.includes(filterName)) {
                filterable.setAttribute('filtered', filteredBy.replace(filterName, ""));
            }
            if (!filterable.getAttribute('filtered')) {
                filterable.style.display = "flex";
            }
        } else {
            addFilter(filterable, filteredBy, filterName)
            filterable.style.display = "none";
        }
    });
}