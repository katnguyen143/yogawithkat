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
    let currentCoords = [];

    scroller
        .setup({
            step: '.step',
            offset: 0.5,
            progress: true
        })
        .onStepEnter(response => {
            const chapterIndex = config.chapters.findIndex(chap => chap.id === response.element.id);
            const targetCoords = config.chapters[chapterIndex].location.center;
            const lastCoord = currentCoords.length ? currentCoords[currentCoords.length - 1] : targetCoords;

            if (!currentCoords.length) {
                currentCoords = [targetCoords]; 
            }

            const lastCoord = currentCoords[currentCoords.length - 1];
            const steps = 30;
            let step = 0;

            function animateLine() {
                step++;
                const interpolated = [
                    lastCoord[0] + (targetCoords[0] - lastCoord[0]) * (step / steps),
                    lastCoord[1] + (targetCoords[1] - lastCoord[1]) * (step / steps)
                ];

                const updatedCoords = [...currentCoords, interpolated];
                map.getSource('journey-line').setData({
                    type: 'Feature',
                    geometry: {
                        type: 'LineString',
                        coordinates: updatedCoords
                    }
                });

                if (step < steps) {
                    requestAnimationFrame(animateLine);
                } else {
                    currentCoords.push(targetCoords); // finalize
                }
            }
            animateLine();
        })

        .onStepExit(response => {
            response.element.classList.remove('active');
        });
});

