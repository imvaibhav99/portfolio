"use client"

import { motion } from "framer-motion"
import { Calendar } from "lucide-react"

interface TimelineItemProps {
  year: string
  title: string
  company: string
  description: string
  index: number
}

export function TimelineItem({ year, title, company, description, index }: TimelineItemProps) {
  return (
    <motion.div
      initial={{ opacity: 0, x: index % 2 === 0 ? -50 : 50 }}
      whileInView={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.6, delay: index * 0.1 }}
      viewport={{ once: false, amount: 0.3 }}
      className="relative flex items-center group"
    >
      {/* Timeline Line */}
      <div className="absolute left-1/2 transform -translate-x-1/2 w-px h-full bg-gradient-to-b from-primary/50 to-secondary/50" />

      {/* Timeline Dot */}
      <motion.div
        whileHover={{ scale: 1.2 }}
        className="absolute left-1/2 transform -translate-x-1/2 w-4 h-4 rounded-full bg-gradient-to-r from-primary to-secondary neon-glow z-10 group-hover:shadow-lg group-hover:shadow-primary/50 transition-all duration-300"
      />

      {/* Content Card */}
      <div className={`w-5/12 ${index % 2 === 0 ? "pr-8 text-right" : "ml-auto pl-8 text-left"}`}>
        <motion.div
          whileHover={{ y: -5, scale: 1.02 }}
          className="glass-strong rounded-xl p-6 hover:neon-glow transition-all duration-300 border border-border/30 hover:border-primary/30"
        >
          <div className="flex items-center gap-2 mb-3">
            <Calendar className="w-4 h-4 text-primary" />
            <span className="text-sm font-medium text-primary">{year}</span>
          </div>

          <h3 className="font-playfair font-bold text-lg mb-2 text-foreground group-hover:text-primary transition-colors duration-300">
            {title}
          </h3>

          <p className="text-secondary font-medium mb-3">{company}</p>

          <p className="text-muted-foreground text-sm leading-relaxed">{description}</p>
        </motion.div>
      </div>
    </motion.div>
  )
}
