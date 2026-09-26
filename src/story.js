// Stories and photo order follow wedding_website_edits.docx.
// Coordinates are [latitude, longitude]; city and park pins represent the overall destination.
const photos = (names, alt) => names.map((name, index) => ({
  src: `/story/image${name}.webp`,
  alt: `${alt} — photo ${index + 1}`,
}));

const georgiaHikes = 'We are so lucky to live close to the Appalachian Mountains. We try to get out on Georgia’s trails as much as we can, especially in the summer and fall!';

export const adventures = [
  {
    id: 'first-date', place: 'Our first date', region: 'Atlanta, Georgia', type: 'milestone',
    coordinates: [33.82938, -84.33922], year: 'The start of something amazing',
    description: 'We met on Hinge before Marlie moved to Atlanta. We were so excited to meet in person that our first date was the very day she moved from Fairfax! Will picked Marlie up at the Courtyard by Marriott Atlanta Executive Park/Emory, and her dad requested a picture of him and his license plate. It’s one of our favorite photos—and the start of something amazing.',
    photos: photos(['1'], 'Our first-date pickup in Atlanta'),
  },
  {
    id: 'mercedes-benz-stadium', place: 'Mercedes-Benz Stadium', region: 'Atlanta, Georgia', type: 'milestone',
    coordinates: [33.7554, -84.4008], year: 'Making it official',
    description: 'Sports have been a big part of our relationship. We’ve been to many Atlanta United games, World Cup games, a Dolphins game, and a Premier League preseason friendly. It was at that friendly that Will asked Marlie to be his girlfriend!',
    photos: photos(['1-png', '2', '3', '2-png'], 'Memories from our sports outings'),
  },
  {
    id: 'smoky-mountains', place: 'Great Smoky Mountains', region: 'Tennessee & North Carolina', type: 'hike',
    coordinates: [35.6118, -83.4895], year: 'Our first national park',
    description: 'This is the first national park we ever visited together! Some of our favorite hikes have been here.',
    photos: photos(['4', '5'], 'Our hikes in Great Smoky Mountains National Park'),
  },
  {
    id: 'nashville', place: 'Nashville', region: 'Tennessee', type: 'visit',
    coordinates: [36.1627, -86.7816], year: 'Our travels',
    description: 'nashville palceholder',
    photos: photos(['6'], 'Our visit to Nashville'),
  },
  {
    id: 'st-augustine', place: 'St. Augustine', region: 'Florida', type: 'visit',
    coordinates: [29.9012, -81.3124], year: 'Our first anniversary',
    description: 'We decided to start a tradition: go somewhere new on our dating anniversary each year! For our first anniversary, we wanted somewhere with both a beach and history.',
    photos: photos(['7', '8'], 'Our first-anniversary trip to St. Augustine'),
  },
  {
    id: 'toronto', place: 'Toronto & Niagara Falls', region: 'Ontario, Canada', type: 'visit',
    coordinates: [43.6532, -79.3832], additionalCoordinates: [[43.0828, -79.0742]], year: 'Our second anniversary',
    description: 'Anniversary year two! We met up in Canada while Will was spending the summer in Michigan. It was a whirlwind weekend, and so much fun!',
    photos: photos(['9', '10', '11', '12'], 'Our second-anniversary trip to Toronto and Niagara Falls'),
  },
  {
    id: 'savannah', place: 'Savannah', region: 'Georgia', type: 'visit',
    coordinates: [32.0809, -81.0912], year: 'Our third anniversary',
    description: 'Not only did we visit Savannah for our third anniversary, we also spent America’s 250th anniversary here! Marlie and the other ladies on our Fourth of July trip had a nice surprise for Will and the boys.',
    photos: photos(['13', '14', '3-png'], 'Our anniversary and Fourth of July memories in Savannah'),
  },
  {
    id: 'new-york', place: 'New York City', region: 'New York', type: 'visit',
    coordinates: [40.7128, -74.0060], year: 'Marlie’s 24th birthday',
    description: 'For Marlie’s 24th birthday, Will got her tickets to a Broadway show! That trip quickly turned into an arts extravaganza, with museums, the opera, and a ballet as well. Cabaret became our favorite musical—and a big inside joke in our relationship.',
    photos: photos(['15', '4-png'], 'Memories from Marlie’s birthday trip to New York City'),
  },
  ...[
    ['raven-cliff-falls', 'Raven Cliff Falls', [34.7232, -83.8238], '16'],
    ['allatoona-falls', 'Allatoona Falls', [34.14347, -84.53063], '17'],
    ['cochran-mill', 'Cochran Mill Park', [33.5715, -84.7133], '18'],
    ['mount-yonah', 'Mount Yonah', [34.6375, -83.7136], '19'],
    ['east-palisades', 'East Palisades Bamboo Forest', [33.8818, -84.4437], '20'],
    ['amicalola-falls', 'Amicalola Falls', [34.5653, -84.2478], '21'],
    ['high-falls', 'High Falls', [33.1782, -84.0203], '5-png'],
    ['tallulah-gorge', 'Tallulah Gorge', [34.7398, -83.3952], '22'],
    ['anna-ruby-falls', 'Anna Ruby Falls', [34.7643, -83.7125], '23'],
  ].map(([id, place, coordinates, photo]) => ({
    id, place, coordinates, region: 'Georgia', type: 'hike', year: 'Our Georgia hikes',
    description: georgiaHikes, photos: photos([photo], `Our visit to ${place}`),
  })),
  {
    id: 'stone-mountain', place: 'Stone Mountain', region: 'Georgia', type: 'hike',
    coordinates: [33.8053, -84.1477], year: 'Our Georgia hikes',
    description: 'A hike together with Matthew and Will’s mom, and a sweeping view of the city we call home.',
    photos: [],
  },
  {
    id: 'furkids', place: 'Furkids Thrift Store', region: 'Peachtree Corners, Georgia', type: 'milestone',
    coordinates: [33.9661042, -84.2569684], year: 'Meeting Cadence',
    description: 'This is where Marlie first met Cadence! We are so, so lucky she came into our lives.',
    photos: photos(['24', '25', '6-png'], 'Memories with Cadence'),
  },
  {
    id: 'piedmont-park', place: 'Piedmont Park', region: 'Atlanta, Georgia', type: 'milestone',
    coordinates: [33.7851, -84.3738], year: 'Our engagement—and so much more',
    description: 'Not only is this where we got engaged, it’s also where our boy Banjo was found! We live half a block from the park and have so many happy memories here.',
    photos: photos(['26', '7-png', '27', '28'], 'Our engagement and life together near Piedmont Park'),
  },
  {
    id: 'iceland', place: 'South Coast, Iceland', region: 'Iceland', type: 'visit',
    coordinates: [63.5321, -19.5114], year: 'Celebrating a PhD milestone',
    description: 'This big trip celebrated Marlie becoming a PhD candidate. Seeing the northern lights and going on some incredible outdoor adventures together was a magical, once-in-a-lifetime experience.',
    photos: photos(['29', '30', '31', '32', '33'], 'Our adventures in Iceland'),
  },
  {
    id: 'royal-blood', place: 'Royal Blood at Shaky Knees', region: 'Atlanta, Georgia', type: 'milestone',
    coordinates: [33.7663, -84.3797], year: 'Live music together',
    description: 'Seeing Royal Blood at Shakey Knees!',
    photos: photos(['38'], 'Together at Shaky Knees for Royal Blood'),
  },
  {
    id: 'mexico-city', place: 'Mexico City', region: 'Mexico', type: 'visit',
    coordinates: [19.4326, -99.1332], year: 'Family, culture, and tacos',
    description: 'This is where Will’s mom grew up. We are so lucky to have such a rich culture and amazing food as part of our story. A trip to Mexico City is incomplete without tacos with Tia Margot!',
    photos: photos(['34', '35', '36', '37'], 'Our trip to Mexico City'),
  },
];
