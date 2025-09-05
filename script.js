/* ================================
   Typewriter Effect
==================================*/
const texts = ["AI Engineer", "Problem Solver", "Lifelong Learner"];
let count = 0, index = 0, currentText = "", letter = "";
(function type(){
  if(count === texts.length) count = 0;
  currentText = texts[count];
  letter = currentText.slice(0, ++index);
  document.querySelector(".typing").textContent = letter;
  if(letter.length === currentText.length){
    count++; index = 0;
    setTimeout(type, 1500);
  } else {
    setTimeout(type, 120);
  }
}());

/* ================================
   Neural Network Background
==================================*/
const canvas = document.getElementById("particles");
const ctx = canvas.getContext("2d");
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

let nodes = [];
const nodeCount = 80;
const maxDistance = 150;
let mouse = { x: null, y: null, radius: 200 };

for (let i = 0; i < nodeCount; i++) {
  nodes.push({
    x: Math.random() * canvas.width,
    y: Math.random() * canvas.height,
    vx: (Math.random() - 0.5) * 0.7,
    vy: (Math.random() - 0.5) * 0.7,
    radius: 2
  });
}

function drawNetwork() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);

  // connections
  for (let i = 0; i < nodes.length; i++) {
    for (let j = i + 1; j < nodes.length; j++) {
      let dx = nodes[i].x - nodes[j].x;
      let dy = nodes[i].y - nodes[j].y;
      let dist = Math.sqrt(dx * dx + dy * dy);

      if (dist < maxDistance) {
        ctx.beginPath();
        ctx.strokeStyle = `rgba(0, 255, 200, ${1 - dist / maxDistance})`;
        ctx.lineWidth = 1;
        ctx.moveTo(nodes[i].x, nodes[i].y);
        ctx.lineTo(nodes[j].x, nodes[j].y);
        ctx.stroke();
      }
    }
  }

  // nodes
  nodes.forEach(n => {
    ctx.beginPath();
    ctx.arc(n.x, n.y, n.radius, 0, Math.PI * 2);
    ctx.fillStyle = "#5eead4";
    ctx.shadowBlur = 10;
    ctx.shadowColor = "#00f5ff";
    ctx.fill();

    // movement
    n.x += n.vx;
    n.y += n.vy;

    // bounce from walls
    if (n.x < 0 || n.x > canvas.width) n.vx *= -1;
    if (n.y < 0 || n.y > canvas.height) n.vy *= -1;

    // mouse interaction (gravity effect)
    let dx = n.x - mouse.x;
    let dy = n.y - mouse.y;
    let dist = Math.sqrt(dx * dx + dy * dy);
    if (dist < mouse.radius) {
      n.x += dx / dist;
      n.y += dy / dist;
    }
  });

  requestAnimationFrame(drawNetwork);
}
drawNetwork();

window.addEventListener("resize", () => {
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;
});
window.addEventListener("mousemove", e => {
  mouse.x = e.x;
  mouse.y = e.y;
});

/* ================================
   Project Modals
==================================*/
const modal = document.getElementById("projectModal");
const modalTitle = document.getElementById("modalTitle");
const modalDesc = document.getElementById("modalDescription");
const modalStack = document.getElementById("modalStack");
const modalImg = document.getElementById("modalImage");
const modalLink = document.getElementById("modalLink");

const projectData = {
  attendance: {
    title: "Face Recognition Attendance System",
    desc: "A full-stack AI-powered attendance management platform designed for educational institutions and organizations. The system uses Python and OpenCV for real-time face detection and recognition, Flask for API services, and React.js for the frontend. Attendance is captured automatically every few seconds, logged with timestamps, and categorized as 'On-Time' or 'Delayed'. An intuitive admin dashboard allows bulk student/faculty data import via Excel, face dataset creation, training, manual editing, and export of attendance reports. This project demonstrates end-to-end integration of AI, backend APIs, and frontend systems, making it both scalable and production-ready.",
    stack: "Python, OpenCV, Flask, MongoDB, React.js, Node.js",
    link: "https://github.com/Mano309/Attendance-Management-System-Using-Face-Recognition"
  },
  inventory: {
    title: "Inventory Tracker",
    desc: "MERN-based tracker to manage stock, logs, and reports with Excel integration.",
    stack: "MongoDB, Express, React, Node.js",
    img: "assets/inventory.png",
    link: "https://github.com/Mano309"
  },
  summarizer: {
    title: "Document Summarizer",
    desc: "Transformer-based app with FastAPI backend for real-time text summarization.",
    stack: "Python, HuggingFace Transformers, FastAPI",
    img: "assets/summarizer.png",
    link: "https://github.com/Mano309/Automated-Book-Publication-Workflow"
  },
  mlops: {
    title: "MLOps Pipeline",
    desc: "End-to-end ML pipeline with Docker, CI/CD integration, and model monitoring.",
    stack: "Python, Docker, GitHub Actions, MLflow",
    img: "assets/mlops.png",
    link: "https://github.com/Mano309"
  }
};

function openModal(project){
  modal.style.display="flex";
  modalTitle.textContent=projectData[project].title;
  modalDesc.textContent=projectData[project].desc;
  modalStack.textContent=projectData[project].stack;
  modalImg.src=projectData[project].img;
  modalLink.href=projectData[project].link;
}
function closeModal(){ modal.style.display="none"; }

window.onclick = e => { if(e.target==modal) closeModal(); }
document.addEventListener("keydown", e => { if(e.key==="Escape") closeModal(); });

/* ================================
   Scroll Animations
==================================*/
const faders = document.querySelectorAll(".fade-in");
const appearOptions = { threshold: 0.3 };
const appearOnScroll = new IntersectionObserver((entries, observer)=>{
  entries.forEach(entry=>{
    if(entry.isIntersecting){
      entry.target.classList.add("visible");
      observer.unobserve(entry.target);
    }
  });
}, appearOptions);
faders.forEach(el=>appearOnScroll.observe(el));

/* ================================
   Theme Toggle
==================================*/
function toggleTheme(){
  document.body.classList.toggle("light");
  const toggleBtn = document.querySelector(".toggle");
  if(document.body.classList.contains("light")){
    toggleBtn.textContent = "☀️";
  } else {
    toggleBtn.textContent = "🌙";
  }
}
