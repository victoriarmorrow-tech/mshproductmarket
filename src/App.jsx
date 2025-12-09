import React, { useState } from 'react';
import { Check, Lock, Eye, EyeOff, TrendingUp, DollarSign, AlertCircle, ShoppingCart } from 'lucide-react';

// --- Configuration & Data ---
const INITIAL_BUDGET = 1000;

// Specific Brand Colors
const COLORS = {
  primary: '#154734',    // Deep Green
  accent: '#D6A461',     // Gold
  accentHover: '#b88a4d',
  bgLight: '#f8faf9',    // Very light green tint
  text: '#154734',
  white: '#ffffff',
  disabled: '#e2e8f0',
  error: '#ef4444',
  border: '#e2e8f0',
  cardBg: '#ffffff'
};

const FEATURES = [
  { id: 1, name: "1TG tasks UI update", price: 250, description: "Modernized interface for task management.", globalCount: 142 },
  { id: 2, name: "My Day calendar", price: 300, description: "Daily schedule view with integrated reminders.", globalCount: 89 },
  { id: 3, name: "Updated check-in form", price: 150, description: "Streamlined entry fields for faster check-ins.", globalCount: 201 },
  { id: 4, name: "Clearer check-in prioritization", price: 200, description: "Visual hierarchy for urgent check-in items.", globalCount: 156 },
  { id: 5, name: "Expanded “See My Numbers”", price: 175, description: "More detailed analytics and reporting metrics.", globalCount: 112 },
  { id: 6, name: "Improved clinical profiles + upload", price: 325, description: "Enhanced profiles with document upload capabilities.", globalCount: 78 },
  { id: 7, name: "Updated member details page", price: 225, description: "Reorganized layout for critical member info.", globalCount: 134 },
  { id: 8, name: "Clearer timeline of activity", price: 125, description: "Chronological view of all member interactions.", globalCount: 198 },
  { id: 9, name: "Consolidated workflows", price: 350, description: "Unified process steps to reduce clicks.", globalCount: 65 },
  { id: 10, name: "Improved program/service info", price: 150, description: "Better visibility into available services.", globalCount: 167 },
  { id: 11, name: "Technical debt fixes", price: 275, description: "Fixes for physicians, contacts, and 'hellbox'.", globalCount: 94 },
];

// --- Components ---

const ProgressBar = ({ current, max }) => {
  const percentage = Math.max(0, Math.min(100, (current / max) * 100));
  const isLow = current < 200;
  
  return (
    <div style={{ width: '100%', backgroundColor: COLORS.disabled, borderRadius: '999px', height: '16px', overflow: 'hidden', border: `1px solid ${COLORS.border}` }}>
      <div 
        style={{ 
          width: `${percentage}%`, 
          height: '100%', 
          backgroundColor: isLow ? COLORS.error : COLORS.accent,
          transition: 'width 0.5s ease-out',
          position: 'relative',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center'
        }}
      >
        {/* Striped pattern simulation */}
        <div style={{ 
          position: 'absolute', inset: 0, opacity: 0.2, 
          backgroundImage: 'linear-gradient(45deg,rgba(255,255,255,.15) 25%,transparent 25%,transparent 50%,rgba(255,255,255,.15) 50%,rgba(255,255,255,.15) 75%,transparent 75%,transparent)', 
          backgroundSize: '1rem 1rem' 
        }}></div>
      </div>
    </div>
  );
};

const FeatureCard = ({ feature, isSelected, canAfford, onToggle }) => {
  const cardStyle = {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center', // Centering content horizontally
    textAlign: 'center',  // Centering text
    padding: '24px',
    borderRadius: '12px',
    border: isSelected ? `2px solid ${COLORS.primary}` : `1px solid ${COLORS.border}`,
    backgroundColor: isSelected ? '#ecfdf5' : COLORS.cardBg,
    boxShadow: isSelected ? '0 4px 6px -1px rgba(0, 0, 0, 0.1)' : '0 1px 2px 0 rgba(0, 0, 0, 0.05)',
    transition: 'all 0.3s ease',
    opacity: !isSelected && !canAfford ? 0.6 : 1,
    filter: !isSelected && !canAfford ? 'grayscale(100%)' : 'none',
    height: '100%',
    boxSizing: 'border-box'
  };

  return (
    <div style={cardStyle}>
      {/* Header */}
      <div style={{ width: '100%', display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '16px' }}>
        <h3 style={{ fontSize: '1.25rem', fontWeight: 'bold', margin: 0, color: COLORS.text, textAlign: 'left' }}>
          {feature.name}
        </h3>
        <span style={{ fontSize: '1.125rem', fontWeight: 'bold', color: isSelected ? COLORS.primary : COLORS.accent }}>
          ${feature.price}
        </span>
      </div>

      {/* Description */}
      <p style={{ color: '#475569', fontSize: '0.875rem', marginBottom: '24px', flexGrow: 1, lineHeight: '1.5', textAlign: 'left', width: '100%' }}>
        {feature.description}
      </p>

      {/* Action Button */}
      <button
        onClick={() => onToggle(feature)}
        disabled={!isSelected && !canAfford}
        style={{
          width: '100%',
          padding: '12px 16px',
          borderRadius: '8px',
          fontWeight: 'bold',
          fontSize: '0.875rem',
          textTransform: 'uppercase',
          letterSpacing: '0.05em',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          gap: '8px',
          border: 'none',
          cursor: (!isSelected && !canAfford) ? 'not-allowed' : 'pointer',
          color: (!isSelected && !canAfford) ? '#94a3b8' : COLORS.white,
          backgroundColor: isSelected ? COLORS.primary : ((!isSelected && !canAfford) ? '#f1f5f9' : COLORS.accent),
          transition: 'background-color 0.2s'
        }}
      >
        {isSelected ? (
          <>
            <Check size={18} /> Selected
          </>
        ) : !canAfford ? (
          <>
            <Lock size={16} /> Over Budget
          </>
        ) : (
          <>
            Add to Bundle
          </>
        )}
      </button>
    </div>
  );
};

const GlobalStats = ({ isRevealed, onReveal }) => {
  if (!isRevealed) {
    return (
      <div style={{ textAlign: 'center', padding: '48px 0', borderTop: `1px solid ${COLORS.border}`, marginTop: '64px', backgroundColor: COLORS.white }}>
        <p style={{ color: '#64748b', marginBottom: '16px', fontStyle: 'italic' }}>Curious what others prioritized?</p>
        <button 
          onClick={onReveal}
          style={{ 
            display: 'inline-flex', alignItems: 'center', gap: '8px', padding: '8px 24px', 
            borderRadius: '999px', border: `1px solid ${COLORS.border}`, 
            backgroundColor: 'transparent', color: '#475569', cursor: 'pointer',
            fontFamily: '"Century Gothic", sans-serif'
          }}
        >
          <Eye size={16} /> Reveal Community Votes
        </button>
      </div>
    );
  }

  const sortedFeatures = [...FEATURES].sort((a, b) => b.globalCount - a.globalCount);

  return (
    <div style={{ marginTop: '64px', paddingTop: '48px', borderTop: `2px dashed ${COLORS.border}`, backgroundColor: '#f8fafc', borderTopLeftRadius: '24px', borderTopRightRadius: '24px', padding: '32px' }}>
      <div style={{ maxWidth: '896px', margin: '0 auto' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '32px' }}>
          <h3 style={{ fontSize: '1.5rem', fontWeight: 'bold', display: 'flex', alignItems: 'center', gap: '8px', color: COLORS.primary, margin: 0 }}>
            <TrendingUp size={24} /> Community Priorities
          </h3>
          <button 
            onClick={onReveal} 
            style={{ color: '#94a3b8', display: 'flex', alignItems: 'center', gap: '4px', fontSize: '0.875rem', background: 'none', border: 'none', cursor: 'pointer', fontFamily: '"Century Gothic", sans-serif' }}
          >
            <EyeOff size={14} /> Hide
          </button>
        </div>

        <div style={{ display: 'grid', gap: '16px' }}>
          {sortedFeatures.map((f, index) => (
            <div key={f.id} style={{ display: 'flex', alignItems: 'center', gap: '16px', backgroundColor: COLORS.white, padding: '16px', borderRadius: '8px', boxShadow: '0 1px 2px 0 rgba(0, 0, 0, 0.05)', border: `1px solid ${COLORS.border}` }}>
              <span style={{ fontFamily: 'monospace', color: '#94a3b8', width: '24px', fontWeight: 'bold' }}>#{index + 1}</span>
              <div style={{ flexGrow: 1 }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '4px' }}>
                  <span style={{ fontWeight: '600', color: '#334155' }}>{f.name}</span>
                  <span style={{ fontSize: '0.75rem', fontWeight: 'bold', color: '#64748b' }}>{f.globalCount} votes</span>
                </div>
                <div style={{ width: '100%', backgroundColor: '#f1f5f9', borderRadius: '999px', height: '8px' }}>
                  <div 
                    style={{ 
                      height: '100%', borderRadius: '999px',
                      width: `${(f.globalCount / 250) * 100}%`,
                      backgroundColor: index < 3 ? COLORS.accent : '#cbd5e1'
                    }} 
                  ></div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

// --- Main Application ---

export default function App() {
  const [budget, setBudget] = useState(INITIAL_BUDGET);
  const [selectedIds, setSelectedIds] = useState([]);
  const [showGlobalStats, setShowGlobalStats] = useState(false);

  const toggleFeature = (feature) => {
    const isSelected = selectedIds.includes(feature.id);

    if (isSelected) {
      // Remove
      setBudget(prev => prev + feature.price);
      setSelectedIds(prev => prev.filter(id => id !== feature.id));
    } else {
      // Add
      if (budget >= feature.price) {
        setBudget(prev => prev - feature.price);
        setSelectedIds(prev => [...prev, feature.id]);
      }
    }
  };

  const selectedCount = selectedIds.length;

  return (
    <div style={{ minHeight: '100vh', fontFamily: '"Century Gothic", sans-serif', backgroundColor: COLORS.bgLight, color: COLORS.text }}>
      
      {/* Sticky Header */}
      <header style={{ 
        position: 'sticky', top: 0, zIndex: 50, 
        backgroundColor: 'rgba(255, 255, 255, 0.95)', 
        backdropFilter: 'blur(8px)', 
        borderBottom: `1px solid ${COLORS.border}`,
        boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1)' 
      }}>
        <div style={{ maxWidth: '1024px', margin: '0 auto', padding: '16px' }}>
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: '16px' }}>
            
            {/* Logo / Title */}
            <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
              <div style={{ padding: '8px', borderRadius: '8px', backgroundColor: COLORS.primary, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                <DollarSign color="white" size={24} />
              </div>
              <div>
                <h1 style={{ fontSize: '1.5rem', fontWeight: 'bold', margin: 0, letterSpacing: '-0.025em', color: COLORS.primary }}>
                  MSH Product<span style={{ color: COLORS.accent }}>Market</span>
                </h1>
                <p style={{ fontSize: '0.75rem', color: '#64748b', textTransform: 'uppercase', letterSpacing: '0.1em', fontWeight: '600', margin: 0 }}>
                  Allocated Budget: ${INITIAL_BUDGET}
                </p>
              </div>
            </div>

            {/* Budget Display */}
            <div style={{ flexGrow: 1, maxWidth: '400px', padding: '0 16px' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.875rem', fontWeight: 'bold', marginBottom: '4px' }}>
                <span style={{ color: '#64748b' }}>Remaining Budget</span>
                <span style={{ fontSize: '1.25rem', color: budget < 200 ? COLORS.error : '#047857' }}>
                  ${budget}
                </span>
              </div>
              <ProgressBar current={budget} max={INITIAL_BUDGET} />
            </div>

            {/* Cart Summary */}
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px', padding: '8px 16px', backgroundColor: '#f8fafc', borderRadius: '999px', border: `1px solid ${COLORS.border}` }}>
               <ShoppingCart size={18} color="#94a3b8" />
               <span style={{ fontWeight: 'bold', color: '#334155' }}>{selectedCount}</span>
               <span style={{ fontSize: '0.75rem', color: '#64748b', textTransform: 'uppercase' }}>Items Selected</span>
            </div>

          </div>
        </div>
      </header>

      {/* Main Content Area */}
      <main style={{ maxWidth: '1024px', margin: '0 auto', padding: '48px 24px' }}>
        
        {/* Intro Text */}
        <div style={{ textAlign: 'center', marginBottom: '48px', maxWidth: '672px', margin: '0 auto 48px auto' }}>
          <h2 style={{ fontSize: '2.25rem', fontWeight: 'bold', marginBottom: '16px', color: COLORS.primary }}>
            Build Your Priority Bundle
          </h2>
          <p style={{ fontSize: '1.125rem', color: '#475569', lineHeight: '1.75' }}>
            You have <strong>${INITIAL_BUDGET}</strong> to invest in the roadmap. 
            Select the features that deliver the most value to your workflow. 
            Choose wisely—you cannot exceed your budget.
          </p>
        </div>

        {/* Budget Alert if low */}
        {budget < 125 && (
          <div style={{ marginBottom: '32px', padding: '16px', backgroundColor: '#fffbeb', border: '1px solid #fcd34d', borderRadius: '8px', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '8px', color: '#92400e', fontWeight: 'bold' }}>
            <AlertCircle size={20} />
            <span>Budget depleted! Remove an item to select others.</span>
          </div>
        )}

        {/* Product Grid */}
        <div style={{ 
          display: 'grid', 
          gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', 
          gap: '24px' 
        }}>
          {FEATURES.map(feature => (
            <FeatureCard 
              key={feature.id} 
              feature={feature} 
              isSelected={selectedIds.includes(feature.id)}
              canAfford={budget >= feature.price}
              onToggle={toggleFeature}
            />
          ))}
        </div>

      </main>

      {/* Footer / Hidden Stats */}
      <footer style={{ backgroundColor: COLORS.white, paddingBottom: '48px' }}>
        <GlobalStats 
          isRevealed={showGlobalStats} 
          onReveal={() => setShowGlobalStats(!showGlobalStats)} 
        />
        
        <div style={{ textAlign: 'center', marginTop: '48px', color: '#94a3b8', fontSize: '0.875rem' }}>
          <p>© 2025 Product Strategy Team. Internal Use Only.</p>
        </div>
      </footer>

    </div>
  );
}