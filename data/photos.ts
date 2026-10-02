/**
 * The complete image catalogue for the site. Created with built-in image_gen
 * on 2026-10-03; these are illustrations, not company documentary photographs.
 * Prompts: docs/image-prompts.json. Native masters: assets/image-masters/.
 */
export type Photo = {
  src: string;
  title: string;
  alt: string;
  focus: string;
  promptId: string;
  provenance: "AI-generated illustration";
};

function generatedPhoto(id: string, title: string, alt: string, focus = "50% 50%"): Photo {
  return {
    src: `/images/generated/${id}-v2.webp`,
    title,
    alt,
    focus,
    promptId: id,
    provenance: "AI-generated illustration",
  };
}

export const photos = {
  convoy: generatedPhoto(
    "convoy", "Highway freight",
    "White heavy-duty truck hauling a freight trailer on a forest-lined highway, with two trucks following",
    "75% 50%",
  ),
  engineDetail: generatedPhoto(
    "engine-detail", "Diesel engine detail",
    "Close view of a diesel engine with a cast-metal turbocharger, hoses, and a red valve cover",
  ),
  kenworth: generatedPhoto(
    "kenworth", "Heavy-duty tractor",
    "White conventional sleeper-cab truck parked outside a commercial repair bay",
    "50% 57%",
  ),
  northernRoad: generatedPhoto(
    "northern-road", "Northern highway",
    "An empty highway curves through conifer forest beside a lake and low wooded hills",
    "50% 58%",
  ),
  workshop: generatedPhoto(
    "workshop", "Repair bay",
    "Red heavy-duty truck with its hood open in a daylight-lit workshop, with a technician beside the engine",
    "45% 52%",
  ),
  mechanicRed: generatedPhoto(
    "mechanic-red", "Technician at work",
    "Technician in navy workwear and safety glasses using a wrench beside the open hood of a red truck",
    "60% 45%",
  ),
  truckEngine: generatedPhoto(
    "truck-engine", "Engine inspection",
    "A gloved hand using a ratchet on a truck engine, surrounded by hoses and metal components",
  ),
  wheel: generatedPhoto(
    "wheel", "Wheel and hub service",
    "Technician using an impact wrench at a heavy-duty wheel hub with the axle supported on a jack stand",
  ),
  reefer: generatedPhoto(
    "reefer", "Trailer at dusk",
    "White semi truck and refrigerated trailer parked beside an industrial building at blue hour",
    "50% 57%",
  ),
  winter: generatedPhoto(
    "winter", "Winter reliability",
    "White and navy truck with a freight trailer on a cleared winter road bordered by snow and conifers",
    "58% 52%",
  ),
  sparks: generatedPhoto(
    "sparks", "Trailer fabrication detail",
    "Gloved hands using an angle grinder on a secured steel frame in a workshop, with a small trail of sparks",
    "50% 48%",
  ),
  truckRow: generatedPhoto(
    "truck-row", "Fleet equipment",
    "White, blue, and red heavy-duty trucks lined up in a commercial yard under an overcast sky",
    "50% 60%",
  ),
  fleetYard: generatedPhoto(
    "fleet-yard", "Fleet yard",
    "Tractors and freight trailers in a spacious yard beside a three-bay industrial workshop and conifer forest",
    "22% 62%",
  ),
  hands: generatedPhoto(
    "hands", "Working hands",
    "A mechanic's worn hands inspecting a steel bolt over a workbench with a socket, washer, and shop rag",
  ),
  wrenches: generatedPhoto(
    "wrenches", "Heavy workshop tools",
    "Three large combination wrenches and a socket ratchet on a scratched steel workbench beside a navy shop rag",
  ),
  cylinderHead: generatedPhoto(
    "cylinder-head", "Cylinder-head work",
    "Gloved hand holding a ratchet over a diesel cylinder head with exposed valve springs on a workshop bench",
    "50% 52%",
  ),
} satisfies Record<string, Photo>;

export type PhotoKey = keyof typeof photos;
