// Global Variables
let isLoading = true
let currentSection = "home"
const particles = []
let skillAnimationTriggered = false

// Initialize everything when DOM is loaded
document.addEventListener("DOMContentLoaded", () => {
  initializeAnimations()
  setupNavigation()
  setupScrollEffects()
  setupFormHandling()
  setupInteractiveElements()
  createParticleSystem()

  // Hide loading screen after a delay
  setTimeout(() => {
    hideLoadingScreen()
  }, 2000)
})

// Loading Screen
function hideLoadingScreen() {
  const loading = document.querySelector(".loading")
  if (loading) {
    loading.classList.add("hide")
    setTimeout(() => {
      loading.remove()
    }, 500)
  }
  isLoading = false
}

// Navigation Setup
function setupNavigation() {
  const navLinks = document.querySelectorAll(".nav-link")
  const navbar = document.getElementById("mainNav")

  // Smooth scrolling for navigation links
  navLinks.forEach((link) => {
    link.addEventListener("click", function (e) {
      e.preventDefault()
      const targetId = this.getAttribute("href").substring(1)
      scrollToSection(targetId)
    })
  })

  // Navbar background on scroll
  window.addEventListener("scroll", () => {
    if (window.scrollY > 50) {
      navbar.style.background = "rgba(10, 10, 10, 0.98)"
    } else {
      navbar.style.background = "rgba(10, 10, 10, 0.95)"
    }

    updateActiveNavLink()
  })
}

// Smooth scroll to section
function scrollToSection(sectionId) {
  const section = document.getElementById(sectionId)
  if (section) {
    section.scrollIntoView({
      behavior: "smooth",
      block: "start",
    })
  }
}

// Update active navigation link
function updateActiveNavLink() {
  const sections = document.querySelectorAll("section")
  const navLinks = document.querySelectorAll(".nav-link")

  let current = ""
  sections.forEach((section) => {
    const sectionTop = section.offsetTop
    const sectionHeight = section.clientHeight
    if (window.scrollY >= sectionTop - 200) {
      current = section.getAttribute("id")
    }
  })

  navLinks.forEach((link) => {
    link.classList.remove("active")
    if (link.getAttribute("href") === `#${current}`) {
      link.classList.add("active")
    }
  })

  currentSection = current
}

// Initialize Animations
function initializeAnimations() {
  // Typing animation
  initializeTypingAnimation()

  // 3D tilt effects for project cards
  initializeTiltEffects()

  // Skill bars animation
  initializeSkillBars()

  // Timeline markers
  initializeTimelineMarkers()

  // Particle systems
  initializeParticleSystems()
}

// Typing Animation
function initializeTypingAnimation() {
  const typingText = document.querySelector(".typing-text")
  if (typingText) {
    const text = typingText.textContent
    typingText.textContent = ""

    let i = 0
    const typeWriter = () => {
      if (i < text.length) {
        typingText.textContent += text.charAt(i)
        i++
        setTimeout(typeWriter, 150)
      }
    }

    setTimeout(typeWriter, 1000)
  }
}

// 3D Tilt Effects
function initializeTiltEffects() {
  const tiltElements = document.querySelectorAll("[data-tilt]")

  tiltElements.forEach((element) => {
    element.addEventListener("mousemove", handleTilt)
    element.addEventListener("mouseleave", resetTilt)
  })
}

function handleTilt(e) {
  const element = e.currentTarget
  const rect = element.getBoundingClientRect()
  const x = e.clientX - rect.left
  const y = e.clientY - rect.top

  const centerX = rect.width / 2
  const centerY = rect.height / 2

  const rotateX = ((y - centerY) / centerY) * -10
  const rotateY = ((x - centerX) / centerX) * 10

  element.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) translateZ(20px)`
}

function resetTilt(e) {
  const element = e.currentTarget
  element.style.transform = "perspective(1000px) rotateX(0deg) rotateY(0deg) translateZ(0px)"
}

// Skill Bars Animation
function initializeSkillBars() {
  const skillBars = document.querySelectorAll(".skill-fill")

  const animateSkillBars = () => {
    skillBars.forEach((bar) => {
      const width = bar.getAttribute("data-width")
      bar.style.setProperty("--width", width)
      bar.style.width = width
    })
  }

  // Trigger animation when skills section is in view
  const skillsSection = document.getElementById("skills")
  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting && !skillAnimationTriggered) {
          animateSkillBars()
          skillAnimationTriggered = true
        }
      })
    },
    { threshold: 0.5 },
  )

  if (skillsSection) {
    observer.observe(skillsSection)
  }
}

// Timeline Markers
function initializeTimelineMarkers() {
  const markers = document.querySelectorAll(".timeline-marker")

  markers.forEach((marker) => {
    marker.addEventListener("click", function () {
      markers.forEach((m) => m.classList.remove("active"))
      this.classList.add("active")
    })
  })
}

// Particle Systems
function initializeParticleSystems() {
  createQuantumParticles()
  createAvatarParticles()
  createProjectParticles()
}

function createQuantumParticles() {
  const container = document.querySelector(".quantum-particles")
  if (!container) return

  for (let i = 0; i < 20; i++) {
    const particle = document.createElement("div")
    particle.className = "quantum-particle"
    particle.style.cssText = `
            position: absolute;
            width: 4px;
            height: 4px;
            background: ${Math.random() > 0.5 ? "#00ffff" : "#ff00ff"};
            border-radius: 50%;
            left: ${Math.random() * 100}%;
            top: ${Math.random() * 100}%;
            animation: quantumFloat ${8 + Math.random() * 4}s linear infinite;
            animation-delay: ${Math.random() * 8}s;
        `
    container.appendChild(particle)
  }
}

function createAvatarParticles() {
  const containers = document.querySelectorAll(".avatar-particles")

  containers.forEach((container) => {
    for (let i = 0; i < 10; i++) {
      const particle = document.createElement("div")
      particle.className = "avatar-particle"
      particle.style.cssText = `
                position: absolute;
                width: 3px;
                height: 3px;
                background: #00ffff;
                border-radius: 50%;
                animation: particleOrbit ${6 + Math.random() * 4}s linear infinite;
                animation-delay: ${Math.random() * 6}s;
            `
      container.appendChild(particle)
    }
  })
}

function createProjectParticles() {
  const projectCards = document.querySelectorAll(".project-card")

  projectCards.forEach((card) => {
    card.addEventListener("mouseenter", function () {
      createParticleBurst(this)
    })
  })
}

function createParticleBurst(element) {
  const rect = element.getBoundingClientRect()
  const centerX = rect.left + rect.width / 2
  const centerY = rect.top + rect.height / 2

  for (let i = 0; i < 15; i++) {
    const particle = document.createElement("div")
    particle.style.cssText = `
            position: fixed;
            width: 4px;
            height: 4px;
            background: ${Math.random() > 0.5 ? "#00ffff" : "#ff00ff"};
            border-radius: 50%;
            left: ${centerX}px;
            top: ${centerY}px;
            pointer-events: none;
            z-index: 1000;
        `

    document.body.appendChild(particle)

    const angle = (Math.PI * 2 * i) / 15
    const velocity = 2 + Math.random() * 3
    const vx = Math.cos(angle) * velocity
    const vy = Math.sin(angle) * velocity

    animateParticle(particle, vx, vy)
  }
}

function animateParticle(particle, vx, vy) {
  let x = 0
  let y = 0
  let opacity = 1

  const animate = () => {
    x += vx
    y += vy
    opacity -= 0.02

    particle.style.transform = `translate(${x}px, ${y}px)`
    particle.style.opacity = opacity

    if (opacity > 0) {
      requestAnimationFrame(animate)
    } else {
      particle.remove()
    }
  }

  animate()
}

// Scroll Effects
function setupScrollEffects() {
  // Parallax effects
  window.addEventListener("scroll", handleParallaxEffects)

  // Section animations on scroll
  const sections = document.querySelectorAll("section")
  const sectionObserver = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("animate-in")
          triggerSectionAnimations(entry.target)
        }
      })
    },
    { threshold: 0.1 },
  )

  sections.forEach((section) => {
    sectionObserver.observe(section)
  })
}

function handleParallaxEffects() {
  const scrolled = window.pageYOffset
  const parallaxElements = document.querySelectorAll(".parallax-bg")

  parallaxElements.forEach((element) => {
    const speed = 0.5
    element.style.transform = `translateY(${scrolled * speed}px)`
  })
}

function triggerSectionAnimations(section) {
  const sectionId = section.id

  switch (sectionId) {
    case "skills":
      animateSkillPlanets()
      break
    case "projects":
      animateProjectCards()
      break
    case "services":
      animateServiceWheel()
      break
    case "experience":
      animateExperienceCube()
      break
  }
}

function animateSkillPlanets() {
  const planets = document.querySelectorAll(".skill-planet")
  planets.forEach((planet, index) => {
    setTimeout(() => {
      planet.style.animation += `, planetAppear 0.5s ease-out`
    }, index * 200)
  })
}

function animateProjectCards() {
  const cards = document.querySelectorAll(".project-card")
  cards.forEach((card, index) => {
    setTimeout(() => {
      card.style.animation += `, cardSlideIn 0.8s ease-out`
    }, index * 300)
  })
}

function animateServiceWheel() {
  const serviceItems = document.querySelectorAll(".service-item")
  serviceItems.forEach((item, index) => {
    setTimeout(() => {
      item.style.animation += `, serviceSlideIn 0.6s ease-out`
    }, index * 200)
  })
}

function animateExperienceCube() {
  const cube = document.querySelector(".experience-cube")
  if (cube) {
    cube.style.animation += `, cubeIntro 1s ease-out`
  }
}

// Form Handling
function setupFormHandling() {
  const contactForm = document.getElementById("contactForm")
  const downloadBtn = document.getElementById("downloadBtn")

  if (contactForm) {
    contactForm.addEventListener("submit", handleFormSubmit)
  }

  if (downloadBtn) {
    downloadBtn.addEventListener("click", handleDownload)
  }
}

function handleFormSubmit(e) {
  e.preventDefault()

  const formData = new FormData(e.target)
  const name = formData.get("name") || document.getElementById("name").value
  const email = formData.get("email") || document.getElementById("email").value
  const message = formData.get("message") || document.getElementById("message").value

  // Simulate form submission
  showLoadingState()

  setTimeout(() => {
    hideLoadingState()
    showThankYouMessage()
    e.target.reset()
    createSubmissionParticles()
  }, 2000)
}

function showLoadingState() {
  const submitBtn = document.querySelector(".liquid-submit-btn")
  if (submitBtn) {
    submitBtn.innerHTML = '<span>Sending...</span><div class="liquid-fill"></div>'
    submitBtn.disabled = true
  }
}

function hideLoadingState() {
  const submitBtn = document.querySelector(".liquid-submit-btn")
  if (submitBtn) {
    submitBtn.innerHTML = '<span>Send Message</span><div class="liquid-fill"></div>'
    submitBtn.disabled = false
  }
}

function showThankYouMessage() {
  const thankYouMessage = document.getElementById("thankYouMessage")
  if (thankYouMessage) {
    thankYouMessage.classList.add("show")

    setTimeout(() => {
      thankYouMessage.classList.remove("show")
    }, 3000)
  }
}

function createSubmissionParticles() {
  const submitBtn = document.querySelector(".liquid-submit-btn")
  if (submitBtn) {
    const rect = submitBtn.getBoundingClientRect()
    const centerX = rect.left + rect.width / 2
    const centerY = rect.top + rect.height / 2

    for (let i = 0; i < 20; i++) {
      const particle = document.createElement("div")
      particle.style.cssText = `
                position: fixed;
                width: 6px;
                height: 6px;
                background: #00ffff;
                border-radius: 50%;
                left: ${centerX}px;
                top: ${centerY}px;
                pointer-events: none;
                z-index: 1000;
            `

      document.body.appendChild(particle)

      const angle = (Math.PI * 2 * i) / 20
      const velocity = 3 + Math.random() * 4
      const vx = Math.cos(angle) * velocity
      const vy = Math.sin(angle) * velocity

      animateParticle(particle, vx, vy)
    }
  }
}

function handleDownload() {
  // Create a simple text resume for download
  const resumeContent = `
JOHN DOE - FULL STACK DEVELOPER
================================

CONTACT INFORMATION
Email: john.doe@email.com
Phone: (555) 123-4567
LinkedIn: linkedin.com/in/johndoe
GitHub: github.com/johndoe

EXPERIENCE
==========
Senior Developer - Tech Corp (2021-Present)
• Led development of enterprise applications
• Mentored junior developers
• Implemented CI/CD pipelines

Full Stack Developer - StartupXYZ (2020-2021)
• Built scalable web applications
• Designed RESTful APIs
• Optimized database performance

EDUCATION
=========
Master of Computer Science - University of Technology (2018-2020)
Bachelor of Software Engineering - Tech Institute (2014-2018)

SKILLS
======
• Frontend: JavaScript, React, Vue.js, HTML5, CSS3
• Backend: Node.js, Python, PHP
• Databases: MongoDB, MySQL, PostgreSQL
• Tools: Git, Docker, AWS, CI/CD

CERTIFICATIONS
==============
• AWS Certified Developer (2021)
• Google Cloud Professional (2020)
    `

  const blob = new Blob([resumeContent], { type: "text/plain" })
  const url = window.URL.createObjectURL(blob)
  const a = document.createElement("a")
  a.href = url
  a.download = "John_Doe_Resume.txt"
  document.body.appendChild(a)
  a.click()
  document.body.removeChild(a)
  window.URL.revokeObjectURL(url)

  // Add glitch effect
  const btn = document.getElementById("downloadBtn")
  btn.classList.add("glitch-active")
  setTimeout(() => {
    btn.classList.remove("glitch-active")
  }, 500)
}

// Interactive Elements
function setupInteractiveElements() {
  // Skill planet interactions
  setupSkillPlanetInteractions()

  // Service card interactions
  setupServiceCardInteractions()

  // Timeline interactions
  setupTimelineInteractions()

  // Social icon interactions
  setupSocialIconInteractions()
}

function setupSkillPlanetInteractions() {
  const skillPlanets = document.querySelectorAll(".skill-planet")

  skillPlanets.forEach((planet) => {
    planet.addEventListener("click", function () {
      const skill = this.getAttribute("data-skill")
      showSkillDetails(skill, this)
    })
  })
}

function showSkillDetails(skill, element) {
  // Create a tooltip or modal showing skill details
  const tooltip = document.createElement("div")
  tooltip.className = "skill-tooltip"
  tooltip.innerHTML = `
        <h4>${skill}</h4>
        <p>Expert level proficiency with extensive project experience.</p>
    `
  tooltip.style.cssText = `
        position: absolute;
        background: rgba(0, 0, 0, 0.9);
        color: #00ffff;
        padding: 1rem;
        border-radius: 10px;
        border: 1px solid #00ffff;
        z-index: 1000;
        animation: tooltipFadeIn 0.3s ease-out;
    `

  const rect = element.getBoundingClientRect()
  tooltip.style.left = rect.left + "px"
  tooltip.style.top = rect.top - 80 + "px"

  document.body.appendChild(tooltip)

  setTimeout(() => {
    tooltip.remove()
  }, 3000)
}

function setupServiceCardInteractions() {
  const serviceCards = document.querySelectorAll(".liquid-card")

  serviceCards.forEach((card) => {
    card.addEventListener("click", function () {
      // Add selection effect
      serviceCards.forEach((c) => c.classList.remove("selected"))
      this.classList.add("selected")

      // Create particle burst
      createParticleBurst(this)
    })
  })
}

function setupTimelineInteractions() {
  const timelineMarkers = document.querySelectorAll(".timeline-marker")

  timelineMarkers.forEach((marker) => {
    marker.addEventListener("mouseenter", function () {
      this.style.transform = "translateY(-50%) scale(1.5)"
      this.style.boxShadow = "0 0 30px currentColor"
    })

    marker.addEventListener("mouseleave", function () {
      if (!this.classList.contains("active")) {
        this.style.transform = "translateY(-50%) scale(1)"
        this.style.boxShadow = "0 0 10px currentColor"
      }
    })
  })
}

function setupSocialIconInteractions() {
  const socialIcons = document.querySelectorAll(".social-icon")

  socialIcons.forEach((icon) => {
    icon.addEventListener("click", function (e) {
      e.preventDefault()

      // Add click effect
      this.style.transform = "translateY(-10px) scale(1.2)"

      setTimeout(() => {
        this.style.transform = "translateY(-10px) scale(1.1)"
      }, 150)

      // Create ripple effect
      createRippleEffect(this, e)
    })
  })
}

function createRippleEffect(element, event) {
  const ripple = document.createElement("div")
  const rect = element.getBoundingClientRect()
  const size = Math.max(rect.width, rect.height)
  const x = event.clientX - rect.left - size / 2
  const y = event.clientY - rect.top - size / 2

  ripple.style.cssText = `
        position: absolute;
        width: ${size}px;
        height: ${size}px;
        left: ${x}px;
        top: ${y}px;
        background: rgba(0, 255, 255, 0.3);
        border-radius: 50%;
        transform: scale(0);
        animation: ripple 0.6s ease-out;
        pointer-events: none;
    `

  element.appendChild(ripple)

  setTimeout(() => {
    ripple.remove()
  }, 600)
}

// Particle System
function createParticleSystem() {
  const canvas = document.createElement("canvas")
  canvas.id = "particle-canvas"
  canvas.style.cssText = `
        position: fixed;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        pointer-events: none;
        z-index: -1;
    `
  document.body.appendChild(canvas)

  const ctx = canvas.getContext("2d")

  function resizeCanvas() {
    canvas.width = window.innerWidth
    canvas.height = window.innerHeight
  }

  resizeCanvas()
  window.addEventListener("resize", resizeCanvas)

  // Create particles
  for (let i = 0; i < 50; i++) {
    particles.push({
      x: Math.random() * canvas.width,
      y: Math.random() * canvas.height,
      vx: (Math.random() - 0.5) * 0.5,
      vy: (Math.random() - 0.5) * 0.5,
      size: Math.random() * 2 + 1,
      color: Math.random() > 0.5 ? "#00ffff" : "#ff00ff",
      opacity: Math.random() * 0.5 + 0.2,
    })
  }

  function animateParticles() {
    ctx.clearRect(0, 0, canvas.width, canvas.height)

    particles.forEach((particle) => {
      particle.x += particle.vx
      particle.y += particle.vy

      if (particle.x < 0 || particle.x > canvas.width) particle.vx *= -1
      if (particle.y < 0 || particle.y > canvas.height) particle.vy *= -1

      ctx.beginPath()
      ctx.arc(particle.x, particle.y, particle.size, 0, Math.PI * 2)
      ctx.fillStyle = particle.color
      ctx.globalAlpha = particle.opacity
      ctx.fill()
    })

    requestAnimationFrame(animateParticles)
  }

  animateParticles()
}

// Device Orientation Effects (for mobile)
if (window.DeviceOrientationEvent) {
  window.addEventListener("deviceorientation", (e) => {
    const tiltX = e.beta // -180 to 180
    const tiltY = e.gamma // -90 to 90

    const parallaxElements = document.querySelectorAll(".holographic-card, .project-card")

    parallaxElements.forEach((element) => {
      const x = (tiltY / 90) * 10
      const y = (tiltX / 180) * 10

      element.style.transform += ` translate3d(${x}px, ${y}px, 0)`
    })
  })
}

// Performance optimization
function debounce(func, wait) {
  let timeout
  return function executedFunction(...args) {
    const later = () => {
      clearTimeout(timeout)
      func(...args)
    }
    clearTimeout(timeout)
    timeout = setTimeout(later, wait)
  }
}

// Optimized scroll handler
const optimizedScrollHandler = debounce(handleParallaxEffects, 16)
window.addEventListener("scroll", optimizedScrollHandler)

// Add CSS animations dynamically
const style = document.createElement("style")
style.textContent = `
    @keyframes planetAppear {
        0% { transform: scale(0) rotate(0deg); opacity: 0; }
        100% { transform: scale(1) rotate(360deg); opacity: 1; }
    }
    
    @keyframes cardSlideIn {
        0% { transform: translateY(50px) rotateX(-10deg); opacity: 0; }
        100% { transform: translateY(0) rotateX(0deg); opacity: 1; }
    }
    
    @keyframes serviceSlideIn {
        0% { transform: scale(0) rotate(-180deg); opacity: 0; }
        100% { transform: scale(1) rotate(0deg); opacity: 1; }
    }
    
    @keyframes cubeIntro {
        0% { transform: scale(0) rotateX(0deg) rotateY(0deg); opacity: 0; }
        100% { transform: scale(1) rotateX(0deg) rotateY(0deg); opacity: 1; }
    }
    
    @keyframes tooltipFadeIn {
        0% { opacity: 0; transform: translateY(10px); }
        100% { opacity: 1; transform: translateY(0); }
    }
    
    @keyframes ripple {
        0% { transform: scale(0); opacity: 1; }
        100% { transform: scale(2); opacity: 0; }
    }
    
    .glitch-active {
        animation: glitchEffect 0.5s ease-in-out !important;
    }
    
    .selected {
        transform: scale(1.1) !important;
        border-color: #ff00ff !important;
        box-shadow: 0 10px 30px rgba(255, 0, 255, 0.5) !important;
    }
`
document.head.appendChild(style)

console.log("🚀 Advanced Portfolio Loaded Successfully!")
