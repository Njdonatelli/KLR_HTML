/**
 * Single source of truth for KLR Build's public-facing business facts.
 *
 * California Business & Professions Code §7030.5 requires the contractor
 * license number to appear on all advertising, which includes this website —
 * so `license.number` is rendered in the footer, the contact block, and the
 * LocalBusiness structured data. Change it here and it changes everywhere.
 */

export const site = {
  name: "KLR Build",
  legalName: "KLR Build LLC",
  tagline: "Designed with intent. Built to endure.",
  url: "https://klrbuild.com",

  phone: {
    /** E.164, for tel: hrefs and structured data. */
    e164: "+16197391135",
    /** Human-readable, for display. */
    display: "(619) 739-1135",
  },

  email: "klrbuildllc@gmail.com",

  address: {
    street: "697 Chimney Rock Dr",
    city: "Oceanside",
    state: "CA",
    zip: "92058",
    country: "US",
  },

  license: {
    /** CSLB contractor license number — required on advertising per §7030.5. */
    number: "1148814",
    /** Rendered form. Keep the "CSLB" prefix so the disclosure is unambiguous. */
    display: "CSLB Lic. #1148814",
  },

  /** Counties the crew actually travels to. Used in copy and in areaServed. */
  serviceArea: ["North San Diego County", "San Diego County"],

  hours: {
    /** schema.org openingHours shorthand. */
    schema: ["Mo-Fr 07:00-17:00", "Sa 08:00-14:00"],
    display: "Mon–Fri 7am–5pm · Sat 8am–2pm",
  },
} as const;

/** "697 Chimney Rock Dr, Oceanside, CA 92058" */
export const formattedAddress = `${site.address.street}, ${site.address.city}, ${site.address.state} ${site.address.zip}`;

export const telHref = `tel:${site.phone.e164}`;
export const mailtoHref = `mailto:${site.email}`;
