import type { LucideIcon } from "lucide-react";
import { Activity, BedDouble, Calculator, Camera, Car, Church, Coffee, Dumbbell, Flower, Flower2, GraduationCap, HardHat, House, PawPrint, Scale, Scissors, Smile, Sparkles, SprayCan, Stethoscope, Trees, Wine, Wrench } from "lucide-react";
import type { ThemeId } from "./moods";

import img_hair_salon from "@/assets/industries/hair-salon.jpg";
import img_barber from "@/assets/industries/barber.jpg";
import img_spa from "@/assets/industries/spa.jpg";
import img_medical from "@/assets/industries/medical.jpg";
import img_dental from "@/assets/industries/dental.jpg";
import img_physio from "@/assets/industries/physio.jpg";
import img_fitness from "@/assets/industries/fitness.jpg";
import img_yoga from "@/assets/industries/yoga.jpg";
import img_vet from "@/assets/industries/vet.jpg";
import img_law from "@/assets/industries/law-firm.jpg";
import img_accounting from "@/assets/industries/accounting.jpg";
import img_real_estate from "@/assets/industries/real-estate.jpg";
import img_cafe from "@/assets/industries/cafe.jpg";
import img_restaurant from "@/assets/industries/restaurant.jpg";
import img_guesthouse from "@/assets/industries/guesthouse.jpg";
import img_construction from "@/assets/industries/construction.jpg";
import img_plumbing from "@/assets/industries/plumbing.jpg";
import img_mechanic from "@/assets/industries/mechanic.jpg";
import img_cleaning from "@/assets/industries/cleaning.jpg";
import img_landscaping from "@/assets/industries/landscaping.jpg";
import img_florist from "@/assets/industries/florist.jpg";
import img_photography from "@/assets/industries/photography.jpg";
import img_tutoring from "@/assets/industries/tutoring.jpg";
import img_church from "@/assets/industries/church.jpg";

export interface Industry {
  id: string;
  name: string;
  group: string;
  theme: ThemeId;
  icon: LucideIcon;
  image: string;
  story: string;
  sample: { business: string; headline: string; cta: string };
}

export const INDUSTRIES: Industry[] = [
  { id: "hair-salon", name: "Hair Salon & Beauty", group: "Beauty & Grooming", theme: "boutique", icon: Scissors, image: img_hair_salon, story: "Editorial and refined — quiet luxury, beautifully booked.", sample: { business: "Belle Âme Salon", headline: "Colour, cuts & care on Kloof Street.", cta: "Book Now" } },
  { id: "barber", name: "Barbershop & Grooming", group: "Beauty & Grooming", theme: "trades", icon: Scissors, image: img_barber, story: "Sharp, confident and old-school — walk-ins welcome.", sample: { business: "Gentlemen's Quarter", headline: "Fades, beards & hot-towel shaves.", cta: "Book a Chair" } },
  { id: "spa", name: "Nail, Spa & Skincare", group: "Beauty & Grooming", theme: "boutique", icon: Sparkles, image: img_spa, story: "Soft, serene and indulgent — calm from the first tap.", sample: { business: "Lumière Day Spa", headline: "Facials, nails & deep relaxation.", cta: "Book a Treatment" } },
  { id: "medical", name: "Medical Practice & GP", group: "Health & Wellness", theme: "purpose", icon: Stethoscope, image: img_medical, story: "Calm and reassuring — care that feels personal.", sample: { business: "Sea Point Family Practice", headline: "Same-week GP appointments.", cta: "Book Appointment" } },
  { id: "dental", name: "Dental Practice", group: "Health & Wellness", theme: "corporate", icon: Smile, image: img_dental, story: "Bright, clean and gentle — nervous patients welcome.", sample: { business: "Bright Smile Dental Studio", headline: "Gentle dentistry for the whole family.", cta: "Book a Check-up" } },
  { id: "physio", name: "Physio & Allied Health", group: "Health & Wellness", theme: "hub", icon: Activity, image: img_physio, story: "Active and encouraging — back on your feet sooner.", sample: { business: "Motion Physio & Rehab", headline: "Move better, recover faster.", cta: "Book a Session" } },
  { id: "fitness", name: "Gym & Personal Training", group: "Health & Wellness", theme: "trades", icon: Dumbbell, image: img_fitness, story: "Driven and focused — results you can feel.", sample: { business: "Iron & Oak Training", headline: "1-on-1 coaching that gets results.", cta: "Start a Free Trial" } },
  { id: "yoga", name: "Yoga, Pilates & Wellness", group: "Health & Wellness", theme: "hub", icon: Flower2, image: img_yoga, story: "Light, unhurried and grounding — breathe in.", sample: { business: "Still Point Pilates", headline: "Reformer, mat & breathwork classes.", cta: "Book a Class" } },
  { id: "vet", name: "Vet & Pet Grooming", group: "Health & Wellness", theme: "cafe", icon: PawPrint, image: img_vet, story: "Warm and friendly — tails wagging guaranteed.", sample: { business: "Paws & Co. Vet", headline: "Caring for Cape Town's pets.", cta: "Book a Visit" } },
  { id: "law", name: "Law Firm & Legal", group: "Professional Services", theme: "corporate", icon: Scale, image: img_law, story: "Calm, crisp and credible — for firms that run on trust.", sample: { business: "Mitchell & Venter Attorneys", headline: "Counsel you can count on.", cta: "Book a Consultation" } },
  { id: "accounting", name: "Accounting & Financial Advisory", group: "Professional Services", theme: "corporate", icon: Calculator, image: img_accounting, story: "Clear, precise and dependable — numbers you can trust.", sample: { business: "Ledger & Lane Accountants", headline: "Tax, SARS & bookkeeping, sorted.", cta: "Book a Call" } },
  { id: "real-estate", name: "Real Estate & Property", group: "Professional Services", theme: "heritage", icon: House, image: img_real_estate, story: "Aspirational and polished — let the homes sell themselves.", sample: { business: "Atlantic Seaboard Realty", headline: "Homes with a view of forever.", cta: "View Listings" } },
  { id: "cafe", name: "Café & Bakery", group: "Food & Hospitality", theme: "cafe", icon: Coffee, image: img_cafe, story: "Warm and welcoming — like fresh bread on Bree Street.", sample: { business: "Bree St Bakehouse", headline: "Sourdough, flat whites & friends.", cta: "See Today's Menu" } },
  { id: "restaurant", name: "Restaurant & Wine Bar", group: "Food & Hospitality", theme: "heritage", icon: Wine, image: img_restaurant, story: "Candlelit and intimate — every table feels like the best one.", sample: { business: "The Vine Room", headline: "Seasonal plates & Winelands pours.", cta: "Reserve a Table" } },
  { id: "guesthouse", name: "Guesthouse & B&B", group: "Food & Hospitality", theme: "hub", icon: BedDouble, image: img_guesthouse, story: "Sun-washed and restful — guests book before they arrive.", sample: { business: "Vineyard Lodge Franschhoek", headline: "Six rooms, endless mountain views.", cta: "Check Availability" } },
  { id: "construction", name: "Construction & Home Builds", group: "Home & Trades", theme: "trades", icon: HardHat, image: img_construction, story: "Solid and proven — the builder clients recommend.", sample: { business: "Atlas Custom Homes", headline: "Custom homes, built right.", cta: "Get a Quote" } },
  { id: "plumbing", name: "Plumbing & Electrical", group: "Home & Trades", theme: "corporate", icon: Wrench, image: img_plumbing, story: "Reliable and responsive — on time, every time.", sample: { business: "FlowRight Plumbing & Electrical", headline: "24/7 call-outs · COC certified.", cta: "Get a Quote" } },
  { id: "mechanic", name: "Automotive & Mechanic", group: "Home & Trades", theme: "trades", icon: Car, image: img_mechanic, story: "High-contrast and no-nonsense — for crews that show up on time.", sample: { business: "Cape Precision Auto", headline: "Services, diagnostics & tyres.", cta: "Book a Service" } },
  { id: "cleaning", name: "Cleaning & Domestic Services", group: "Home & Trades", theme: "purpose", icon: SprayCan, image: img_cleaning, story: "Fresh, trustworthy and easy — sparkle on schedule.", sample: { business: "Sparkle & Co. Cleaning", headline: "Spotless homes & offices, weekly.", cta: "Get a Quote" } },
  { id: "landscaping", name: "Landscaping & Garden Services", group: "Home & Trades", theme: "hub", icon: Trees, image: img_landscaping, story: "Lush and natural — gardens that grow your reputation.", sample: { business: "Fynbos & Stone Gardens", headline: "Indigenous gardens that thrive.", cta: "Book a Site Visit" } },
  { id: "florist", name: "Florist & Gift Boutique", group: "Retail, Creative & Community", theme: "cafe", icon: Flower, image: img_florist, story: "Romantic and fresh — made to be gifted.", sample: { business: "Petal & Protea", headline: "Same-day bouquets across the city.", cta: "Order Flowers" } },
  { id: "photography", name: "Photography & Creative Studio", group: "Retail, Creative & Community", theme: "maker", icon: Camera, image: img_photography, story: "Bold and cinematic — your portfolio, front and centre.", sample: { business: "Lumen Studio", headline: "Portraits, brands & weddings.", cta: "Book a Shoot" } },
  { id: "tutoring", name: "Tutoring & Education", group: "Retail, Creative & Community", theme: "maker", icon: GraduationCap, image: img_tutoring, story: "Bright and encouraging — parents trust it, learners love it.", sample: { business: "Bright Minds Tutoring", headline: "Maths, science & matric prep.", cta: "Book a Lesson" } },
  { id: "church", name: "Church & Non-Profit", group: "Retail, Creative & Community", theme: "purpose", icon: Church, image: img_church, story: "Hopeful and open — a warm welcome before the door.", sample: { business: "Grace Community Church", headline: "Sundays 9:30 · Everyone welcome.", cta: "Plan a Visit" } },
];

export const DEFAULT_INDUSTRY_ID = "hair-salon";

export const INDUSTRY_GROUPS: { group: string; items: Industry[] }[] = Array.from(
  INDUSTRIES.reduce((map, ind) => map.set(ind.group, [...(map.get(ind.group) ?? []), ind]), new Map<string, Industry[]>()),
).map(([group, items]) => ({ group, items }));

export function findIndustry(id: string): Industry {
  return INDUSTRIES.find((i) => i.id === id) ?? INDUSTRIES[0]!;
}
