// ✏️  Edit everything about the wedding here. The whole site reads from this file.

export const wedding = {
  bride: "Ajiri",
  groom: "Karo",
  initials: "A & K",
  hashtag: "#AKForever2026",

  // ISO date-time of the main ceremony (used for the countdown). Include timezone offset.
  date: "2026-12-19T10:00:00+01:00",
  displayDate: "Saturday, 19th December 2026",
  displayTime: "10:00 AM",
  city: "Warri, Nigeria",

  inviteLine: "Together with their families, joyfully invite you to celebrate their wedding",

  // The map and "Directions" buttons are built from each address automatically.
  // If Google pins the wrong spot, add  mapQuery: "<what you'd type into Google Maps>"  to that event.
  // icon: "church" | "reception" | "traditional"
  events: [
    // {
    //   title: "Traditional Wedding",
    //   date: "Friday, 16th December 2026",
    //   time: "12:00 PM",
    //   venue: "The Garden Event Centre",
    //   address: "12 Example Road, Lekki, Lagos",
    //   icon: "traditional",
    // },
    {
      title: "Church Ceremony",
      date: "Saturday, 19th December 2026",
      time: "10:00 AM",
      venue: "St Andrew’s Anglican Cathedral",
      address: "22 Okere Rd, Agbasa Warri",
      icon: "church",
    },
    {
      title: "Reception",
      date: "Saturday, 19th December 2026",
      time: "2:00 PM",
      venue: "MBB Event",
      address: "Km 2 Refinery Rd, Effurun, Warri",
      icon: "reception",
    },
  ],

  // Appended to every address for map searches, so Google finds the right place.
  mapRegion: "Delta State, Nigeria",

  story: [
    { year: "2022", title: "First Hello", text: "We met on Instagram and started talking for a while." },
    { year: "2024", title: "Started Dating", text: "Everyday talk, laughter and connection that lasted way longer than planned." },
    { year: "2025", title: "Growing Together", text: "Through every season, we choose each other again and again." },
    { year: "2026", title: "Proposal", text: "One knee, one ring, one very happy YES!" },
  ],

  dressCode: {
    note: "Our colours of the day are purple, lilac, mauve and burgundy. Come dressed in any of them!",
    colors: [
      { name: "Purple", hex: "#6B2C91" },
      { name: "Lilac", hex: "#B9A2E3" },
      { name: "Mauve", hex: "#B784A7" },
      { name: "Burgundy", hex: "#800020" },
    ],
  },

  // Gallery photos live in /public/images/gallery. Replace them with the couple's own photos
  // (same file names, or edit the list). w/h are the image's pixel size, used to lay out the grid.
  // Temporary stock photos are from Unsplash (free licence): see the links beside each one.
  gallery: [
    { src: "/images/gallery/01.jpg", w: 1400, h: 2489, caption: "Where it all began" }, // unsplash.com/photos/H-AVHwEoCso
    { src: "/images/gallery/02.jpg", w: 1400, h: 933, caption: "You, me & forever" }, // unsplash.com/photos/3jTLp4o7jDc
    { src: "/images/gallery/03.jpg", w: 1400, h: 2100, caption: "Royalty in coral" }, // unsplash.com/photos/ZDMms8xjS6Y
    { src: "/images/gallery/04.jpg", w: 1400, h: 2097, caption: "Under the trees, we said yes" }, // unsplash.com/photos/OyhCn_7YoQo
    { src: "/images/gallery/05.jpg", w: 1400, h: 935, caption: "A promise, sealed" }, // unsplash.com/photos/eHXtoxL1H-E
    { src: "/images/gallery/06.jpg", w: 1400, h: 933, caption: "Hand in hand, always" }, // unsplash.com/photos/Rnpl4bDDBog
    { src: "/images/gallery/07.jpg", w: 1400, h: 2100, caption: "My favourite person" }, // unsplash.com/photos/OfCqjqsWmIc
    { src: "/images/gallery/08.jpg", w: 1400, h: 1388, caption: "Rooted in tradition" }, // unsplash.com/photos/nRrFmCS6vTE
    { src: "/images/gallery/09.jpg", w: 1400, h: 2100, caption: "Sealed with a kiss" }, // unsplash.com/photos/jbvd1Vi6jwU
    { src: "/images/gallery/10.jpg", w: 1400, h: 933, caption: "Forever starts here" }, // unsplash.com/photos/_GTzs6Yr8_M
    { src: "/images/gallery/11.jpg", w: 1400, h: 935, caption: "Home is wherever you are" }, // unsplash.com/photos/x-a6jIlbzC8
    { src: "/images/gallery/12.jpg", w: 1400, h: 1763, caption: "Just the two of us" }, // unsplash.com/photos/YGZIxyRunvw
  ],

  gifts: {
    note: "Your presence is the greatest gift. If you'd like to bless us further, here are the details:",
    accounts: [
      { label: "Bank", value: "OPay" },
      { label: "Account Name", value: "Ajirioghene Attah-Christian" },
      { label: "Account Number", value: "7052430130", copy: true },
    ],
  },

    // Background music: a YouTube playlist that plays in order and loops forever.
  // Add/remove songs freely. The id is the part of the link after "watch?v=" (the video must allow embedding).
  // Set shuffle: true to mix the order for each visitor. Empty the list to hide the music button.
  music: {
    shuffle: false,
    playlist: [
      { id: "2Vv-BfVoq4g", title: "Perfect · Ed Sheeran" },
      { id: "7CyVfTT8Nbo", title: "Finding Efe · Johnny Drille" },
      { id: "rtOvBOTyX00", title: "A Thousand Years · Christina Perri" },
      { id: "450p7goxZqg", title: "All of Me · John Legend" },
      { id: "2lUFM8yTtUc", title: "Ada Ada · Flavour" },
      { id: "lp-EO5I60KA", title: "Thinking Out Loud · Ed Sheeran" },
      { id: "vGJTaP6anOU", title: "Can't Help Falling in Love · Elvis Presley" },
      { id: "ShZ978fBl6Y", title: "You Are The Reason · Calum Scott" },
      { id: "bnVUHWCynig", title: "Halo · Beyoncé" },
      { id: "O1-4u9W-bns", title: "I Won't Give Up · Jason Mraz" },
      { id: "dElRVQFqj-k", title: "Marry You · Bruno Mars" },
      { id: "nSDgHBxUbVQ", title: "Photograph · Ed Sheeran" },
    ],
  },
  // // Put your song at /public/music/song.mp3 (or change the path). Set to "" to hide the music button.
  // music: "/music/song.mp3",
};

export type Wedding = typeof wedding;
