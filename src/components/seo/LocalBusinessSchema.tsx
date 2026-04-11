import { SITE_CONFIG } from "@/constants/site";

export function LocalBusinessSchema() {
  const schema = {
    "@context": "https://schema.org",
    "@type": ["LocalBusiness", "AutoRepair"],
    name: SITE_CONFIG.name,
    description: SITE_CONFIG.description,
    url: SITE_CONFIG.url,
    telephone: SITE_CONFIG.phone,
    email: SITE_CONFIG.email,
    foundingDate: String(SITE_CONFIG.since),
    address: {
      "@type": "PostalAddress",
      streetAddress: SITE_CONFIG.address.street,
      addressLocality: SITE_CONFIG.address.city,
      addressRegion: SITE_CONFIG.address.state,
      postalCode: SITE_CONFIG.address.zip,
      addressCountry: "US",
    },
    geo: {
      "@type": "GeoCoordinates",
      latitude: 33.8675,
      longitude: -118.0051,
    },
    openingHoursSpecification: [
      {
        "@type": "OpeningHoursSpecification",
        dayOfWeek: [
          "Monday",
          "Tuesday",
          "Wednesday",
          "Thursday",
          "Friday",
          "Saturday",
        ],
        opens: "09:00",
        closes: "17:00",
      },
    ],
    priceRange: "$$",
    areaServed: SITE_CONFIG.areaServed.map((city) => ({
      "@type": "City",
      name: city,
    })),
    brand: SITE_CONFIG.brands.map((brand) => ({
      "@type": "Brand",
      name: brand,
    })),
    sameAs: [SITE_CONFIG.social.yelp, SITE_CONFIG.social.facebook].filter(
      Boolean
    ),
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  );
}
