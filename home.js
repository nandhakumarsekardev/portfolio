// Global Variables
const robotMessages = [
  "Hi! I'm NS Bot. Click me to interact!",
  "Welcome to Nandhakumar's portfolio!",
  "I love coding and creating amazing things!",
  "Want to see some cool projects?",
  "Let's build something awesome together!",
  "I'm always learning new technologies!",
  "Check out my skills and experience!",
  "Ready to connect and collaborate?",
]

let currentMessageIndex = 0
let typingInterval
let isRobotActive = false

// Typing Animation for Hero Title
const titles = ["Web Developer", "Full-Stack Developer", "Problem Solver", "Tech Enthusiast", "Creative Coder"]

let titleIndex = 0
let charIndex = 0
let isDeleting = false

// Initialize everything when DOM is loaded
document.addEventListener("DOMContentLoaded", () => {
  initializeTypingAnimation()
  initializeRobotInteractions()
  initializeTechIcons()
  initializeScrollEffects()
  createStarField()

  // Add mouse tracking for robot eyes
  document.addEventListener("mousemove", trackMouse)
})

// Typing Animation for Hero Title
function initializeTypingAnimation() {
  const typingElement = document.getElementById("typingText")
  if (!typingElement) return

  function typeText() {
    const currentTitle = titles[titleIndex]

    if (isDeleting) {
      typingElement.textContent = currentTitle.substring(0, charIndex - 1)
      charIndex--
    } else {
      typingElement.textContent = currentTitle.substring(0, charIndex + 1)
      charIndex++
    }

    let typeSpeed = isDeleting ? 50 : 100

    if (!isDeleting && charIndex === currentTitle.length) {
      typeSpeed = 2000 // Pause at end
      isDeleting = true
    } else if (isDeleting && charIndex === 0) {
      isDeleting = false
      titleIndex = (titleIndex + 1) % titles.length
      typeSpeed = 500 // Pause before next word
    }

    setTimeout(typeText, typeSpeed)
  }

  typeText()
}

// Robot Interactions
function initializeRobotInteractions() {
  const robotContainer = document.getElementById("robotContainer")
  const speechBubble = document.getElementById("speechBubble")
  const powerButton = document.getElementById("powerButton")
  const robotMessage = document.getElementById("robotMessage")

  if (!robotContainer) return

  // Robot click interaction
  robotContainer.addEventListener("click", () => {
    handleRobotClick()
  })

  // Power button interaction
  if (powerButton) {
    powerButton.addEventListener("click", (e) => {
      e.stopPropagation()
      toggleRobotPower()
    })
  }

  // Auto-show speech bubble initially
  setTimeout(() => {
    showSpeechBubble()
  }, 2000)

  // Hide speech bubble after some time
  setTimeout(() => {
    hideSpeechBubble()
  }, 5000)
}

function handleRobotClick() {
  const robotContainer = document.getElementById("robotContainer")
  const speechBubble = document.getElementById("speechBubble")

  // Add click animation
  robotContainer.style.transform = "scale(0.95)"
  setTimeout(() => {
    robotContainer.style.transform = ""
  }, 150)

  // Change robot message
  currentMessageIndex = (currentMessageIndex + 1) % robotMessages.length
  updateRobotMessage(robotMessages[currentMessageIndex])

  // Show speech bubble
  showSpeechBubble()

  // Create particle effect
  createRobotParticles()

  // Change robot expression
  animateRobotExpression()

  // Hide speech bubble after 3 seconds
  setTimeout(() => {
    hideSpeechBubble()
  }, 3000)
}

function updateRobotMessage(message) {
  const robotMessage = document.getElementById("robotMessage")
  if (!robotMessage) return

  // Clear existing text
  robotMessage.textContent = ""

  // Type out new message
  let charIndex = 0
  const typeMessage = () => {
    if (charIndex < message.length) {
      robotMessage.textContent += message.charAt(charIndex)
      charIndex++
      setTimeout(typeMessage, 50)
    }
  }

  typeMessage()
}

function showSpeechBubble() {
  const speechBubble = document.getElementById("speechBubble")
  if (speechBubble) {
    speechBubble.classList.add("show")
  }
}

function hideSpeechBubble() {
  const speechBubble = document.getElementById("speechBubble")
  if (speechBubble) {
    speechBubble.classList.remove("show")
  }
}

function toggleRobotPower() {
  isRobotActive = !isRobotActive
  const statusLights = document.querySelectorAll(".status-light")

  statusLights.forEach((light) => light.classList.remove("active"))

  if (isRobotActive) {
    statusLights[2].classList.add("active") // Green light
    updateRobotMessage("System activated! Ready to assist!")
    showSpeechBubble()
  } else {
    statusLights[0].classList.add("active") // Red light
    updateRobotMessage("System deactivated. Click power to reactivate!")
    showSpeechBubble()
  }

  setTimeout(hideSpeechBubble, 2000)
}

function createRobotParticles() {
  const robotContainer = document.getElementById("robotContainer")
  if (!robotContainer) return

  const rect = robotContainer.getBoundingClientRect()
  const centerX = rect.left + rect.width / 2
  const centerY = rect.top + rect.height / 2

  for (let i = 0; i < 12; i++) {
    const particle = document.createElement("div")
    particle.style.cssText = `
            position: fixed;
            width: 6px;
            height: 6px;
            background: ${Math.random() > 0.5 ? "#00ffff" : "#ff00ff"};
            border-radius: 50%;
            left: ${centerX}px;
            top: ${centerY}px;
            pointer-events: none;
            z-index: 1000;
        `

    document.body.appendChild(particle)

    const angle = (Math.PI * 2 * i) / 12
    const velocity = 3 + Math.random() * 2
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

function animateRobotExpression() {
  const eyes = document.querySelectorAll(".eye")
  const mouth = document.querySelector(".robot-mouth")

  // Blink animation
  eyes.forEach((eye) => {
    eye.style.transform = "scaleY(0.1)"
    setTimeout(() => {
      eye.style.transform = "scaleY(1)"
    }, 200)
  })

  // Mouth animation
  if (mouth) {
    mouth.style.borderRadius = "15px 15px 0 0"
    setTimeout(() => {
      mouth.style.borderRadius = "0 0 15px 15px"
    }, 500)
  }
}

// Mouse tracking for robot eyes
function trackMouse(e) {
  const pupils = document.querySelectorAll(".pupil")

  pupils.forEach((pupil) => {
    const eye = pupil.parentElement
    const eyeRect = eye.getBoundingClientRect()
    const eyeCenterX = eyeRect.left + eyeRect.width / 2
    const eyeCenterY = eyeRect.top + eyeRect.height / 2

    const angle = Math.atan2(e.clientY - eyeCenterY, e.clientX - eyeCenterX)
    const distance = Math.min(6, Math.hypot(e.clientX - eyeCenterX, e.clientY - eyeCenterY) / 10)

    const pupilX = Math.cos(angle) * distance
    const pupilY = Math.sin(angle) * distance

    pupil.style.transform = `translate(calc(-50% + ${pupilX}px), calc(-50% + ${pupilY}px))`
  })
}

// Tech Icons Interactions
function initializeTechIcons() {
  const techIcons = document.querySelectorAll(".tech-icon")

  techIcons.forEach((icon) => {
    icon.addEventListener("click", function () {
      const tech = this.getAttribute("data-tech")
      showTechInfo(tech, this)
    })

    icon.addEventListener("mouseenter", function () {
      this.style.animationPlayState = "paused"
    })

    icon.addEventListener("mouseleave", function () {
      this.style.animationPlayState = "running"
    })
  })
}

function showTechInfo(tech, element) {
  const techInfo = {
    HTML5: "The standard markup language for creating web pages",
    CSS3: "Style sheet language for describing presentation of documents",
    JavaScript: "Programming language that enables interactive web pages",
    PHP: "Server-side scripting language for web development",
  }

  // Create tooltip
  const tooltip = document.createElement("div")
  tooltip.className = "tech-tooltip"
  tooltip.innerHTML = `
        <h4>${tech}</h4>
        <p>${techInfo[tech] || "A powerful technology for web development"}</p>
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
        max-width: 200px;
        font-size: 0.9rem;
    `

  const rect = element.getBoundingClientRect()
  tooltip.style.left = rect.left + "px"
  tooltip.style.top = rect.top - 80 + "px"

  document.body.appendChild(tooltip)

  // Remove tooltip after 3 seconds
  setTimeout(() => {
    tooltip.remove()
  }, 3000)

  // Add click effect
  element.style.transform = "scale(1.3)"
  setTimeout(() => {
    element.style.transform = ""
  }, 200)
}

// Scroll Effects
function initializeScrollEffects() {
  const scrollIndicator = document.querySelector(".scroll-indicator")

  if (scrollIndicator) {
    scrollIndicator.addEventListener("click", () => {
      // Scroll to next section (about page)
      window.location.href = "about.html"
    })
  }

  // Parallax effect for floating elements
  window.addEventListener("scroll", () => {
    const scrolled = window.pageYOffset
    const parallaxElements = document.querySelectorAll(".floating-code .code-snippet")

    parallaxElements.forEach((element, index) => {
      const speed = 0.5 + index * 0.1
      element.style.transform = `translateY(${scrolled * speed}px)`
    })
  })
}

// Create additional star field
function createStarField() {
  const starsContainer = document.querySelector(".stars")
  if (!starsContainer) return

  // Add more dynamic stars
  for (let i = 0; i < 50; i++) {
    const star = document.createElement("div")
    star.style.cssText = `
            position: absolute;
            width: ${Math.random() * 3 + 1}px;
            height: ${Math.random() * 3 + 1}px;
            background: ${Math.random() > 0.5 ? "#00ffff" : "#ffffff"};
            border-radius: 50%;
            left: ${Math.random() * 100}%;
            top: ${Math.random() * 100}%;
            animation: starTwinkle ${2 + Math.random() * 3}s ease-in-out infinite;
            animation-delay: ${Math.random() * 2}s;
        `

    starsContainer.appendChild(star)
  }
}

// Add CSS for additional animations
const additionalStyles = document.createElement("style")
additionalStyles.textContent = `
    @keyframes tooltipFadeIn {
        0% { opacity: 0; transform: translateY(10px); }
        100% { opacity: 1; transform: translateY(0); }
    }
    
    @keyframes starTwinkle {
        0%, 100% { opacity: 0.3; transform: scale(1); }
        50% { opacity: 1; transform: scale(1.2); }
    }
    
    .tech-tooltip h4 {
        color: #00ffff;
        font-family: "Orbitron", monospace;
        margin-bottom: 0.5rem;
        font-size: 1rem;
    }
    
    .tech-tooltip p {
        color: rgba(255, 255, 255, 0.8);
        margin: 0;
        line-height: 1.4;
    }
`

document.head.appendChild(additionalStyles)

console.log("🤖 Advanced Home Page with Interactive Robot Loaded Successfully!")
