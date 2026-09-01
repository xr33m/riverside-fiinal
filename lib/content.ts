/**
 * Shared marketing content used by both the client landing page and the
 * server-rendered JSON-LD in app/page.tsx. Keep this a plain (non-client)
 * module so the data is available on the server for structured data.
 *
 * All factual claims below are provisional and flagged for verification
 * before launch (rating, guarantee, accreditation, pricing, compliance).
 */

// FAQ copy — single source of truth for the on-page accordion and FAQPage JSON-LD.
export const faqs: [string, string][] = [
  ['Can hardscaping and porcelain paving be laid during Glasgow winters?', 'Yes. Hardscaping relies on structural excavation and frost-proof mortar systems, not plant cycles. We use covered working setups to continue installations clean through winter, saving you from spring waitlists.'],
  ['How do you fix heavy Glasgow clay soil drainage issues?', 'We excavate past the clay layer, install geotextile separation membranes, and use a deep MOT Type 1 sub-base engineered specifically for heavy Scottish rainfall.'],
  ['How much does a porcelain patio cost in Bearsden or Newton Mearns?', 'Fully installed porcelain paving with excavation, sub-base preparation, and integrated drainage ranges between £120 and £180 per m².'],
]
