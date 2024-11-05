"use client";

import React, { useEffect, useState } from "react";

const GalaxyBackground = () => {
  const [stars, setStars] = useState([]);

  useEffect(() => {
    const generateStars = () => {
      const newStars = [];
      // Increased number of stars and adjusted size range
      for (let i = 0; i < 200; i++) {
        newStars.push({
          id: i,
          x: Math.random() * 100,
          y: Math.random() * 100,
          size: Math.random() * 1.5 + 0.5, // Smaller stars
          opacity: Math.random(),
          speed: Math.random() * 2.5 + 1.5, // Adjusted speed
        });
      }
      setStars(newStars);
    };

    generateStars();

    const animationInterval = setInterval(() => {
      setStars((prevStars) =>
        prevStars.map((star) => ({
          ...star,
          x: (star.x + star.speed * 0.05) % 100, // Slower movement
          opacity: 0.4 + Math.sin((Date.now() / 1000) * star.speed) * 0.6,
        }))
      );
    }, 50);

    return () => clearInterval(animationInterval);
  }, []);

  return (
    <div className="fixed inset-0 overflow-hidden pointer-events-none">
      <div className="absolute inset-0">
        {stars.map((star) => (
          <div
            key={star.id}
            className="absolute rounded-full bg-white"
            style={{
              left: `${star.x}%`,
              top: `${star.y}%`,
              width: `${star.size}px`,
              height: `${star.size}px`,
              opacity: star.opacity,
              transition: "opacity 0.5s ease-in-out",
              boxShadow: "0 0 2px 1px rgba(255, 255, 255, 0.3)", // Reduced glow
            }}
          />
        ))}
      </div>
    </div>
  );
};

export default GalaxyBackground;
