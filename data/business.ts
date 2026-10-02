import { photos } from "./photos";

/**
 * Contact details read directly from the public Google Maps business listing
 * on 2026-10-02. See docs/business-contact-sources.md for verification notes.
 * null means the information has not been verified.
 */
export const business = {
  businessName: "Seven Sea Truck & Trailer Repair Ltd.",
  googleBusinessName: "Seven Sea Truck Trailer Repair Shop Ltd",
  phone: "+16393360003",
  phoneDisplay: "+1 639-336-0003",
  phoneHref: "tel:+16393360003",
  address: "7063 Trygg Ct",
  city: "Prince George",
  province: "British Columbia",
  provinceCode: "BC",
  postalCode: "V2N 6Z8",
  country: "Canada",
  countryCode: "CA",
  email: null,
  website: null,
  // Google's limited public view showed Friday as open 24 hours.
  // The complete weekly schedule and 24/7 service remain unverified.
  hours: null,
  emergencyService24Hours: null,
  coordinates: {
    latitude: 53.8559524,
    longitude: -122.7996922,
  },
  googleMapsUrl:
    "https://www.google.com/maps/place/Seven+Sea+Truck+Trailer+Repair+Shop+Ltd/@53.8559524,-122.7996922,17z/data=!3m1!4b1!4m6!3m5!1s0xd86315e08dc5201:0x6c2c1aa0f8e50a8c!8m2!3d53.8559524!4d-122.7996922!16s%2Fg%2F11y5frqy6k?hl=en",
  contactVerifiedOn: "2026-10-02",
  contactSource: "Google Maps public business listing",
  googleRating: 4.9,
  // A rating was visible in the public listing. No review count or review
  // wording was verified, so neither is displayed or added to schema.
  services: [
    {
      id: "truck-repair",
      title: "Truck repair",
      description:
        "Heavy-duty truck repair at our Prince George shop. Tell us what the truck is doing and we’ll talk through the next step.",
      prompt: "Have the make, the symptoms and the truck’s location ready.",
      action: "Call about a truck",
      image: photos.kenworth.src,
      imageAlt: photos.kenworth.alt,
      imagePosition: photos.kenworth.focus,
    },
    {
      id: "trailer-repair",
      title: "Trailer repair",
      description:
        "Repairs for the trailer behind the truck. Call our team about what’s wrong and arranging a time to bring it in.",
      prompt: "Tell us the trailer type and what isn’t working.",
      action: "Call about a trailer",
      image: photos.convoy.src,
      imageAlt: photos.convoy.alt,
      imagePosition: photos.convoy.focus,
    },
  ],
} as const;
