// Project data
const projectData = {
  tforce: {
    title: "TForce CRM",
    description:
      "A comprehensive Customer Relationship Management system designed with 4 distinct user panels: Super Admin, Local Admin, Employees, and Salesperson. Features include real-time chat functionality, task management, and comprehensive reporting systems.",
    images: ["/placeholder.svg?height=400&width=600"],
    technologies: ["PHP", "MySQL", "JavaScript", "Bootstrap", "HTML5", "CSS3"],
    info: [
      { label: "Duration", value: "3 months" },
      { label: "Team Size", value: "2 developers" },
      { label: "Status", value: "Completed" },
      { label: "Client", value: "TForce Technologies" },
    ],
    liveLink: "#",
    codeLink: "#",
  },
  thagadoor: {
    title: "Thagadoor Bus App",
    description:
      "A real-time bus timing application that helps users view bus schedules based on their location and time. Includes advertisement integration and location-based search functionality.",
    images: ["/placeholder.svg?height=400&width=600"],
    technologies: ["HTML5", "CSS3", "JavaScript", "PHP", "MySQL"],
    info: [
      { label: "Duration", value: "2 months" },
      { label: "Team Size", value: "Solo project" },
      { label: "Status", value: "Live" },
      { label: "Users", value: "500+ active users" },
    ],
    liveLink: "#",
    codeLink: "#",
  },
  orgcrm: {
    title: "Organization Management CRM",
    description:
      "A comprehensive CRM system for task assignment and project tracking with separate panels for Admin, Developer, and Client roles. Features project management, time tracking, and client communication tools.",
    images: ["/placeholder.svg?height=400&width=600"],
    technologies: ["PHP", "MySQL", "Bootstrap", "JavaScript", "jQuery"],
    info: [
      { label: "Duration", value: "4 months" },
      { label: "Team Size", value: "3 developers" },
      { label: "Status", value: "Completed" },
      { label: "Features", value: "15+ modules" },
    ],
    liveLink: "#",
    codeLink: "#",
  },
  portfolio: {
    title: "Personal Portfolio",
    description:
      "A dynamic personal portfolio website with an admin management panel for updating skills, services, and projects. Features responsive design and modern animations.",
    images: ["/placeholder.svg?height=400&width=600"],
    technologies: ["HTML5", "CSS3", "JavaScript", "PHP", "MySQL"],
    info: [
      { label: "Duration", value: "1 month" },
      { label: "Team Size", value: "Solo project" },
      { label: "Status", value: "Live" },
      { label: "Type", value: "Personal Project" },
    ],
    liveLink: "#",
    codeLink: "#",
  },
}

// Card Rotation Function
function rotateCard(card) {
  card.classList.toggle("rotated")
  createCardParticles(card)
}

function createCardParticles(card) {
  const rect = card.getBoundingClientRect()
  const centerX = rect.left + rect.width / 2
  const centerY = rect.top + rect.height / 2

  for (let i = 0; i < 10; i++) {
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

    const angle = (Math.PI * 2 * i) / 10
    const velocity = 2 + Math.random() * 3
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

// Project Modal Functions
function openProjectModal(projectId) {
  const project = projectData[projectId]
  if (!project) return

  const modal = new window.bootstrap.Modal(document.getElementById("projectModal"))

  // Update modal content
  document.getElementById("modalTitle").textContent = project.title
  document.getElementById("modalMainImage").src = project.images[0]
  document.getElementById("modalDescription").textContent = project.description

  // Update project info
  const infoContainer = document.getElementById("modalInfo")
  infoContainer.innerHTML = project.info
    .map(
      (item) => `
        <div class="info-item">
            <strong>${item.label}:</strong> ${item.value}
        </div>
    `,
    )
    .join("")

  // Update technologies
  const techContainer = document.getElementById("modalTech")
  techContainer.innerHTML = project.technologies
    .map(
      (tech) => `
        <span class="tech-tag">${tech}</span>
    `,
    )
    .join("")

  // Update links
  document.getElementById("liveLink").href = project.liveLink
  document.getElementById("codeLink").href = project.codeLink

  modal.show()
}

// Project Filtering
function initializeProjectFiltering() {
  const filterButtons = document.querySelectorAll(".filter-btn")
  const projectCards = document.querySelectorAll(".project-card-wrapper")

  filterButtons.forEach((button) => {
    button.addEventListener("click", () => {
      const filter = button.getAttribute("data-filter")

      // Update active button
      filterButtons.forEach((btn) => btn.classList.remove("active"))
      button.classList.add("active")

      // Filter projects
      projectCards.forEach((card) => {
        const category = card.getAttribute("data-category")

        if (filter === "all" || category.includes(filter)) {
          card.style.display = "block"
          card.style.animation = "fadeInUp 0.5s ease-out"
        } else {
          card.style.display = "none"
        }
      })
    })
  })
}

// Initialize page
document.addEventListener("DOMContentLoaded", () => {
  initializeProjectFiltering()
  console.log("🚀 Projects Page with Enhanced Design Loaded Successfully!")
})
