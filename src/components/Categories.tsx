
import React from "react";
import { useNavigate } from "react-router-dom";
import Closet from '../assets/Closet.svg';
import PersonalStyling from '../assets/Personal_stylin.svg';
import HealthAndFitness from '../assets/fitnes.svg';
import EventStyling from '../assets/Event_stylin.svg';
import Grooming from '../assets/Grooming.svg';
import PersonalCare from '../assets/Personal.svg';
import Skincare from '../assets/Skincare.svg';
import Fragrance from '../assets/Fragrance.svg';
import PersonalBranding from '../assets/Personal_branding.svg';
import Haircare from '../assets/Haircare.svg';
import TravelStyling from '../assets/Travel_stylin.svg';
import FashionDesigner from '../assets/Fashion_Designer.svg';
import AccessoriesStyling from '../assets/Accessories.svg';
import Modeling from '../assets/Modeling.svg';
import MakeupArtist from '../assets/Makeup_Artist.svg';

const cards = [ 
  {
    text: "Closet-Setting",
    image: Closet,
    subcategories: "Capsule wardrobe | Outfit coordination | Closet detox"
  },
  {
    text: "Personal-Styling",
    image: PersonalStyling,
    subcategories: "Daily wear guide | Occasion styling | Mood-based outfits"
  },
  {
    text: "Health And Fitness",
    image: HealthAndFitness,
    subcategories: "Nutrition | Fashion motivation | Workout looks"
  },
  {
    text: "Event Styling",
    image: EventStyling,
    subcategories: "Red carpet looks | Theme styling | Fashion forecasting"
  },
  {
    text: "Grooming",
    image: Grooming,
    subcategories: "Beard shaping | Skin revitalization | Nail care"
  },
  {
    text: "Personal Care",
    image: PersonalCare,
    subcategories: "Lip care | Skin concerns | Hand care"
  },
  {
    text: "Skincare",
    image: Skincare,
    subcategories: "Daily regimen | Skin detox | Product selection"
  },
  {
    text: "Fragrance",
    image: Fragrance,
    subcategories: "Perfume layering | Scent pairing | Seasonal scents"
  },
  {
    text: "Personal Branding",
    image: PersonalBranding,
    subcategories: "Style image | First impression | Public persona"
  },
  {
    text: "Haircare",
    image: Haircare,
    subcategories: "Split-end repair | Hair hydration | Styling tips"
  },
  {
    text: "Travel Styling",
    image: TravelStyling,
    subcategories: "Packing support | Tripwear outfits | Vacation looks"
  },
  {
    text: "Fashion Designer",
    image: FashionDesigner,
    subcategories: "Draping techniques | Fabric selection | Illustration"
  },
  {
    text: "Accessories Styling",
    image: AccessoriesStyling,
    subcategories: "Jewelry curation | Bag matching | Watch styling"
  },
  {
    text: "Modeling",
    image: Modeling,
    subcategories: "Editorial shoots | Runway grooming | Model coaching"
  },
  {
    text: "Makeup Artist",
    image: MakeupArtist,
    subcategories: "Face sculpt | Bridal makeup | Lipstick shades"
  },
];

const Categories = () => {
  const navigate = useNavigate();
  return (
    <div className="flex flex-col items-center justify-center mb-10 w-full relative" style={{minHeight: 'min(100vh, 100%)', overflow: 'visible'}}>
      <h2 className="text-3xl sm:text-4xl font-bold text-center mt-12 mb-8 text-gray-900 tracking-tight relative z-10">Categories to <span className="text-[#A5D80A]">xplore</span></h2>
      <div className="w-full flex flex-col items-center justify-center max-w-7xl px-2 sm:px-6 md:px-8 relative z-10">
        {/* Mobile list (show on small screens only) */}
        <div className="flex flex-col gap-6 mt-4 sm:hidden">
          {cards.map((card, idx) => (
            <div
              key={idx}
              className="bg-white rounded-2xl border border-gray-200 shadow-sm p-6 pb-0 flex flex-col items-center w-full min-h-[120px] transition-all duration-300 cursor-pointer"
              onClick={() => navigate(`/avatars?category=${encodeURIComponent(card.text)}`)}
            >
              <p className="font-bold text-lg mb-2 text-center text-gray-900">{card.text}</p>
              <div className="text-base text-gray-500 text-center mb-4 whitespace-pre-line">{card.subcategories}</div>
              <img src={card.image} alt={card.text} className="object-contain rounded-xl mt-auto mb-0 w-24 h-24" style={{marginBottom: 0}} />
            </div>
          ))}
        </div>
        {/* Desktop grid (hide on small screens) */}
        <div className="hidden sm:grid grid-cols-3 gap-10 gap-y-12 mt-4">
          {cards.map((card, idx) => (
            <div
              key={idx}
              className="bg-white rounded-2xl border border-gray-200 shadow-sm p-6 pb-0 flex flex-col items-center w-[260px] h-[340px] transition-all duration-300 group hover:bg-[#A5D80A] hover:scale-105 hover:shadow-lg cursor-pointer"
              onClick={() => navigate(`/avatars?category=${encodeURIComponent(card.text)}`)}
            >
              <p className="font-bold text-lg mb-2 text-center text-gray-900">{card.text}</p>
              <div className="text-base text-gray-500 text-center mb-6 whitespace-pre-line">{card.subcategories}</div>
              <img src={card.image} alt={card.text} className="object-contain rounded-xl mt-auto mb-0 w-40 h-40" style={{marginBottom: 0}} />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Categories;
