import type { LucideIcon } from "lucide-react";
import { Activity, BedDouble, BookOpen, Briefcase, Calculator, Camera, Car, Church, Coffee, Dumbbell, Flower, Flower2, GraduationCap, Hammer, HardHat, HeartPulse, House, Landmark, PawPrint, Scale, Scissors, ShoppingBag, Smartphone, Smile, Sparkles, SprayCan, Stethoscope, Trees, Truck, UtensilsCrossed, Wine, Wrench } from "lucide-react";
import type { ThemeId } from "./moods";
import { OTHER_INDUSTRY_ID } from "./site";

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
  /** Extra search words for the industry picker (not shown). */
  keywords?: string;
}

export const INDUSTRIES: Industry[] = [
  // Broad, everyday categories first, so every small business finds a match.
  { id: "retail", name: "Retail Store / General Shop", group: "Everyday Business", theme: "maker", icon: ShoppingBag, image: img_florist, keywords: "shop store boutique spaza supermarket clothing hardware gifts", story: "Friendly and easy to browse — customers find you, then find the door.", sample: { business: "Corner & Co. General Store", headline: "Everyday essentials, close to home.", cta: "Visit the Shop" } },
  { id: "tech-repair", name: "Electronics, Cell Phone & Tech Repair", group: "Everyday Business", theme: "corporate", icon: Smartphone, image: img_photography, keywords: "phone repair laptop computer screen it support gadgets", story: "Sharp and dependable — fixed fast, explained simply.", sample: { business: "FixIt Tech & Cell Repair", headline: "Screens, batteries & fast repairs.", cta: "Get a Repair Quote" } },
  { id: "healthcare", name: "Medical, Dental & Healthcare", group: "Everyday Business", theme: "purpose", icon: HeartPulse, image: img_medical, keywords: "doctor clinic dentist pharmacy nurse optometrist therapist", story: "Calm and reassuring — care that feels personal.", sample: { business: "Harbour Health Clinic", headline: "Care for the whole family, under one roof.", cta: "Book Appointment" } },
  { id: "legal-financial", name: "Legal, Accounting & Financial Services", group: "Everyday Business", theme: "corporate", icon: Landmark, image: img_law, keywords: "attorney lawyer accountant bookkeeper tax insurance broker advisor", story: "Clear, crisp and credible — for firms that run on trust.", sample: { business: "Cape Counsel & Finance", headline: "Legal, tax and financial guidance you can trust.", cta: "Book a Consultation" } },
  { id: "trades-home", name: "Trades, Construction & Home Services", group: "Everyday Business", theme: "trades", icon: Hammer, image: img_construction, keywords: "plumber electrician builder maintenance handyman painter roofing", story: "Solid and proven — the crew clients recommend.", sample: { business: "Ready Hands Home Services", headline: "Plumbing, electrical & maintenance, done right.", cta: "Get a Quote" } },
  { id: "automotive", name: "Automotive, Workshops & Dealerships", group: "Everyday Business", theme: "trades", icon: Car, image: img_mechanic, keywords: "car garage mechanic tyres panel beater dealership motorbike", story: "High-contrast and no-nonsense — back on the road sooner.", sample: { business: "Table Mountain Motors", headline: "Servicing, repairs & quality pre-owned vehicles.", cta: "Book a Service" } },
  { id: "hospitality", name: "Hospitality, Restaurants, Cafes & Accommodation", group: "Everyday Business", theme: "heritage", icon: UtensilsCrossed, image: img_restaurant, keywords: "restaurant cafe coffee shop takeaway bar hotel lodge guesthouse bnb catering", story: "Warm and inviting — guests book before they arrive.", sample: { business: "The Harbour Table & Stay", headline: "Good food, great coffee & a bed for the night.", cta: "Reserve or Book" } },
  { id: "beauty-wellness", name: "Beauty, Salon, Wellness & Fitness", group: "Everyday Business", theme: "boutique", icon: Sparkles, image: img_spa, keywords: "hair nails barber spa gym yoga pilates personal trainer massage", story: "Soft, polished and uplifting — feel good from the first tap.", sample: { business: "Glow & Move Studio", headline: "Beauty, wellness & fitness in one place.", cta: "Book a Session" } },
  { id: "education-coaching", name: "Education, Training & Coaching", group: "Everyday Business", theme: "maker", icon: BookOpen, image: img_tutoring, keywords: "school tutor lessons course academy coach mentor driving school", story: "Bright and encouraging — learners and parents trust it.", sample: { business: "Summit Learning Academy", headline: "Training, tutoring & coaching that gets results.", cta: "Enquire Now" } },
  { id: "logistics", name: "Logistics, Transport & Courier", group: "Everyday Business", theme: "corporate", icon: Truck, image: img_construction, keywords: "delivery courier trucking freight removals shuttle taxi transport", story: "Reliable and on schedule — goods and people, where they need to be.", sample: { business: "SwiftLane Courier & Transport", headline: "Reliable deliveries, local and national.", cta: "Request a Pickup" } },

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

  // Always last: the client types their own business type in the form.
  { id: OTHER_INDUSTRY_ID, name: "Other", group: "Not listed?", theme: "hub", icon: Briefcase, image: img_accounting, keywords: "not listed something else my business different", story: "Clean and clear — a website built around what you do.", sample: { business: "Your Business Here", headline: "A website built around what you do.", cta: "Get Started" } },
];

// First-time visitors start on the neutral "Other" state (laptop and web-design backdrop),
// and can pick a category or type their own business type.
export const DEFAULT_INDUSTRY_ID = OTHER_INDUSTRY_ID;

export const INDUSTRY_GROUPS: { group: string; items: Industry[] }[] = Array.from(
  INDUSTRIES.reduce((map, ind) => map.set(ind.group, [...(map.get(ind.group) ?? []), ind]), new Map<string, Industry[]>()),
).map(([group, items]) => ({ group, items }));

export function findIndustry(id: string): Industry {
  return INDUSTRIES.find((i) => i.id === id) ?? INDUSTRIES.find((i) => i.id === DEFAULT_INDUSTRY_ID) ?? INDUSTRIES[0]!;
}