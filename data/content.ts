// Website copy supplied in Seven Sea Website Content.pdf.

export const navLinks = [
  { label: "Services", id: "services", href: "/services" },
  { label: "About", id: "about", href: "/about" },
  { label: "How it works", id: "process", href: "/how-it-works" },
  { label: "Contact", id: "contact", href: "/contact" },
] as const;

export const scope = [
  "Truck repair",
  "Trailer repair",
  "Owner-operators",
  "Fleets",
  "Prince George, BC",
  "Northern BC",
] as const;

export const serviceCards = [
  {
    "id": "truck-repair",
    "tone": "light",
    "title": "Truck Repair",
    "description": "Heavy-duty truck repairs to address the problems interrupting your haul. Tell us what you’re noticing, and we’ll help you arrange a visit to the shop.",
    "prompt": "Have your truck’s make, model, and symptoms ready.",
    "action": "Book Truck Repair"
  },
  {
    "id": "trailer-repair",
    "tone": "blue",
    "title": "Trailer Repair",
    "description": "Your trailer works as hard as your truck. Get repair support to address faults, restore function, and prepare it for the next load.",
    "prompt": "Tell us your trailer type and what needs attention.",
    "action": "Book Trailer Repair"
  },
  {
    "id": "fleets",
    "tone": "red",
    "title": "Owner-Operators & Fleets",
    "description": "Repair support for a single working truck or multiple fleet units. Talk to us about your equipment and schedule so we can help plan the work.",
    "prompt": "Arrange repairs around your operating needs.",
    "action": "Discuss Your Repair Needs"
  }
] as const;

export const checklist = [
  "Your truck’s make and model or trailer type",
  "The issue and when you first noticed it",
  "Any warning lights or fault codes",
  "Your preferred date to bring it in"
] as const;

export const steps = [
  {
    "title": "Tell Us What’s Wrong",
    "text": "Call with your vehicle details and the issues you’ve noticed. We’ll discuss your repair needs and shop availability.",
    "stop": "Call"
  },
  {
    "title": "Arrange Your Visit",
    "text": "Choose a time to bring your truck or trailer in. Share your schedule and any concerns you want us to check.",
    "stop": "Visit"
  },
  {
    "title": "Assessment & Repair",
    "text": "At the shop, we assess the issue, explain the recommended work and carry out the repairs you approve.",
    "stop": "Repair"
  },
  {
    "title": "Collect Your Vehicle",
    "text": "We’ll let you know when the work is complete and walk you through the repairs before you leave.",
    "stop": "Collect"
  }
] as const;

export const stepPages = [
  {
    "photo": "winter",
    "title": "Tell Us What’s Wrong",
    "text": "Give us a call with your truck or trailer details and the issue you’ve noticed.",
    "more": "You don’t need to diagnose the problem before calling. Describe what’s changed and when it started. We’ll ask a few questions and discuss availability for a shop visit."
  },
  {
    "photo": "truckEngine",
    "title": "Arrange Your Visit",
    "text": "We’ll confirm if we can take on the work and find a suitable time for you to bring your equipment in.",
    "more": "Share your availability and any deadlines we should know about. We’ll discuss the booking and drop-off details. If the problem needs an assessment before we can estimate the cost, we’ll explain that too."
  },
  {
    "photo": "workshop",
    "title": "We Get to Work",
    "text": "Bring your truck or trailer in at the agreed time so we can assess the problem and discuss the repairs.",
    "more": "We’ll explain what needs attention and confirm the work with you before proceeding. If we find anything that changes the repair plan, we’ll contact you to discuss the next steps."
  },
  {
    "photo": "convoy",
    "title": "Ready for Your Next Job",
    "text": "Once the repairs are complete, we’ll let you know your truck or trailer is ready to collect.",
    "more": "Before you leave, we’ll go over the work completed and any follow-up recommendations. It’s your chance to ask questions and understand what’s been done."
  }
] as const;

export const processChecklist = [
  "Truck make and model or trailer type",
  "Symptoms, damage or changes in performance",
  "Any warning lights or fault codes",
  "Your location and preferred repair date"
] as const;

export const faqs = [
  {
    "question": "What does Seven Sea repair?",
    "answer": "We provide heavy-duty truck and trailer repair. Contact our shop with your vehicle details and the issue you’re experiencing to discuss the work you need."
  },
  {
    "question": "How do I book a repair?",
    "answer": "Call our team to discuss your repair needs and arrange a time to bring your truck or trailer into the shop."
  },
  {
    "question": "Where is Seven Sea located?",
    "answer": "Our shop is in Prince George, BC. Check our contact page for directions and location details."
  },
  {
    "question": "What information should I have ready when I call?",
    "answer": "Have your truck’s make and model or trailer type, a description of the problem, and any warning lights or fault codes available."
  },
  {
    "question": "Do you work with owner-operators and fleets?",
    "answer": "Yes. We support individual owner-operators and fleet customers. If several units need repairs, contact us to discuss scheduling."
  },
  {
    "question": "How long will my repair take?",
    "answer": "Timing depends on the issue, the work required, parts availability and the shop’s schedule. Discuss your deadline with our team when arranging your visit."
  },
  {
    "question": "Can I call if I’m unsure what’s wrong?",
    "answer": "Yes. Describe what you’ve noticed, such as unusual noises, warning lights or changes in performance. These details help us understand your concern before assessing the vehicle."
  }
] as const;

export const processFaqs = [
  {
    "question": "How do I arrange a repair?",
    "answer": "Call Seven Sea with your truck or trailer details and a description of the problem. We’ll discuss the work, check availability and arrange a suitable time for your visit."
  },
  {
    "question": "What if I don’t know what’s causing the problem?",
    "answer": "You don’t need to diagnose it yourself. Tell us what you’ve noticed, when it started and any warning lights or changes in performance."
  },
  {
    "question": "What should I have ready before my visit?",
    "answer": "Have your vehicle details, contact information and any relevant repair records ready. Fault codes, photos and notes about the issue can also help us understand the concern."
  },
  {
    "question": "Can I get an estimate over the phone?",
    "answer": "Some repairs need an assessment before we can estimate the cost. Explain the issue when you call, and we’ll discuss what’s needed to provide an estimate."
  },
  {
    "question": "Will you discuss the repairs with me before starting?",
    "answer": "We’ll explain the recommended work and confirm it with you before proceeding. If we find something that changes the plan, we’ll contact you to discuss it."
  },
  {
    "question": "How long will my truck or trailer be at the shop?",
    "answer": "Timing depends on the repair, parts availability and the shop’s schedule. Let us know about any upcoming loads or deadlines so we can discuss a realistic timeframe."
  },
  {
    "question": "How will I know when it’s ready to collect?",
    "answer": "We’ll contact you when the agreed repairs are complete and arrange collection. Before you leave, we’ll review the work and any follow-up recommendations."
  }
] as const;

export const contactFaqs = [
  {
    "question": "How do I book a repair?",
    "answer": "Call the shop with your truck or trailer details and explain what needs attention. We’ll discuss availability and arrange a time to bring it in."
  },
  {
    "question": "What vehicles do you repair?",
    "answer": "Seven Sea provides heavy-duty truck and trailer repair. Share your vehicle type and the work you need when calling so we can confirm if we can help."
  },
  {
    "question": "Where is Seven Sea located?",
    "answer": "Our shop is in Prince George, BC. Use the Get Directions button to plan your route, and confirm your visit with us before setting off."
  },
  {
    "question": "Do I need to call before visiting?",
    "answer": "Yes, please call ahead to confirm shop hours and availability. This also gives us a chance to discuss your equipment and any drop-off requirements."
  },
  {
    "question": "What information should I provide when calling?",
    "answer": "Tell us your name, contact number, vehicle make and model or trailer type, and the issue you’ve noticed. Mention any deadlines that could affect your booking."
  },
  {
    "question": "Can I arrange repairs for more than one fleet vehicle?",
    "answer": "Yes, we work with fleet operators. Let us know how many units need attention, what each one needs and when they’re available so we can discuss scheduling."
  },
  {
    "question": "What if I need to change my appointment?",
    "answer": "Call the shop as soon as your plans change. We’ll check availability and discuss another suitable time for your visit."
  }
] as const;
