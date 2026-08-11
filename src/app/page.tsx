"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import Player from "@/components/Player";
import Rain from "@/components/Rain";

export default function Home() {
  const [isRaining, setIsRaining] = useState(false);

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: { 
      opacity: 1,
      transition: { staggerChildren: 0.2, delayChildren: 0.1 }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { 
      opacity: 1, 
      y: 0,
      transition: { duration: 0.8, ease: "easeOut" }
    }
  };

  return (
    <main className="relative w-full min-h-screen h-screen overflow-hidden selection:bg-primary/30 flex flex-col">
      {/* Background Image Setup using optimized Next.js Image */}
      <div className="absolute inset-0 z-0 bg-[#1a1625]" aria-hidden="true">
        <Image 
          src="/bg.png" 
          alt="Lofi radio aesthetic background with a red car at night"
          fill
          priority
          quality={85}
          className="object-cover object-center"
        />
        {/* Dark overlay that gets slightly darker when raining */}
        <div className={`absolute inset-0 z-10 transition-colors duration-1000 ${isRaining ? 'bg-black/60' : 'bg-black/40'}`} /> 
        <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-transparent to-black/80 z-10" />
      </div>

      {/* CSS Rain Effect */}
      <Rain isRaining={isRaining} />

      <motion.div 
        className="relative z-20 w-full h-full flex flex-col"
        variants={containerVariants}
        initial="hidden"
        animate="visible"
      >
        {/* Header */}
        <motion.header variants={itemVariants} className="w-full p-6 md:px-10 lg:px-24 md:py-6 flex justify-between items-start">
          <div className="flex flex-col">
            <h1 className="text-xl sm:text-2xl tracking-[0.3em] font-medium text-white mb-1" aria-label="DriveSlow">DRIVESLOW</h1>
            <p className="text-gray-400 text-[10px] sm:text-xs tracking-widest font-medium">lofi radio for late nights.</p>
          </div>
          
          <nav 
            className="flex gap-4 md:gap-8 lg:gap-12 text-[10px] sm:text-sm tracking-[0.2em] font-medium text-gray-300 mt-1 md:mt-0"
            aria-label="Main Navigation"
          >
            <div className="relative flex flex-col items-center">
              <span className="text-primary cursor-default">RADIO</span>
              <span className="text-primary text-[8px] absolute -bottom-3">
                ●
              </span>
            </div>
            <Link
              href="/about"
              className="hover:text-white focus:outline-none focus:text-white transition-colors"
            >
              ABOUT
            </Link>
          </nav>
        </motion.header>

        {/* Main Content */}
        <motion.article variants={itemVariants} className="flex-1 flex flex-col justify-center px-6 md:px-10 lg:px-24 pb-8">
          <div className="text-primary text-2xl sm:text-3xl tracking-wider mb-2 font-script opacity-90">
            Late nights.
          </div>
          
          <h2 className="font-display text-5xl sm:text-7xl lg:text-[7rem] leading-[0.85] tracking-tight text-white mb-4">
            SLOW DRIVES.<br />
            SOFT VIBES.
          </h2>
          
          <p className="text-gray-300/80 text-sm md:text-base tracking-wide max-w-xs leading-relaxed font-medium">
            lofi radio to calm your mind,<br />
            and keep you company.
          </p>
        </motion.article>

        {/* Player Component handles Controls, Now Playing, and Footer */}
        <motion.div variants={itemVariants} className="w-full mt-auto">
          <Player isRaining={isRaining} toggleRain={() => setIsRaining(!isRaining)} />
        </motion.div>
      </motion.div>
    </main>
  );
}
