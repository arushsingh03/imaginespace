"use client";

import React, { useEffect, useState } from "react";

const AIBackground = () => {
  const [particles, setParticles] = useState([]);

  useEffect(() => {
    const generateParticles = () => {
      const newParticles = [];
      for (let i = 0; i < 200; i++) {
        newParticles.push({
          id: i,
          x: Math.random() * 100,
          y: Math.random() * 100,
          size: Math.random() * 3 + 1,
          opacity: Math.random() * 0.5 + 0.3,
          speed: Math.random() * 2 + 1,
          type: Math.random() < 0.2 ? 'square' : Math.random() < 0.4 ? 'circle' : 'dot',
          color: Math.random() < 0.5 ? '#8b5cf6' : '#6d28d9',
          connectionRange: Math.random() * 15 + 10,
          isFloating: Math.random() < 0.3,
          floatOffset: Math.random() * Math.PI * 2,
        });
      }
      setParticles(newParticles);
    };

    generateParticles();

    const animationInterval = setInterval(() => {
      setParticles((prevParticles) =>
        prevParticles.map((particle) => {
          let newX = particle.x;
          let newY = particle.y;

          if (particle.isFloating) {
            // Create a floating motion
            newX = (particle.x + Math.sin((Date.now() / 2000) + particle.floatOffset) * 0.2) % 100;
            newY = (particle.y + Math.cos((Date.now() / 2000) + particle.floatOffset) * 0.2) % 100;
          } else {
            // Create a gentle upward drift
            newY = (particle.y - particle.speed * 0.02);
            if (newY < -5) newY = 105;
          }

          return {
            ...particle,
            x: newX,
            y: newY,
            opacity: 0.3 + Math.sin((Date.now() / 1000) * particle.speed) * 0.2,
          };
        })
      );
    }, 30);

    return () => clearInterval(animationInterval);
  }, []);

  // Function to draw connections between nearby particles
  const drawConnections = () => {
    return particles.map((particle1) => {
      return particles
        .filter((particle2) => {
          if (particle1.id >= particle2.id) return false;
          const distance = Math.sqrt(
            Math.pow(particle1.x - particle2.x, 2) + 
            Math.pow(particle1.y - particle2.y, 2)
          );
          return distance < particle1.connectionRange;
        })
        .map((particle2) => {
          const opacity = Math.max(
            0.1,
            1 - (Math.sqrt(
              Math.pow(particle1.x - particle2.x, 2) + 
              Math.pow(particle1.y - particle2.y, 2)
            ) / particle1.connectionRange)
          );
          return (
            <div
              key={`${particle1.id}-${particle2.id}`}
              className="absolute h-px transform-gpu"
              style={{
                left: `${particle1.x}%`,
                top: `${particle1.y}%`,
                width: `${Math.sqrt(
                  Math.pow((particle2.x - particle1.x), 2) + 
                  Math.pow((particle2.y - particle1.y), 2)
                )}%`,
                opacity: opacity * 0.2,
                background: `linear-gradient(90deg, ${particle1.color}, ${particle2.color})`,
                transform: `rotate(${Math.atan2(
                  particle2.y - particle1.y,
                  particle2.x - particle1.x
                )}rad)`,
                transformOrigin: '0 50%',
              }}
            />
          );
        });
    });
  };

  return (
    <div className="fixed inset-0 overflow-hidden pointer-events-none bg-black/90">
      {/* Gradient overlay */}
      <div className="absolute inset-0 bg-gradient-to-b from-black/0 via-purple-900/10 to-black/20" />
      
      {/* Connection lines */}
      {drawConnections()}

      {/* Particles */}
      {particles.map((particle) => (
        <div
          key={particle.id}
          className={`absolute transform-gpu ${
            particle.type === 'square' 
              ? 'rotate-45' 
              : particle.type === 'circle' 
                ? 'rounded-full' 
                : ''
          }`}
          style={{
            left: `${particle.x}%`,
            top: `${particle.y}%`,
            width: `${particle.size}px`,
            height: `${particle.size}px`,
            opacity: particle.opacity,
            backgroundColor: particle.color,
            boxShadow: `0 0 ${particle.size * 2}px ${particle.color}`,
            transition: 'opacity 0.3s ease-in-out',
          }}
        />
      ))}
    </div>
  );
};

export default AIBackground;