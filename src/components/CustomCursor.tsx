"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";

export default function CustomCursor() {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [isHovering, setIsHovering] = useState(false);

  useEffect(() => {
    const updateMousePosition = (e: MouseEvent) => {
      setMousePosition({ x: e.clientX, y: e.clientY });
    };

    const handleMouseOver = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      // Check if the hovered element is a button, link, or has cursor-pointer
      if (
        target.tagName.toLowerCase() === "button" ||
        target.tagName.toLowerCase() === "a" ||
        target.closest("button") ||
        target.closest("a") ||
        window.getComputedStyle(target).cursor === "pointer"
      ) {
        setIsHovering(true);
      } else {
        setIsHovering(false);
      }
    };

    window.addEventListener("mousemove", updateMousePosition);
    window.addEventListener("mouseover", handleMouseOver);

    return () => {
      window.removeEventListener("mousemove", updateMousePosition);
      window.removeEventListener("mouseover", handleMouseOver);
    };
  }, []);

  return (
    <motion.div
      className="fixed top-0 left-0 w-8 h-8 rounded-full pointer-events-none z-[100] backdrop-blur-sm bg-white/10 border border-white/20 shadow-[0_0_15px_rgba(255,255,255,0.1)] flex items-center justify-center"
      animate={{
        x: mousePosition.x - 16, // Center the 32px (w-8) circle perfectly on the mouse tip
        y: mousePosition.y - 16,
        scale: isHovering ? 1.5 : 1,
        backgroundColor: isHovering ? "rgba(255, 255, 255, 0.2)" : "rgba(255, 255, 255, 0.1)",
      }}
      transition={{
        type: "spring",
        stiffness: 1000,
        damping: 40,
        mass: 0.1,
      }}
    >
      {/* Inner dot */}
      <motion.div 
        className="w-1.5 h-1.5 bg-white rounded-full"
        animate={{
          opacity: isHovering ? 0 : 1,
          scale: isHovering ? 0 : 1,
        }}
      />
    </motion.div>
  );
}
