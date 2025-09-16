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
    marker = new mapboxgl.Marker({ color: config.markerColor });
    marker.setLngLat(config.chapters[0].location.center).addTo(map);
}


const story = document.getElementById('story');
const features = document.createElement('div');
features.setAttribute('id', 'features');

config.chapters.forEach((record, idx) => {
    const container = document.createElement('div');
    const chapter = document.createElement('div');

    if (record.title) {
        const title = document.createElement('h3');
        title.innerText = record.title;
        chapter.appendChild(title);
    }

    if (record.date) {
        const date = document.createElement('p');
        date.innerText = record.date;
        date.classList.add('date-pill'); // or 'date-sub'
        chapter.appendChild(date);
    }

    if (record.description) {
        const description = document.createElement('p');
        description.innerHTML = record.description;
        chapter.appendChild(description);
    }

    container.setAttribute('id', record.id);
    container.classList.add('step');
    if (idx === 0) container.classList.add('active');

    chapter.classList.add(config.theme);
    container.appendChild(chapter);
    features.appendChild(container);
});

story.appendChild(features);



const coordinates = config.chapters.map(chap => chap.location.center);

map.on('load', () => {
    // Add the empty line source
    map.addSource('journey-line', {
        type: 'geojson',
        data: {
            type: 'Feature',
            geometry: {
                type: 'LineString',
                coordinates: []
            }
        }
    });

    // Add the line layer
    map.addLayer({
        id: 'journey-line-layer',
        type: 'line',
        source: 'journey-line',
        layout: {
            'line-cap': 'round',
            'line-join': 'round'
        },
        paint: {
            'line-color': '#88C0D0',
            'line-width': 4,
            'line-opacity': 0.8,
            'line-blur': 1
        }
    });

    // Scroller setup

    const scroller = scrollama();
    const visitedChapters = new Set();
    let currentCoords = [];

    scroller
        .setup({
            step: '.step',
            offset: 0.5,
            progress: true
        })
        .onStepEnter(response => {
            const chapterIndex = config.chapters.findIndex(chap => chap.id === response.element.id);
            const chapter = config.chapters[chapterIndex];
            const targetCoords = chapter.location.center;
            const chapterId = response.element.id;

            if (visitedChapters.has(chapterId)) return;
            visitedChapters.add(chapterId);

            // Fly to the chapter location
            map.flyTo({
                center: chapter.location.center,
                zoom: chapter.location.zoom,
                bearing: chapter.location.bearing,
                pitch: chapter.location.pitch,
                duration: 3000,
                essential: true
            });

            // Move the marker
            if (config.showMarkers && marker) {
                marker.setLngLat(targetCoords);
            }

            // Initialize journey path
            if (!currentCoords.length) {
                currentCoords = [config.chapters[0].location.center];
            }

            const lastCoord = currentCoords[currentCoords.length - 1];

            // Wait for map to finish moving
            map.once('moveend', () => {
                const arc = turf.greatCircle(
                    turf.point(lastCoord),
                    turf.point(targetCoords),
                    { npoints: 60 }
                );

                const fullArc = arc.geometry.coordinates;
                let step = 0;
                const arcSegment = [];

                const interval = setInterval(() => {
                    if (step < fullArc.length) {
                        arcSegment.push(fullArc[step]);
                        map.getSource('journey-line').setData({
                            type: 'Feature',
                            geometry: {
                                type: 'LineString',
                                coordinates: [...currentCoords, ...arcSegment]
                            }
                        });
                        step++;
                    } else {
                        clearInterval(interval);
                        currentCoords = [...currentCoords, ...fullArc];
                    }
                }, 3000 / fullArc.length); // match flyTo duration
            });

            response.element.classList.add('active');
        })
        .onStepExit(response => {
            response.element.classList.remove('active');
        });

});

