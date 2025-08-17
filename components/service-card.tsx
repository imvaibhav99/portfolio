"use client"

import { motion } from "framer-motion"
import type { LucideIcon } from "lucide-react"

interface ServiceCardProps {
  icon: LucideIcon
  title: string
  description: string
  features: string[]
  index: number
}

export function ServiceCard({ icon: Icon, title, description, features, index }: ServiceCardProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 50 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, delay: index * 0.1 }}
      viewport={{ once: false, amount: 0.3 }}
      whileHover={{ y: -10, scale: 1.02 }}
      className="group"
    >
      <div className="glass-strong rounded-2xl p-8 h-full hover:neon-glow transition-all duration-500 border-2 border-transparent hover:border-primary/30">
        <div className="flex items-center mb-6">
          <div className="p-3 rounded-xl bg-gradient-to-br from-primary/20 to-secondary/20 group-hover:from-primary/30 group-hover:to-secondary/30 transition-all duration-300">
            <Icon className="w-8 h-8 text-primary group-hover:text-secondary transition-colors duration-300" />
          </div>
        </div>

        <h3 className="font-playfair font-bold text-2xl mb-4 text-foreground group-hover:text-primary transition-colors duration-300">
          {title}
        </h3>

        <p className="text-muted-foreground mb-6 leading-relaxed">{description}</p>

        <ul className="space-y-3">
          {features.map((feature, featureIndex) => (
            <motion.li
              key={featureIndex}
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.4, delay: index * 0.1 + featureIndex * 0.1 }}
              viewport={{ once: false, amount: 0.3 }}
              className="flex items-center text-sm text-foreground/80"
            >
              <div className="w-2 h-2 rounded-full bg-gradient-to-r from-primary to-secondary mr-3 group-hover:shadow-lg group-hover:shadow-primary/50 transition-all duration-300" />
              {feature}
            </motion.li>
          ))}
        </ul>
      </div>
    </motion.div>
  )
}
