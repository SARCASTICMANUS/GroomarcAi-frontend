import { useLocation } from "react-router-dom";
import { useState } from "react";
import type { Avatar } from "../types";
import ChatBox from "./ChatBox";
import RheaImg from '../assets/Rhea_Kapoor.png';
import TaniaImg from '../assets/Tania_arora.png';
import AaravImg from '../assets/Aarav_Verma.png';
import KabirImg from '../assets/Kabir.png';

const avatars: Avatar[] = [
  {
    name: "Rhea Kapoor",
    persona: "Your glam BFF and personal stylist",
    rating: 5,
    categories: ["Closet-Setting", "Personal-Styling", "Event Styling", "Personal Branding", "Grooming", "Travel Styling", "Accessories Styling", "Fashion Designer"],
    role: "Fashion & Grooming Stylist",
    image: RheaImg,
    behavior: {
      greetingStyle: "Hey love, Rhea here — your glam BFF 💄✨"
    }
  },
  {
    name: "Aarav Verma",
    persona: "Modern Gentleman's Style Coach",
    rating: 4,
    categories: ["Grooming", "Haircare", "Fragrance", "Personal Care"],
    role: "Men's Grooming Expert",
    image: AaravImg,
    behavior: {
      greetingStyle: "What's up, bro? Aarav here to help you look your best 👨‍💼"
    }
  },
  {
    name: "Kabir Singh",
    persona: "Fitness & Lifestyle Mentor",
    rating: 4,
    categories: ["Health And Fitness", "Modeling"],
    role: "Fitness & Wellness Coach",
    image: KabirImg,
    behavior: {
      greetingStyle: "Hey there! Kabir here to help you crush your fitness goals 💪"
    }
  },
  {
    name: "Tania Arora",
    persona: "Beauty + Skincare Coach",
    rating: 5,
    categories: ["Skincare", "Personal Care", "Makeup Artist"],
    role: "Skincare & Beauty Expert",
    image: TaniaImg,
    behavior: {
      greetingStyle: "Hi gorgeous! Tania here to help you glow from within ✨"
    }
  }
];

function useQuery() {
  return new URLSearchParams(useLocation().search);
}

const AvatarSelection = () => {
  const query = useQuery();
  const category = query.get("category");
  const startChat = query.get("startChat");
  const filteredAvatars = avatars.filter(a => a.categories.map(c => c.toLowerCase()).includes((category || '').toLowerCase()));
  
  const [selectedAvatar, setSelectedAvatar] = useState<Avatar | null>(null);
  const [showChat, setShowChat] = useState(false);

  const handleStartChat = (avatar: Avatar) => {
    setSelectedAvatar(avatar);
    setShowChat(true);
  };

  const handleEndChat = () => {
    setShowChat(false);
    setSelectedAvatar(null);
  };

  // If chat is open, show ChatBox
  if (showChat && selectedAvatar) {
    return (
      <ChatBox
        avatar={selectedAvatar}
        onEndChat={handleEndChat}
        categoryName={category || ''}
        readyQuestions={[
          `Help me with ${category} styling`,
          `What are the latest trends in ${category}?`,
          `Give me tips for ${category}`,
          `How can I improve my ${category}?`
        ]}
      />
    );
  }

  return (
    <div style={{ maxWidth: 700, margin: '40px auto', padding: 24 }}>
      {/* Back Navigation Button */}
      <div style={{ marginBottom: 20 }}>
        <button
          onClick={() => window.history.back()}
          style={{
            display: 'inline-flex',
            alignItems: 'center',
            justifyContent: 'center',
            background: '#d6f000',
            border: 'none',
            borderRadius: '50%',
            width: 40,
            height: 40,
            color: '#fff',
            fontSize: '20px',
            fontWeight: 700,
            cursor: 'pointer',
            boxShadow: '0 1px 4px #eee',
            transition: 'background 0.2s, color 0.2s',
            padding: 0
          }}
          onMouseOver={e => { e.currentTarget.style.background = '#b5c800'; e.currentTarget.style.color = '#fff'; }}
          onMouseOut={e => { e.currentTarget.style.background = '#d6f000'; e.currentTarget.style.color = '#fff'; }}
          aria-label="Back"
        >
          <span style={{ fontSize: '22px', display: 'flex', alignItems: 'center', justifyContent: 'center', width: '100%', height: '100%', color: '#fff' }}>&larr;</span>
        </button>
      </div>
      
      <h1 style={{ fontSize: 32, fontWeight: 800, marginBottom: 24, marginTop: 0, letterSpacing: '-1px' }}>{category}</h1>
      {filteredAvatars.length === 0 && <div>No avatars available for this category.</div>}
      <div style={{ display: 'flex', flexWrap: 'wrap', gap: 32, justifyContent: 'center', alignItems: 'flex-start' }}>
        {filteredAvatars.map((avatar, idx) => (
          <div key={idx} style={{ minWidth: 280, maxWidth: 340, background: '#fff', borderRadius: 18, boxShadow: '0 4px 16px #eee', padding: 32, textAlign: 'center', height: 420, display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'flex-start' }}>
            <div style={{ display: 'flex', justifyContent: 'center', width: '100%' }}>
              <img src={avatar.image} alt={avatar.name} style={{ width: 120, height: 120, borderRadius: '50%', objectFit: 'cover', marginBottom: 18, border: '3px solid #f6f6f6', boxShadow: '0 2px 8px #e0e0e0' }} />
            </div>
            <div style={{ fontWeight: 700, fontSize: 26, marginBottom: 6 }}>{avatar.name}</div>
            <div style={{ color: '#888', fontSize: 18, marginBottom: 10 }}>{avatar.role}</div>
            <div style={{ color: '#555', fontSize: 16, marginBottom: 24 }}>{avatar.persona}</div>
            <button
              onClick={() => handleStartChat(avatar)}
              style={{
                background: '#d6f000',
                color: '#222',
                border: 'none',
                borderRadius: 10,
                padding: '14px 0',
                fontSize: 18,
                fontWeight: 700,
                cursor: 'pointer',
                width: '100%',
                transition: 'background 0.2s',
                marginTop: 'auto',
                boxShadow: '0 2px 8px #e0e0e0'
              }}
              onMouseOver={e => (e.currentTarget.style.background = '#b5c800')}
              onMouseOut={e => (e.currentTarget.style.background = '#d6f000')}
            >
              Start Chat
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default AvatarSelection;
