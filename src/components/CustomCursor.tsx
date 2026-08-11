"use client";

import { useEffect, useState } from "react";
import { motion, useMotionValue, useSpring } from "framer-motion";

export default function CustomCursor() {
  const [isHovering, setIsHovering] = useState(false);
  const [isVisible, setIsVisible] = useState(false);
  
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  // Ultra-performant spring tracking (bypasses React state completely for movement)
  const springX = useSpring(mouseX, { stiffness: 1000, damping: 40, mass: 0.1 });
  const springY = useSpring(mouseY, { stiffness: 1000, damping: 40, mass: 0.1 });

  useEffect(() => {
    const updateMousePosition = (e: MouseEvent) => {
      if (!isVisible) setIsVisible(true);
      mouseX.set(e.clientX - 16); // Center the 32px cursor
      mouseY.set(e.clientY - 16);
    };

    const handleMouseOver = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
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
  }, [mouseX, mouseY, isVisible]);

  return (
    <motion.div
      className="fixed top-0 left-0 w-8 h-8 rounded-full pointer-events-none z-[100] backdrop-blur-sm border shadow-[0_0_15px_rgba(255,255,255,0.1)] flex items-center justify-center"
      style={{
        x: springX,
        y: springY,
        opacity: isVisible ? 1 : 0, // Hide until mouse moves
      }}
      animate={{
        scale: isHovering ? 1.5 : 1,
        backgroundColor: isHovering ? "rgba(255, 255, 255, 0.2)" : "rgba(255, 255, 255, 0.1)",
        borderColor: isHovering ? "rgba(255, 255, 255, 0.4)" : "rgba(255, 255, 255, 0.2)"
      }}
      transition={{
        scale: { type: "spring", stiffness: 400, damping: 30 },
        backgroundColor: { duration: 0.2 },
        borderColor: { duration: 0.2 }
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
