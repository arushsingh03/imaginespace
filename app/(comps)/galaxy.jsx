"use client";

import React, { useEffect, useState } from "react";

const GalaxyBackground = () => {
  const [stars, setStars] = useState([]);

  useEffect(() => {
    const generateStars = () => {
      const newStars = [];
      // Increased number of stars and adjusted size range
      for (let i = 0; i < 300; i++) {
        newStars.push({
          id: i,
          x: Math.random() * 100,
          y: Math.random() * 100,
          size: Math.random() * 1.5 + 0.5, // Smaller stars
          opacity: Math.random(),
          speed: Math.random() * 4 + 2, // Faster speed
          isShootingStar: Math.random() < 0.01, // Chance of being a shooting star
          shootingStarLength: Math.random() * 20 + 10, // Length of the shooting star
          shootingStarAngle: Math.random() * 2 * Math.PI, // Angle of the shooting star
        });
      }
      setStars(newStars);
    };

    generateStars();

    const animationInterval = setInterval(() => {
      setStars((prevStars) =>
        prevStars.map((star) => ({
          ...star,
          x: (star.x + star.speed * 0.1 * Math.cos(star.shootingStarAngle)) % 100, // Shooting star movement
          y: (star.y + star.speed * 0.1 * Math.sin(star.shootingStarAngle)) % 100,
          opacity: star.isShootingStar
            ? Math.max(0, star.opacity - 0.02) // Decrease opacity for shooting stars
            : 0.4 + Math.sin((Date.now() / 1000) * star.speed) * 0.6,
        }))
      );
    }, 30); // Faster animation interval

    return () => clearInterval(animationInterval);
  }, []);

  return (
    <div className="fixed inset-0 overflow-hidden pointer-events-none">
      <div className="absolute inset-0">
        {stars.map((star) => (
          <div
            key={star.id}
            className={`absolute rounded-full bg-white ${
              star.isShootingStar
                ? `w-[${star.shootingStarLength}px] h-[2px] -rotate-[${
                    star.shootingStarAngle * (180 / Math.PI)
                  }deg]`
                : ""
            }`}
            style={{
              left: `${star.x}%`,
              top: `${star.y}%`,
              width: `${star.size}px`,
              height: `${star.size}px`,
              opacity: star.opacity,
              transition: "opacity 0.3s ease-in-out",
              boxShadow: "0 0 2px 1px rgba(255, 255, 255, 0.3)", // Reduced glow
            }}
          />
        ))}
      </div>
    </div>
  );
};

export default GalaxyBackground;