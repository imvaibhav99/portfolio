"use client"

import { motion } from "framer-motion"
import { useState } from "react"

interface CircularProgressProps {
  skill: string
  percentage: number
  index: number
}

export function CircularProgress({ skill, percentage, index }: CircularProgressProps) {
  const [isVisible, setIsVisible] = useState(false)
  const radius = 45
  const circumference = 2 * Math.PI * radius
  const strokeDasharray = circumference
  const strokeDashoffset = circumference - (percentage / 100) * circumference

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.8 }}
      whileInView={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.6, delay: index * 0.1 }}
      viewport={{ once: false, amount: 0.3 }}
      onViewportEnter={() => setIsVisible(true)}
      className="flex flex-col items-center group"
    >
      <div className="relative w-24 h-24 mb-4">
        <svg className="w-24 h-24 transform -rotate-90" viewBox="0 0 100 100">
          {/* Background Circle */}
          <circle
            cx="50"
            cy="50"
            r={radius}
            stroke="currentColor"
            strokeWidth="8"
            fill="transparent"
            className="text-muted/30"
          />

          {/* Progress Circle */}
          <motion.circle
            cx="50"
            cy="50"
            r={radius}
            stroke="url(#gradient)"
            strokeWidth="8"
            fill="transparent"
            strokeLinecap="round"
            strokeDasharray={strokeDasharray}
            initial={{ strokeDashoffset: circumference }}
            animate={{ strokeDashoffset: isVisible ? strokeDashoffset : circumference }}
            transition={{ duration: 2, delay: index * 0.1, ease: "easeOut" }}
            className="drop-shadow-lg"
          />

          {/* Gradient Definition */}
          <defs>
            <linearGradient id="gradient" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="rgb(8, 145, 178)" />
              <stop offset="100%" stopColor="rgb(99, 102, 241)" />
            </linearGradient>
          </defs>
        </svg>

        {/* Percentage Text */}
        <div className="absolute inset-0 flex items-center justify-center">
          <motion.span
            initial={{ opacity: 0 }}
            animate={{ opacity: isVisible ? 1 : 0 }}
            transition={{ duration: 0.5, delay: index * 0.1 + 0.5 }}
            className="text-lg font-bold text-primary"
          >
            {percentage}%
          </motion.span>
        </div>
      </div>

      <span className="text-sm font-medium text-foreground text-center group-hover:text-primary transition-colors duration-300">
        {skill}
      </span>
    </motion.div>
  )
}
