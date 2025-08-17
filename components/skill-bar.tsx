"use client"

import { motion } from "framer-motion"
import { useState } from "react"

interface SkillBarProps {
  skill: string
  percentage: number
  index: number
}

export function SkillBar({ skill, percentage, index }: SkillBarProps) {
  const [isVisible, setIsVisible] = useState(false)

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
      viewport={{ once: false, amount: 0.3 }}
      onViewportEnter={() => setIsVisible(true)}
      className="mb-6"
    >
      <div className="flex justify-between items-center mb-2">
        <span className="font-medium text-foreground">{skill}</span>
        <span className="text-sm text-primary font-bold">{percentage}%</span>
      </div>

      <div className="h-2 bg-muted rounded-full overflow-hidden">
        <motion.div
          initial={{ width: 0 }}
          animate={{ width: isVisible ? `${percentage}%` : 0 }}
          transition={{ duration: 1.5, delay: index * 0.1, ease: "easeOut" }}
          className="h-full bg-gradient-to-r from-primary to-secondary rounded-full relative"
        >
          <div className="absolute inset-0 bg-gradient-to-r from-primary/50 to-secondary/50 animate-pulse" />
        </motion.div>
      </div>
    </motion.div>
  )
}
