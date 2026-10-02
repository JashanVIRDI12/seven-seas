import { business } from "./business";

/** Page copy. Every statement stays within the verified facts in business.ts. */

/**
 * `href` is where the link goes; `id` is the home-page section it
 * highlights while you read. Services has its own pages.
 */
export const navLinks = [
  { label: "Services", id: "services", href: "/services" },
  { label: "About", id: "about", href: "/about" },
  { label: "How it works", id: "process", href: "/how-it-works" },
  { label: "Contact", id: "contact", href: "/contact" },
] as const;

/** Rolled through the hero headline: "Keep the ___ moving." */
export const flipWords = ["north", "fleet", "freight", "rig"] as const;

export const scope = [
  "Truck repair",
  "Trailer repair",
  "Owner-operators",
  "Fleets",
  "Prince George, BC",
  "Northern BC",
] as const;

/**
 * The services split out of one photograph of the whole rig. The first two
 * are the verified repair categories; the third names who we work with.
 */
export const serviceCards = [
  {
    id: "truck-repair",
    tone: "light",
    title: "Truck repair",
    description:
      "Heavy-duty truck repair at our Prince George shop. Tell us what the truck is doing and we’ll talk through the next step.",
    prompt: "Have the make, the symptoms and the truck’s location ready.",
    action: "Call about a truck",
  },
  {
    id: "trailer-repair",
    tone: "blue",
    title: "Trailer repair",
    description:
      "Repairs for the trailer behind the truck. Call about what’s wrong and arranging a time to bring it in.",
    prompt: "Tell us the trailer type and what isn’t working.",
    action: "Call about a trailer",
  },
  {
    id: "fleets",
    tone: "red",
    title: "Owner-operators and fleets",
    description:
      "One truck or the whole fleet. Start with a conversation about your equipment, your schedule and the work you need arranged.",
    prompt: "Coordinating several units? Say so when you call.",
    action: "Talk to the shop",
  },
] as const;

/** What to have ready when calling about a problem. */
export const checklist = [
  "Where the truck or trailer is",
  "What it’s doing, or not doing",
  "Any warning lights or codes",
  "How soon you need it back",
] as const;

/** A real sequence, so these steps are numbered. */
export const steps = [
  {
    title: "Call the shop",
    text: "Tell us what’s happening, what you’re hauling and where the truck is now.",
    stop: "Call",
  },
  {
    title: "Talk it through",
    text: "We’ll discuss the problem and the work it needs, then arrange a time to bring it in.",
    stop: "Talk",
  },
  {
    title: "Repair at the shop",
    text: `Your truck or trailer comes to our shop at ${business.address} in ${business.city}.`,
    stop: "Repair",
  },
  {
    title: "Back on the road",
    text: "The destination never changes: your truck moving again, and the north with it.",
    stop: "Road",
  },
] as const;

/** The How it works page: a photograph and a longer note for each step. */
export const stepPages = [
  {
    photo: "winter",
    more: "Where the truck or trailer is, what it’s doing, any warning lights or codes, and how soon you need it back all help.",
  },
  {
    photo: "truckEngine",
    more: "We’ll tell you whether it’s work we can take on. Bookings and quotes are settled on the call; the website doesn’t take either.",
  },
  {
    photo: "workshop",
    more: "Please call ahead to confirm hours before you bring a truck or trailer in.",
  },
  {
    photo: "convoy",
    more: "One truck or the whole fleet, the next step always starts the same way.",
  },
] as const;

export const faqs = [
  {
    question: "How do I book a repair?",
    answer: `Call the shop at ${business.phoneDisplay}. Repairs are arranged by phone. This website doesn’t take bookings or give quotes.`,
  },
  {
    question: "What do you repair?",
    answer:
      "Heavy-duty trucks and trailers. If you’re not sure whether your problem is something we handle, call and describe it.",
  },
  {
    question: "Where is the shop?",
    answer: `${business.address}, ${business.city}, ${business.provinceCode} ${business.postalCode}. Directions open in Google Maps from the Location section.`,
  },
  {
    question: "What are your hours?",
    answer:
      "Please call ahead to confirm hours before you bring a truck or trailer in.",
  },
  {
    question: "Do you work with fleets?",
    answer:
      "Yes. Owner-operators and fleet coordinators start the same way: a call about your equipment, your schedule and the work you need arranged.",
  },
] as const;
