# MorePower2You Design System

## Positioning
MorePower2You should feel like boutique luxury plus enterprise coordination: warm, polished, capable, and practical. The site should never feel like a generic SaaS template or a cheap gift basket catalog.

## Hero Concepts Considered
1. **The Concierge Table**: editorial tabletop scene with premium packaging, product swatches, recipient cards, and fulfillment notes. Strongest concept because it communicates taste and operations at once.
2. **The Fulfillment Atelier**: light warehouse/studio scene with organized shelves, gift boxes, labels, and shipping prep. Useful for logistics credibility, but less immediately premium.
3. **The VIP Drop**: close-up of a refined black-free neutral gift box for loyalty/VIP programs, with subtle game-inspired objects. Strong for the gaming page, narrower for the homepage.

Implemented direction: **The Concierge Table**, using current-site image context as local placeholders until premium generated imagery is produced.

## Identity Direction
Wordmark: MorePower2You in an elegant serif-led lockup with a small monogram symbol. The monogram uses an understated “M” in a refined square seal. Avoid lightning bolts, gimmicks, childish symbols, and fake luxury crests.

## Implemented Logo Lockups
The early identity direction has been expanded into version-specific live marks. Each version now uses a cleaned image asset cropped from the generated logo sheet, rendered through `next/image` with accessible link text.

- V1: refined serif wordmark with an understated MP gift-concierge seal in warm taupe and muted gold.
- V2: modern circular MP mark with deep teal, champagne accenting, and a heavier sans wordmark.
- V3: sharper 2026 geometric M2 mark with ink navy, luminous teal, and champagne facets.

Avoid lightning bolts, gimmicks, childish symbols, fake luxury crests, fake client logos, and raster-only wordmarks.

## Palette
- Porcelain: `#fbfaf7`
- Ivory: `#f6efe5`
- Charcoal: `#191714`
- Stone: `#676057`
- Champagne: `#dccaa7`
- Muted gold: `#a97f2d`
- Soft sage: `#d9e2da`
- Deep green: `#263d35`
- Clay accent: `#9a6255`

The palette is warm but not one-note beige. Sage, green, clay, and charcoal keep the system editorial and grounded.

## Typography
- Headlines: Cormorant Garamond for English.
- Body: Inter.
- Hebrew: Heebo through `next/font/google`, with Noto Sans Hebrew and Arial fallbacks. V1 applies this same RTL stack to headings, cards, buttons, navigation, and body text.
- Letter spacing remains `0`; avoid compressed luxury typography that harms readability.

## Layout
- Maximum content width: 1180px.
- Cards use 8px radius or less.
- Sections are full-width bands, not cards inside cards.
- Buttons use stable height, clear labels, and restrained motion.
- RTL pages reverse directional details and use Hebrew typography.

## Buttons
Primary buttons are deep green with white text. Secondary buttons are light with champagne borders. Primary CTA language:
- English: “Start a Custom Gifting Project”
- Hebrew: “התחילו פרויקט מתנות מותאם”

## Cards
Cards are used only for repeated service, industry, testimonial, gallery, post, resource, and case-study items. Avoid nested cards.

## Icons
Use lucide icons sparingly for service category signals and tool buttons. Icons should support scanning, not decorate every sentence.

## Photography Direction
Use premium editorial photography:
- warm neutral background
- high-end packaging
- clean product spacing
- realistic corporate/lifestyle context
- no recognizable client logos
- no copyrighted characters
- no fake brand packaging
- no dark nightclub luxury styling
- no generic cheap gift basket look

## Motion
Use subtle hover lift and shadow only. Respect reduced-motion preferences. No background video.

## Tone
Professional, warm, premium, and truthful. Avoid invented client names, awards, hard guarantees, years in business, exact statistics, or public address details.

## Version 2 Exploration
V2 is retired from public routing. Old `/v2` and `/he/v2` preview paths redirect to matching V1 pages.

V2 keeps the same page flow and copy, but changes the visual language:
- cooler porcelain/white base
- ink navy text
- deep teal primary accents
- champagne secondary accents
- sharper card borders and top accent rules
- English fonts: Plus Jakarta Sans body, DM Serif Display headings
- Hebrew fonts: inherited Heebo RTL stack
- subtle entrance motion, hover lift, hero image float, and line-sweep detail

The direction should feel more modern, professional, sharp, inviting, and trustworthy while preserving the turnkey gifting content strategy from V1.

## Version 3 Exploration
V3 is retired from public routing. Old `/v3` and `/he/v3` preview paths redirect to matching V1 pages.

V3 pushes the site toward a sharper 2026 professional direction:
- porcelain/white base with ink graphite
- luminous teal primary system
- champagne/gold signal accents
- advanced glass-like cards, precision grid surfaces, and side accent rules
- Plus Jakarta Sans for English headings/body for a sharper unified look
- Heebo for Hebrew headings/body for a modern RTL interface feel
- more advanced motion: load-in blur/rise, scanning hero line, button sheen, subtle orbital accents, generated image layer in the hero

Generated image-model assets are saved in `public/generated-assets/`:
- `logo-exploration-v1-v2-v3.png`
- `image-contact-sheet-gifting.png`

The live header logos are still rendered in code for crisp text and accessibility, using the generated logo sheet as art direction rather than relying on raster text.
