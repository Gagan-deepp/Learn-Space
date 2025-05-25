"use client"

import { useState, useEffect } from "react"
import { motion, AnimatePresence } from "framer-motion"

export default function PreLoader({ setIsLoading }) {
  const [progress, setProgress] = useState(0)
  const [dimension, setDimension] = useState({ width: 0, height: 0 })
  const [wordIndex, setWordIndex] = useState(0)

  const loadingWords = ["Learn", "Explore", "Discover", "Create", "Connect"]

  useEffect(() => {
    setDimension({ width: window.innerWidth, height: window.innerHeight })
  }, [])

  useEffect(() => {
    // Word cycling animation
    const wordInterval = setInterval(() => {
      setWordIndex((prev) => (prev + 1) % loadingWords.length)
    }, 650)

    // Progress simulation
    const progressInterval = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) {
          clearInterval(progressInterval)
          clearInterval(wordInterval)
          setTimeout(() => setIsLoading(false), 1000)
          return 100
        }
        return prev + Math.random() * 15 + 5
      })
    }, 200)

    return () => {
      clearInterval(progressInterval)
      clearInterval(wordInterval)
    }
  }, [])

  const slideUp = {
    initial: { top: 0 },
    exit: {
      top: "-150vh",
      transition: { duration: 1.2, ease: [0.76, 0, 0.24, 1], delay: 0.3 },
    },
  }

  const initialPath = `M0 0 L${dimension.width} 0 L${dimension.width} ${dimension.height} Q${dimension.width / 2} ${dimension.height + 400} 0 ${dimension.height} L0 0`
  const targetPath = `M0 0 L${dimension.width} 0 L${dimension.width} ${dimension.height} Q${dimension.width / 2} ${dimension.height} 0 ${dimension.height} L0 0`

  const curve = {
    initial: {
      d: initialPath,
      transition: { duration: 0.8, ease: [0.76, 0, 0.24, 1] },
    },
    exit: {
      d: targetPath,
      transition: { duration: 0.8, ease: [0.76, 0, 0.24, 1], delay: 0.4 },
    },
  }

  const containerVariants = {
    initial: { opacity: 0 },
    animate: {
      opacity: 1,
      transition: { duration: 0.8, delay: 0.2 },
    },
  }

  const logoVariants = {
    initial: {
      opacity: 0,
      scale: 0.8,
      y: 30,
    },
    animate: {
      opacity: 1,
      scale: 1,
      y: 0,
      transition: {
        duration: 1.2,
        ease: [0.25, 0.46, 0.45, 0.94],
        delay: 0.5,
      },
    },
  }

  return (
    <motion.div
      variants={slideUp}
      initial="initial"
      exit="exit"
      className="fixed inset-0 z-50 bg-[#141516] overflow-hidden"
    >
      {dimension.width > 0 && (
        <>
          {/* Main Content */}
          <motion.div
            variants={containerVariants}
            initial="initial"
            animate="animate"
            className="relative z-10 h-full flex flex-col items-center justify-center bg-[#141516]"
          >
            {/* Logo Section */}
            <motion.div variants={logoVariants} initial="initial" animate="animate" className="text-center mb-16">
              <div className="relative">
                <motion.h1
                  className="text-6xl md:text-8xl font-thin tracking-[0.2em] text-white mb-4"
                  animate={{
                    textShadow: [
                      "0 0 20px rgba(255,255,255,0.3)",
                      "0 0 40px rgba(255,255,255,0.5)",
                      "0 0 20px rgba(255,255,255,0.3)",
                    ],
                  }}
                  transition={{
                    duration: 3,
                    repeat: Number.POSITIVE_INFINITY,
                    ease: "easeInOut",
                  }}
                >
                  Learn
                </motion.h1>

                {/* Animated Line */}
                <motion.div
                  className="h-px bg-gradient-to-r from-transparent via-white to-transparent mx-auto"
                  initial={{ width: 0, opacity: 0 }}
                  animate={{ width: "200px", opacity: 1 }}
                  transition={{ duration: 1.5, delay: 1 }}
                />

                <motion.h2
                  className="text-3xl md:text-4xl font-extralight tracking-[0.3em] text-white/80 mt-4"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 1, delay: 1.2 }}
                >
                  Space
                </motion.h2>
              </div>
            </motion.div>

            {/* Dynamic Loading Section */}
            <motion.div
              className="flex flex-col items-center space-y-8"
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 1.5 }}
            >
              {/* Morphing Loader */}
              <div className="relative">
                <motion.div
                  className="w-20 h-20 border border-white/30 rounded-full"
                  animate={{
                    rotate: [0, 360],
                    scale: [1, 1.1, 1],
                  }}
                  transition={{
                    rotate: { duration: 3, repeat: Number.POSITIVE_INFINITY, ease: "linear" },
                    scale: { duration: 2, repeat: Number.POSITIVE_INFINITY, ease: "easeInOut" },
                  }}
                />
                <motion.div
                  className="absolute inset-2 border-t-2 border-white rounded-full"
                  animate={{ rotate: [0, -360] }}
                  transition={{ duration: 1.5, repeat: Number.POSITIVE_INFINITY, ease: "linear" }}
                />

                {/* Center Dot */}
                <motion.div
                  className="absolute top-1/2 left-1/2 w-2 h-2 bg-white rounded-full transform -translate-x-1/2 -translate-y-1/2"
                  animate={{
                    scale: [1, 1.5, 1],
                    opacity: [0.5, 1, 0.5],
                  }}
                  transition={{
                    duration: 1.5,
                    repeat: Number.POSITIVE_INFINITY,
                    ease: "easeInOut",
                  }}
                />
              </div>

              {/* Progress Bar */}
              <div className="w-80 h-px bg-white/20 relative overflow-hidden">
                <motion.div
                  className="absolute left-0 top-0 h-full bg-gradient-to-r from-white/60 via-white to-white/60"
                  initial={{ width: 0 }}
                  animate={{ width: `${Math.min(progress, 100)}%` }}
                  transition={{ duration: 0.3, ease: "easeOut" }}
                />

                {/* Shimmer Effect */}
                <motion.div
                  className="absolute top-0 h-full w-20 bg-gradient-to-r from-transparent via-white/40 to-transparent"
                  animate={{ x: [-80, 320] }}
                  transition={{
                    duration: 2,
                    repeat: Number.POSITIVE_INFINITY,
                    ease: "easeInOut",
                  }}
                />
              </div>

              {/* Dynamic Text */}
              <div className="text-center">
                <AnimatePresence mode="wait">
                  <motion.p
                    key={wordIndex}
                    className="text-lg font-light tracking-widest text-white/70"
                    initial={{ opacity: 0, y: 20, scale: 0.9 }}
                    animate={{ opacity: 1, y: 0, scale: 1 }}
                    exit={{ opacity: 0, y: -20, scale: 0.9 }}
                    transition={{ duration: 0.5 }}
                  >
                    {loadingWords[wordIndex]}ing...
                  </motion.p>
                </AnimatePresence>

                <motion.p
                  className="text-sm tracking-wider text-white/40 mt-2"
                  animate={{ opacity: [0.4, 0.8, 0.4] }}
                  transition={{ duration: 2, repeat: Number.POSITIVE_INFINITY }}
                >
                  {Math.round(Math.min(progress, 100))}%
                </motion.p>
              </div>
            </motion.div>

            {/* Geometric Decorations */}
            <motion.div
              className="absolute bottom-20 right-20 w-20 h-1 bg-gradient-to-r from-white/40 to-transparent"
              initial={{ scaleX: 0, opacity: 0 }}
              animate={{ scaleX: 1, opacity: 1 }}
              transition={{ duration: 1, delay: 2.2 }}
            />
          </motion.div>

          {/* Curved SVG Overlay */}
          <svg className="absolute bottom-0 w-full h-[calc(100vh+400px)] pointer-events-none">
            <motion.path className="bg-[#141516]" variants={curve} initial="initial" exit="exit" fill="black" />
          </svg>
        </>
      )}
    </motion.div>
  )
}
