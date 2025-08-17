# 🚀 Vaibhav Pandey - Futuristic Portfolio

A stunning, interactive portfolio website built with modern web technologies showcasing my skills, projects, and professional journey.

## ✨ Features

- **🎨 Modern Design**: Futuristic UI with glass morphism and neon effects
- **🎭 Smooth Animations**: Powered by Framer Motion for engaging interactions
- **🌌 3D Backgrounds**: Interactive Three.js particle systems and orbs
- **📱 Responsive**: Fully responsive design for all devices
- **🌙 Dark/Light Mode**: Theme switching with smooth transitions
- **📧 Contact Form**: Real email integration with EmailJS
- **⚡ Performance**: Optimized for speed and SEO
- **🎯 Interactive Elements**: Hover effects, scroll animations, and more

## 🛠️ Tech Stack

- **Framework**: Next.js 14 with App Router
- **Styling**: Tailwind CSS with custom animations
- **3D Graphics**: Three.js and React Three Fiber
- **Animations**: Framer Motion
- **UI Components**: Radix UI + Custom components
- **Email Service**: EmailJS
- **Deployment**: Render (Ready to deploy)

## 🚀 Quick Start

### Prerequisites
- Node.js 18+ 
- npm or pnpm

### Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/imvaibhav99/portfolio.git
   cd portfolio
   ```

2. **Install dependencies**
   ```bash
   npm install
   # or
   pnpm install
   ```

3. **Set up EmailJS** (Optional)
   - Sign up at [EmailJS](https://www.emailjs.com/)
   - Update `lib/emailjs-config.ts` with your credentials
   - Contact form will send emails to `imvaibhav9796@gmail.com`

4. **Run development server**
   ```bash
   npm run dev
   # or
   pnpm dev
   ```

5. **Open your browser**
   Navigate to [http://localhost:3000](http://localhost:3000)

## 📁 Project Structure

```
portfolio/
├── app/                    # Next.js App Router
│   ├── globals.css        # Global styles
│   ├── layout.tsx         # Root layout
│   └── page.tsx           # Home page
├── components/            # React components
│   ├── ui/               # Reusable UI components
│   ├── contact-form.tsx  # Contact form with EmailJS
│   ├── portfolio-card.tsx # Project cards
│   └── ...               # Other components
├── lib/                  # Utilities and configs
│   ├── emailjs-config.ts # EmailJS configuration
│   └── utils.ts          # Utility functions
├── public/               # Static assets
└── styles/               # Additional styles
```

## 🎨 Customization

### Personal Information
Update your personal details in `app/page.tsx`:
- Name, location, experience
- Social media links
- Skills and percentages
- Project details

### Styling
- Colors: Update CSS variables in `app/globals.css`
- Animations: Modify Framer Motion configurations
- 3D Effects: Adjust Three.js parameters in background components

### Projects
Add/remove projects in the `projects` array in `app/page.tsx`:
```typescript
const projects = [
  {
    title: "Your Project",
    description: "Project description",
    image: "/project-image.png",
    technologies: ["React", "Node.js"],
    liveUrl: "https://your-project.com",
    githubUrl: "https://github.com/your-repo"
  }
]
```

## 🚀 Deployment

### Render (Recommended)
1. Connect your GitHub repository to Render
2. Create a new Web Service
3. Use the following settings:
   - **Build Command**: `npm install && npm run build`
   - **Start Command**: `npm start`
   - **Environment**: Node.js

### Other Platforms
- **Vercel**: Perfect for Next.js apps
- **Netlify**: Great for static sites
- **Railway**: Alternative to Render

## 📧 Contact Form Setup

The contact form uses EmailJS to send real emails:

1. **Sign up** at [EmailJS](https://www.emailjs.com/)
2. **Add email service** (Gmail, Outlook, etc.)
3. **Create email template** with variables:
   - `{{from_name}}` - Sender's name
   - `{{from_email}}` - Sender's email
   - `{{subject}}` - Email subject
   - `{{message}}` - Email message
4. **Update** `lib/emailjs-config.ts` with your credentials

## 🎯 Performance Optimizations

- **Image Optimization**: Next.js Image component
- **Code Splitting**: Automatic with Next.js
- **Lazy Loading**: Components load on demand
- **3D Performance**: Optimized Three.js rendering
- **Bundle Size**: Tree-shaking and minification

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Submit a pull request

## 📄 License

This project is open source and available under the [MIT License](LICENSE).

## 🙏 Acknowledgments

- **Three.js** for 3D graphics
- **Framer Motion** for animations
- **Radix UI** for accessible components
- **Tailwind CSS** for styling
- **EmailJS** for email functionality

## 📞 Contact

- **Email**: imvaibhav9796@gmail.com
- **LinkedIn**: [Vaibhav Pandey](https://www.linkedin.com/in/vaibhav-pandey-542b73254/)
- **GitHub**: [@imvaibhav99](https://github.com/imvaibhav99)
- **Twitter**: [@imvaibhav501](https://x.com/imvaibhav501)

---

⭐ **Star this repository if you found it helpful!**
