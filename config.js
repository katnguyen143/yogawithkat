var config = {
    // style: 'mapbox://styles/mapbox/streets-v12',
    // leave commented to use Mapbox Standard Style
    accessToken: 'pk.eyJ1Ijoia2F0bmd1eWVuIiwiYSI6ImNtZmd2azY3MTA1Ynoya3B5ajR1aWU4MjAifQ.p68L4RzmRLZ8fZzy3JxzfA',
    showMarkers: true,
    markerColor: '#3FB1CE',
    //projection: 'equirectangular',
    inset: true,
    insetOptions: {
        markerColor: 'orange'
    },
    insetPosition: 'bottom-right',
    theme: 'dark',
    style: 'mapbox://styles/mapbox/light-v11',
    use3dTerrain: false, //set true for enabling 3D maps.
    auto: false,
    title: 'Kats Yoga Journey',
    subtitle: 'The Storytelling Template helps you create an awesome animated map story with ease.',
    byline: 'Curated by Kat Nguyen · RYT-200 Yoga Teacher',
    footer: 'Source: source citations, etc. <br> Created using <a href="https://github.com/mapbox/storytelling" target="_blank">Mapbox Storytelling</a> template.',


    chapters: [
        {
            id: 'berkeley-outsiders',
            title: 'Outsiders – UC Berkeley, California',
            description: 'Instructed weekly yoga sessions tailored for BIPOC communities, emphasizing accessibility, inclusion, and mindfulness. This was my first teaching experience, rooted in care and community.',
            location: {
                center: [-122.259, 37.871],
                zoom: 13,
                pitch: 45,
                bearing: 0
            }
        },
        {
            id: 'berkeley-ta',
            title: 'Teaching Assistant – UC Berkeley PE Dept',
            description: 'Supported Ashtanga-Vinyasa Level 1 classes under Toni Mar. I learned to build sequences, guide flows, offer hands-on adjustments, and create newsletters and a syllabus that reflected my journey as a TA.',
            location: {
                center: [-122.259, 37.871],
                zoom: 13,
                pitch: 45,
                bearing: 20
            }
        },
        {
            id: 'bali-training',
            title: 'Yoga Teacher Training – Bali Yoga Ashram',
            description: 'Earned my 200-hour certification in Bali, studying Ashtanga and Vinyasa yoga, yogic philosophy, pranayama, anatomy, and alignment. This was a deep dive into the roots of my practice.',
            location: {
                center: [115.1889, -8.4095],
                zoom: 10,
                pitch: 45,
                bearing: 0
            }
        },
        {
            id: 'tokyo-hitotsubashi',
            title: 'Guest Teacher – Hitotsubashi University, Tokyo',
            description: 'Invited by Toshi Ogura to teach three classes and share my journey as a yoga teacher. It was a joy to connect with students and reflect on my training.',
            location: {
                center: [139.767, 35.681],
                zoom: 12,
                pitch: 45,
                bearing: -20
            }
        },
        {
            id: 'nakagawa-zenyoga',
            title: 'Zen Yoga Study – Nakagawa Village, Japan',
            description: 'Studied Zen Yoga with Genboku Sensei, deepening my understanding of zazen and the art of letting go. This experience shifted my perspective on ego and presence.',
            location: {
                center: [139.2, 36.1],
                zoom: 10,
                pitch: 45,
                bearing: 0
            }
        },
        {
            id: 'koh-phangan-nestra',
            title: 'Yoga Instructor – Nestra Beach Shala, Thailand',
            description: 'Currently teaching 3–4 classes per week including yang-to-yin sunset flows, handstand & inversion play, and donation-based Flow for All. This is where my heart lives now — in movement, community, and ocean breeze.',
            location: {
                center: [100.0, 9.7],
                zoom: 13,
                pitch: 45,
                bearing: 0
            }
        }
    ]

};
