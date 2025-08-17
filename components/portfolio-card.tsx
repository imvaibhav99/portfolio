"use client"

import { motion } from "framer-motion"
import { Button } from "@/components/ui/button"
import { ExternalLink, Github, Eye } from "lucide-react"
import { useState } from "react"

interface PortfolioCardProps {
  title: string
  description: string
  image: string
  technologies: string[]
  liveUrl: string
  githubUrl: string
  index: number
}

export function PortfolioCard({
  title,
  description,
  image,
  technologies,
  liveUrl,
  githubUrl,
  index,
}: PortfolioCardProps) {
  const [isHovered, setIsHovered] = useState(false)

  return (
    <motion.div
      initial={{ opacity: 0, y: 50 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, delay: index * 0.1 }}
      viewport={{ once: false, amount: 0.3 }}
      className="group relative"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <motion.div
        whileHover={{
          y: -15,
          rotateX: 5,
          rotateY: 5,
          scale: 1.02,
        }}
        transition={{ duration: 0.4, ease: "easeOut" }}
        className="glass-strong rounded-2xl overflow-hidden h-full hover:neon-glow transition-all duration-500 border-2 border-transparent hover:border-primary/30"
        style={{
          transformStyle: "preserve-3d",
          perspective: "1000px",
        }}
      >
        {/* Project Image */}
        <div className="relative overflow-hidden h-48 bg-gradient-to-br from-primary/10 to-secondary/10">
          <img
            src={image || "/placeholder.svg"}
            alt={title}
            className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-card/80 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

          {/* Hover Overlay with Actions */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: isHovered ? 1 : 0, y: isHovered ? 0 : 20 }}
            transition={{ duration: 0.3 }}
            className="absolute inset-0 flex items-center justify-center gap-4"
          >
            <Button size="sm" className="neon-glow bg-primary/90 hover:bg-primary text-primary-foreground" asChild>
              <a href={liveUrl} target="_blank" rel="noopener noreferrer">
                <Eye className="w-4 h-4 mr-2" />
                Live Demo
              </a>
            </Button>
            <Button
              size="sm"
              variant="outline"
              className="glass bg-card/90 hover:bg-card text-foreground border-border/50"
              asChild
            >
              <a href={githubUrl} target="_blank" rel="noopener noreferrer">
                <Github className="w-4 h-4 mr-2" />
                Code
              </a>
            </Button>
          </motion.div>
        </div>

        {/* Project Content */}
        <div className="p-6">
          <h3 className="font-playfair font-bold text-xl mb-3 text-foreground group-hover:text-primary transition-colors duration-300">
            {title}
          </h3>

          <p className="text-muted-foreground mb-4 leading-relaxed text-sm">{description}</p>

          {/* Technologies */}
          <div className="flex flex-wrap gap-2 mb-4">
            {technologies.map((tech, techIndex) => (
              <motion.span
                key={tech}
                initial={{ opacity: 0, scale: 0.8 }}
                whileInView={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.3, delay: index * 0.1 + techIndex * 0.05 }}
                viewport={{ once: false, amount: 0.3 }}
                className="px-3 py-1 text-xs rounded-full bg-gradient-to-r from-primary/20 to-secondary/20 text-foreground/80 border border-border/30"
              >
                {tech}
              </motion.span>
            ))}
          </div>

          {/* Action Links */}
          <div className="flex items-center gap-4 pt-2">
            <a
              href={liveUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center text-sm text-primary hover:text-secondary transition-colors duration-300"
            >
              <ExternalLink className="w-4 h-4 mr-1" />
              Live Site
            </a>
            <a
              href={githubUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center text-sm text-muted-foreground hover:text-primary transition-colors duration-300"
            >
              <Github className="w-4 h-4 mr-1" />
              Source
            </a>
          </div>
        </div>
      </motion.div>
    </motion.div>
  )
}
