import React from 'react';

function LuxuryBackground() {
  // Use abstract luxury elements: glowing orbs and drifting particles
  const bubbles = Array.from({ length: 15 });

  return (
    <div className="luxury-bg-wrapper">
      <div className="lux-flare lux-flare-1"></div>
      <div className="lux-flare lux-flare-2"></div>
      <div className="lux-flare lux-flare-3"></div>
      <div className="lux-particles"></div>
      <div className="lux-particles lux-particles-2"></div>
      
      {/* Golden bubbles */}
      <div className="bubbles-container">
        {bubbles.map((_, i) => (
          <div key={i} className={`lux-bubble lux-bubble-${i + 1}`}></div>
        ))}
      </div>
    </div>
  );
}

export default LuxuryBackground;
