import type { PhotoKey } from "./photos";

// Website copy supplied in Seven Sea Website Content.pdf.
export type ServiceSlug = "truck-repair" | "trailer-repair" | "fleets";

export type Service = {
  slug: ServiceSlug;
  title: string;
  word: string;
  menuLine: string;
  heroTitle: string;
  metaDescription: string;
  lede: string;
  highlight: string;
  action: string;
  sticker: string;
  hero: PhotoKey;
  inset: PhotoKey;
  statement: [PhotoKey, PhotoKey];
  cardsTitle: string;
  cardsLede: string;
  tellUs: { field: string; title: string; text: string; photo: PhotoKey }[];
  gallery: [PhotoKey, PhotoKey, PhotoKey, PhotoKey];
  faqTitle: string;
  faqLede: string;
  faqAction: string;
  faqs: { question: string; answer: string }[];
  listing: {
    title: string;
    headline: string;
    description: string;
    checklistTitle: string;
    checklist: string[];
    explore: string;
    action: string;
  };
};

export const services: Service[] = [
  {
    "slug": "truck-repair",
    "title": "Truck Repair",
    "word": "Trucks",
    "menuLine": "Heavy-Duty Truck Repair",
    "heroTitle": "Your Next Haul Matters.",
    "lede": "When your truck needs attention, your business feels it. Seven Sea provides heavy-duty truck repair in Prince George, BC. Tell us what’s wrong, and let’s arrange your visit to the shop.",
    "highlight": "You know your truck. You notice when it sounds different, loses power or doesn’t feel right on the road. At Seven Sea, that’s where the conversation starts. Tell us what’s changed, and we’ll help you arrange a time to have it checked. Your truck is how you make a living. Getting it repaired matters.",
    "action": "Call for Truck Repair",
    "sticker": "Your Next Haul Matters.",
    "hero": "mechanicRed",
    "inset": "truckEngine",
    "statement": [
      "cylinderHead",
      "hands"
    ],
    "cardsTitle": "What We Need From You",
    "cardsLede": "A few details help us understand the problem and plan your visit. Share what you know. You don’t need to diagnose it yourself.",
    "tellUs": [
      {
        "field": "",
        "title": "Truck Details",
        "text": "Tell us the make, model, and year. Mention any recent repairs or previous issues that might be relevant.",
        "photo": "kenworth"
      },
      {
        "field": "",
        "title": "The Issue",
        "text": "Describe the noise, leak, warning light, or change in performance. Let us know when it started and when it happens.",
        "photo": "truckEngine"
      },
      {
        "field": "Location",
        "title": "Where Your Truck Is",
        "text": "Let us know if it’s at your yard, in town or stopped along your route, and whether you’ve arranged to bring it in.",
        "photo": "winter"
      },
      {
        "field": "",
        "title": "Your Schedule",
        "text": "Have a load booked or a deadline coming up? Tell us your timeline so we can discuss availability and plan accordingly.",
        "photo": "convoy"
      }
    ],
    "gallery": [
      "workshop",
      "wheel",
      "sparks",
      "winter"
    ],
    "faqTitle": "Truck Repair Questions, Answered.",
    "faqLede": "Have a question about your truck? Call Seven Sea to discuss the problem and arrange your visit.",
    "faqAction": "Call the Shop",
    "faqs": [
      {
        "question": "Should I call before bringing my truck in?",
        "answer": "Please call first to discuss the issue and check shop availability. Have your truck’s make, model and year ready, along with a brief description of the problem."
      },
      {
        "question": "What if I don’t know what’s wrong with my truck?",
        "answer": "You don’t need to know the cause before calling. Tell us what you’ve noticed, such as an unusual noise, a leak, a warning light or a loss of power. These details give us a useful starting point."
      },
      {
        "question": "Can I get a repair estimate over the phone?",
        "answer": "Call us to discuss the work you need. Some repairs require an assessment before the cost can be estimated, especially when the cause of the problem isn’t clear."
      },
      {
        "question": "How long will my truck repair take?",
        "answer": "Repair time depends on the problem, the work involved, parts availability and the shop’s schedule. If you have a load booked or a deadline approaching, mention it when you call."
      },
      {
        "question": "What should I bring to my repair appointment?",
        "answer": "Bring any relevant service records and details of recent repairs. If you’ve recorded fault codes or taken photos of an intermittent issue, share those with the team as well."
      },
      {
        "question": "Can I book repairs for more than one truck?",
        "answer": "Contact us with the number of trucks, the work each one needs and when they’re available. We can discuss scheduling for your fleet and the units that need attention first."
      },
      {
        "question": "Where is Seven Sea located?",
        "answer": "Seven Sea is based in Prince George, BC. Visit our contact page for the shop location and directions, or call us before heading over."
      }
    ],
    "listing": {
      "title": "Heavy-Duty Truck Repair",
      "headline": "Let’s Get Your Truck Sorted.",
      "description": "A truck problem can put your entire schedule on hold. Seven Sea provides heavy-duty truck repair to help you address the issue and get back to hauling. Call our shop to discuss your concerns and arrange a visit.",
      "checklistTitle": "Tell Us About Your Truck",
      "checklist": [
        "Make and model",
        "Symptoms you’ve noticed",
        "Warning lights or fault codes",
        "Your repair timeline"
      ],
      "explore": "Explore Truck Repairs",
      "action": "Speak to the Shop"
    },
    "metaDescription": "When your truck needs attention, your business feels it. Seven Sea provides heavy-duty truck repair in Prince George, BC. Tell us what’s wrong, and let’s arrange your visit to the shop."
  },
  {
    "slug": "trailer-repair",
    "title": "Trailer Repair",
    "word": "Trailers",
    "menuLine": "Ready for the Next Load.",
    "heroTitle": "Every Load Counts.",
    "lede": "Your trailer carries the load your business depends on. Seven Sea provides heavy-duty trailer repair in Prince George, BC. Tell us what needs attention, and we’ll help you arrange a time to bring it in.",
    "highlight": "A truck can be ready to go, but a trailer problem can hold up the whole trip. That means a load waiting, a delivery delayed, and a schedule to rethink. At Seven Sea, we understand what’s riding on the repair. Tell us what needs attention and when your trailer is available, so we can plan a visit to the shop.",
    "action": "Call for Trailer Repair",
    "sticker": "Every Load Counts.",
    "hero": "reefer",
    "inset": "wheel",
    "statement": [
      "fleetYard",
      "wrenches"
    ],
    "cardsTitle": "Let’s Plan Your Trailer Repair",
    "cardsLede": "Have these details ready when you call. They help us understand the issue and discuss a suitable time to bring your trailer in.",
    "tellUs": [
      {
        "field": "",
        "title": "Trailer Details",
        "text": "Share your trailer’s type, make, year, and length, if available. Mention any recent repairs related to the problem.",
        "photo": "reefer"
      },
      {
        "field": "",
        "title": "What Needs Attention",
        "text": "Describe the fault or damage you’ve noticed, when it started, and how it’s affecting the trailer. Photos can help explain the issue.",
        "photo": "wheel"
      },
      {
        "field": "",
        "title": "Current Location",
        "text": "Tell us where the trailer is, if it’s loaded or empty, and how you plan to bring it to the shop.",
        "photo": "fleetYard"
      },
      {
        "field": "",
        "title": "Your Schedule",
        "text": "Let us know your next pickup or delivery date, or a gap between loads when you can arrange repairs.",
        "photo": "convoy"
      }
    ],
    "gallery": [
      "convoy",
      "hands",
      "cylinderHead",
      "truckRow"
    ],
    "faqTitle": "Questions About Trailer Repair?",
    "faqLede": "Need to discuss a fault, damage, or a repair date? Call Seven Sea with your trailer details.",
    "faqAction": "Talk to the Shop",
    "faqs": [
      {
        "question": "What types of trailers do you repair?",
        "answer": "Call us with your trailer’s type, make, and the work it needs. We’ll confirm if our shop can handle the repair before you arrange to bring it in."
      },
      {
        "question": "Should I book before bringing my trailer in?",
        "answer": "Please call ahead to check availability and discuss the problem. This also gives us a chance to go over any drop-off requirements."
      },
      {
        "question": "What if the problem only happens sometimes?",
        "answer": "Tell us when it happens and what you notice. Photos, videos and notes from the driver can help explain an issue that may not be obvious when the trailer arrives."
      },
      {
        "question": "Does my trailer need to be empty for repairs?",
        "answer": "That depends on the work required. Let us know if the trailer is loaded when you call, so we can discuss access and confirm how it should arrive."
      },
      {
        "question": "Can I get an estimate before bringing it in?",
        "answer": "We can discuss your repair needs over the phone, but some issues require an assessment before we can estimate the cost. Share as much detail as you can about the fault or damage."
      },
      {
        "question": "How long will the repair take?",
        "answer": "Timing depends on the issue, parts availability and the shop’s workload. Mention your next load or delivery deadline when booking so we can discuss the schedule."
      },
      {
        "question": "Can I arrange repairs for several fleet trailers?",
        "answer": "Yes. Contact us with the number of trailers, the issues affecting each unit and their availability. We can discuss booking the work around your fleet schedule."
      }
    ],
    "listing": {
      "title": "Trailer Repair",
      "headline": "Ready for the Next Load.",
      "description": "A working truck needs a working trailer. Seven Sea provides trailer repairs to address wear, damage and problems that disrupt your deliveries. Contact our shop to discuss the issue and arrange a time to bring it in.",
      "checklistTitle": "Tell Us About Your Trailer",
      "checklist": [
        "Trailer type and model",
        "Faults or damage you’ve noticed",
        "When the issue started",
        "Your preferred repair date"
      ],
      "explore": "Explore Trailer Repairs",
      "action": "Discuss Your Trailer Repair"
    },
    "metaDescription": "Your trailer carries the load your business depends on. Seven Sea provides heavy-duty trailer repair in Prince George, BC. Tell us what needs attention, and we’ll help you arrange a time to bring it in."
  },
  {
    "slug": "fleets",
    "title": "Owner-operators and Fleets",
    "word": "Fleets",
    "menuLine": "Owner-Operator & Fleet Support",
    "heroTitle": "Your Equipment. Your Business. Our Support.",
    "lede": "Truck and trailer repair for owner-operators and fleets in Prince George, BC. From the truck you drive every day to the units you manage, Seven Sea helps you arrange repairs with your operating schedule in mind.",
    "highlight": "When you own the truck, downtime comes out of your pocket. When you manage a fleet, it means rearranging drivers, loads and deliveries. At Seven Sea, we understand that repairs are a business decision as much as a mechanical one. Tell us which units need attention and when you can spare them. We’ll discuss availability and help you plan the work.",
    "action": "Discuss Your Repair Needs",
    "sticker": "Your Equipment. Your Livelihood.",
    "hero": "fleetYard",
    "inset": "truckRow",
    "statement": [
      "winter",
      "workshop"
    ],
    "cardsTitle": "Good Planning Starts Here",
    "cardsLede": "One truck or several units, these details help us discuss the work, check availability and coordinate your booking.",
    "tellUs": [
      {
        "field": "",
        "title": "Your Equipment",
        "text": "Tell us how many trucks or trailers need attention. Include their make, model and unit numbers to help identify each one.",
        "photo": "truckRow"
      },
      {
        "field": "",
        "title": "Repair Needs",
        "text": "Share the issues affecting each vehicle, along with any relevant repair history. Let us know which concerns are your priority.",
        "photo": "wrenches"
      },
      {
        "field": "",
        "title": "Availability",
        "text": "Tell us when each unit can come into the shop and when it’s next needed for work. We’ll use those dates to discuss scheduling.",
        "photo": "winter"
      },
      {
        "field": "",
        "title": "Main Contact",
        "text": "Provide the name and number of the person handling the booking, repair decisions and collection arrangements.",
        "photo": "hands"
      }
    ],
    "gallery": [
      "convoy",
      "mechanicRed",
      "sparks",
      "reefer"
    ],
    "faqTitle": "Questions About Your Repair Plans?",
    "faqLede": "Managing one truck or several units? Call us to discuss the work you need and the dates you have available.",
    "faqAction": "Discuss Your Equipment",
    "faqs": [
      {
        "question": "Do you work with individual owner-operators?",
        "answer": "Yes. You don’t need a fleet to work with Seven Sea. Contact us about your truck or trailer, explain the issue and check availability for a shop visit."
      },
      {
        "question": "Can we arrange repairs for several fleet units?",
        "answer": "Yes. Share the number of trucks and trailers, the work each unit needs and your priorities. We can then discuss suitable booking dates."
      },
      {
        "question": "Can we bring units in at different times?",
        "answer": "Talk to us about bringing units in separately. Scheduling depends on shop availability and the work required, so share the dates each vehicle can be taken off the road."
      },
      {
        "question": "What information do you need to plan fleet repairs?",
        "answer": "Provide the make, model and unit number for each vehicle, a description of its issues and any relevant service history. Include your preferred drop-off dates and upcoming deadlines."
      },
      {
        "question": "Can our fleet manager handle the booking?",
        "answer": "Yes. Nominate a main contact when arranging the work. Let us know who will handle repair decisions, scheduling and collection, along with their contact details."
      },
      {
        "question": "Can you estimate costs for multiple units?",
        "answer": "Contact us to discuss each unit’s repair needs. Some work requires an assessment before an estimate can be prepared, particularly when the cause of a fault is unclear."
      },
      {
        "question": "What if our operating schedule changes?",
        "answer": "Call us as soon as your plans change. We can review availability and discuss a revised booking. Early notice gives us more time to coordinate the work."
      }
    ],
    "listing": {
      "title": "Owner-Operator & Fleet Support",
      "headline": "Your Equipment. Your Livelihood.",
      "description": "Every truck off the road affects your business. Seven Sea supports owner-operators and fleets with truck and trailer repairs. Discuss your priorities and vehicle availability with us so we can plan the work around your operating needs.",
      "checklistTitle": "Let’s Plan Your Repairs",
      "checklist": [
        "Number and type of units",
        "Repairs each unit needs",
        "Available drop-off dates",
        "Main contact for updates"
      ],
      "explore": "Explore Fleet Support",
      "action": "Discuss Your Equipment"
    },
    "metaDescription": "Truck and trailer repair for owner-operators and fleets in Prince George, BC. From the truck you drive every day to the units you manage, Seven Sea helps you arrange repairs with your operating schedule in mind."
  }
];

export function getService(slug: string) {
  return services.find((service) => service.slug === slug);
}
