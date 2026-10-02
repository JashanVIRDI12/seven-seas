# Seven Sea creative brief

## Revision, 2026-10-02

The client rejected the first build (industrial editorial: dense rules,
all-caps labels, little interaction). The new direction, in the client's
words: premium and simple, full GSAP and interactive, good cards, components
that feel right for a repair business, every element aligned and meaningful.

## Revision 2, 2026-10-02

The client asked for a red and blue theme, more polish and more engaging
GSAP, drawing on Framer University and 21st.dev components. DESIGN.md maps
each section to the component that inspired it. The amber "Service Bay"
palette below is superseded by red, Seven Sea blue and ink.

## Decisions (revision 1, structure still current)

1. **Vibe:** "Service Bay." Calm, premium automotive service, not a
   magazine. Marine night and fog, beacon amber for action.
2. **Feeling:** "These people are serious, local, and one call away."
3. **Signature:** "The road back," a pinned route where a truck with an
   amber beacon drives through the four real steps of a repair.
4. **Cards with jobs:** every card holds one decision or fact: a service and
   what to have ready, the rating, the local time, the address, fleets.
5. **Bookends:** the hero photo frame and the closing amber panel both open
   from an inset card to full width.
6. **Honesty:** only verified facts. Two confirmed services, the 4.9 Google
   rating with no invented review count or quotes, no published hours, no
   24/7 claim, no booking form.

## Feeling curve

| Beat        | Section          | Device                                   |
| ----------- | ---------------- | ---------------------------------------- |
| Arrival     | Preloader, hero  | Mark draws, type rises, frame opens      |
| Scope       | Ticker           | Velocity-reactive loop                   |
| Urgency     | Statement        | Scroll-filled sentence, inline photos    |
| Choice      | Services         | Unveiled tilt cards with info sheets     |
| Momentum    | The road back    | Pinned horizontal route (the peak)       |
| Belonging   | Local bento      | Count-up rating, live clock, panorama    |
| Reassurance | FAQ              | Animated native accordion                |
| Action      | Call to action   | Opening amber panel, magnetic call       |

## Content still needed from the client

- Real shop, team and work photography (the biggest remaining upgrade).
- Any further confirmed services (brakes, electrical, inspections and so
  on). Adding them to `data/business.ts` adds cards automatically.
- Verified weekly hours and whether emergency or mobile service is offered.
- Review text the client has permission to quote.
