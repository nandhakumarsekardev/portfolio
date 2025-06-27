// Card Rotation Function
function rotateCard(card) {
  card.classList.toggle("rotated")

  // Add rotation sound effect (optional)
  playRotationSound()

  // Add particle effect
  createCardParticles(card)
}

function createCardParticles(card) {
  const rect = card.getBoundingClientRect()
  const centerX = rect.left + rect.width / 2
  const centerY = rect.top + rect.height / 2

  for (let i = 0; i < 8; i++) {
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

    const angle = (Math.PI * 2 * i) / 8
    const velocity = 2 + Math.random() * 2
    const vx = Math.cos(angle) * velocity
    const vy = Math.sin(angle) * velocity

    animateCardParticle(particle, vx, vy)
  }
}

function animateCardParticle(particle, vx, vy) {
  let x = 0
  let y = 0
  let opacity = 1

  const animate = () => {
    x += vx
    y += vy
    opacity -= 0.03

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

function playRotationSound() {
  // Create audio context for sound effect
  if (typeof AudioContext !== "undefined") {
    const audioContext = new AudioContext()
    const oscillator = audioContext.createOscillator()
    const gainNode = audioContext.createGain()

    oscillator.connect(gainNode)
    gainNode.connect(audioContext.destination)

    oscillator.frequency.setValueAtTime(800, audioContext.currentTime)
    oscillator.frequency.exponentialRampToValueAtTime(400, audioContext.currentTime + 0.1)

    gainNode.gain.setValueAtTime(0.1, audioContext.currentTime)
    gainNode.gain.exponentialRampToValueAtTime(0.01, audioContext.currentTime + 0.1)

    oscillator.start(audioContext.currentTime)
    oscillator.stop(audioContext.currentTime + 0.1)
  }
}

// Initialize page
document.addEventListener("DOMContentLoaded", () => {
  console.log("📋 About Page with Card Rotation Loaded Successfully!")
})
