mapboxgl.accessToken = config.accessToken;

const map = new mapboxgl.Map({
    container: 'map',
    style: config.style,
    center: config.chapters[0].location.center,
    zoom: config.chapters[0].location.zoom,
    bearing: config.chapters[0].location.bearing,
    pitch: config.chapters[0].location.pitch,
    interactive: false
});

let marker;
if (config.showMarkers) {
    marker = new mapboxgl.Marker({ color: config.markerColor })
        .setLngLat(config.chapters[0].location.center)
        .addTo(map);
}

// Build story steps
const story = document.getElementById('story');
const features = document.createElement('div');
features.id = 'features';

config.chapters.forEach((record, idx) => {
    const container = document.createElement('div');
    container.classList.add('step');
    container.id = record.id;
    if (idx === 0) container.classList.add('active');

    const chapter = document.createElement('div');
    chapter.classList.add(config.theme);

    if (record.title) {
        const h = document.createElement('h3');
        h.innerText = record.title;
        chapter.appendChild(h);
    }
    if (record.date) {
        const p = document.createElement('p');
        p.innerText = record.date;
        p.classList.add('date-pill');
        chapter.appendChild(p);
    }
    if (record.description) {
        const p = document.createElement('p');
        p.innerHTML = record.description;
        chapter.appendChild(p);
    }

    container.appendChild(chapter);
    features.appendChild(container);
});

story.appendChild(features);

// Helper to compute distance
function distanceKm(start, end) {
    const R = 6371;
    const toRad = d => d * Math.PI / 180;
    const dLat = toRad(end[1] - start[1]);
    const dLon = toRad(end[0] - start[0]);
    const lat1 = toRad(start[1]);
    const lat2 = toRad(end[1]);
    const a = Math.sin(dLat / 2) ** 2 + Math.cos(lat1) * Math.cos(lat2) * Math.sin(dLon / 2) ** 2;
    return R * 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
}

map.on('load', () => {
    // Initialize empty line
    map.addSource('journey-line', {
        type: 'geojson',
        data: { type: 'Feature', geometry: { type: 'LineString', coordinates: [] } }
    });

    map.addLayer({
        id: 'journey-line-layer',
        type: 'line',
        source: 'journey-line',
        layout: { 'line-cap': 'round', 'line-join': 'round' },
        paint: { 'line-color': '#88C0D0', 'line-width': 4, 'line-opacity': 0.8 }
    });

    // Optional: add points for each chapter
    const points = config.chapters.map(c => turf.point(c.location.center));
    map.addSource('chapter-points', {
        type: 'geojson',
        data: turf.featureCollection(points)
    });
    map.addLayer({
        id: 'chapter-points-layer',
        type: 'circle',
        source: 'chapter-points',
        paint: { 'circle-radius': 6, 'circle-color': '#D08770' }
    });

    const scroller = scrollama();
    let pathSoFar = [];  // empty at start
    let lineInterval;

    scroller.setup({ step: '.step', offset: 0.6, progress: true })
        .onStepEnter(response => {
            const chapter = config.chapters.find(c => c.id === response.element.id);
            const target = chapter.location.center;
            const last = pathSoFar.length ? pathSoFar[pathSoFar.length - 1] : config.chapters[0].location.center;

            if (config.showMarkers && marker) marker.setLngLat(target);

            // compute great-circle arc
            let steps = 200;
            let arc = turf.greatCircle(turf.point(last), turf.point(target), { npoints: steps }).geometry.coordinates;

            // make sure it starts at last
            if (Math.hypot(arc[0][0] - last[0], arc[0][1] - last[1]) > 0.01) arc.reverse();

            if (lineInterval) clearInterval(lineInterval);
            let i = 0;
            const seg = [];
            const duration = 2000;
            const intervalTime = duration / arc.length;

            lineInterval = setInterval(() => {
                if (i < arc.length) {
                    seg.push(arc[i]);
                    map.getSource('journey-line').setData({
                        type: 'Feature',
                        geometry: { type: 'LineString', coordinates: [...pathSoFar, ...seg] }
                    });
                    i++;
                } else {
                    clearInterval(lineInterval);
                    pathSoFar = [...pathSoFar, ...arc];
                }
            }, intervalTime);

            map.flyTo({
                center: target,
                zoom: chapter.location.zoom,
                bearing: chapter.location.bearing,
                pitch: chapter.location.pitch,
                duration: duration,
                essential: true
            });

            response.element.classList.add('active');
        })
        .onStepExit(response => response.element.classList.remove('active'));
});

