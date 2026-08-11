"use client";

import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import { Code, Heart, Coffee } from "lucide-react";

export default function About() {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.2, delayChildren: 0.1 },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.8, ease: "easeOut" },
    },
  };

  return (
    <main className="relative w-full min-h-screen md:h-screen overflow-x-hidden overflow-y-auto md:overflow-hidden selection:bg-primary/30 flex flex-col font-sans">
      {/* Background Image Setup */}
      <div className="absolute inset-0 z-0 bg-[#1a1625]" aria-hidden="true">
        <Image
          src="/bg.png"
          alt="Lofi radio aesthetic background with a red car at night"
          fill
          priority
          quality={85}
          className="object-cover object-center"
        />
        <div className="absolute inset-0 z-10 bg-black/40" /> 
        <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-transparent to-black/80 z-10" />
      </div>

      <div className="relative z-20 w-full min-h-full flex flex-col justify-between">
        {/* Header (Navbar) */}
        <header className="w-full p-6 md:px-10 lg:px-24 md:py-6 flex justify-between items-start shrink-0">
          <div className="flex flex-col">
            <Link href="/">
              <h1 className="text-xl sm:text-2xl tracking-[0.3em] font-medium text-white mb-1 hover:text-white/80 transition-colors cursor-pointer">
                DRIVESLOW
              </h1>
            </Link>
            <p className="text-gray-400 text-[10px] sm:text-xs tracking-widest font-medium">
              lofi radio for late nights.
            </p>
          </div>

          <nav
            className="flex gap-4 md:gap-8 lg:gap-12 text-[10px] sm:text-sm tracking-[0.2em] font-medium text-gray-300 mt-1 md:mt-0"
            aria-label="Main Navigation"
          >
            <Link
              href="/"
              className="hover:text-white focus:outline-none focus:text-white transition-colors"
            >
              RADIO
            </Link>
            <div className="relative flex flex-col items-center">
              <span className="text-primary cursor-default">ABOUT</span>
              <span className="text-primary text-[8px] absolute -bottom-3">
                ●
              </span>
            </div>
          </nav>
        </header>

        {/* Main Content Area */}
        <motion.div
          className="flex-1 px-6 md:px-10 lg:px-24 flex flex-col justify-center"
          variants={containerVariants}
          initial="hidden"
          animate="visible"
        >
          {/* Left Text Block */}
          <div className="max-w-xl">
            <motion.h3
              variants={itemVariants}
              className="text-primary tracking-[0.4em] text-[10px] sm:text-xs font-bold mb-4"
            >
              ABOUT
            </motion.h3>

            <motion.h2
              variants={itemVariants}
              className="font-display text-5xl sm:text-7xl lg:text-[7rem] leading-[0.85] tracking-tight text-white mb-8 sm:mb-10"
            >
              THERE ISN'T
              <br />
              REALLY A POINT<span className="text-primary">.</span>
            </motion.h2>

            <motion.div
              variants={itemVariants}
              className="text-gray-300 text-xs sm:text-sm leading-relaxed font-medium tracking-wide flex flex-col gap-6"
            >
              <p>
                DriveSlow was made because we felt like making it.
                <br />
                No grand mission. No productivity hack.
                <br />
                No revolutionary technology.
              </p>
              <p>
                Just a quiet little corner of the internet where you can
                <br />
                sit for a while, listen to some music, watch the grass
                <br />
                move, and pretend you're driving somewhere with
                <br />
                nowhere to be.
              </p>
            </motion.div>
          </div>
        </motion.div>

        {/* Bottom Section */}
        <motion.div
          className="w-full px-6 md:px-10 lg:px-24 pb-8 shrink-0 flex flex-col gap-10"
          variants={containerVariants}
          initial="hidden"
          animate="visible"
        >
          {/* 3 Columns */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 md:gap-4 text-center items-start">
            {/* Column 1 */}
            <motion.div
              variants={itemVariants}
              className="flex flex-col items-center border-b md:border-b-0 md:border-r border-white/10 pb-6 md:pb-0 md:pr-4"
            >
              <Code className="text-primary w-6 h-6 mb-4" strokeWidth={1.5} />
              <h4 className="text-white tracking-[0.3em] font-display text-lg mb-4">
                HOW IT WAS MADE
              </h4>
              <p className="text-gray-400 text-xs leading-relaxed font-medium tracking-wide">
                Mostly vibecoding.
                <br />
                But with a developer sitting
                <br />
                behind it — making decisions,
                <br />
                fixing things, and occasionally
                <br />
                asking "why did it do that?"
              </p>
            </motion.div>

            {/* Column 2 */}
            <motion.div
              variants={itemVariants}
              className="flex flex-col items-center border-b md:border-b-0 md:border-r border-white/10 pb-6 md:pb-0 md:px-4"
            >
              <Heart className="text-primary w-6 h-6 mb-4" strokeWidth={1.5} />
              <h4 className="text-white tracking-[0.3em] font-display text-lg mb-4">
                WHY IT EXISTS
              </h4>
              <p className="text-gray-400 text-xs leading-relaxed font-medium tracking-wide">
                Honestly?
                <br />
                <span className="text-primary">For nothing.</span>
                <br />
                Just a project made for fun.
                <br />
                No agenda. No purpose.
                <br />
                Just vibes.
              </p>
            </motion.div>

            {/* Column 3 */}
            <motion.div
              variants={itemVariants}
              className="flex flex-col items-center md:pl-4"
            >
              <Coffee className="text-primary w-6 h-6 mb-4" strokeWidth={1.5} />
              <h4 className="text-white tracking-[0.3em] font-display text-lg mb-4">
                MADE FOR YOU
              </h4>
              <p className="text-gray-400 text-xs leading-relaxed font-medium tracking-wide">
                For the night owls.
                <br />
                The overthinkers.
                <br />
                The calm seekers.
                <br />
                Press play, and stay as
                <br />
                long as you like.
              </p>
            </motion.div>
          </div>

          {/* Footer Text */}
          <motion.div
            variants={itemVariants}
            className="flex flex-col items-center gap-4"
          >
            <p className="text-primary text-[8px] sm:text-[10px] tracking-[0.3em] sm:tracking-[0.4em] font-bold text-center px-4">
              BUILT WITH CURIOSITY, QUESTIONABLE AMOUNTS OF COFFEE, AND
              ABSOLUTELY NO BUSINESS PLAN.
            </p>
            <p className="text-gray-500 text-[10px] tracking-widest font-medium text-center">
              © 2026 DriveSlow — made for fun.
            </p>
          </motion.div>
        </motion.div>
      </div>
    </main>
  );
}
