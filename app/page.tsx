"use client"
import { motion } from "framer-motion"
import { useEffect, useState } from "react"
import { Button } from "@/components/ui/button"
import { ServiceCard } from "@/components/service-card"
import { PortfolioCard } from "@/components/portfolio-card"
import { TimelineItem } from "@/components/timeline-item"
import { SkillBar } from "@/components/skill-bar"
import { CircularProgress } from "@/components/circular-progress"
import { ContactForm } from "@/components/contact-form"
import { EnhancedNavigation } from "@/components/enhanced-navigation"
import { LoadingScreen } from "@/components/loading-screen"
import { ThemeSwitcher } from "@/components/theme-switcher"
import { Reliable3DBackground } from "@/components/reliable-3d-background"
import {
  Github,
  Linkedin,
  Mail,
  Code,
  Database,
  ShoppingCart,
  Palette,
  Download,
  MapPin,
  Phone,
  MessageCircle,
  Twitter,
} from "lucide-react"

const services = [
  {
    icon: Code,
    title: "MVPs",
    description: "Custom MVPs built with modern technologies, optimized for performance and user experience.",
    features: [
      "Responsive Design & Mobile-First Approach",
      "SEO Optimization & Performance Tuning",
      "Modern JavaScript Frameworks (React, Next.js)",
      "Progressive Web Apps (PWA)",
    ],
  },
  {
    icon: Database,
    title: "Full Stack Solutions",
    description: "End-to-end development from database design to user interface, creating scalable applications.",
    features: [
      "API Development & Integration",
      "Database Design & Management",
      "Authentication & Security",
      "Cloud Deployment & DevOps",
    ],
  },
  {
    icon: ShoppingCart,
    title: "E-commerce",
    description: "High-converting online stores with seamless payment integration and inventory management.",
    features: [
      "Payment Gateway Integration",
      "Inventory Management Systems",
      "Order Processing & Analytics",
      "Multi-platform Compatibility",
    ],
  },
  {
    icon: Palette,
    title: "UI/UX Design",
    description: "User-centered design that combines aesthetics with functionality for optimal user engagement.",
    features: [
      "User Research & Wireframing",
      "Interactive Prototypes",
      "Design Systems & Style Guides",
      "Usability Testing & Optimization",
    ],
  },
]

const projects = [
  {
    title: "TechFlow SaaS Platform",
    description:
      "A comprehensive project management platform with real-time collaboration, advanced analytics, and AI-powered insights for modern teams.",
    image: "/modern-saas-dashboard-dark.png",
    technologies: ["Next.js", "TypeScript", "Prisma", "PostgreSQL", "Tailwind CSS"],
    liveUrl: "https://techflow-demo.vercel.app",
    githubUrl: "https://github.com/alexchen/techflow-saas",
  },
  {
    title: "EcoCommerce Store",
    description:
      "Sustainable e-commerce platform featuring carbon footprint tracking, eco-friendly product recommendations, and green shipping options.",
    image: "/eco-friendly-ecommerce.png",
    technologies: ["React", "Node.js", "Stripe", "MongoDB", "Express"],
    liveUrl: "https://ecocommerce-demo.vercel.app",
    githubUrl: "https://github.com/alexchen/ecocommerce",
  },
  {
    title: "FinanceTracker Pro",
    description:
      "Personal finance management app with AI-powered expense categorization, investment tracking, and financial goal planning.",
    image: "/financial-dashboard.png",
    technologies: ["Vue.js", "Python", "FastAPI", "PostgreSQL", "Chart.js"],
    liveUrl: "https://financetracker-demo.vercel.app",
    githubUrl: "https://github.com/alexchen/finance-tracker",
  },
  {
    title: "CreativeStudio Portfolio",
    description:
      "Interactive portfolio website for a design agency featuring 3D animations, smooth transitions, and immersive user experience.",
    image: "/creative-portfolio-3d.png",
    technologies: ["Three.js", "React", "Framer Motion", "GSAP", "Tailwind CSS"],
    liveUrl: "https://creativestudio-demo.vercel.app",
    githubUrl: "https://github.com/alexchen/creative-studio",
  },
  {
    title: "HealthConnect Telemedicine",
    description:
      "Telemedicine platform connecting patients with healthcare providers through secure video calls, appointment scheduling, and health records.",
    image: "/placeholder-7tgmv.png",
    technologies: ["Next.js", "WebRTC", "Socket.io", "MySQL", "Tailwind CSS"],
    liveUrl: "https://healthconnect-demo.vercel.app",
    githubUrl: "https://github.com/alexchen/health-connect",
  },
  {
    title: "SmartHome Dashboard",
    description:
      "IoT dashboard for smart home automation with real-time device monitoring, energy usage analytics, and voice control integration.",
    image: "/smart-home-dashboard.png",
    technologies: ["React", "IoT", "WebSocket", "InfluxDB", "D3.js"],
    liveUrl: "https://smarthome-demo.vercel.app",
    githubUrl: "https://github.com/alexchen/smart-home",
  },
]

const timelineData = [
  // {
  //   year: "2024",
  //   title: "Senior Full Stack Developer",
  //   company: "TechFlow Solutions",
  //   description:
  //     "Leading development of enterprise-scale web applications using Next.js, TypeScript, and cloud technologies. Mentoring junior developers and architecting scalable solutions.",
  // },
  // {
  //   year: "2022",
  //   title: "Full Stack Developer",
  //   company: "Digital Innovations Inc",
  //   description:
  //     "Developed and maintained multiple client projects using React, Node.js, and various databases. Implemented CI/CD pipelines and improved application performance by 40%.",
  // },
  // {
  //   year: "2020",
  //   title: "Frontend Developer",
  //   company: "Creative Web Studio",
  //   description:
  //     "Specialized in creating responsive, interactive user interfaces using modern JavaScript frameworks. Collaborated with designers to bring creative visions to life.",
  // },
  // {
  //   year: "2019",
  //   title: "Junior Web Developer",
  //   company: "StartUp Hub",
  //   description:
  //     "Started my professional journey building websites and web applications. Gained experience in HTML, CSS, JavaScript, and various content management systems.",
  // },
]

const technicalSkills = [
  { skill: "JavaScript/TypeScript", percentage: 95 },
  { skill: "React/Next.js", percentage: 95 },
  { skill: "Node.js/Express", percentage: 90 },
  { skill: "Database Design", percentage: 90 },
  { skill: "Cloud Platforms", percentage: 82 },
  { skill: "DevOps/CI-CD", percentage: 78 },
]

const softSkills = [
  { skill: "Problem Solving", percentage: 95 },
  { skill: "Team Leadership", percentage: 95 },
  { skill: "Communication", percentage: 92 },
  { skill: "Project Management", percentage: 90 },
]

export default function HomePage() {
  // Ensure page scrolls to top on load and navigation
  useEffect(() => {
    // Force scroll to top on initial load
    window.scrollTo(0, 0)
    
    // Add scroll restoration for better navigation experience
    const handleBeforeUnload = () => {
      window.scrollTo(0, 0)
    }
    
    // Handle navigation events
    const handlePopState = () => {
      window.scrollTo(0, 0)
    }
    
    window.addEventListener('beforeunload', handleBeforeUnload)
    window.addEventListener('popstate', handlePopState)
    
    // Ensure hero section is visible
    const heroSection = document.getElementById('hero')
    if (heroSection) {
      heroSection.scrollIntoView({ behavior: 'instant' })
    }
    
    return () => {
      window.removeEventListener('beforeunload', handleBeforeUnload)
      window.removeEventListener('popstate', handlePopState)
    }
  }, [])

  // State to track hero section visibility and trigger animations
  const [heroInView, setHeroInView] = useState(false)
  const [animationKey, setAnimationKey] = useState(0)

  // Effect to detect when hero section comes into view
  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setHeroInView(true)
          // Trigger fresh animations by updating the key
          setAnimationKey(prev => prev + 1)
        } else {
          setHeroInView(false)
        }
      },
      { threshold: 0.3 }
    )

    const heroSection = document.getElementById('hero')
    if (heroSection) {
      observer.observe(heroSection)
    }

    return () => {
      if (heroSection) {
        observer.unobserve(heroSection)
      }
    }
  }, [])

  return (
    <>
      <LoadingScreen />
      <ThemeSwitcher />

      <div className="min-h-screen relative overflow-hidden">
        <Reliable3DBackground />

        {/* Enhanced Gradient Overlay with better dark mode support */}
        <div className="absolute inset-0 bg-gradient-to-br from-background/95 via-background/80 to-background/95 dark:from-background/90 dark:via-background/70 dark:to-background/90 -z-15" />

        {/* Enhanced Navigation */}
        <EnhancedNavigation />

        {/* Hero Section */}
        <section id="hero" className="min-h-screen flex items-center justify-center px-6 relative overflow-hidden">
          {/* Animated Gradient Background */}
          <motion.div
            key={`gradient-${animationKey}`}
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1.5, delay: 0.2 }}
            className="absolute inset-0 bg-gradient-to-br from-primary/5 via-transparent to-secondary/5"
            style={{
              backgroundImage: `
                radial-gradient(circle at 20% 80%, rgba(8, 145, 178, 0.1) 0%, transparent 50%),
                radial-gradient(circle at 80% 20%, rgba(99, 102, 241, 0.1) 0%, transparent 50%),
                radial-gradient(circle at 40% 40%, rgba(8, 145, 178, 0.05) 0%, transparent 50%)
              `
            }}
          />

          {/* Particle Effect System */}
          <div className="absolute inset-0 pointer-events-none overflow-hidden">
            {[...Array(20)].map((_, i) => (
              <motion.div
                key={`particle-${animationKey}-${i}`}
                initial={{
                  opacity: 0,
                  x: 0,
                  y: 0,
                  scale: 0,
                }}
                animate={{
                  opacity: [0, 0.5, 0],
                  x: [0, (i % 3 - 1) * 100],
                  y: [0, (i % 2 - 0.5) * 80],
                  scale: [0, 1, 0],
                }}
                transition={{
                  duration: Math.random() * 8 + 8,
                  repeat: Infinity,
                  ease: "linear",
                  delay: i * 0.1,
                }}
                className="absolute w-1 h-1 bg-primary/30 rounded-full"
                style={{
                  left: `${(i * 5) % 100}%`,
                  top: `${(i * 7) % 100}%`,
                }}
              />
            ))}
          </div>

          {/* Floating Background Elements */}
          <motion.div
            key={`floating-${animationKey}`}
            initial={{ opacity: 0 }}
            animate={{ opacity: 0.1 }}
            transition={{ duration: 2, delay: 0.5 }}
            className="absolute inset-0 pointer-events-none"
          >
            <motion.div
              key={`orb1-${animationKey}`}
              initial={{ opacity: 0, scale: 0, x: -50 }}
              animate={{ 
                opacity: [0, 0.1, 0.1], 
                scale: [0, 1, 1],
                x: [-50, 0, 0]
              }}
              transition={{ duration: 2, delay: 0.8 }}
              className="absolute top-20 left-10 w-32 h-32 bg-gradient-to-r from-primary/20 to-secondary/20 rounded-full blur-xl"
            >
              <motion.div
                animate={{
                  y: [0, -20, 0],
                  x: [0, 10, 0],
                  rotate: [0, 5, 0],
                }}
                transition={{
                  duration: 6,
                  repeat: Infinity,
                  ease: "easeInOut",
                }}
              />
            </motion.div>
            <motion.div
              key={`orb2-${animationKey}`}
              initial={{ opacity: 0, scale: 0, x: 50 }}
              animate={{ 
                opacity: [0, 0.1, 0.1], 
                scale: [0, 1, 1],
                x: [50, 0, 0]
              }}
              transition={{ duration: 2, delay: 1.2 }}
              className="absolute top-40 right-20 w-24 h-24 bg-gradient-to-r from-secondary/20 to-primary/20 rounded-full blur-xl"
            >
              <motion.div
                animate={{
                  y: [0, 15, 0],
                  x: [0, -15, 0],
                  rotate: [0, -3, 0],
                }}
                transition={{
                  duration: 8,
                  repeat: Infinity,
                  ease: "easeInOut",
                  delay: 1,
                }}
              />
            </motion.div>
            <motion.div
              key={`orb3-${animationKey}`}
              initial={{ opacity: 0, scale: 0, y: 50 }}
              animate={{ 
                opacity: [0, 0.1, 0.1], 
                scale: [0, 1, 1],
                y: [50, 0, 0]
              }}
              transition={{ duration: 2, delay: 1.6 }}
              className="absolute bottom-40 left-20 w-20 h-20 bg-gradient-to-r from-primary/20 to-secondary/20 rounded-full blur-xl"
            >
              <motion.div
                animate={{
                  y: [0, -10, 0],
                  x: [0, 20, 0],
                  scale: [1, 1.1, 1],
                }}
                transition={{
                  duration: 7,
                  repeat: Infinity,
                  ease: "easeInOut",
                  delay: 2,
                }}
              />
            </motion.div>
          </motion.div>

          <div className="max-w-4xl mx-auto text-center relative z-10">
            <motion.div
              key={`main-container-${animationKey}`}
              initial={{ opacity: 0, y: 50, scale: 0.9 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              transition={{ 
                duration: 1.2, 
                delay: 0.5,
                type: "spring",
                stiffness: 100,
                damping: 20
              }}
              className="glass-strong rounded-3xl p-12 neon-glow relative overflow-hidden"
            >
              {/* Animated Background Pattern */}
              <motion.div
                key={`bg-pattern-${animationKey}`}
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 0.05, scale: 1 }}
                transition={{ duration: 2, delay: 1.5 }}
                className="absolute inset-0 bg-gradient-to-br from-primary/10 via-transparent to-secondary/10"
                style={{
                  backgroundImage: `radial-gradient(circle at 20% 80%, rgba(8, 145, 178, 0.1) 0%, transparent 50%), radial-gradient(circle at 80% 20%, rgba(99, 102, 241, 0.1) 0%, transparent 50%)`
                }}
              />

              {/* Profile Image with Enhanced Animation */}
              <motion.div
                key={`profile-${animationKey}`}
                initial={{ opacity: 0, scale: 0.8, rotateY: -90 }}
                animate={{ opacity: 1, scale: 1, rotateY: 0 }}
                transition={{ 
                  duration: 1.2, 
                  delay: 0.6,
                  type: "spring",
                  stiffness: 100
                }}
                className="mb-8 relative"
              >
                <motion.div
                  animate={{
                    y: [0, -10, 0],
                    rotateY: [0, 5, 0],
                    boxShadow: [
                      "0 0 20px rgba(8, 145, 178, 0.3)",
                      "0 0 40px rgba(8, 145, 178, 0.6)",
                      "0 0 20px rgba(8, 145, 178, 0.3)",
                    ],
                  }}
                  transition={{
                    y: { duration: 4, repeat: Infinity, ease: "easeInOut" },
                    rotateY: { duration: 6, repeat: Infinity, ease: "easeInOut" },
                    boxShadow: { duration: 3, repeat: Infinity, ease: "easeInOut" },
                  }}
                  className="relative"
                >
                  <img
                    src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/profile-5JeLxpOUyeIoe59bnP1tMbEtRfSqDc.jpeg"
                    alt="Vaibhav Pandey"
                    className="w-32 h-32 md:w-40 md:h-40 rounded-full mx-auto shadow-2xl neon-glow-secondary object-cover relative z-10"
                  />
                  <motion.div
                    animate={{
                      scale: [1, 1.1, 1],
                      opacity: [0.3, 0.6, 0.3],
                    }}
                    transition={{
                      duration: 2,
                      repeat: Infinity,
                      ease: "easeInOut",
                    }}
                    className="absolute inset-0 rounded-full bg-gradient-to-r from-primary/20 to-secondary/20 blur-xl -z-10"
                  />
                  {/* Glowing Ring Effect */}
                  <motion.div
                    animate={{
                      scale: [1, 1.2, 1],
                      opacity: [0.2, 0.4, 0.2],
                    }}
                    transition={{
                      duration: 3,
                      repeat: Infinity,
                      ease: "easeInOut",
                      delay: 1,
                    }}
                    className="absolute inset-0 rounded-full border-2 border-primary/30 blur-sm -z-20"
                  />
                </motion.div>
              </motion.div>

              {/* Animated Name with Text Effects */}
             {/* Animated Name with Text Effects */}
<motion.h1
  initial={{ opacity: 0, y: 30 }}
  animate={{ opacity: 1, y: 0 }}
  transition={{ duration: 1, delay: 0.3 }}
  className="font-playfair font-bold text-5xl md:text-7xl mb-6 
             bg-gradient-to-r from-primary to-secondary 
             bg-clip-text text-transparent relative 
             flex items-center justify-center"
>
  <span className="relative">
    {["V","a","i","b","h","a","v"," ","P","a","n","d","e","y"].map((char, index) => (
      <motion.span
        key={index}
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{
          duration: 0.4,
          delay: 0.5 + index * 0.08,
        }}
        className="inline-block"
        style={{ marginRight: char === " " ? "0.3em" : "0.05em" }}
      >
        {char === " " ? "\u00A0" : char}
      </motion.span>
    ))}

    {/* Underline */}
    <motion.div
      initial={{ width: 0 }}
      animate={{ width: "100%" }}
      transition={{ duration: 0.8, delay: 2.5 }}
      className="absolute -bottom-2 left-0 h-1 bg-gradient-to-r from-primary to-secondary rounded-full"
    />
  </span>
</motion.h1>


              {/* Animated Tagline with Typing Effect */}
              <motion.p
                key={`tagline-${animationKey}`}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.9 }}
                className="text-xl md:text-2xl text-foreground/80 mb-8 font-medium relative"
              >
                <motion.span
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ duration: 0.5, delay: 1.1 }}
                >
                  I build modern, scalable, and high-converting MVPs and websites for businesses
                </motion.span>
              </motion.p>

              {/* Animated Description with Staggered Text */}
              <motion.p
                key={`description-${animationKey}`}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 1.1 }}
                className="text-lg text-muted-foreground mb-12 max-w-2xl mx-auto leading-relaxed"
              >
                <motion.span
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ duration: 0.5, delay: 1.3 }}
                >
                  Transforming ideas into digital experiences with cutting-edge technology, seamless user interfaces, and
                  robust full-stack solutions.
                </motion.span>
              </motion.p>

              {/* Enhanced Button Animations */}
              <motion.div
                key={`buttons-${animationKey}`}
                initial={{ opacity: 0, y: 20, scale: 0.9 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                transition={{ 
                  duration: 0.8, 
                  delay: 1.3,
                  type: "spring",
                  stiffness: 100
                }}
                className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-12"
              >
                <motion.div
                  whileHover={{ 
                    scale: 1.05,
                    y: -5,
                    boxShadow: "0 20px 40px rgba(8, 145, 178, 0.3)"
                  }}
                  whileTap={{ scale: 0.95 }}
                  transition={{ type: "spring", stiffness: 400, damping: 17 }}
                >
                  <Button
                    size="lg"
                    className="neon-glow text-lg px-8 py-6 relative overflow-hidden group"
                    onClick={() => document.getElementById("portfolio")?.scrollIntoView({ behavior: "smooth" })}
                  >
                    <motion.span
                      initial={{ x: -100, opacity: 0 }}
                      whileHover={{ x: 0, opacity: 1 }}
                      transition={{ duration: 0.3 }}
                      className="absolute inset-0 bg-gradient-to-r from-primary/20 to-secondary/20"
                    />
                    <span className="relative z-10">View My Work</span>
                  </Button>
                </motion.div>

                <motion.div
                  whileHover={{ 
                    scale: 1.05,
                    y: -5,
                    boxShadow: "0 20px 40px rgba(99, 102, 241, 0.3)"
                  }}
                  whileTap={{ scale: 0.95 }}
                  transition={{ type: "spring", stiffness: 400, damping: 17 }}
                >
                  <Button
                    variant="outline"
                    size="lg"
                    className="glass text-lg px-8 py-6 bg-transparent relative overflow-hidden group"
                    onClick={() => document.getElementById("contact")?.scrollIntoView({ behavior: "smooth" })}
                  >
                    <motion.span
                      initial={{ x: 100, opacity: 0 }}
                      whileHover={{ x: 0, opacity: 1 }}
                      transition={{ duration: 0.3 }}
                      className="absolute inset-0 bg-gradient-to-r from-secondary/20 to-primary/20"
                    />
                    <span className="relative z-10">Get In Touch</span>
                  </Button>
                </motion.div>
              </motion.div>

              {/* Enhanced Social Links with Particle Effects */}
              <motion.div
                key={`social-links-${animationKey}`}
                initial={{ opacity: 0, y: 20, scale: 0.9 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                transition={{ 
                  duration: 0.8, 
                  delay: 1.5,
                  type: "spring",
                  stiffness: 100
                }}
                className="flex justify-center space-x-6"
              >
                <motion.a
                  whileHover={{ 
                    y: -8, 
                    scale: 1.2,
                    rotate: 360,
                    boxShadow: "0 10px 30px rgba(8, 145, 178, 0.4)"
                  }}
                  whileTap={{ scale: 0.9 }}
                  transition={{ type: "spring", stiffness: 400, damping: 17 }}
                  href="https://github.com/imvaibhav99"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-muted-foreground hover:text-primary transition-colors neon-glow-secondary p-3 rounded-full glass relative group"
                >
                  <motion.div
                    animate={{
                      scale: [1, 1.1, 1],
                      opacity: [0.3, 0.6, 0.3],
                    }}
                    transition={{
                      duration: 2,
                      repeat: Infinity,
                      ease: "easeInOut",
                    }}
                    className="absolute inset-0 rounded-full bg-primary/20 blur-lg group-hover:bg-primary/40 transition-all duration-300"
                  />
                  <Github className="w-6 h-6 relative z-10" />
                </motion.a>

                <motion.a
                  whileHover={{ 
                    y: -8, 
                    scale: 1.2,
                    rotate: 360,
                    boxShadow: "0 10px 30px rgba(99, 102, 241, 0.4)"
                  }}
                  whileTap={{ scale: 0.9 }}
                  transition={{ type: "spring", stiffness: 400, damping: 17 }}
                  href="https://www.linkedin.com/in/vaibhav-pandey-542b73254/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-muted-foreground hover:text-primary transition-colors neon-glow-secondary p-3 rounded-full glass relative group"
                >
                  <motion.div
                    animate={{
                      scale: [1, 1.1, 1],
                      opacity: [0.3, 0.6, 0.3],
                    }}
                    transition={{
                      duration: 2.5,
                      repeat: Infinity,
                      ease: "easeInOut",
                      delay: 0.5,
                    }}
                    className="absolute inset-0 rounded-full bg-secondary/20 blur-lg group-hover:bg-secondary/40 transition-all duration-300"
                  />
                  <Linkedin className="w-6 h-6 relative z-10" />
                </motion.a>

                <motion.a
                  whileHover={{ 
                    y: -8, 
                    scale: 1.2,
                    rotate: 360,
                    boxShadow: "0 10px 30px rgba(8, 145, 178, 0.4)"
                  }}
                  whileTap={{ scale: 0.9 }}
                  transition={{ type: "spring", stiffness: 400, damping: 17 }}
                  href="mailto:imvaibhav9796@gmail.com"
                  className="text-muted-foreground hover:text-primary transition-colors neon-glow-secondary p-3 rounded-full glass relative group"
                >
                  <motion.div
                    animate={{
                      scale: [1, 1.1, 1],
                      opacity: [0.3, 0.6, 0.3],
                    }}
                    transition={{
                      duration: 3,
                      repeat: Infinity,
                      ease: "easeInOut",
                      delay: 1,
                    }}
                    className="absolute inset-0 rounded-full bg-primary/20 blur-lg group-hover:bg-primary/40 transition-all duration-300"
                  />
                  <Mail className="w-6 h-6 relative z-10" />
                </motion.a>
              </motion.div>

              {/* Floating Tech Icons */}
              <motion.div
                key={`tech-tags-${animationKey}`}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 1, delay: 2 }}
                className="absolute -bottom-8 left-1/2 transform -translate-x-1/2 flex space-x-8 opacity-30"
              >
                {["React", "Next.js", "TypeScript", "Node.js"].map((tech, index) => (
                  <motion.div
                    key={`tech-${animationKey}-${index}`}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: 2.2 + index * 0.1 }}
                    className="text-xs text-muted-foreground font-mono"
                  >
                    <motion.span
                      animate={{
                        y: [0, -5, 0],
                        opacity: [0.5, 1, 0.5],
                      }}
                      transition={{
                        duration: 3,
                        repeat: Infinity,
                        ease: "easeInOut",
                        delay: index * 0.5,
                      }}
                    >
                      {tech}
                    </motion.span>
                  </motion.div>
                ))}
              </motion.div>

              {/* Scroll Indicator */}
              <motion.div
                key={`scroll-indicator-${animationKey}`}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 1, delay: 2.5 }}
                className="absolute -bottom-16 left-1/2 transform -translate-x-1/2 text-center"
              >
                <motion.div
                  animate={{
                    y: [0, 10, 0],
                    opacity: [0.5, 1, 0.5],
                  }}
                  transition={{
                    duration: 2,
                    repeat: Infinity,
                    ease: "easeInOut",
                  }}
                  className="text-muted-foreground text-sm mb-2"
                >
                  Scroll to explore
                </motion.div>
                <motion.div
                  animate={{
                    y: [0, 8, 0],
                  }}
                  transition={{
                    duration: 2,
                    repeat: Infinity,
                    ease: "easeInOut",
                  }}
                  className="w-6 h-10 border-2 border-primary/30 rounded-full mx-auto relative"
                >
                  <motion.div
                    animate={{
                      y: [0, 12, 0],
                      opacity: [1, 0, 1],
                    }}
                    transition={{
                      duration: 2,
                      repeat: Infinity,
                      ease: "easeInOut",
                    }}
                    className="w-1 h-3 bg-primary rounded-full mx-auto mt-2"
                  />
                </motion.div>
              </motion.div>
            </motion.div>
          </div>
        </section>

        {/* Services Section */}
        <section id="services" className="py-24 px-6 relative">
          <div className="max-w-7xl mx-auto">
            <motion.div
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: false, amount: 0.3 }}
              className="text-center mb-16"
            >
              <h2 className="font-playfair font-bold text-4xl md:text-5xl mb-6 bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
                Services
              </h2>
              <p className="text-xl text-muted-foreground max-w-3xl mx-auto leading-relaxed">
                Comprehensive web development solutions tailored to elevate your business and engage your audience
              </p>
            </motion.div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
              {services.map((service, index) => (
                <ServiceCard key={service.title} {...service} index={index} />
              ))}
            </div>

            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.4 }}
              viewport={{ once: false, amount: 0.3 }}
              className="text-center mt-16"
            >
              <Button size="lg" className="neon-glow text-lg px-8 py-6">
                Start Your Project
              </Button>
            </motion.div>
          </div>
        </section>

        {/* Portfolio Section */}
        <section id="portfolio" className="py-24 px-6 relative">
          <div className="max-w-7xl mx-auto">
            <motion.div
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: false, amount: 0.3 }}
              className="text-center mb-16"
            >
              <h2 className="font-playfair font-bold text-4xl md:text-5xl mb-6 bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
                Featured Projects
              </h2>
              <p className="text-xl text-muted-foreground max-w-3xl mx-auto leading-relaxed">
                A showcase of innovative web applications and digital experiences that drive business growth and user
                engagement
              </p>
            </motion.div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {projects.slice(0, 3).map((project, index) => (
                <PortfolioCard key={project.title} {...project} index={index} />
              ))}
            </div>

            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.4 }}
              viewport={{ once: false, amount: 0.3 }}
              className="text-center mt-16"
            >
              <Button size="lg" variant="outline" className="glass text-lg px-8 py-6 bg-transparent">
                View All Projects
              </Button>
            </motion.div>
          </div>
        </section>

        {/* About Section */}
        <section id="about" className="py-24 px-6 relative">
          <div className="max-w-7xl mx-auto">
            <motion.div
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: false, amount: 0.3 }}
              className="text-center mb-16"
            >
              <h2 className="font-playfair font-bold text-4xl md:text-5xl mb-6 bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
                About Me
              </h2>
              {/* <p className="text-xl text-muted-foreground max-w-3xl mx-auto leading-relaxed"> */}
                {/* Passionate developer with 5+ years of experience creating innovative web solutions that drive business
                growth
              </p> */}
            </motion.div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 mb-20">
              {/* Personal Info */}
              <motion.div
                initial={{ opacity: 0, x: -50 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.8 }}
                viewport={{ once: false, amount: 0.3 }}
              >
                <div className="glass-strong rounded-2xl p-8 neon-glow">
                  <h3 className="font-playfair font-bold text-2xl mb-6 text-foreground">Hello, I'm Vaibhav Pandey</h3>
                  <p className="text-muted-foreground leading-relaxed mb-6">
                    I'm a passionate full-stack developer , specializing in creating modern,
                    scalable web applications and MVPs that deliver exceptional user experiences. With over 1 years of experience
                    in the industry, I've had the privilege of working with startups and established companies to bring
                    their digital visions to life.
                  </p>
                  <p className="text-muted-foreground leading-relaxed mb-8">
                    My expertise spans across the entire development stack, from crafting pixel-perfect user interfaces
                    to architecting robust backend systems. I'm constantly learning new technologies and staying
                    up-to-date with industry best practices to deliver cutting-edge solutions.
                  </p>

                  <div className="flex items-center gap-4 mb-6">
                    <MapPin className="w-5 h-5 text-primary" />
                    <span className="text-foreground">Greater Noida, India</span>
                  </div>

                  {/* <Button className="neon-glow">
                    <Download className="w-4 h-4 mr-2" />
                    Download Resume
                  </Button> */}
                </div>
              </motion.div>

              {/* Skills Chart */}
              <motion.div
                initial={{ opacity: 0, x: 50 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.8 }}
                viewport={{ once: false, amount: 0.3 }}
              >
                <div className="glass-strong rounded-2xl p-8">
                  <h3 className="font-playfair font-bold text-2xl mb-8 text-foreground">Technical Skills</h3>

                  <div className="space-y-6">
                    {technicalSkills.map((skill, index) => (
                      <SkillBar key={skill.skill} {...skill} index={index} />
                    ))}
                  </div>
                </div>
              </motion.div>
            </div>

            {/* Soft Skills - Circular Progress */}
            <motion.div
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: false, amount: 0.3 }}
              className="mb-20"
            >
              <h3 className="font-playfair font-bold text-3xl text-center mb-12 text-foreground">Core Competencies</h3>

              <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
                {softSkills.map((skill, index) => (
                  <CircularProgress key={skill.skill} {...skill} index={index} />
                ))}
              </div>
            </motion.div>

            {/* Experience Timeline */}
            <motion.div
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: false, amount: 0.3 }}
            >
              {/* <h3 className="font-playfair font-bold text-3xl text-center mb-16 text-foreground">
                Professional Journey
              </h3> */}

              <div className="relative max-w-4xl mx-auto">
                <div className="space-y-12">
                  {timelineData.map((item, index) => (
                    <TimelineItem key={item.year} {...item} index={index} />
                  ))}
                </div>
              </div>
            </motion.div>
          </div>
        </section>

        {/* Contact Section */}
        <section id="contact" className="py-24 px-6 relative">
          <div className="max-w-7xl mx-auto">
            <motion.div
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: false, amount: 0.3 }}
              className="text-center mb-16"
            >
              <h2 className="font-playfair font-bold text-4xl md:text-5xl mb-6 bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
                Let's Work Together
              </h2>
              <p className="text-xl text-muted-foreground max-w-3xl mx-auto leading-relaxed">
                Ready to bring your digital vision to life? Let's discuss your project and create something amazing
                together.
              </p>
            </motion.div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">
              {/* Contact Information */}
              <motion.div
                initial={{ opacity: 0, x: -50 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.8 }}
                viewport={{ once: false, amount: 0.3 }}
                className="space-y-8"
              >
                <div className="glass-strong rounded-2xl p-8">
                  <h3 className="font-playfair font-bold text-2xl mb-6 text-foreground">Get In Touch</h3>
                  <p className="text-muted-foreground leading-relaxed mb-8">
                    I'm always excited to work on new projects and collaborate with amazing people. Whether you have a
                    specific project in mind or just want to explore possibilities, I'd love to hear from you.
                  </p>

                  <div className="space-y-6">
                    <motion.div
                      whileHover={{ x: 5 }}
                      className="flex items-center gap-4 p-4 rounded-xl glass hover:neon-glow-secondary transition-all duration-300"
                    >
                      <div className="p-3 rounded-full bg-gradient-to-r from-primary/20 to-secondary/20">
                        <Mail className="w-5 h-5 text-primary" />
                      </div>
                      <div>
                        <p className="font-medium text-foreground">Email</p>
                        <a
                          href="mailto:alex@alexchen.dev"
                          className="text-muted-foreground hover:text-primary transition-colors"
                        >
                          imvaibhav9796@gmail.com
                        </a>
                      </div>
                    </motion.div>

                    <motion.div
                      whileHover={{ x: 5 }}
                      className="flex items-center gap-4 p-4 rounded-xl glass hover:neon-glow-secondary transition-all duration-300"
                    >
                      <div className="p-3 rounded-full bg-gradient-to-r from-primary/20 to-secondary/20">
                        <Phone className="w-5 h-5 text-primary" />
                      </div>
                      <div>
                        <p className="font-medium text-foreground">Phone</p>
                        <a
                          href="tel:+1234567890"
                          className="text-muted-foreground hover:text-primary transition-colors"
                        >
                          +91 9170174867
                        </a>
                      </div>
                    </motion.div>

                    <motion.div
                      whileHover={{ x: 5 }}
                      className="flex items-center gap-4 p-4 rounded-xl glass hover:neon-glow-secondary transition-all duration-300"
                    >
                      <div className="p-3 rounded-full bg-gradient-to-r from-primary/20 to-secondary/20">
                        <MapPin className="w-5 h-5 text-primary" />
                      </div>
                      <div>
                        <p className="font-medium text-foreground">Location</p>
                        <p className="text-muted-foreground">Greater Noida, India</p>
                      </div>
                    </motion.div>
                  </div>

                  {/* Social Links */}
                  <div className="mt-8 pt-8 border-t border-border/30">
                    <p className="font-medium text-foreground mb-4">Follow Me</p>
                    <div className="flex gap-4">
                      <motion.a
                        whileHover={{ y: -3, scale: 1.1 }}
                        href="https://github.com/imvaibhav99"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="p-3 rounded-full glass hover:neon-glow-secondary transition-all duration-300 text-muted-foreground hover:text-primary"
                      >
                        <Github className="w-5 h-5" />
                      </motion.a>
                      <motion.a
                        whileHover={{ y: -3, scale: 1.1 }}
                        href="https://www.linkedin.com/in/vaibhav-pandey-542b73254/"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="p-3 rounded-full glass hover:neon-glow-secondary transition-all duration-300 text-muted-foreground hover:text-primary"
                      >
                        <Linkedin className="w-5 h-5" />
                      </motion.a>
                      <motion.a
                        whileHover={{ y: -3, scale: 1.1 }}
                        href="https://x.com/imvaibhav501"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="p-3 rounded-full glass hover:neon-glow-secondary transition-all duration-300 text-muted-foreground hover:text-primary"
                      >
                        <Twitter className="w-5 h-5" />
                      </motion.a>
                      <motion.a
                        whileHover={{ y: -3, scale: 1.1 }}
                        href="mailto:imvaibhav9796@gmail.com"
                        className="p-3 rounded-full glass hover:neon-glow-secondary transition-all duration-300 text-muted-foreground hover:text-primary"
                      >
                        <MessageCircle className="w-5 h-5" />
                      </motion.a>
                    </div>
                  </div>
                </div>

                {/* Quick Response Promise */}
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: 0.2 }}
                  viewport={{ once: true }}
                  className="glass rounded-xl p-6 border-l-4 border-primary"
                >
                  <h4 className="font-semibold text-foreground mb-2">Quick Response Guarantee</h4>
                  {/* <p className="text-sm text-muted-foreground">
                    I typically respond to all inquiries within 24 hours. For urgent projects, feel free to call or send
                    a direct message on LinkedIn.
                  </p> */}
                </motion.div>
              </motion.div>

              {/* Contact Form */}
              <motion.div
                initial={{ opacity: 0, x: 50 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.8 }}
                viewport={{ once: false, amount: 0.3 }}
              >
                <ContactForm />
              </motion.div>
            </div>
          </div>
        </section>

        {/* Footer */}
        <footer className="py-12 px-6 border-t border-border/30 glass">
          <div className="max-w-7xl mx-auto">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              viewport={{ once: false, amount: 0.3 }}
              className="text-center"
            >
              <div className="font-playfair font-bold text-2xl text-primary mb-4">Vaibhav Pandey</div>
              <p className="text-muted-foreground mb-6">Building the future, one line of code at a time.</p>
              <div className="flex justify-center gap-6 mb-6">
                <button
                  onClick={() => document.getElementById("services")?.scrollIntoView({ behavior: "smooth" })}
                  className="text-muted-foreground hover:text-primary transition-colors"
                >
                  Services
                </button>
                <button
                  onClick={() => document.getElementById("portfolio")?.scrollIntoView({ behavior: "smooth" })}
                  className="text-muted-foreground hover:text-primary transition-colors"
                >
                  Portfolio
                </button>
                <button
                  onClick={() => document.getElementById("about")?.scrollIntoView({ behavior: "smooth" })}
                  className="text-muted-foreground hover:text-primary transition-colors"
                >
                  About
                </button>
                <button
                  onClick={() => document.getElementById("contact")?.scrollIntoView({ behavior: "smooth" })}
                  className="text-muted-foreground hover:text-primary transition-colors"
                >
                  Contact
                </button>
              </div>
              <p className="text-sm text-muted-foreground">
                © 2025 Vaibhav Pandey. All rights reserved. Built with Next.js, Three.js, and lots of ☕
              </p>
            </motion.div>
          </div>
        </footer>
      </div>
    </>
  )
}
