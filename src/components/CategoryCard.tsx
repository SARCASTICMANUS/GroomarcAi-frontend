import React from 'react';

interface CategoryCardProps {
  title: string;
  subtitle: string;
  image: string;
  subcategories?: string[];
  onClick: () => void;
}

const CategoryCard: React.FC<CategoryCardProps> = ({ title, subtitle, image, subcategories, onClick }) => {
  return (
    <div
      onClick={onClick}
      style={{
        width: 210,
        height: 290,
        background: '#fff',
        border: '2px solid #d6f000',
        borderRadius: 18,
        boxShadow: '0 2px 12px rgba(0,0,0,0.04)',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'flex-start',
        cursor: 'pointer',
        padding: 18,
        margin: 0,
        transition: 'box-shadow 0.2s, background 0.2s, color 0.2s',
        position: 'relative',
      }}
      className="category-card"
    >
      <div style={{ fontWeight: 700, fontSize: 20, color: '#111', marginTop: 4, textAlign: 'center', lineHeight: 1.2 }}>{title}</div>
      <div style={{ fontSize: 15, color: '#444', marginTop: 8, textAlign: 'center', lineHeight: 1.3 }}>{subtitle}</div>
      {subcategories && subcategories.length > 0 && (
        <ul style={{ margin: '10px 0 0 0', padding: 0, listStyle: 'none', fontSize: 13, color: '#888', textAlign: 'center' }}>
          {subcategories.map((sub, idx) => (
            <li key={idx}>{sub}</li>
          ))}
        </ul>
      )}
      <img
        src={image}
        alt={title}
        style={{
          width: 110,
          height: 110,
          objectFit: 'contain',
          borderRadius: 12,
          filter: 'grayscale(1)',
          marginTop: 'auto',
        }}
      />
    </div>
  );
}

export default CategoryCard;

// Add the following CSS to index.css or a relevant CSS file:
// .category-card:hover {
//   background: #d6f000 !important;
//   color: #fff !important;
// }
// .category-card:hover div, .category-card:hover ul, .category-card:hover li {
//   color: #fff !important;
// } 