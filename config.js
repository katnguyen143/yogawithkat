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
            title: 'Yoga Instructor — UC Berkeley Outsiders Club',
            subtitle: 'Berkeley, California',
            date: 'Jan – Dec 2024 · 1 year',
            description: 'Instructed weekly yoga sessions tailored for BIPOC communities, emphasizing accessibility, inclusion, and mindfulness.',
            image: 'images/outdoor_yoga.JPG',
            location: {
                center: [-122.259, 37.871],
                zoom: 13,
                pitch: 45,
                bearing: 0
            }
        },
        {
            id: 'berkeley-ta',
            title: 'Yoga 1 Teaching Assistant – UC Berkeley PE Dept',
            subtitle: 'Berkeley, California',
            date: 'Aug – Dec 2024 · 5 months',
            description: 'Supported Ashtanga-Vinyasa Level 1 classes under Toni Mar through UC Berkeley\'s Physical Education Department. Learned to build sequences, guide flows, offer hands-on adjustments, and create newsletters and a syllabus that reflected my journey as a TA.',
            image: 'images/toni.JPG',
            location: {
                center: [-122.259, 37.871],
                zoom: 13,
                pitch: 45,
                bearing: 20
            }
        },
        {
            id: 'bali-training',
            title: '200 Hour Yoga Teacher Training — Bali Yoga Ashram',
            subtitle: 'Bali, Indonesia',
            date: 'June 2025',
            description: 'Earned my 200-hour certification in Bali, studying Ashtanga and Vinyasa yoga, yogic philosophy, pranayama, anatomy, and alignment.',
            image: 'images/bali_teachers.JPEG',
            location: {
                center: [115.28745931505563, -8.539585723396137],
                zoom: 10,
                pitch: 45,
                bearing: 0
            }
        },
        {
            id: 'tokyo-hitotsubashi',
            title: 'Guest Yoga Teacher — Hitotsubashi University',
            subtitle: 'Tokyo, Japan',
            date: 'July 2025',
            description: 'Invited by Toshi Ogura Sensei to inspire university yoga students by sharing my path as a practitioner and teacher, and facilitating mindful, guided vinyasa flows and breathwork.',
            image: 'images/hitotsu_guest2.jpg',
            location: {
                center: [139.44541479438266, 35.69462892771574],
                zoom: 12,
                pitch: 45,
                bearing: -20
            }
        },
        {
            id: 'lake-sagamiko',
            title: 'Yoga Retreat Co-Host',
            subtitle: 'Lake Sagamiko, Japan',
            date: 'July 2025',
            description: 'Co-hosted a yoga, hiking, and onsen retreat for yoga students at Hitotsubashi University.',
            image: 'images/lake_sagami_yoga.JPEG',
            location: {
                center: [139.16364654613133, 35.614342677931],
                zoom: 12,
                pitch: 45,
                bearing: -20
            }
        },
        {
            id: 'nakagawa-zenyoga',
            title: 'Zen Yoga Study',
            subtitle: 'Nakagawa Village, Japan',
            date: 'August 2025',
            description: 'Studied Zen Yoga with Genboku Sensei, deepening my understanding of zazen and the art of letting go. This experience shifted my perspective on ego and presence.',
            image: 'images/zen.JPG',
            location: {
                center: [137.94058671043638, 35.62064609776347],
                zoom: 10,
                pitch: 45,
                bearing: 0
            }
        },
        {
            id: 'koh-phangan-nestra',
            title: 'Yoga Instructor — Nestra Beach Shala',
            subtitle: 'Koh Phangan, Thailand',
            date: 'Aug - Sept 2025 • 2 months',
            description: 'Taught 3–4 classes per week including yang-to-yin sunset flows, handstand & inversions, Acroyoga workshops, and vinyasa donation-based classes.',
            image: 'images/nestra.JPG',
            location: {
                center: [100.035472, 9.694583],
                zoom: 13,
                pitch: 45,
                bearing: 0
            }
        },
        {
            id: 'acro_tipi',
            title: 'Acroyoga Instructor — The Tipi',
            subtitle: 'Koh Phangan, Thailand',
            date: 'Aug - Sept 2025 • 2 months',
            description: 'Co-taught 2 All-Levels Acroyoga classes per week, guiding students through warmups, breaking down the foundations of Acroyoga, and building trust and communication.',
            image: 'images/tipi_croc2.jpg',
            location: {
                center: [99.9789026935661, 9.75161635001131],
                zoom: 13,
                pitch: 45,
                bearing: 0
            }
        },
        {
            id: 'ladera_rec',
            title: 'Yoga Instructor — Ladera Recreation District',
            subtitle: 'Portola Valley, California',
            date: 'Nov 2025 - Present',
            description: 'Teach a weekly all-levels vinyasa flow blending gentle warm-ups, breathwork, and accessible dynamic poses to build mobility and balance.',
            image: 'images/esh.jpeg',
            location: {
                center: [-122.19958548726125, 37.403524445910385],
                zoom: 13,
                pitch: 45,
                bearing: 0
            }
        }
    ]

};
