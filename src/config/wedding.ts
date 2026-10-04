// ✏️  Edit everything about the wedding here. The whole site reads from this file.

export const wedding = {
  bride: "Adaeze",
  groom: "Kelechi",
  initials: "A & K",
  hashtag: "#AKForever2027",

  // ISO date-time of the main ceremony (used for the countdown). Include timezone offset.
  date: "2027-04-17T10:00:00+01:00",
  displayDate: "Saturday, 17th April 2027",
  displayTime: "10:00 AM",
  city: "Lagos, Nigeria",

  inviteLine: "Together with their families, joyfully invite you to celebrate their wedding",

  events: [
    {
      title: "Traditional Wedding",
      date: "Friday, 16th April 2027",
      time: "12:00 PM",
      venue: "The Garden Event Centre",
      address: "12 Example Road, Lekki, Lagos",
      mapUrl: "https://maps.google.com/?q=Lekki+Lagos",
      icon: "🥁",
    },
    {
      title: "Church Ceremony",
      date: "Saturday, 17th April 2027",
      time: "10:00 AM",
      venue: "St. Example Cathedral",
      address: "4 Cathedral Avenue, Victoria Island, Lagos",
      mapUrl: "https://maps.google.com/?q=Victoria+Island+Lagos",
      icon: "💒",
    },
    {
      title: "Reception",
      date: "Saturday, 17th April 2027",
      time: "2:00 PM",
      venue: "The Grand Ballroom",
      address: "1 Celebration Close, Ikoyi, Lagos",
      mapUrl: "https://maps.google.com/?q=Ikoyi+Lagos",
      icon: "🥂",
    },
  ],

  // Shown as an embedded map under the events. Use any Google Maps search text.
  mapEmbedQuery: "Ikoyi, Lagos",

  story: [
    { year: "2019", title: "First Hello", text: "We met at a friend's birthday party and talked until the music stopped." },
    { year: "2020", title: "First Date", text: "Suya, laughter, and a walk that lasted way longer than planned." },
    { year: "2023", title: "Growing Together", text: "Through every season we chose each other, again and again." },
    { year: "2026", title: "The Proposal", text: "One knee, one ring, one very happy YES!" },
  ],

  dressCode: {
    note: "Come dressed in shades of blush, gold and cream. Let's paint the day in love!",
    colors: [
      { name: "Blush", hex: "#F4B6C2" },
      { name: "Gold", hex: "#C9A24D" },
      { name: "Cream", hex: "#FFF3E2" },
      { name: "Rose", hex: "#D9667B" },
    ],
  },

  // Put photos in /public/images/gallery and list them here, e.g. "/images/gallery/1.jpg".
  // Empty entries show pretty placeholder tiles until you add real photos.
  gallery: ["", "", "", "", "", ""] as string[],

  gifts: {
    note: "Your presence is the greatest gift. If you'd like to bless us further, here are the details:",
    accounts: [
      { label: "Bank", value: "Example Bank" },
      { label: "Account Name", value: "Adaeze & Kelechi" },
      { label: "Account Number", value: "0123456789", copy: true },
    ],
  },

  // Put your song at /public/music/song.mp3 (or change the path). Set to "" to hide the music button.
  music: "/music/song.mp3",
};

export type Wedding = typeof wedding;
