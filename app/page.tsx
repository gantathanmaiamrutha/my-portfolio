"use client"

import { useState, useEffect } from "react"
import { motion, useScroll, useTransform, useSpring } from "framer-motion"
import {
  Mail,
  Phone,
  Award,
  BookOpen,
  Code,
  Zap,
  Users,
  Target,
  Heart,
  Brain,
  Palette,
  Rocket,
  Globe,
  Camera,
  ExternalLink,
  Github,
  Linkedin,
  Sun,
  Moon,
} from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"

export default function Portfolio() {
  const [activeSection, setActiveSection] = useState("hero")
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 })
  const [isDark, setIsDark] = useState(true)
  const { scrollYProgress } = useScroll()
  const [selectedProject, setSelectedProject] = useState<any>(null)

  const y = useTransform(scrollYProgress, [0, 1], ["0%", "50%"])
  const opacity = useTransform(scrollYProgress, [0, 0.3], [1, 0])
  const scale = useTransform(scrollYProgress, [0, 0.5], [1, 0.8])
  const rotate = useTransform(scrollYProgress, [0, 1], [0, 360])

  const springConfig = { stiffness: 100, damping: 30, restDelta: 0.001 }
  const x = useSpring(0, springConfig)
  const y2 = useSpring(0, springConfig)

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      const { clientX, clientY } = e
      const { innerWidth, innerHeight } = window
      const xPct = (clientX - innerWidth / 2) / innerWidth
      const yPct = (clientY - innerHeight / 2) / innerHeight
      x.set(xPct * 20)
      y2.set(yPct * 20)
      setMousePosition({ x: clientX, y: clientY })
    }

    const handleScroll = () => {
      const sections = ["hero", "about", "skills", "projects", "education", "hobbies"]
      const scrollPosition = window.scrollY + 100

      for (const section of sections) {
        const element = document.getElementById(section)
        if (element) {
          const { offsetTop, offsetHeight } = element
          if (scrollPosition >= offsetTop && scrollPosition < offsetTop + offsetHeight) {
            setActiveSection(section)
            break
          }
        }
      }
    }

    window.addEventListener("mousemove", handleMouseMove)
    window.addEventListener("scroll", handleScroll)
    return () => {
      window.removeEventListener("mousemove", handleMouseMove)
      window.removeEventListener("scroll", handleScroll)
    }
  }, [x, y2])

  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId)
    if (element) {
      element.scrollIntoView({ behavior: "smooth" })
    }
  }

  const toggleTheme = () => {
    setIsDark(!isDark)
    document.documentElement.classList.toggle("dark")
  }

  const openProjectModal = (project: any) => {
    setSelectedProject(project)
  }

  const closeProjectModal = () => {
    setSelectedProject(null)
  }

  const themeClasses = isDark
    ? "bg-gradient-to-br from-slate-900 via-blue-900 to-indigo-900"
    : "bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50"

  return (
    <div className={`min-h-screen ${themeClasses} relative overflow-hidden transition-all duration-1000`}>
      {/* Animated Background Elements */}
      <div className="fixed inset-0 z-0">
        <motion.div
          className={`absolute top-20 left-20 w-96 h-96 ${
            isDark
              ? "bg-gradient-to-r from-blue-500/20 to-cyan-500/20"
              : "bg-gradient-to-r from-blue-300/30 to-cyan-300/30"
          } rounded-full mix-blend-multiply filter blur-xl animate-blob`}
          style={{ x, y: y2, willChange: "transform" }}
        />
        <motion.div
          className={`absolute top-40 right-20 w-96 h-96 ${
            isDark
              ? "bg-gradient-to-r from-cyan-500/20 to-teal-500/20"
              : "bg-gradient-to-r from-cyan-300/30 to-teal-300/30"
          } rounded-full mix-blend-multiply filter blur-xl animate-blob animation-delay-2000`}
          style={{ x: x, y: y2, willChange: "transform" }}
        />
        <motion.div
          className={`absolute bottom-20 left-40 w-96 h-96 ${
            isDark
              ? "bg-gradient-to-r from-teal-500/20 to-emerald-500/20"
              : "bg-gradient-to-r from-teal-300/30 to-emerald-300/30"
          } rounded-full mix-blend-multiply filter blur-xl animate-blob animation-delay-4000`}
          style={{ x, y: y2, willChange: "transform" }}
        />
      </div>

      {/* Floating Particles */}
      <div className="fixed inset-0 z-0 pointer-events-none">
        {[...Array(20)].map((_, i) => (
          <motion.div
            key={i}
            className={`absolute w-1 h-1 ${isDark ? "bg-cyan-400/30" : "bg-blue-500/40"} rounded-full`}
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
            }}
            animate={{
              y: [-20, -100, -20],
              opacity: [0, 1, 0],
            }}
            transition={{
              duration: 3 + Math.random() * 2,
              repeat: Number.POSITIVE_INFINITY,
              delay: Math.random() * 2,
            }}
          />
        ))}
      </div>

      {/* Cursor Follower */}
      <motion.div
        className={`fixed w-8 h-8 ${
          isDark ? "bg-gradient-to-r from-cyan-400 to-blue-400" : "bg-gradient-to-r from-blue-500 to-indigo-500"
        } rounded-full pointer-events-none z-50 mix-blend-difference`}
        animate={{
          x: mousePosition.x - 16,
          y: mousePosition.y - 16,
        }}
        transition={{
          type: "spring",
          stiffness: 500,
          damping: 28,
        }}
      />

      {/* Navigation */}
      <motion.nav
        className={`fixed top-0 left-0 right-0 z-40 ${
          isDark ? "bg-slate-900/80" : "bg-white/80"
        } backdrop-blur-xl border-b ${isDark ? "border-cyan-500/20" : "border-blue-200/50"}`}
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <div className="container mx-auto px-4 py-3">
          <div className="flex justify-between items-center">
            <motion.div
              className={`text-xl sm:text-2xl font-bold ${
                isDark ? "bg-gradient-to-r from-cyan-400 to-blue-400" : "bg-gradient-to-r from-blue-600 to-indigo-600"
              } bg-clip-text text-transparent`}
              whileHover={{ scale: 1.05 }}
            >
              Thanmai
            </motion.div>
            <div className="hidden md:flex items-center space-x-4 lg:space-x-8">
              {["About", "Skills", "Projects", "Education", "Hobbies"].map((item) => (
                <button
                  key={item}
                  onClick={() => scrollToSection(item.toLowerCase())}
                  className={`text-xs lg:text-sm font-medium transition-all duration-300 relative ${
                    activeSection === item.toLowerCase()
                      ? isDark
                        ? "text-cyan-400"
                        : "text-blue-600"
                      : isDark
                        ? "text-gray-300 hover:text-cyan-400"
                        : "text-gray-600 hover:text-blue-600"
                  }`}
                >
                  {item}
                  {activeSection === item.toLowerCase() && (
                    <motion.div
                      className={`absolute -bottom-1 left-0 right-0 h-0.5 ${
                        isDark
                          ? "bg-gradient-to-r from-cyan-400 to-blue-400"
                          : "bg-gradient-to-r from-blue-500 to-indigo-500"
                      }`}
                      layoutId="activeTab"
                    />
                  )}
                </button>
              ))}
              <Button
                onClick={toggleTheme}
                variant="ghost"
                size="sm"
                className={`${isDark ? "text-gray-300 hover:text-cyan-400" : "text-gray-600 hover:text-blue-600"}`}
              >
                {isDark ? <Sun className="w-4 h-4 lg:w-5 lg:h-5" /> : <Moon className="w-4 h-4 lg:w-5 lg:h-5" />}
              </Button>
            </div>
            <div className="md:hidden flex items-center">
              <Button
                onClick={toggleTheme}
                variant="ghost"
                size="sm"
                className={`${isDark ? "text-gray-300 hover:text-cyan-400" : "text-gray-600 hover:text-blue-600"}`}
              >
                {isDark ? <Sun className="w-5 h-5" /> : <Moon className="w-5 h-5" />}
              </Button>
            </div>
          </div>
        </div>
      </motion.nav>

      {/* Hero Section */}
      <section id="hero" className="min-h-screen flex items-center justify-center relative pt-20 pb-16">
        <motion.div style={{ y, opacity, scale, willChange: "transform" }} className="absolute inset-0 z-0">
          <div
            className={`absolute inset-0 ${
              isDark
                ? "bg-gradient-to-br from-blue-600/10 via-cyan-600/10 to-teal-600/10"
                : "bg-gradient-to-br from-blue-200/20 via-cyan-200/20 to-teal-200/20"
            }`}
          />
        </motion.div>

        <div className="container mx-auto px-2 md:px-4 lg:max-w-5xl xl:max-w-6xl relative z-10">
          <div className="flex flex-col lg:grid lg:grid-cols-2 gap-6 lg:gap-0 items-center">
            <motion.div 
              initial={{ opacity: 0, x: -50 }} 
              animate={{ opacity: 1, x: 0 }} 
              transition={{ duration: 0.4 }} 
              className="flex flex-col justify-center lg:pr-4 text-center lg:text-left mb-8 lg:mb-0 order-2 lg:order-1"
            >
              <motion.h1
                className={`text-4xl sm:text-5xl lg:text-7xl font-bold mb-6 leading-tight ${
                  isDark ? "text-white" : "text-gray-900"
                }`}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.1, duration: 0.4 }}
              >
                <motion.span
                  className={`${
                    isDark
                      ? "bg-gradient-to-r from-cyan-400 via-blue-400 to-teal-400"
                      : "bg-gradient-to-r from-blue-600 via-indigo-600 to-purple-600"
                  } bg-clip-text text-transparent inline-block`}
                  animate={{
                    backgroundPosition: ["0% 50%", "100% 50%", "0% 50%"],
                  }}
                  transition={{
                    duration: 3,
                    repeat: Number.POSITIVE_INFINITY,
                    ease: "linear",
                  }}
                  style={{
                    backgroundSize: "200% 200%",
                  }}
                >
                  <motion.span
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ staggerChildren: 0.1, delayChildren: 0.1 }}
                    className="inline-block"
                  >
                    {Array.from("Ganta").map((char, i) => (
                      <motion.span
                        key={i}
                        initial={{ y: 20, opacity: 0 }}
                        animate={{ y: 0, opacity: 1 }}
                        transition={{ 
                          duration: 0.3, 
                          delay: i * 0.05,
                          repeat: 0
                        }}
                        className="inline-block"
                      >
                        {char === " " ? "\u00A0" : char}
                      </motion.span>
                    ))}
                  </motion.span>
                </motion.span>
                <br className="block" />
                <motion.span
                  className={`${
                    isDark
                      ? "bg-gradient-to-r from-blue-400 via-cyan-400 to-teal-400"
                      : "bg-gradient-to-r from-indigo-600 via-blue-600 to-purple-600"
                  } bg-clip-text text-transparent inline-block`}
                  animate={{
                    backgroundPosition: ["0% 50%", "100% 50%", "0% 50%"],
                  }}
                  transition={{
                    duration: 3,
                    repeat: Number.POSITIVE_INFINITY,
                    ease: "linear",
                  }}
                  style={{
                    backgroundSize: "200% 200%",
                  }}
                >
                  <motion.span
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ staggerChildren: 0.1, delayChildren: 0.3 }}
                    className="inline-block"
                  >
                    {Array.from("Thanmai").map((char, i) => (
                      <motion.span
                        key={i}
                        initial={{ y: 20, opacity: 0 }}
                        animate={{ y: 0, opacity: 1 }}
                        transition={{ 
                          duration: 0.3, 
                          delay: i * 0.05,
                          repeat: 0
                        }}
                        className="inline-block"
                      >
                        {char === " " ? "\u00A0" : char}
                      </motion.span>
                    ))}
                  </motion.span>
                </motion.span>
                <br className="block" />
                <motion.span
                  className={`${
                    isDark
                      ? "bg-gradient-to-r from-teal-400 via-emerald-400 to-green-400"
                      : "bg-gradient-to-r from-purple-600 via-pink-600 to-red-600"
                  } bg-clip-text text-transparent relative inline-block`}
                  animate={{
                    backgroundPosition: ["100% 50%", "0% 50%", "100% 50%"],
                  }}
                  transition={{
                    duration: 3,
                    repeat: Number.POSITIVE_INFINITY,
                    ease: "linear",
                    delay: 1.5,
                  }}
                  style={{
                    backgroundSize: "200% 200%",
                  }}
                >
                  <motion.span
                    initial={{ filter: "blur(0px)" }}
                    animate={{ 
                      filter: ["blur(0px)", "blur(2px)", "blur(0px)"],
                      textShadow: [
                        "0 0 0px rgba(104, 255, 196, 0)",
                        "0 0 15px rgba(104, 255, 196, 0.9)",
                        "0 0 0px rgba(104, 255, 196, 0)"
                      ],
                      scale: [1, 1.03, 1]
                    }}
                    transition={{ 
                      duration: 4, 
                      repeat: Number.POSITIVE_INFINITY,
                      repeatType: "reverse" 
                    }}
                    className="text-white/95 px-1 py-0.5 backdrop-blur-sm"
                  >
                    Amrutha
                  </motion.span>
                </motion.span>
              </motion.h1>

              <motion.div
                className={`text-base md:text-xl lg:text-2xl ${isDark ? "text-gray-300" : "text-gray-600"} mb-6 space-y-3 mt-4`}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2, duration: 0.4 }}
              >
                <motion.div
                  className="flex items-center gap-3"
                  whileHover={{ x: 10 }}
                  transition={{ type: "spring", stiffness: 300 }}
                  initial={{ opacity: 0, x: -10 }}
                  animate={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                >
                  <motion.div
                    className={`w-2 h-2 ${isDark ? "bg-cyan-400" : "bg-blue-500"} rounded-full`}
                    animate={{ scale: [1, 1.2, 1] }}
                    transition={{ duration: 2, repeat: Number.POSITIVE_INFINITY }}
                  />
                  <motion.span
                    initial={{ opacity: 0, x: -10 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.5, delay: 0.6 }}
                  >
                    Developer | AI & Automation 
                  </motion.span>
                </motion.div>
                <motion.div
                  className="flex items-center gap-3"
                  whileHover={{ x: 10 }}
                  transition={{ type: "spring", stiffness: 300 }}
                  initial={{ opacity: 0, x: -10 }}
                  animate={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                >
                  <motion.div
                    className={`w-2 h-2 ${isDark ? "bg-teal-400" : "bg-indigo-500"} rounded-full`}
                    animate={{ scale: [1, 1.2, 1] }}
                    transition={{ duration: 2, repeat: Number.POSITIVE_INFINITY, delay: 0.5 }}
                  />
                  <motion.span
                    initial={{ opacity: 0, x: -10 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.5, delay: 0.8 }}
                  >
                    UPSC Aspirant | SVECW '26
                  </motion.span>
                </motion.div>
              </motion.div>

              <motion.div
                className="flex flex-wrap gap-3 mb-5 justify-center lg:justify-start"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.1, duration: 0.4 }}
              >
                <motion.div 
                  whileHover={{ scale: 1.05 }} 
                  whileTap={{ scale: 0.95 }}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.3, delay: 1.0 }}
                >
                  <Button
                    onClick={() => scrollToSection("projects")}
                    className={`${
                      isDark
                        ? "bg-gradient-to-r from-cyan-500 to-blue-500 hover:from-cyan-600 hover:to-blue-600"
                        : "bg-gradient-to-r from-blue-500 to-indigo-500 hover:from-blue-600 hover:to-indigo-600"
                    } text-white px-8 py-3 rounded-full shadow-lg transition-all duration-300`}
                  >
                    <Rocket className="w-4 h-4 mr-2" />
                    <motion.span
                      animate={{ 
                        scale: [1, 1.05, 1],
                      }}
                      transition={{ 
                        duration: 2, 
                        repeat: Number.POSITIVE_INFINITY,
                        repeatType: "reverse"
                      }}
                    >
                      Explore Projects
                    </motion.span>
                  </Button>
                </motion.div>
              </motion.div>

              <motion.div
                className="flex gap-3 justify-center lg:justify-start flex-wrap"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.1, duration: 0.4 }}
              >
                {[
                  {
                    icon: <Github className="w-5 h-5" />,
                    href: "https://github.com/gantathanmaiamrutha",
                    color: isDark ? "hover:text-gray-400" : "hover:text-gray-700",
                  },
                  {
                    icon: <Linkedin className="w-5 h-5" />,
                    href: "https://www.linkedin.com/in/ganta-thanmai-amrutha",
                    color: isDark ? "hover:text-blue-400" : "hover:text-blue-600",
                  },
                  {
                    icon: <Mail className="w-5 h-5" />,
                    href: "mailto:gantathanmai01@gmail.com",
                    color: isDark ? "hover:text-emerald-400" : "hover:text-emerald-600",
                  },
                ].map((social, index) => (
                  <motion.a
                    key={index}
                    href={social.href}
                    target={social.href.startsWith("http") ? "_blank" : undefined}
                    rel={social.href.startsWith("http") ? "noopener noreferrer" : undefined}
                    className={`w-12 h-12 ${
                      isDark ? "bg-slate-800/50 border-slate-700" : "bg-white/50 border-gray-200"
                    } backdrop-blur-sm border rounded-full flex items-center justify-center ${
                      isDark ? "text-gray-400" : "text-gray-600"
                    } transition-all duration-300 ${social.color} hover:scale-110 hover:border-current`}
                    whileHover={{ y: -2, rotate: 5 }}
                    whileTap={{ scale: 0.95 }}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.3, delay: 0.8 + index * 0.1 }}
                  >
                    {social.icon}
                  </motion.a>
                ))}
              </motion.div>
            </motion.div>

            <motion.div
              className="relative order-1 lg:order-2 mb-6 lg:mb-0 lg:-ml-4"
              initial={{ opacity: 0, x: 50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.4, delay: 0.1 }}
            >
              <div className="relative w-56 h-56 sm:w-64 sm:h-64 md:w-72 md:h-72 lg:w-80 lg:h-80 mx-auto">
                {/* Animated rings */}
                <motion.div
                  className={`absolute inset-0 border-2 ${
                    isDark ? "border-cyan-400/30" : "border-blue-400/40"
                  } rounded-full`}
                  style={{ rotate, willChange: "transform" }}
                />
                <motion.div
                  className={`absolute inset-4 border-2 ${
                    isDark ? "border-teal-400/30" : "border-indigo-400/40"
                  } rounded-full`}
                  animate={{ rotate: -360 }}
                  transition={{ duration: 15, repeat: Number.POSITIVE_INFINITY, ease: "linear" }}
                />
                <motion.div
                  className={`absolute inset-8 border-2 ${
                    isDark ? "border-blue-400/30" : "border-purple-400/40"
                  } rounded-full`}
                  animate={{ rotate: 360 }}
                  transition={{ duration: 25, repeat: Number.POSITIVE_INFINITY, ease: "linear" }}
                />

                {/* Floating tech icons */}
                {[
                  { icon: <Code className="w-4 h-4 sm:w-5 sm:h-5 md:w-6 md:h-6 lg:w-7 lg:h-7" />, position: "top-8 right-8", delay: 0 },
                  { icon: <Brain className="w-4 h-4 sm:w-5 sm:h-5 md:w-6 md:h-6 lg:w-7 lg:h-7" />, position: "bottom-8 left-8", delay: 1 },
                  { icon: <Target className="w-4 h-4 sm:w-5 sm:h-5 md:w-6 md:h-6 lg:w-7 lg:h-7" />, position: "top-1/2 right-0", delay: 2 },
                  { icon: <Zap className="w-4 h-4 sm:w-5 sm:h-5 md:w-6 md:h-6 lg:w-7 lg:h-7" />, position: "top-0 left-1/2", delay: 3 },
                ].map((item, index) => (
                  <motion.div
                    key={index}
                    className={`absolute ${item.position} w-8 h-8 sm:w-10 sm:h-10 md:w-12 md:h-12 lg:w-14 lg:h-14 ${
                      isDark
                        ? "bg-gradient-to-r from-cyan-400 to-blue-400"
                        : "bg-gradient-to-r from-blue-500 to-indigo-500"
                    } rounded-full flex items-center justify-center text-white shadow-lg`}
                    animate={{
                      y: [-10, 10, -10],
                      rotate: [0, 360],
                    }}
                    transition={{
                      y: { duration: 4, repeat: Number.POSITIVE_INFINITY, ease: "easeInOut" },
                      rotate: { duration: 8, repeat: Number.POSITIVE_INFINITY, ease: "linear", delay: item.delay },
                    }}
                    whileHover={{ scale: 1.2 }}
                  >
                    {item.icon}
                  </motion.div>
                ))}

                <motion.img
                  src="/images/thanmai-profile.jpg"
                  alt="Ganta Thanmai Amrutha"
                  className={`relative z-10 w-40 h-40 sm:w-48 sm:h-48 md:w-56 md:h-56 lg:w-64 lg:h-64 object-cover rounded-full border-4 ${
                    isDark ? "border-white/20" : "border-gray-200/50"
                  } shadow-2xl mx-auto mt-6`}
                  whileHover={{ scale: 1.05, rotate: 5 }}
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ 
                    opacity: 1, 
                    scale: 1,
                    boxShadow: [
                      "0 0 0 rgba(0, 0, 0, 0)",
                      "0 0 20px rgba(56, 189, 248, 0.5)",
                      "0 0 0 rgba(0, 0, 0, 0)"
                    ]
                  }}
                  transition={{ 
                    duration: 0.6, 
                    scale: { duration: 0.6 },
                    boxShadow: {
                      duration: 3,
                      repeat: Number.POSITIVE_INFINITY,
                      repeatType: "reverse"
                    }
                  }}
                />
              </div>
            </motion.div>
          </div>
        </div>

        <motion.div
          className="absolute bottom-8 left-1/2 transform -translate-x-1/2"
          animate={{ y: [0, 10, 0] }}
          transition={{ duration: 2, repeat: Number.POSITIVE_INFINITY }}
        >
          <div
            className={`w-6 h-10 border-2 ${
              isDark ? "border-cyan-400" : "border-blue-500"
            } rounded-full flex justify-center`}
          >
            <motion.div
              className={`w-1 h-3 ${isDark ? "bg-cyan-400" : "bg-blue-500"} rounded-full mt-2`}
              animate={{ y: [0, 12, 0] }}
              transition={{ duration: 2, repeat: Number.POSITIVE_INFINITY }}
            />
          </div>
        </motion.div>
      </section>

      {/* About Section */}
      <section id="about" className={`py-20 ${isDark ? "bg-slate-800/50" : "bg-white/50"} backdrop-blur-sm`}>
        <div className="container mx-auto px-6">
          <motion.div
            className="text-center mb-16"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4 }}
            viewport={{ once: true }}
          >
            <motion.h2
              className={`text-5xl font-bold mb-4 ${
                isDark ? "bg-gradient-to-r from-cyan-400 to-teal-400" : "bg-gradient-to-r from-blue-600 to-indigo-600"
              } bg-clip-text text-transparent`}
              whileInView={{
                backgroundPosition: ["0% 50%", "100% 50%", "0% 50%"],
              }}
              transition={{
                duration: 3,
                repeat: Number.POSITIVE_INFINITY,
              }}
              style={{
                backgroundSize: "200% 200%",
              }}
            >
              About Me
            </motion.h2>
            <motion.div
              className={`w-24 h-1 ${
                isDark ? "bg-gradient-to-r from-cyan-400 to-teal-400" : "bg-gradient-to-r from-blue-500 to-indigo-500"
              } mx-auto mb-6`}
              initial={{ width: 0 }}
              whileInView={{ width: 96 }}
              transition={{ duration: 1, delay: 0.5 }}
            />
            <motion.p
              className={`text-xl ${isDark ? "text-gray-300" : "text-gray-600"} max-w-4xl mx-auto leading-relaxed`}
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              transition={{ duration: 1, delay: 0.3 }}
            >
              A passionate Electronics and Communication Engineering student with expertise in embedded systems, AI
              automation, and full-stack development. Currently pursuing my Bachelor's degree at Sri Vishnu Engineering
              College for Women, while aspiring to serve the nation as an IAS officer.
              
              <br /><br />
              
              With a strong foundation in both technical skills and leadership qualities, I believe in leveraging technology 
              to solve real-world problems and create meaningful impact. My journey spans from developing innovative IoT 
              solutions to participating in competitive hackathons, always driven by curiosity and a commitment to excellence.
              
              <br /><br />
              
              Beyond academics, I am deeply committed to social service and community development, viewing technology as a 
              powerful tool for societal transformation. My ultimate goal is to bridge the gap between technological 
              innovation and public service through a career in civil administration.
            </motion.p>
          </motion.div>

          <div className="grid md:grid-cols-3 gap-8 mb-16">
            {[
              {
                icon: <Code className="w-10 h-10" />,
                title: "Technical Excellence",
                description:
                  "Proficient in multiple programming languages and development tools with hands-on project experience in embedded systems and web development. Specialized in Arduino programming, FPGA design, and modern web technologies.",
                color: isDark ? "from-cyan-400 to-blue-400" : "from-blue-500 to-indigo-500",
                stats: "15+ Projects",
                achievements: ["Arduino Expert", "FPGA Programming", "Full-Stack Development", "IoT Solutions"],
              },
              {
                icon: <Brain className="w-10 h-10" />,
                title: "Innovation Focus",
                description:
                  "Passionate about AI, automation, and emerging technologies with practical implementation skills in IoT and FPGA design. Constantly exploring new frontiers in technology and their applications in solving complex problems.",
                color: isDark ? "from-teal-400 to-emerald-400" : "from-indigo-500 to-purple-500",
                stats: "5+ Technologies",
                achievements: ["AI & ML Enthusiast", "Automation Expert", "Research Oriented", "Innovation Mindset"],
              },
              {
                icon: <Target className="w-10 h-10" />,
                title: "Leadership Vision",
                description:
                  "Aspiring IAS officer with a vision to contribute to society through technology and governance, combining technical skills with public service. Committed to using technology for social good and administrative excellence.",
                color: isDark ? "from-blue-400 to-cyan-400" : "from-purple-500 to-pink-500",
                stats: "Future Leader",
                achievements: ["UPSC Aspirant", "Social Service", "Public Policy Interest", "Administrative Vision"],
              },
            ].map((item, index) => (
              <motion.div
                key={index}
                className="relative group"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4, delay: index * 0.1 }}
                viewport={{ once: true }}
                whileHover={{ y: -10, rotateY: 5 }}
              >
                <motion.div
                  className={`absolute inset-0 ${
                    isDark
                      ? "bg-gradient-to-r from-cyan-500/10 to-teal-500/10"
                      : "bg-gradient-to-r from-blue-200/30 to-indigo-200/30"
                  } rounded-2xl blur-xl group-hover:blur-2xl transition-all duration-300`}
                  animate={{
                    scale: [1, 1.05, 1],
                  }}
                  transition={{
                    duration: 4,
                    repeat: Number.POSITIVE_INFINITY,
                    delay: index * 0.5,
                  }}
                />
                <Card
                  className={`relative ${
                    isDark
                      ? "bg-slate-800/80 border-slate-700 hover:border-cyan-500/50"
                      : "bg-white/80 border-gray-200 hover:border-blue-300/50"
                  } backdrop-blur-sm transition-all duration-300 h-full`}
                >
                  <CardHeader className="text-center pb-4">
                    <motion.div
                      className={`inline-flex items-center justify-center w-20 h-20 bg-gradient-to-r ${item.color} rounded-full text-white mb-4 mx-auto shadow-lg`}
                      whileHover={{ rotate: 360, scale: 1.1 }}
                      transition={{ duration: 0.5 }}
                    >
                      {item.icon}
                    </motion.div>
                    <CardTitle className={`text-xl font-semibold ${isDark ? "text-white" : "text-gray-900"} mb-2`}>
                      {item.title}
                    </CardTitle>
                    <Badge className={`bg-gradient-to-r ${item.color} text-white mb-3`}>{item.stats}</Badge>
                  </CardHeader>
                  <CardContent>
                    <p className={`${isDark ? "text-gray-300" : "text-gray-600"} leading-relaxed mb-4`}>
                      {item.description}
                    </p>
                    <div className="space-y-2">
                      <h4 className={`text-sm font-semibold ${isDark ? "text-cyan-400" : "text-blue-600"} mb-2`}>
                        Key Strengths:
                      </h4>
                      <div className="flex flex-wrap gap-1">
                        {item.achievements.map((achievement, idx) => (
                          <Badge
                            key={idx}
                            variant="outline"
                            className={`text-xs ${
                              isDark ? "border-slate-600 text-gray-400" : "border-gray-300 text-gray-600"
                            }`}
                          >
                            {achievement}
                          </Badge>
                        ))}
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>

          {/* Personal Stats Section */}
          <motion.div
            className="grid grid-cols-2 md:grid-cols-4 gap-6 max-w-4xl mx-auto"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
          >
            {[
              { number: "9.17", label: "CGPA", suffix: "/10" },
              { number: "15+", label: "Projects", suffix: "" },
              { number: "5+", label: "Technologies", suffix: "" },
              { number: "2026", label: "Graduation", suffix: "" },
            ].map((stat, index) => (
              <motion.div
                key={index}
                className={`text-center p-6 rounded-xl ${
                  isDark ? "bg-slate-800/50" : "bg-white/50"
                } backdrop-blur-sm border ${
                  isDark ? "border-slate-700" : "border-gray-200"
                }`}
                whileHover={{ scale: 1.05 }}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4, delay: index * 0.1 }}
                viewport={{ once: true }}
              >
                <motion.div
                  className={`text-2xl md:text-3xl font-bold ${
                    isDark ? "text-cyan-400" : "text-blue-600"
                  } mb-2`}
                  initial={{ scale: 0 }}
                  whileInView={{ scale: 1 }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                >
                  {stat.number}
                  <span className="text-lg">{stat.suffix}</span>
                </motion.div>
                <div className={`text-sm font-medium ${isDark ? "text-gray-300" : "text-gray-600"}`}>
                  {stat.label}
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Skills Section */}
      <section id="skills" className={`py-20 ${isDark ? "bg-slate-900/50" : "bg-gray-50/50"}`}>
        <div className="container mx-auto px-6">
          <motion.div
            className="text-center mb-16"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4 }}
            viewport={{ once: true }}
          >
            <h2
              className={`text-5xl font-bold mb-4 ${
                isDark
                  ? "bg-gradient-to-r from-teal-400 to-emerald-400"
                  : "bg-gradient-to-r from-indigo-600 to-purple-600"
              } bg-clip-text text-transparent`}
            >
              Skills & Expertise
            </h2>
            <div
              className={`w-24 h-1 ${
                isDark
                  ? "bg-gradient-to-r from-teal-400 to-emerald-400"
                  : "bg-gradient-to-r from-indigo-500 to-purple-500"
              } mx-auto mb-6`}
            />
          </motion.div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              {
                category: "Programming Languages",
                skills: [
                  { name: "HTML5", level: 95 },
                  { name: "CSS3", level: 90 },
                  { name: "JavaScript", level: 85 },
                  { name: "Python", level: 80 },
                  { name: "C Programming", level: 85 },
                  { name: "Verilog HDL", level: 75 }
                ],
                color: isDark ? "from-cyan-500 to-blue-500" : "from-blue-500 to-indigo-500",
                icon: <Code className="w-6 h-6" />,
                description: "Strong foundation in multiple programming paradigms"
              },
              {
                category: "Development & Design",
                skills: [
                  { name: "React.js", level: 80 },
                  { name: "Next.js", level: 75 },
                  { name: "Tailwind CSS", level: 90 },
                  { name: "Responsive Design", level: 95 },
                  { name: "UI/UX Design", level: 70 },
                  { name: "Web Optimization", level: 75 }
                ],
                color: isDark ? "from-teal-500 to-emerald-500" : "from-indigo-500 to-purple-500",
                icon: <Palette className="w-6 h-6" />,
                description: "Modern web development and design expertise"
              },
              {
                category: "Hardware & Embedded",
                skills: [
                  { name: "Arduino", level: 90 },
                  { name: "FPGA Design", level: 80 },
                  { name: "Quartus II", level: 75 },
                  { name: "IoT Systems", level: 85 },
                  { name: "Sensor Integration", level: 80 },
                  { name: "Circuit Design", level: 70 }
                ],
                color: isDark ? "from-blue-500 to-cyan-500" : "from-purple-500 to-pink-500",
                icon: <Zap className="w-6 h-6" />,
                description: "Hands-on experience with embedded systems and IoT"
              },
              {
                category: "Tools & Professional",
                skills: [
                  { name: "Git & GitHub", level: 85 },
                  { name: "Problem Solving", level: 95 },
                  { name: "Team Leadership", level: 80 },
                  { name: "Project Management", level: 75 },
                  { name: "Technical Writing", level: 85 },
                  { name: "Research Skills", level: 90 }
                ],
                color: isDark ? "from-emerald-500 to-teal-500" : "from-pink-500 to-red-500",
                icon: <Users className="w-6 h-6" />,
                description: "Professional skills and collaboration tools"
              },
            ].map((skillGroup, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4, delay: index * 0.1 }}
                viewport={{ once: true }}
                whileHover={{ y: -5, scale: 1.02 }}
              >
                <Card
                  className={`h-full ${
                    isDark
                      ? "bg-slate-800/80 border-slate-700 hover:border-cyan-500/50"
                      : "bg-white/80 border-gray-200 hover:border-blue-300/50"
                  } backdrop-blur-sm transition-all duration-300 group`}
                >
                  <CardHeader>
                    <div className="flex items-center gap-3 mb-4">
                      <motion.div
                        className={`w-12 h-12 bg-gradient-to-r ${skillGroup.color} rounded-lg flex items-center justify-center text-white shadow-lg group-hover:scale-110 transition-transform duration-300`}
                        whileHover={{ rotate: 180 }}
                      >
                        {skillGroup.icon}
                      </motion.div>
                      <div>
                        <CardTitle className={`text-lg ${isDark ? "text-white" : "text-gray-900"}`}>
                          {skillGroup.category}
                        </CardTitle>
                        <p className={`text-xs ${isDark ? "text-gray-400" : "text-gray-600"} mt-1`}>
                          {skillGroup.description}
                        </p>
                      </div>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      {skillGroup.skills.map((skill, skillIndex) => (
                        <motion.div
                          key={skillIndex}
                          initial={{ opacity: 0, x: -20 }}
                          whileInView={{ opacity: 1, x: 0 }}
                          transition={{ duration: 0.3, delay: skillIndex * 0.1 }}
                          viewport={{ once: true }}
                          className="space-y-2"
                        >
                          <div className="flex justify-between items-center">
                            <span className={`text-sm font-medium ${isDark ? "text-gray-300" : "text-gray-700"}`}>
                              {skill.name}
                            </span>
                            <span className={`text-xs ${isDark ? "text-cyan-400" : "text-blue-600"} font-semibold`}>
                              {skill.level}%
                            </span>
                          </div>
                          <div className={`w-full bg-gray-200 rounded-full h-2 ${isDark ? "bg-slate-700" : ""}`}>
                            <motion.div
                              className={`bg-gradient-to-r ${skillGroup.color} h-2 rounded-full`}
                              initial={{ width: 0 }}
                              whileInView={{ width: `${skill.level}%` }}
                              transition={{ duration: 1, delay: skillIndex * 0.1 }}
                              viewport={{ once: true }}
                            />
                          </div>
                        </motion.div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>

          {/* Additional Skills Categories */}
          <motion.div
            className="mt-16 max-w-6xl mx-auto"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
          >
            <h3 className={`text-2xl font-bold text-center mb-8 ${isDark ? "text-white" : "text-gray-900"}`}>
              Additional Expertise
            </h3>
            <div className="grid md:grid-cols-3 gap-6">
              {[
                {
                  title: "Academic Excellence",
                  items: ["Electronics & Communication", "Digital Signal Processing", "Microprocessors", "Control Systems", "Communication Systems", "VLSI Design"],
                  icon: <BookOpen className="w-5 h-5" />
                },
                {
                  title: "Emerging Technologies",
                  items: ["Internet of Things", "Machine Learning", "Artificial Intelligence", "Blockchain Basics", "Cloud Computing", "Edge Computing"],
                  icon: <Brain className="w-5 h-5" />
                },
                {
                  title: "Soft Skills",
                  items: ["Leadership", "Public Speaking", "Critical Thinking", "Analytical Skills", "Time Management", "Adaptability"],
                  icon: <Heart className="w-5 h-5" />
                }
              ].map((category, index) => (
                <motion.div
                  key={index}
                  className={`p-6 rounded-xl ${
                    isDark ? "bg-slate-800/50" : "bg-white/50"
                  } backdrop-blur-sm border ${
                    isDark ? "border-slate-700" : "border-gray-200"
                  }`}
                  whileHover={{ scale: 1.02 }}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.4, delay: index * 0.1 }}
                  viewport={{ once: true }}
                >
                  <div className="flex items-center gap-3 mb-4">
                    <div className={`w-10 h-10 ${isDark ? "bg-cyan-500/20" : "bg-blue-500/20"} rounded-lg flex items-center justify-center ${isDark ? "text-cyan-400" : "text-blue-600"}`}>
                      {category.icon}
                    </div>
                    <h4 className={`font-semibold ${isDark ? "text-white" : "text-gray-900"}`}>
                      {category.title}
                    </h4>
                  </div>
                  <div className="space-y-2">
                    {category.items.map((item, idx) => (
                      <motion.div
                        key={idx}
                        className={`text-sm ${isDark ? "text-gray-300" : "text-gray-600"} flex items-center gap-2`}
                        initial={{ opacity: 0, x: -10 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.3, delay: idx * 0.05 }}
                        viewport={{ once: true }}
                      >
                        <div className={`w-1.5 h-1.5 rounded-full ${isDark ? "bg-cyan-400" : "bg-blue-500"}`} />
                        {item}
                      </motion.div>
                    ))}
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>
      </section>

      {/* Projects Section */}
      <section id="projects" className={`py-20 ${isDark ? "bg-slate-800/50" : "bg-white/50"}`}>
        <div className="container mx-auto px-6">
          <motion.div
            className="text-center mb-16"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4 }}
            viewport={{ once: true }}
          >
            <h2
              className={`text-5xl font-bold mb-4 ${
                isDark ? "bg-gradient-to-r from-blue-400 to-cyan-400" : "bg-gradient-to-r from-purple-600 to-pink-600"
              } bg-clip-text text-transparent`}
            >
              Featured Projects
            </h2>
            <div
              className={`w-24 h-1 ${
                isDark ? "bg-gradient-to-r from-blue-400 to-cyan-400" : "bg-gradient-to-r from-purple-500 to-pink-500"
              } mx-auto mb-6`}
            />
          </motion.div>

          <div className="grid md:grid-cols-2 gap-8">
            {[
              {
                title: "Alcohol Detection & Engine Locking System",
                description:
                  "Arduino-based safety system using MQ-3 sensor for real-time alcohol detection with automatic engine locking mechanism. Features buzzer alerts, LED indicators, and motor simulation.",
                detailedDescription:
                  "This comprehensive safety system was developed to prevent drunk driving incidents by implementing real-time alcohol detection. The system uses an MQ-3 alcohol sensor to continuously monitor the driver's breath alcohol content. When alcohol is detected above the legal limit, the system automatically locks the engine ignition and triggers multiple alert mechanisms including buzzer sounds and LED indicators. The project includes motor simulation to demonstrate the engine locking mechanism and features a user-friendly interface for monitoring system status.",
                features: [
                  "Real-time alcohol detection using MQ-3 sensor",
                  "Automatic engine locking mechanism",
                  "Buzzer and LED alert system",
                  "Motor simulation for demonstration",
                  "Threshold-based detection algorithm",
                  "User status monitoring interface",
                ],
                challenges: [
                  "Calibrating sensor sensitivity for accurate readings",
                  "Implementing reliable motor control system",
                  "Designing fail-safe mechanisms for emergency situations",
                ],
                tech: ["Arduino Uno", "MQ-3 Sensor", "C Programming", "Relay Module"],
                period: "Jan 2024 - Jun 2024",
                color: isDark ? "from-cyan-500 to-blue-500" : "from-blue-500 to-indigo-500",
                icon: <Zap className="w-6 h-6" />,
              },
              {
                title: "FPGA-Based Traffic Light Controller",
                description:
                  "Verilog HDL implementation on FPGA for intelligent traffic management with synchronized signal transitions. Optimized for performance and resource efficiency.",
                detailedDescription:
                  "An advanced traffic light control system implemented using Verilog HDL on FPGA hardware. The system manages traffic flow at intersections through intelligent signal timing and synchronized transitions. The design focuses on optimizing traffic flow while ensuring pedestrian safety and emergency vehicle priority. The implementation demonstrates efficient resource utilization and real-time performance capabilities of FPGA technology.",
                features: [
                  "Intelligent traffic signal timing algorithms",
                  "Synchronized multi-intersection control",
                  "Emergency vehicle priority system",
                  "Pedestrian crossing safety features",
                  "Real-time traffic flow optimization",
                  "Resource-efficient FPGA implementation",
                ],
                challenges: [
                  "Optimizing timing algorithms for different traffic patterns",
                  "Implementing emergency override functionality",
                  "Ensuring reliable synchronization across multiple signals",
                ],
                tech: ["Verilog HDL", "Quartus II", "FPGA", "LED Control"],
                period: "Apr 2024 - Aug 2024",
                color: isDark ? "from-teal-500 to-emerald-500" : "from-indigo-500 to-purple-500",
                icon: <Target className="w-6 h-6" />,
              },
              {
                title: "Li-Fi Communication System",
                description:
                  "Innovative data transmission system using visible light with LEDs and photodiodes. High-speed data transfer with real-time error handling mechanisms.",
                detailedDescription:
                  "A cutting-edge wireless communication system that utilizes visible light for data transmission. This Li-Fi system employs LED lights as transmitters and photodiodes as receivers to achieve high-speed data transfer without radio frequency interference. The system includes sophisticated error handling mechanisms, data encoding/decoding algorithms, and real-time performance monitoring. This technology offers enhanced security and eliminates electromagnetic interference issues common in traditional wireless systems.",
                features: [
                  "High-speed visible light data transmission",
                  "LED-based transmitter system",
                  "Photodiode receiver array",
                  "Real-time error detection and correction",
                  "Data encoding/decoding algorithms",
                  "Performance monitoring dashboard",
                ],
                challenges: [
                  "Optimizing light modulation for maximum data rate",
                  "Implementing robust error correction algorithms",
                  "Ensuring reliable communication in varying light conditions",
                ],
                tech: ["Arduino", "LEDs", "Photodiodes", "C Programming"],
                period: "May 2024 - Sep 2024",
                color: isDark ? "from-blue-500 to-cyan-500" : "from-purple-500 to-pink-500",
                icon: <Globe className="w-6 h-6" />,
              },
              {
                title: "Food Delivery Web Application",
                description:
                  "GDSC Hackathon project connecting restaurants with volunteers to redistribute surplus food efficiently. Built with modern web technologies.",
                detailedDescription:
                  "A social impact web application developed during a 16-hour GDSC hackathon to address food waste and hunger issues. The platform connects restaurants with surplus food to volunteers and NGOs for efficient redistribution to those in need. The application features real-time tracking, volunteer management, and impact analytics. The project demonstrates the power of technology in solving social problems and creating sustainable solutions for food waste reduction.",
                features: [
                  "Restaurant surplus food listing system",
                  "Volunteer registration and management",
                  "Real-time food tracking and delivery",
                  "NGO partnership integration",
                  "Impact analytics and reporting",
                  "Mobile-responsive design",
                ],
                challenges: [
                  "Developing a complete solution within 16-hour time constraint",
                  "Implementing real-time tracking functionality",
                  "Creating an intuitive user interface for all stakeholders",
                ],
                tech: ["HTML5", "CSS3", "JavaScript", "Web Development"],
                period: "16 Hours Hackathon",
                color: isDark ? "from-emerald-500 to-teal-500" : "from-pink-500 to-red-500",
                icon: <Heart className="w-6 h-6" />,
              },
            ].map((project, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4, delay: index * 0.1 }}
                viewport={{ once: true }}
                whileHover={{ y: -10, rotateX: 5 }}
                className="group"
              >
                <Card
                  className={`h-full ${
                    isDark
                      ? "bg-slate-800/80 border-slate-700 hover:border-cyan-500/50"
                      : "bg-white/80 border-gray-200 hover:border-blue-300/50"
                  } backdrop-blur-sm transition-all duration-300 overflow-hidden`}
                >
                  <motion.div
                    className={`h-2 bg-gradient-to-r ${project.color}`}
                    initial={{ width: 0 }}
                    whileInView={{ width: "100%" }}
                    transition={{ duration: 1, delay: index * 0.2 }}
                  />
                  <CardHeader>
                    <div className="flex items-start justify-between mb-4">
                      <motion.div
                        className={`w-12 h-12 bg-gradient-to-r ${project.color} rounded-lg flex items-center justify-center text-white shadow-lg group-hover:scale-110 transition-transform duration-300`}
                        whileHover={{ rotate: 360 }}
                      >
                        {project.icon}
                      </motion.div>
                      <Badge
                        className={`text-xs ${isDark ? "bg-slate-700 text-gray-300" : "bg-gray-100 text-gray-600"}`}
                      >
                        {project.period}
                      </Badge>
                    </div>
                    <CardTitle
                      className={`text-xl ${
                        isDark ? "text-white group-hover:text-cyan-400" : "text-gray-900 group-hover:text-blue-600"
                      } mb-2 transition-colors duration-300`}
                    >
                      {project.title}
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className={`${isDark ? "text-gray-300" : "text-gray-600"} mb-6 leading-relaxed`}>
                      {project.description}
                    </p>
                    <div className="flex flex-wrap gap-2 mb-4">
                      {project.tech.map((tech: string, index: number) => (
                        <motion.div
                          key={index}
                          initial={{ opacity: 0, x: -10 }}
                          whileInView={{ opacity: 1, x: 0 }}
                          transition={{ duration: 0.3, delay: index * 0.1 }}
                          whileHover={{ scale: 1.05 }}
                        >
                          <Badge
                            variant="outline"
                            className={`text-xs ${
                              isDark ? "border-slate-600 text-gray-300" : "border-gray-300 text-gray-700"
                            }`}
                          >
                            {tech}
                          </Badge>
                        </motion.div>
                      ))}
                    </div>
                    <div className="flex gap-2">
                      <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                        <Button
                          size="sm"
                          onClick={() => openProjectModal(project)}
                          className={`bg-gradient-to-r ${project.color} text-white transition-transform duration-200`}
                        >
                          <ExternalLink className="w-4 h-4 mr-2" />
                          View Details
                        </Button>
                      </motion.div>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Education Section */}
      <section id="education" className={`py-20 ${isDark ? "bg-slate-800/50" : "bg-white/50"}`}>
        <div className="container mx-auto px-6">
          <motion.div
            className="text-center mb-16"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4 }}
            viewport={{ once: true }}
          >
            <h2
              className={`text-5xl font-bold mb-4 ${
                isDark ? "bg-gradient-to-r from-cyan-400 to-blue-400" : "bg-gradient-to-r from-blue-600 to-purple-600"
              } bg-clip-text text-transparent`}
            >
              Education Journey
            </h2>
            <div
              className={`w-24 h-1 ${
                isDark ? "bg-gradient-to-r from-cyan-400 to-blue-400" : "bg-gradient-to-r from-blue-500 to-purple-500"
              } mx-auto mb-6`}
            />
          </motion.div>

          <div className="max-w-4xl mx-auto">
            <div className="relative">
              {/* Timeline line */}
              <motion.div
                className={`absolute left-[1.95rem] sm:left-[1.95rem] top-[2rem] bottom-16 w-[3px] z-10 ${
                  isDark ? "bg-gradient-to-b from-cyan-400 to-teal-400/70" : "bg-gradient-to-b from-blue-500 to-purple-500/70"
                } rounded-full hidden sm:block`}
                initial={{ height: 0 }}
                whileInView={{ height: "calc(100% - 4rem)" }}
                transition={{ duration: 2 }}
              />

              <div className="space-y-12 sm:space-y-20">
                {[
                  {
                    title: "Bachelor of Technology - Electronics and Communication Engineering",
                    institution: "Sri Vishnu Engineering College for Women",
                    location: "Bhimavaram, Andhra Pradesh",
                    period: "Oct 2022 - May 2026",
                    grade: "CGPA: 9.17/10.00",
                    description: "Pursuing comprehensive education in electronics, communication systems, and embedded technologies with focus on practical applications and research.",
                    achievements: [
                      "Top 5% of the class",
                      "Consistent academic excellence",
                      "Active in technical projects",
                      "Leadership roles in college events"
                    ],
                    coursework: [
                      "Digital Signal Processing",
                      "Microprocessors & Microcontrollers",
                      "VLSI Design",
                      "Communication Systems",
                      "Control Systems",
                      "Embedded Systems"
                    ],
                    icon: <BookOpen className="w-6 h-6" />,
                    color: isDark ? "from-cyan-500 to-blue-500" : "from-blue-500 to-indigo-500",
                    status: "Current",
                  },
                  {
                    title: "EduSkills Cohort 9 - Embedded Systems",
                    institution: "Virtual Program (AICTE Collaboration)",
                    location: "Online Learning Platform",
                    period: "May 2024 - Jun 2024",
                    grade: "Certificate of Completion",
                    description: "Intensive industry-focused program on embedded systems development, IoT applications, and practical implementation of hardware-software integration.",
                    achievements: [
                      "Hands-on project completion",
                      "Industry mentor guidance",
                      "Real-world problem solving",
                      "Technical skill enhancement"
                    ],
                    coursework: [
                      "Embedded C Programming",
                      "Hardware Interface Design",
                      "IoT Device Development",
                      "Sensor Integration",
                      "Real-time Systems",
                      "Industry Best Practices"
                    ],
                    icon: <Award className="w-6 h-6" />,
                    color: isDark ? "from-teal-500 to-emerald-500" : "from-indigo-500 to-purple-500",
                    status: "Completed",
                  },
                  {
                    title: "XII Standard - Mathematics, Physics, Chemistry",
                    institution: "Bharathi Junior College",
                    location: "Bhimavaram, Andhra Pradesh",
                    period: "2020 - 2022",
                    grade: "Marks: 981/1000 (98.1%)",
                    description: "Exceptional performance in science stream with strong foundation in mathematics and physics, preparing for engineering entrance examinations.",
                    achievements: [
                      "College topper in Mathematics",
                      "98.1% aggregate score",
                      "Science stream excellence",
                      "JEE preparation success"
                    ],
                    coursework: [
                      "Advanced Mathematics",
                      "Physics Mechanics & Waves",
                      "Physical Chemistry",
                      "Organic Chemistry",
                      "Inorganic Chemistry",
                      "English Communication"
                    ],
                    icon: <BookOpen className="w-6 h-6" />,
                    color: isDark ? "from-blue-500 to-cyan-500" : "from-purple-500 to-pink-500",
                    status: "Completed",
                  },
                  {
                    title: "X Standard - Secondary School Certificate",
                    institution: "Vignana Bharathi High School",
                    location: "Bhimavaram, Andhra Pradesh",
                    period: "2019 - 2020",
                    grade: "Marks: 596/600 (99.3%)",
                    description: "Outstanding academic performance with near-perfect scores across all subjects, demonstrating strong foundational knowledge and study discipline.",
                    achievements: [
                      "99.3% aggregate score",
                      "Subject-wise excellence",
                      "Academic consistency",
                      "Foundation building"
                    ],
                    coursework: [
                      "Mathematics",
                      "Science (Physics, Chemistry, Biology)",
                      "Social Studies",
                      "English",
                      "Telugu",
                      "Hindi"
                    ],
                    icon: <BookOpen className="w-6 h-6" />,
                    color: isDark ? "from-emerald-500 to-teal-500" : "from-pink-500 to-red-500",
                    status: "Completed",
                  },
                ].map((edu, index) => (
                  <motion.div
                    key={index}
                    className="relative flex flex-col sm:flex-row gap-4 sm:gap-6 md:gap-8 group"
                    initial={{ opacity: 0, x: -20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.4, delay: index * 0.1 }}
                    viewport={{ once: true }}
                  >
                    {/* Timeline dot - visible only on sm screens and up */}
                    <div className="relative mx-auto sm:mx-0 flex-shrink-0 flex items-center justify-center w-[68px] h-16 mb-4 sm:mb-0">
                      {/* Connector line - visible only on sm screens and up */}
                      <div className={`absolute left-0 top-1/2 w-7 h-[3px] -translate-x-5 -translate-y-1/2 ${
                        isDark ? "bg-gradient-to-l from-cyan-400 to-cyan-400/30" : "bg-gradient-to-l from-blue-500 to-blue-500/30"
                      } rounded-full hidden sm:block`}></div>
                      
                      <motion.div
                        className={`relative z-10 w-16 h-16 bg-gradient-to-r ${edu.color} rounded-full flex items-center justify-center text-white shadow-lg group-hover:scale-110 transition-transform duration-300`}
                        whileHover={{ rotate: 360 }}
                        transition={{ duration: 0.6 }}
                      >
                        {edu.icon}
                      </motion.div>
                    </div>
                    
                    {/* Content */}
                    <Card
                      className={`flex-grow ${
                        isDark
                          ? "bg-slate-800/80 border-slate-700 hover:border-cyan-500/50"
                          : "bg-white/80 border-gray-200 hover:border-blue-300/50"
                      } backdrop-blur-sm transition-all duration-300 shadow-md`}
                    >
                      <CardContent className="p-6 md:p-8">
                        <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between mb-4">
                          <div className="flex-grow mb-3 sm:mb-0">
                            <h3 className={`text-xl font-semibold ${isDark ? "text-white" : "text-gray-900"} mb-2`}>
                              {edu.title}
                            </h3>
                            <p className={`${isDark ? "text-cyan-400" : "text-blue-600"} font-medium mb-1`}>
                              {edu.institution}
                            </p>
                            <p className={`${isDark ? "text-gray-400" : "text-gray-600"} text-sm mb-2`}>
                              📍 {edu.location} | 📅 {edu.period}
                            </p>
                            <p className={`${isDark ? "text-emerald-400" : "text-green-600"} font-medium mb-3`}>
                              🏆 {edu.grade}
                            </p>
                          </div>
                          <Badge className={`bg-gradient-to-r ${edu.color} text-white self-start`}>{edu.status}</Badge>
                        </div>
                        
                        <p className={`${isDark ? "text-gray-300" : "text-gray-600"} mb-4 leading-relaxed`}>
                          {edu.description}
                        </p>

                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                          {/* Achievements */}
                          <div>
                            <h4 className={`text-sm font-semibold ${isDark ? "text-cyan-400" : "text-blue-600"} mb-2`}>
                              Key Achievements:
                            </h4>
                            <div className="space-y-1">
                              {edu.achievements.map((achievement, idx) => (
                                <div key={idx} className={`text-xs ${isDark ? "text-gray-300" : "text-gray-600"} flex items-center gap-2`}>
                                  <div className={`w-1.5 h-1.5 rounded-full ${isDark ? "bg-cyan-400" : "bg-blue-500"}`} />
                                  {achievement}
                                </div>
                              ))}
                            </div>
                          </div>

                          {/* Coursework */}
                          <div>
                            <h4 className={`text-sm font-semibold ${isDark ? "text-teal-400" : "text-indigo-600"} mb-2`}>
                              Key Coursework:
                            </h4>
                            <div className="space-y-1">
                              {edu.coursework.map((course, idx) => (
                                <div key={idx} className={`text-xs ${isDark ? "text-gray-300" : "text-gray-600"} flex items-center gap-2`}>
                                  <div className={`w-1.5 h-1.5 rounded-full ${isDark ? "bg-teal-400" : "bg-indigo-500"}`} />
                                  {course}
                                </div>
                              ))}
                            </div>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  </motion.div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Hobbies Section */}
      <section id="hobbies" className={`py-20 ${isDark ? "bg-slate-900/50" : "bg-gray-50/50"}`}>
        <div className="container mx-auto px-6">
          <motion.div
            className="text-center mb-16"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4 }}
            viewport={{ once: true }}
          >
            <h2
              className={`text-5xl font-bold mb-4 ${
                isDark
                  ? "bg-gradient-to-r from-teal-400 to-emerald-400"
                  : "bg-gradient-to-r from-green-600 to-emerald-600"
              } bg-clip-text text-transparent`}
            >
              Hobbies & Interests
            </h2>
            <div
              className={`w-24 h-1 ${
                isDark
                  ? "bg-gradient-to-r from-teal-400 to-emerald-400"
                  : "bg-gradient-to-r from-green-500 to-emerald-500"
              } mx-auto mb-6`}
            />
          </motion.div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[
              {
                icon: <BookOpen className="w-8 h-8" />,
                title: "Mythological Literature",
                description: "Deep fascination with ancient texts, epics, and mythological stories from various cultures. Regular reading of Ramayana, Mahabharata, and Puranas.",
                details: [
                  "Reading ancient scriptures and epics",
                  "Analyzing mythological themes and morals",
                  "Watching historical documentaries",
                  "Understanding cultural heritage"
                ],
                color: isDark ? "from-amber-400 to-orange-400" : "from-orange-500 to-red-500",
                impact: "Develops wisdom and moral values"
              },
              {
                icon: <Heart className="w-8 h-8" />,
                title: "Yoga & Meditation",
                description: "Daily practice of yoga asanas and meditation for physical wellness and mental clarity. Believe in holistic health approach.",
                details: [
                  "Morning yoga sessions",
                  "Breathing exercises (Pranayama)",
                  "Mindfulness meditation",
                  "Stress management techniques"
                ],
                color: isDark ? "from-emerald-400 to-teal-400" : "from-green-500 to-teal-500",
                impact: "Enhances focus and reduces stress"
              },
              {
                icon: <BookOpen className="w-8 h-8" />,
                title: "Academic Reading",
                description: "Passionate reader across multiple genres including technical books, biographies, and self-improvement literature.",
                details: [
                  "Technical books on emerging technologies",
                  "Biographies of inspiring personalities",
                  "Self-improvement and productivity books",
                  "Current affairs and general knowledge"
                ],
                color: isDark ? "from-blue-400 to-cyan-400" : "from-blue-500 to-indigo-500",
                impact: "Continuous learning and knowledge expansion"
              },
              {
                icon: <Users className="w-8 h-8" />,
                title: "Community Service",
                description: "Active participation in social awareness campaigns, community outreach programs, and volunteer activities for societal development.",
                details: [
                  "Environmental awareness campaigns",
                  "Educational support for underprivileged",
                  "Health and hygiene awareness programs",
                  "Women empowerment initiatives"
                ],
                color: isDark ? "from-cyan-400 to-blue-400" : "from-indigo-500 to-purple-500",
                impact: "Contributing to social betterment"
              },
              {
                icon: <Code className="w-8 h-8" />,
                title: "Technology Exploration",
                description: "Constantly exploring new technologies, frameworks, and tools. Building personal projects and staying updated with tech trends.",
                details: [
                  "Learning new programming languages",
                  "Building innovative projects",
                  "Following tech blogs and podcasts",
                  "Attending webinars and workshops"
                ],
                color: isDark ? "from-teal-400 to-emerald-400" : "from-purple-500 to-pink-500",
                impact: "Staying ahead in technological advancements"
              },
              {
                icon: <Camera className="w-8 h-8" />,
                title: "Creative Pursuits",
                description: "Exploring photography, creative writing, and digital art as means of self-expression and artistic development.",
                details: [
                  "Nature and portrait photography",
                  "Creative writing and blogging",
                  "Digital art and design",
                  "Cultural event documentation"
                ],
                color: isDark ? "from-pink-400 to-rose-400" : "from-pink-500 to-red-500",
                impact: "Developing artistic perspective and creativity"
              },
            ].map((hobby, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4, delay: index * 0.1 }}
                viewport={{ once: true }}
                whileHover={{ y: -5, scale: 1.02, rotateY: 5 }}
              >
                <Card
                  className={`h-full ${
                    isDark
                      ? "bg-slate-800/80 border-slate-700 hover:border-cyan-500/50"
                      : "bg-white/80 border-gray-200 hover:border-blue-300/50"
                  } backdrop-blur-sm transition-all duration-300 group`}
                >
                  <CardContent className="p-6">
                    <motion.div
                      className={`w-16 h-16 bg-gradient-to-r ${hobby.color} rounded-full flex items-center justify-center text-white mx-auto mb-4 shadow-lg group-hover:scale-110 transition-transform duration-300`}
                      whileHover={{ rotate: 360 }}
                      transition={{ duration: 0.6 }}
                    >
                      {hobby.icon}
                    </motion.div>
                    <h3 className={`text-lg font-semibold ${isDark ? "text-white" : "text-gray-900"} mb-3 text-center`}>
                      {hobby.title}
                    </h3>
                    <p className={`${isDark ? "text-gray-300" : "text-gray-600"} text-sm leading-relaxed mb-4`}>
                      {hobby.description}
                    </p>
                    
                    <div className="space-y-3">
                      <div>
                        <h4 className={`text-xs font-semibold ${isDark ? "text-cyan-400" : "text-blue-600"} mb-2`}>
                          Activities:
                        </h4>
                        <div className="space-y-1">
                          {hobby.details.map((detail, idx) => (
                            <div key={idx} className={`text-xs ${isDark ? "text-gray-400" : "text-gray-600"} flex items-center gap-2`}>
                              <div className={`w-1 h-1 rounded-full ${isDark ? "bg-cyan-400" : "bg-blue-500"}`} />
                              {detail}
                            </div>
                          ))}
                        </div>
                      </div>
                      
                      <div className={`pt-2 border-t ${isDark ? "border-slate-700" : "border-gray-200"}`}>
                        <p className={`text-xs italic ${isDark ? "text-emerald-400" : "text-green-600"}`}>
                          💡 {hobby.impact}
                        </p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer
        className={`${isDark ? "bg-slate-900" : "bg-gray-900"} border-t ${isDark ? "border-slate-800" : "border-gray-700"} py-12`}
      >
        <div className="container mx-auto px-6">
          <div className="text-center">
            <motion.div
              className="mb-8"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4 }}
              viewport={{ once: true }}
            >
              <h3
                className={`text-2xl font-bold ${
                  isDark ? "bg-gradient-to-r from-cyan-400 to-teal-400" : "bg-gradient-to-r from-blue-400 to-indigo-400"
                } bg-clip-text text-transparent mb-4`}
              >
                Ganta Thanmai Amrutha
              </h3>
              <p className="text-gray-400 mb-6">Developer | AI & Automation | Aspiring IAS | SVECW '26</p>
              <div className="flex justify-center gap-4">
                {[
                  {
                    icon: <Github className="w-5 h-5" />,
                    href: "https://github.com/gantathanmaiamrutha",
                    color: "hover:text-gray-400",
                  },
                  {
                    icon: <Linkedin className="w-5 h-5" />,
                    href: "https://www.linkedin.com/in/ganta-thanmai-amrutha",
                    color: "hover:text-blue-400",
                  },
                ].map((social, index) => (
                  <motion.a
                    key={index}
                    href={social.href}
                    target={social.href.startsWith("http") ? "_blank" : undefined}
                    rel={social.href.startsWith("http") ? "noopener noreferrer" : undefined}
                    className={`w-12 h-12 bg-slate-800 border border-slate-700 rounded-full flex items-center justify-center text-gray-400 transition-all duration-300 ${social.color} hover:scale-110 hover:border-current`}
                    whileHover={{ y: -2 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    {social.icon}
                  </motion.a>
                ))}
              </div>
            </motion.div>
            <div className="border-t border-slate-800 pt-8">
              <p className="text-gray-500 mb-2">
                © 2024 Ganta Thanmai Amrutha. Crafted with passion, innovation, and purpose.
              </p>
              <p className="text-gray-400 text-sm">
                📧 gantathanmai01@gmail.com
              </p>
            </div>
          </div>
        </div>
      </footer>
      {/* Project Details Modal */}
      {selectedProject && (
        <motion.div
          className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={closeProjectModal}
        >
          <motion.div
            className={`relative max-w-4xl w-full max-h-[90vh] overflow-y-auto ${
              isDark ? "bg-slate-800" : "bg-white"
            } rounded-2xl shadow-2xl`}
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.8, opacity: 0 }}
            onClick={(e) => e.stopPropagation()}
          >
            {/* Modal Header */}
            <div
              className={`sticky top-0 ${isDark ? "bg-slate-800" : "bg-white"} border-b ${isDark ? "border-slate-700" : "border-gray-200"} p-6 rounded-t-2xl`}
            >
              <div className="flex items-start justify-between">
                <div className="flex items-center gap-4">
                  <div
                    className={`w-16 h-16 bg-gradient-to-r ${selectedProject.color} rounded-xl flex items-center justify-center text-white shadow-lg`}
                  >
                    {selectedProject.icon}
                  </div>
                  <div>
                    <h2 className={`text-2xl font-bold ${isDark ? "text-white" : "text-gray-900"} mb-2`}>
                      {selectedProject.title}
                    </h2>
                    <Badge className={`bg-gradient-to-r ${selectedProject.color} text-white`}>
                      {selectedProject.period}
                    </Badge>
                  </div>
                </div>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={closeProjectModal}
                  className={`${isDark ? "text-gray-400 hover:text-white" : "text-gray-600 hover:text-gray-900"}`}
                >
                  ✕
                </Button>
              </div>
            </div>

            {/* Modal Content */}
            <div className="p-6 space-y-8">
              {/* Description */}
              <div>
                <h3 className={`text-xl font-semibold ${isDark ? "text-white" : "text-gray-900"} mb-4`}>
                  Project Overview
                </h3>
                <p className={`${isDark ? "text-gray-300" : "text-gray-600"} leading-relaxed text-lg`}>
                  {selectedProject.detailedDescription}
                </p>
              </div>

              {/* Technologies */}
              <div>
                <h3 className={`text-xl font-semibold ${isDark ? "text-white" : "text-gray-900"} mb-4`}>
                  Technologies Used
                </h3>
                <div className="flex flex-wrap gap-3">
                  {selectedProject.tech.map((tech: string, index: number) => (
                    <Badge
                      key={index}
                      variant="outline"
                      className={`text-sm px-4 py-2 ${
                        isDark ? "border-slate-600 text-gray-300" : "border-gray-300 text-gray-700"
                      }`}
                    >
                      {tech}
                    </Badge>
                  ))}
                </div>
              </div>

              {/* Features */}
              <div>
                <h3 className={`text-xl font-semibold ${isDark ? "text-white" : "text-gray-900"} mb-4`}>
                  Key Features
                </h3>
                <ul className="space-y-3">
                  {selectedProject.features.map((feature: string, index: number) => (
                    <li key={index} className={`flex items-start gap-3 ${isDark ? "text-gray-300" : "text-gray-600"}`}>
                      <div
                        className={`w-2 h-2 ${isDark ? "bg-cyan-400" : "bg-blue-500"} rounded-full mt-2 flex-shrink-0`}
                      />
                      <span>{feature}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Challenges */}
              <div>
                <h3 className={`text-xl font-semibold ${isDark ? "text-white" : "text-gray-900"} mb-4`}>
                  Technical Challenges
                </h3>
                <ul className="space-y-3">
                  {selectedProject.challenges.map((challenge: string, index: number) => (
                    <li key={index} className={`flex items-start gap-3 ${isDark ? "text-gray-300" : "text-gray-600"}`}>
                      <div
                        className={`w-2 h-2 ${isDark ? "bg-orange-400" : "bg-orange-500"} rounded-full mt-2 flex-shrink-0`}
                      />
                      <span>{challenge}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </motion.div>
        </motion.div>
      )}
    </div>
  )
}
