import { business } from "./business";
import type { PhotoKey } from "./photos";

/**
 * Service pages. Truck and trailer repair are the verified repair
 * categories; the fleet page describes who we work with, not extra work.
 * Nothing here claims a capability, price, hour or turnaround that has not
 * been confirmed: specifics are always settled on the phone.
 *
 * In `highlight`, [[double brackets]] mark the phrases the scroll
 * highlighter sweeps over.
 */

export type ServiceSlug = "truck-repair" | "trailer-repair" | "fleets";

export type Service = {
  slug: ServiceSlug;
  title: string;
  /** The giant outlined word that runs behind the chapter. */
  word: string;
  menuLine: string;
  metaDescription: string;
  lede: string;
  highlight: string;
  action: string;
  sticker: string;
  hero: PhotoKey;
  inset: PhotoKey;
  /** The pair beside the highlighted statement. */
  statement: [PhotoKey, PhotoKey];
  tellUs: { field: string; title: string; text: string; photo: PhotoKey }[];
  gallery: [PhotoKey, PhotoKey, PhotoKey, PhotoKey];
  faqs: { question: string; answer: string }[];
};

const callAhead = {
  question: "Can I bring it in without calling first?",
  answer:
    "Please call ahead. We’ll confirm hours and arrange a time to bring it in.",
};
const noQuotes = {
  question: "Can I get a quote on the website?",
  answer:
    "No. The website doesn’t give quotes or take bookings. Call the shop to talk through the work.",
};
const where = {
  question: "Where is the shop?",
  answer: `${business.address}, ${business.city}, ${business.provinceCode} ${business.postalCode}.`,
};

export const services: Service[] = [
  {
    slug: "truck-repair",
    title: "Truck repair",
    word: "Trucks",
    menuLine: "Heavy-duty trucks",
    metaDescription:
      "Heavy-duty truck repair at Seven Sea in Prince George, BC. Call to talk through what your truck is doing and arrange a time to bring it in.",
    lede: "Heavy-duty truck repair at our shop on Trygg Court in Prince George. Tell us what the truck is doing and we’ll talk through the next step.",
    highlight:
      "A truck that isn’t moving isn’t earning. [[The fastest way]] to get yours looked at is [[a phone call]]: describe what’s happening, and we’ll talk through [[whether we can take it on]] and [[when you can bring it in]].",
    action: "Call about a truck",
    sticker: "Call first, then bring it in",
    hero: "mechanicRed",
    inset: "truckEngine",
    statement: ["cylinderHead", "hands"],
    tellUs: [
      {
        field: "Unit",
        title: "The truck",
        text: "Make, model and year, plus anything you already know about its history.",
        photo: "kenworth",
      },
      {
        field: "Problem",
        title: "What it’s doing",
        text: "Warning lights, codes, noises, leaks or a truck that won’t start. Describe it the way you’d tell someone standing beside it.",
        photo: "truckEngine",
      },
      {
        field: "Location",
        title: "Where it is now",
        text: "At your yard, on the highway or already in town. We’ll talk through getting it to the shop.",
        photo: "winter",
      },
      {
        field: "Timing",
        title: "When you need it back",
        text: "A load waiting tomorrow, or planned work ahead of a busy stretch.",
        photo: "convoy",
      },
    ],
    gallery: ["workshop", "wheel", "sparks", "winter"],
    faqs: [
      callAhead,
      {
        question: "What if I’m not sure what’s wrong?",
        answer:
          "That’s fine. Describe what you’re noticing and we’ll talk you through the next step.",
      },
      noQuotes,
      where,
    ],
  },
  {
    slug: "trailer-repair",
    title: "Trailer repair",
    word: "Trailers",
    menuLine: "The load behind the truck",
    metaDescription:
      "Trailer repair at Seven Sea in Prince George, BC. Call about what isn’t working and arrange a time to bring your trailer in.",
    lede: "Repairs for the trailer behind the truck, at our Prince George shop. Call about what’s wrong and arranging a time to bring it in.",
    highlight:
      "The trailer carries the load, and the schedule with it. [[Tell us the trailer type]] and [[what isn’t working]], and we’ll talk through [[the next step]] and [[a time to bring it in]].",
    action: "Call about a trailer",
    sticker: "Tell us the trailer type",
    hero: "reefer",
    inset: "wheel",
    statement: ["fleetYard", "wrenches"],
    tellUs: [
      {
        field: "Unit",
        title: "The trailer",
        text: "Its type, such as a dry van, flatbed or reefer, and its length.",
        photo: "reefer",
      },
      {
        field: "Problem",
        title: "What isn’t working",
        text: "Lights, doors, tires, a noise or anything else you’ve noticed on the road.",
        photo: "wheel",
      },
      {
        field: "Location",
        title: "Where it is now",
        text: "Hooked up, parked at your yard or already in town.",
        photo: "fleetYard",
      },
      {
        field: "Timing",
        title: "When you need it back",
        text: "The next load it has to carry, or a quieter week to plan around.",
        photo: "convoy",
      },
    ],
    gallery: ["convoy", "hands", "cylinderHead", "truckRow"],
    faqs: [
      {
        question: "Do you work on every type of trailer?",
        answer:
          "Call and tell us the trailer type and the problem, and we’ll tell you whether it’s work we can take on.",
      },
      callAhead,
      noQuotes,
      where,
    ],
  },
  {
    slug: "fleets",
    title: "Owner-operators and fleets",
    word: "Fleets",
    menuLine: "One truck or the whole fleet",
    metaDescription:
      "Seven Sea works with owner-operators and fleets in Prince George, BC. Start with a call about your equipment, your schedule and the work you need arranged.",
    lede: "One truck or the whole fleet. Start with a conversation about your equipment, your schedule and the work you need arranged.",
    highlight:
      "Whether you drive [[your own rig]] or coordinate [[a whole fleet]], it starts the same way: [[a call about your equipment]], your schedule and [[the work you need arranged]].",
    action: "Talk to the shop",
    sticker: "One rig or the whole fleet",
    hero: "fleetYard",
    inset: "truckRow",
    statement: ["winter", "workshop"],
    tellUs: [
      {
        field: "Units",
        title: "How many units",
        text: "One rig or several, and the mix of trucks and trailers.",
        photo: "truckRow",
      },
      {
        field: "Work",
        title: "What’s due or wrong",
        text: "A problem on one unit, or work you want to plan across several.",
        photo: "wrenches",
      },
      {
        field: "Schedule",
        title: "When units can come off the road",
        text: "The windows that keep your loads moving while the work gets done.",
        photo: "winter",
      },
      {
        field: "Contact",
        title: "Who we talk to",
        text: "The driver, the owner-operator or the person coordinating the fleet.",
        photo: "hands",
      },
    ],
    gallery: ["convoy", "mechanicRed", "sparks", "reefer"],
    faqs: [
      {
        question: "Do you work with fleets?",
        answer:
          "Yes. Fleet coordinators and owner-operators start the same way: a call about your equipment, your schedule and the work you need arranged.",
      },
      {
        question: "Can we arrange work on several units?",
        answer:
          "Call to talk through how many units and your schedule, and we’ll discuss what can be arranged.",
      },
      noQuotes,
      where,
    ],
  },
];

export function getService(slug: string) {
  return services.find((service) => service.slug === slug);
}
