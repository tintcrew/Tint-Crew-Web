const config = {
  title: "Tint Crew | Professional Window Tint Services in Orange County",
  description: {
    long: "Tint Crew has been Orange County's trusted window tinting experts since 1985. Authorized Llumar, Vista & Rayno dealer specializing in automotive, residential, and commercial window film. Premium ceramic tinting, paint protection film, and Tesla tinting in Buena Park, CA. Get your free quote today!",
    short:
      "Tint Crew — Family-owned window tinting in Buena Park & Orange County since 1985. Llumar, Vista & Rayno authorized dealer.",
  },
  keywords: [
    "Tint Crew",
    "window tinting",
    "Buena Park",
    "Orange County",
    "car tint",
    "ceramic tint",
    "Llumar",
    "Rayno",
    "Vista",
    "paint protection film",
    "PPF",
    "Tesla tinting",
    "residential tinting",
    "commercial tinting",
    "window film",
  ],
  author: "Tint Crew",
  email: "tintcrew@gmail.com",
  phone: "(714) 521-5633",
  site: "https://www.tintcrew.com",
  address: "6905 Oslo Circle, Ste i, Buena Park, CA 90621",

  // for github
  githubUsername: "tintcrew",
  githubRepo: "Tint-Crew-Web",

  get ogImg() {
    return this.site + "/assets/seo/og-image.png";
  },
  social: {
    yelp: "https://www.yelp.com/biz/tint-crew-buena-park",
    facebook: "https://www.facebook.com/tintcrew1/",
    instagram: "",
    google: "",
  },
};
export { config };
