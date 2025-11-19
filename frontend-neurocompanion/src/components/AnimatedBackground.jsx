import React from "react";
import brainHero from "../assets/brain-hero.jpg";
import Bubbles from "./Bubbles";

const AnimatedBackground = () => {
  return (
    <>
      <div className="fixed min-w-full inset-0 -z-10 overflow-hidden pointer-events-none bg-blue-100">
        {/* Brain Background Image */}
        <div className="absolute inset-0 opacity-20">
          <img
            src={brainHero}
            alt="Brain illustration"
            className="w-full h-full object-cover animate-float"
          />
        </div>

        {/* Gradient Background */}
        <div className="absolute inset-0 bg-gradient-to-br from-primary/10 via-secondary/15 to-accent/10" />

        <Bubbles />
        {/* Animated Neural Network Lines */}
        <svg className="absolute inset-0 w-full h-full opacity-20">
          <defs>
            <linearGradient
              id="lineGradient"
              x1="0%"
              y1="0%"
              x2="100%"
              y2="100%"
            >
              <stop
                offset="0%"
                stopColor="hsl(var(--primary))"
                stopOpacity="0.3"
              />
              <stop
                offset="100%"
                stopColor="hsl(var(--secondary))"
                stopOpacity="0.1"
              />
            </linearGradient>
          </defs>

          {/* Animated connecting lines */}
          <line
            x1="10%"
            y1="20%"
            x2="30%"
            y2="40%"
            stroke="url(#lineGradient)"
            strokeWidth="1"
            className="animate-pulse"
          />
          <line
            x1="30%"
            y1="40%"
            x2="50%"
            y2="30%"
            stroke="url(#lineGradient)"
            strokeWidth="1"
            className="animate-pulse"
            style={{ animationDelay: "0.5s" }}
          />
          <line
            x1="50%"
            y1="30%"
            x2="70%"
            y2="50%"
            stroke="url(#lineGradient)"
            strokeWidth="1"
            className="animate-pulse"
            style={{ animationDelay: "1s" }}
          />
          <line
            x1="70%"
            y1="50%"
            x2="90%"
            y2="30%"
            stroke="url(#lineGradient)"
            strokeWidth="1"
            className="animate-pulse"
            style={{ animationDelay: "1.5s" }}
          />
          <line
            x1="20%"
            y1="60%"
            x2="40%"
            y2="80%"
            stroke="url(#lineGradient)"
            strokeWidth="1"
            className="animate-pulse"
            style={{ animationDelay: "0.3s" }}
          />
          <line
            x1="60%"
            y1="70%"
            x2="80%"
            y2="85%"
            stroke="url(#lineGradient)"
            strokeWidth="1"
            className="animate-pulse"
            style={{ animationDelay: "0.8s" }}
          />

          {/* Neural nodes (circles) */}
          <circle
            cx="10%"
            cy="20%"
            r="4"
            fill="hsl(var(--primary))"
            opacity="0.4"
            className="animate-pulse"
          />
          <circle
            cx="30%"
            cy="40%"
            r="5"
            fill="hsl(var(--primary))"
            opacity="0.3"
            className="animate-pulse"
            style={{ animationDelay: "0.5s" }}
          />
          <circle
            cx="50%"
            cy="30%"
            r="6"
            fill="hsl(var(--secondary))"
            opacity="0.3"
            className="animate-pulse"
            style={{ animationDelay: "1s" }}
          />
          <circle
            cx="70%"
            cy="50%"
            r="4"
            fill="hsl(var(--secondary))"
            opacity="0.4"
            className="animate-pulse"
            style={{ animationDelay: "1.5s" }}
          />
          <circle
            cx="90%"
            cy="30%"
            r="5"
            fill="hsl(var(--primary))"
            opacity="0.3"
            className="animate-pulse"
            style={{ animationDelay: "2s" }}
          />
          <circle
            cx="20%"
            cy="60%"
            r="4"
            fill="hsl(var(--primary))"
            opacity="0.4"
            className="animate-pulse"
            style={{ animationDelay: "0.3s" }}
          />
          <circle
            cx="40%"
            cy="80%"
            r="5"
            fill="hsl(var(--secondary))"
            opacity="0.3"
            className="animate-pulse"
            style={{ animationDelay: "0.8s" }}
          />
          <circle
            cx="60%"
            cy="70%"
            r="4"
            fill="hsl(var(--primary))"
            opacity="0.4"
            className="animate-pulse"
            style={{ animationDelay: "1.3s" }}
          />
          <circle
            cx="80%"
            cy="85%"
            r="5"
            fill="hsl(var(--secondary))"
            opacity="0.3"
            className="animate-pulse"
            style={{ animationDelay: "1.8s" }}
          />
        </svg>

        {/* Floating Brain Activity Orbs */}
        <div className="absolute top-20 left-10 w-64 h-64 bg-primary/30 rounded-full blur-3xl animate-float" />
        <div
          className="absolute top-40 right-20 w-96 h-96 bg-secondary/25 rounded-full blur-3xl animate-float"
          style={{ animationDelay: "1s" }}
        />
        <div
          className="absolute bottom-32 left-1/4 w-72 h-72 bg-accent/20 rounded-full blur-3xl animate-float"
          style={{ animationDelay: "2s" }}
        />
        <div
          className="absolute bottom-20 right-1/3 w-80 h-80 bg-primary/20 rounded-full blur-3xl animate-float"
          style={{ animationDelay: "1.5s" }}
        />
        <div
          className="absolute top-1/2 left-1/2 w-[500px] h-[500px] bg-secondary/15 rounded-full blur-3xl animate-float"
          style={{ animationDelay: "0.5s" }}
        />
      </div>
    </>
  );
};

export default AnimatedBackground;
