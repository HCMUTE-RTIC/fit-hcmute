"use client";

import { useState, useEffect } from "react";
import SplashScreen from "./SplashScreen";

const SPLASH_SHOWN_KEY = "splash_shown";

export default function SplashWrapper({
  children,
}: {
  children: React.ReactNode;
}) {
  const [showSplash, setShowSplash] = useState(false);
  const [ready, setReady] = useState(false);

  useEffect(() => {
    const wasShown = sessionStorage.getItem(SPLASH_SHOWN_KEY);
    if (!wasShown) {
      setShowSplash(true);
    }
    setReady(true);
  }, []);

  const handleSplashComplete = () => {
    setShowSplash(false);
    sessionStorage.setItem(SPLASH_SHOWN_KEY, "1");
  };

  // Prevent flash before hydration check
  if (!ready) {
    return (
      <div
        className="fixed inset-0 z-[99999]"
        style={{ backgroundColor: "#0c1a3a" }}
      />
    );
  }

  return (
    <>
      {showSplash && <SplashScreen onComplete={handleSplashComplete} />}
      <div
        style={{
          visibility: showSplash ? "hidden" : "visible",
          opacity: showSplash ? 0 : 1,
          transition: "opacity 0.3s ease",
        }}
      >
        {children}
      </div>
    </>
  );
}
