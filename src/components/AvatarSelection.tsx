import { useLocation } from "react-router-dom";
import { useState } from "react";
import type { Avatar } from "../types";
import ChatBox from "./ChatBox";
import PersonalStylingImg from '../assets/Personal_stylin.svg';
import GroomingImg from '../assets/Grooming.svg';
import FitnessImg from '../assets/fitnes.svg';
import SkincareImg from '../assets/Skincare.svg';

const avatars: Avatar[] = [
  {
    name: "Rhea Kapoor",
    persona: "Your glam BFF and personal stylist",
    rating: 5,
    categories: ["Closet-Setting", "Personal-Styling", "Event Styling", "Personal Branding", "Grooming", "Travel Styling", "Accessories Styling", "Fashion Designer"],
    role: "Fashion & Grooming Stylist",
    image: PersonalStylingImg,
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
    image: GroomingImg,
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
    image: FitnessImg,
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
    image: SkincareImg,
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
            display: 'flex',
            alignItems: 'center',
            background: 'none',
            border: 'none',
            color: '#666',
            fontSize: '16px',
            fontWeight: 500,
            cursor: 'pointer',
            transition: 'color 0.2s'
          }}
          onMouseOver={(e) => e.currentTarget.style.color = '#333'}
          onMouseOut={(e) => e.currentTarget.style.color = '#666'}
        >
          <span style={{ fontSize: '20px', marginRight: '8px' }}>←</span>
          Back to Categories
        </button>
      </div>
      
      <h1 style={{ fontSize: 28, fontWeight: 700, marginBottom: 24 }}>Avatars for {category}</h1>
      {filteredAvatars.length === 0 && <div>No avatars available for this category.</div>}
      <div style={{ display: 'flex', flexWrap: 'wrap', gap: 20, justifyContent: 'center', alignItems: 'flex-start' }}>
        {filteredAvatars.map((avatar, idx) => (
          <div key={idx} style={{ minWidth: 220, background: '#fff', borderRadius: 12, boxShadow: '0 2px 8px #eee', padding: 18, textAlign: 'center' }}>
            <img src={avatar.image} alt={avatar.name} style={{ width: 80, height: 80, borderRadius: '50%', objectFit: 'cover', marginBottom: 12 }} />
            <div style={{ fontWeight: 700, fontSize: 20 }}>{avatar.name}</div>
            <div style={{ color: '#888', fontSize: 15, marginBottom: 8 }}>{avatar.role}</div>
            <div style={{ color: '#555', fontSize: 14, marginBottom: 16 }}>{avatar.persona}</div>
            <button
              onClick={() => handleStartChat(avatar)}
              style={{
                background: '#007bff',
                color: 'white',
                border: 'none',
                borderRadius: 8,
                padding: '10px 20px',
                fontSize: 14,
                fontWeight: 600,
                cursor: 'pointer',
                width: '100%',
                transition: 'background 0.2s'
              }}
              onMouseOver={(e) => e.currentTarget.style.background = '#0056b3'}
              onMouseOut={(e) => e.currentTarget.style.background = '#007bff'}
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
