"use client"

import type React from "react"

import { useState, useEffect } from "react"
import { motion } from "framer-motion"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Send, CheckCircle, AlertCircle } from "lucide-react"
import emailjs from '@emailjs/browser'
import { emailjsConfig } from '@/lib/emailjs-config'

interface FormData {
  name: string
  email: string
  subject: string
  message: string
}

interface FormErrors {
  name?: string
  email?: string
  subject?: string
  message?: string
}

export function ContactForm() {
  const [formData, setFormData] = useState<FormData>({
    name: "",
    email: "",
    subject: "",
    message: "",
  })

  const [errors, setErrors] = useState<FormErrors>({})
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [submitStatus, setSubmitStatus] = useState<"idle" | "success" | "error">("idle")

  // Initialize EmailJS
  useEffect(() => {
    if (emailjsConfig.publicKey !== "YOUR_PUBLIC_KEY_HERE") {
      emailjs.init(emailjsConfig.publicKey)
    }
  }, [])

  const validateForm = (): boolean => {
    const newErrors: FormErrors = {}

    if (!formData.name.trim()) {
      newErrors.name = "Name is required"
    }

    if (!formData.email.trim()) {
      newErrors.email = "Email is required"
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = "Please enter a valid email address"
    }

    if (!formData.subject.trim()) {
      newErrors.subject = "Subject is required"
    }

    if (!formData.message.trim()) {
      newErrors.message = "Message is required"
    } else if (formData.message.trim().length < 10) {
      newErrors.message = "Message must be at least 10 characters long"
    }

    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    if (!validateForm()) return

    // Check if EmailJS is configured
    if (emailjsConfig.publicKey === "YOUR_PUBLIC_KEY_HERE") {
      setSubmitStatus("error")
      return
    }

    setIsSubmitting(true)
    setSubmitStatus("idle")

    try {
      // Prepare email template parameters
      const templateParams = {
        from_name: formData.name,
        from_email: formData.email,
        subject: formData.subject,
        message: formData.message,
        to_email: emailjsConfig.toEmail,
        reply_to: formData.email,
      }

      // Send email using EmailJS
      const result = await emailjs.send(
        emailjsConfig.serviceId,
        emailjsConfig.templateId,
        templateParams
      )

      if (result.status === 200) {
        setSubmitStatus("success")
        setFormData({ name: "", email: "", subject: "", message: "" })
        setErrors({})
      } else {
        setSubmitStatus("error")
      }
    } catch (error) {
      console.error("Email sending failed:", error)
      setSubmitStatus("error")
    } finally {
      setIsSubmitting(false)
    }
  }

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))

    // Clear error when user starts typing
    if (errors[name as keyof FormErrors]) {
      setErrors((prev) => ({ ...prev, [name]: undefined }))
    }
  }

  return (
    <motion.form
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
      viewport={{ once: false, amount: 0.3 }}
      onSubmit={handleSubmit}
      className="glass-strong rounded-2xl p-8 space-y-6"
    >
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          whileInView={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5, delay: 0.1 }}
          viewport={{ once: false, amount: 0.3 }}
        >
          <label htmlFor="name" className="block text-sm font-medium text-foreground mb-2">
            Name *
          </label>
          <Input
            id="name"
            name="name"
            type="text"
            value={formData.name}
            onChange={handleChange}
            className={`glass bg-input/50 border-border/50 focus:border-primary/50 focus:ring-primary/20 ${
              errors.name ? "border-destructive focus:border-destructive" : ""
            }`}
            placeholder="Your full name"
          />
          {errors.name && (
            <motion.p
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              className="text-destructive text-sm mt-1 flex items-center gap-1"
            >
              <AlertCircle className="w-3 h-3" />
              {errors.name}
            </motion.p>
          )}
        </motion.div>

        <motion.div
          initial={{ opacity: 0, x: 20 }}
          whileInView={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          viewport={{ once: false, amount: 0.3 }}
        >
          <label htmlFor="email" className="block text-sm font-medium text-foreground mb-2">
            Email *
          </label>
          <Input
            id="email"
            name="email"
            type="email"
            value={formData.email}
            onChange={handleChange}
            className={`glass bg-input/50 border-border/50 focus:border-primary/50 focus:ring-primary/20 ${
              errors.email ? "border-destructive focus:border-destructive" : ""
            }`}
            placeholder="your.email@example.com"
          />
          {errors.email && (
            <motion.p
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              className="text-destructive text-sm mt-1 flex items-center gap-1"
            >
              <AlertCircle className="w-3 h-3" />
              {errors.email}
            </motion.p>
          )}
        </motion.div>
      </div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.3 }}
        viewport={{ once: false, amount: 0.3 }}
      >
        <label htmlFor="subject" className="block text-sm font-medium text-foreground mb-2">
          Subject *
        </label>
        <Input
          id="subject"
          name="subject"
          type="text"
          value={formData.subject}
          onChange={handleChange}
          className={`glass bg-input/50 border-border/50 focus:border-primary/50 focus:ring-primary/20 ${
            errors.subject ? "border-destructive focus:border-destructive" : ""
          }`}
          placeholder="Project inquiry, collaboration, etc."
        />
        {errors.subject && (
          <motion.p
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-destructive text-sm mt-1 flex items-center gap-1"
          >
            <AlertCircle className="w-3 h-3" />
            {errors.subject}
          </motion.p>
        )}
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.3, delay: 0.4 }}
        viewport={{ once: false, amount: 0.3 }}
      >
        <label htmlFor="message" className="block text-sm font-medium text-foreground mb-2">
          Message *
        </label>
        <Textarea
          id="message"
          name="message"
          value={formData.message}
          onChange={handleChange}
          rows={6}
          className={`glass bg-input/50 border-border/50 focus:border-primary/50 focus:ring-primary/20 resize-none ${
            errors.message ? "border-destructive focus:border-destructive" : ""
          }`}
          placeholder="Tell me about your project, goals, timeline, and any specific requirements..."
        />
        {errors.message && (
          <motion.p
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-destructive text-sm mt-1 flex items-center gap-1"
          >
            <AlertCircle className="w-3 h-3" />
            {errors.message}
          </motion.p>
        )}
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.5 }}
        viewport={{ once: false, amount: 0.3 }}
        className="pt-4"
      >
        <Button
          type="submit"
          disabled={isSubmitting}
          className="w-full neon-glow text-lg py-6 disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {isSubmitting ? (
            <motion.div
              animate={{ rotate: 360 }}
              transition={{ duration: 1, repeat: Number.POSITIVE_INFINITY, ease: "linear" }}
              className="w-5 h-5 border-2 border-primary-foreground border-t-transparent rounded-full mr-2"
            />
          ) : (
            <Send className="w-5 h-5 mr-2" />
          )}
          {isSubmitting ? "Sending..." : "Send Message"}
        </Button>

        {submitStatus === "success" && (
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className="mt-4 p-4 rounded-lg bg-green-500/10 border border-green-500/20 text-green-400 flex items-center gap-2"
          >
            <CheckCircle className="w-5 h-5" />
            <span>Message sent successfully! I'll get back to you soon at imvaibhav9796@gmail.com</span>
          </motion.div>
        )}

        {submitStatus === "error" && (
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className="mt-4 p-4 rounded-lg bg-destructive/10 border border-destructive/20 text-destructive flex items-center gap-2"
          >
            <AlertCircle className="w-5 h-5" />
            <span>
              {emailjsConfig.publicKey === "YOUR_PUBLIC_KEY_HERE" 
                ? "EmailJS not configured. Please configure the email service in lib/emailjs-config.ts"
                : "Failed to send message. Please try again or contact me directly at imvaibhav9796@gmail.com"
              }
            </span>
          </motion.div>
        )}

        {/* Configuration Notice */}
        {emailjsConfig.publicKey === "YOUR_PUBLIC_KEY_HERE" && (
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className="mt-4 p-4 rounded-lg bg-yellow-500/10 border border-yellow-500/20 text-yellow-400 flex items-center gap-2"
          >
            <AlertCircle className="w-5 h-5" />
            <span>
              <strong>Setup Required:</strong> To enable email sending, please configure EmailJS in{" "}
              <code className="bg-yellow-500/20 px-2 py-1 rounded text-sm">lib/emailjs-config.ts</code>
            </span>
          </motion.div>
        )}
      </motion.div>
    </motion.form>
  )
}
