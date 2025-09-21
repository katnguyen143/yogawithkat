mapboxgl.accessToken = config.accessToken;

// --- Initialize Map ---
const map = new mapboxgl.Map({
    container: 'map',
    style: config.style,
    center: config.chapters[0].location.center,
    zoom: config.chapters[0].location.zoom,
    bearing: config.chapters[0].location.bearing,
    pitch: config.chapters[0].location.pitch,
    interactive: false
});

map.on('load', () => {
    // --- Create pulsing dot ---
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
            const ctx = this.context;

            ctx.clearRect(0, 0, this.width, this.height);

            // outer circle
            ctx.beginPath();
            ctx.arc(size / 2, size / 2, outerRadius, 0, Math.PI * 2);
            ctx.fillStyle = `rgba(0,128,128,${1 - t})`;
            ctx.fill();

            // inner circle
            ctx.beginPath();
            ctx.arc(size / 2, size / 2, radius, 0, Math.PI * 2);
            ctx.fillStyle = 'teal';
            ctx.strokeStyle = 'white';
            ctx.lineWidth = 2 + 2 * t;
            ctx.fill();
            ctx.stroke();

            this.data = ctx.getImageData(0, 0, this.width, this.height).data;
            map.triggerRepaint();
            return true;
        }
    };

    map.addImage('pulsing-dot', pulsingDot, { pixelRatio: 2 });

    // --- Add pulsing dot source & layer ---
    map.addSource('pulsing-point', {
        type: 'geojson',
        data: {
            type: 'FeatureCollection',
            features: [{
                type: 'Feature',
                geometry: { type: 'Point', coordinates: config.chapters[0].location.center }
            }]
        }
    });

    map.addLayer({
        id: 'pulsing-point-layer',
        type: 'symbol',
        source: 'pulsing-point',
        layout: { 'icon-image': 'pulsing-dot' }
    });

    const story = document.getElementById('story');
    story.innerHTML = '';

    config.chapters.forEach((record, idx) => {
        const step = document.createElement('div');
        step.classList.add('step');
        step.id = record.id;
        if (idx === 0) step.classList.add('active');

        const chapter = document.createElement('div');
        chapter.classList.add(config.theme);

        // title
        if (record.title) {
            const h = document.createElement('h3');
            h.innerText = record.title;
            chapter.appendChild(h);
        }

        // subtitle
        if (record.subtitle) {
            const sub = document.createElement('h4'); // or 'p' with a class
            sub.innerText = record.subtitle;
            sub.classList.add('subtitle');
            chapter.appendChild(sub);
        }

        // date
        if (record.date) {
            const p = document.createElement('p');
            p.innerText = record.date;
            p.classList.add('date-pill');
            chapter.appendChild(p);
        }

        // description
        if (record.description) {
            const p = document.createElement('p');
            p.innerHTML = record.description;
            chapter.appendChild(p);
        }

        // image
        if (record.image) {
            const img = document.createElement('img');
            img.src = record.image;
            img.alt = record.title || '';
            img.style.width = '100%';
            img.style.borderRadius = '8px';
            img.style.marginTop = '0.5rem';
            chapter.appendChild(img);
        }

        step.appendChild(chapter);
        story.appendChild(step);
    });

    // --- Scrollama Setup ---
    const scroller = scrollama();

    scroller.setup({
        step: '.step',
        offset: 0.5,
        container: document.getElementById('story')
    })
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

            // Fly camera
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
        .onStepExit(response => {
            response.element.classList.remove('active');
        });

    window.addEventListener('resize', scroller.resize);
});
