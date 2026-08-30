import type { Person } from "@/types/opportunity";

/**
 * Development fixtures. Every person here is invented.
 *
 * No investment history, portfolio performance or returns are stated anywhere,
 * and none may be added. Investor records describe stated intent only.
 */

export const devPeople: Person[] = [
  {
    id: "b2d4e6f8-0a1c-4e3d-8f5a-7c9e1b3d5f01",
    slug: "farzana-huq",
    name: "Farzana Huq",
    headline:
      "Backing early-revenue businesses in agriculture, hospitality and food supply across South Asia.",
    roles: ["investor", "advisor"],
    location: { city: "Dhaka", region: "Dhaka Division", country: "Bangladesh" },
    avatarUrl: null,
    activityStatus: "actively_looking",
    lookingFor: ["capital"],
    canOffer: [
      "Supply chain operating experience",
      "Wholesale buyer introductions",
      "Board-level advisory",
    ],
    verification: [
      {
        kind: "identity",
        status: "identity_verified",
        statement: "Government ID verified in May 2026.",
        verifiedAt: "2026-05-12T00:00:00.000Z",
      },
      {
        kind: "company_registration",
        status: "evidence_verified",
        statement: "Investment vehicle registration reviewed against the public register.",
        verifiedAt: "2026-05-19T00:00:00.000Z",
      },
    ],
    isDevData: true,
  },
  {
    id: "b2d4e6f8-0a1c-4e3d-8f5a-7c9e1b3d5f02",
    slug: "arif-mahmud",
    name: "Arif Mahmud",
    headline:
      "Backend and infrastructure engineer looking for a founding role in something with real operational depth.",
    roles: ["talent", "operator"],
    location: { city: "Dhaka", region: "Dhaka Division", country: "Bangladesh" },
    avatarUrl: null,
    activityStatus: "actively_looking",
    lookingFor: ["co_founder"],
    canOffer: [
      "Distributed systems",
      "Payments integration",
      "Team building from zero",
    ],
    verification: [
      {
        kind: "identity",
        status: "identity_verified",
        statement: "Government ID verified in July 2026.",
        verifiedAt: "2026-07-04T00:00:00.000Z",
      },
    ],
    isDevData: true,
  },
  {
    id: "b2d4e6f8-0a1c-4e3d-8f5a-7c9e1b3d5f03",
    slug: "nadia-rahman",
    name: "Nadia Rahman",
    headline:
      "Twelve years in FMCG distribution. Advising founders on getting a product into physical retail.",
    roles: ["advisor", "partner"],
    location: { city: "Chattogram", region: "Chattogram Division", country: "Bangladesh" },
    avatarUrl: null,
    activityStatus: "exploring",
    lookingFor: ["partner", "expertise"],
    canOffer: [
      "Retail distribution strategy",
      "Route-to-market design",
      "Distributor negotiations",
    ],
    verification: [
      {
        kind: "identity",
        status: "identity_verified",
        statement: "Government ID verified in June 2026.",
        verifiedAt: "2026-06-27T00:00:00.000Z",
      },
    ],
    isDevData: true,
  },
  {
    id: "b2d4e6f8-0a1c-4e3d-8f5a-7c9e1b3d5f04",
    slug: "shafiq-anwar",
    name: "Shafiq Anwar",
    headline:
      "Built and sold a regional logistics operator. Now investing in and advising delta-region infrastructure.",
    roles: ["investor", "founder", "operator"],
    location: { city: "Khulna", region: "Khulna Division", country: "Bangladesh" },
    avatarUrl: null,
    activityStatus: "actively_looking",
    lookingFor: ["capital", "partner"],
    canOffer: [
      "Logistics operations",
      "Fleet financing structures",
      "Regional expansion planning",
    ],
    verification: [
      {
        kind: "identity",
        status: "identity_verified",
        statement: "Government ID verified in April 2026.",
        verifiedAt: "2026-04-18T00:00:00.000Z",
      },
      {
        kind: "company_registration",
        status: "evidence_verified",
        statement: "Investment vehicle registration reviewed against the public register.",
        verifiedAt: "2026-04-25T00:00:00.000Z",
      },
    ],
    isDevData: true,
  },
  {
    id: "b2d4e6f8-0a1c-4e3d-8f5a-7c9e1b3d5f05",
    slug: "tasnim-jahan",
    name: "Tasnim Jahan",
    headline:
      "Product designer who has taken three consumer products from first sketch to launch.",
    roles: ["talent"],
    location: { city: "Dhaka", region: "Dhaka Division", country: "Bangladesh" },
    avatarUrl: null,
    activityStatus: "exploring",
    lookingFor: ["co_founder", "talent"],
    canOffer: [
      "End-to-end product design",
      "Design systems",
      "User research in Bangla-first contexts",
    ],
    verification: [
      {
        kind: "identity",
        status: "identity_verified",
        statement: "Government ID verified in August 2026.",
        verifiedAt: "2026-08-08T00:00:00.000Z",
      },
    ],
    isDevData: true,
  },
  {
    id: "b2d4e6f8-0a1c-4e3d-8f5a-7c9e1b3d5f06",
    slug: "imtiaz-chowdhury",
    name: "Imtiaz Chowdhury",
    headline:
      "Credit risk specialist. Interested in joining a team building lending infrastructure for small retail.",
    roles: ["talent", "advisor"],
    location: { city: "Dhaka", region: "Dhaka Division", country: "Bangladesh" },
    avatarUrl: null,
    activityStatus: "actively_looking",
    lookingFor: ["co_founder"],
    canOffer: [
      "Credit risk modelling",
      "Regulatory engagement",
      "Lender partnership structuring",
    ],
    verification: [
      {
        kind: "identity",
        status: "identity_verified",
        statement: "Government ID verified in July 2026.",
        verifiedAt: "2026-07-30T00:00:00.000Z",
      },
    ],
    isDevData: true,
  },
];
