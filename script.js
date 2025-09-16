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

map.on('load', () => {

    // Create a pulsing dot as a canvas source
    const size = 200;

    const pulsingDot = {
        width: size,
        height: size,
        data: new Uint8Array(size * size * 4),

        onAdd: function () {
            const canvas = document.createElement('canvas');
            canvas.width = this.width;
            canvas.height = this.height;
            this.context = canvas.getContext('2d');
        },

        render: function () {
            const duration = 1000;
            const t = (performance.now() % duration) / duration;

            const radius = (size / 2) * 0.3;
            const outerRadius = (size / 2) * 0.7 * t + radius;
            const context = this.context;

            // clear canvas
            context.clearRect(0, 0, this.width, this.height);

            // draw outer circle
            context.beginPath();
            context.arc(size / 2, size / 2, outerRadius, 0, Math.PI * 2);
            context.fillStyle = `rgba(0, 128, 128, ${1 - t})`; // teal with fading
            context.fill();

            // draw inner circle
            context.beginPath();
            context.arc(size / 2, size / 2, radius, 0, Math.PI * 2);
            context.fillStyle = 'teal';
            context.strokeStyle = 'white';
            context.lineWidth = 2 + 2 * t;
            context.fill();
            context.stroke();

            // update image
            this.data = context.getImageData(0, 0, this.width, this.height).data;

            // keep repainting
            map.triggerRepaint();

            return true;
        }
    };

    map.addImage('pulsing-dot', pulsingDot, { pixelRatio: 2 });

    // Add source & layer for initial position
    map.addSource('pulsing-point', {
        type: 'geojson',
        data: {
            type: 'FeatureCollection',
            features: [{
                type: 'Feature',
                geometry: {
                    type: 'Point',
                    coordinates: config.chapters[0].location.center
                }
            }]
        }
    });

    map.addLayer({
        id: 'pulsing-point-layer',
        type: 'symbol',
        source: 'pulsing-point',
        layout: { 'icon-image': 'pulsing-dot' }
    });

    // Scrollama logic
    const scroller = scrollama();

    scroller.setup({ step: '.step', offset: 0.5 })
        .onStepEnter(response => {
            const idx = config.chapters.findIndex(c => c.id === response.element.id);
            if (idx === -1) return;
            const loc = config.chapters[idx].location;

            // Move pulsing dot
            map.getSource('pulsing-point').setData({
                type: 'FeatureCollection',
                features: [{
                    type: 'Feature',
                    geometry: { type: 'Point', coordinates: loc.center }
                }]
            });

            // Fly to location
            map.flyTo({
                center: loc.center,
                zoom: loc.zoom,
                bearing: loc.bearing,
                pitch: loc.pitch,
                duration: 2000,
                essential: true
            });

            response.element.classList.add('active');
        })
        .onStepExit(response => response.element.classList.remove('active'));
});
