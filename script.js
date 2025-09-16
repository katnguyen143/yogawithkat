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

const scroller = scrollama();

scroller
    .setup({
        step: '.step',
        offset: 0.5,
        progress: true
    })
    .onStepEnter(response => {
        const chapter = config.chapters.find(chap => chap.id === response.element.id);
        response.element.classList.add('active');
        map.flyTo(chapter.location);
        if (config.showMarkers) {
            marker.setLngLat(chapter.location.center);
        }
    })
    .onStepExit(response => {
        response.element.classList.remove('active');
    });
