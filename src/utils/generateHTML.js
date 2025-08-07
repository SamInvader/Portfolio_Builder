export function generateHTML({ name, about, skills, contacts, projects, profileImage }) {
  const skillBadges = skills
    ?.split(",")
    .map((s) => `<span class="badge">${s.trim()}</span>`)
    .join(" ") || "";

  const projectsHTML =
    projects.length > 0
      ? projects
          .map(
            (p) => `
        <div class="project-card">
          <h4>${p.title}</h4>
          <p>${p.description?.replace(/\n/g, "<br>")}</p>
          ${
            p.image
              ? `<img src="${p.image}" alt="${p.title}" class="project-image"/>`
              : ""
          }
        </div>`
          )
          .join("")
      : "<p class='empty-msg'>No projects added yet.</p>";

  const contactHTML =
    contacts.length > 0
      ? contacts
          .map(
            (c, i) => `
          <div class="contact-item">
            <p id="contact-${i}">${c.replace(/\n/g, "<br>")}</p>
            <button class="copy-btn" onclick="copyContact(${i})">Copy</button>
          </div>`
          )
          .join("")
      : "<p class='empty-msg'>No contact info provided.</p>";

  return `
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0"/>
  <title>${name}'s Portfolio</title>
  <style>
    body {
      font-family: 'Segoe UI', sans-serif;
      background: linear-gradient(135deg, #f0f4ff, #ffffff);
      color: #1f2937;
      padding: 2rem;
      max-width: 1000px;
      margin: auto;
    }
    .profile-container {
      display: flex;
      align-items: center;
      gap: 2rem;
      flex-wrap: wrap;
    }
    .profile-image {
      width: 180px;
      height: 180px;
      object-fit: cover;
      border-radius: 50%;
      border: 4px solid #4f46e5;
    }
    .profile-text h1 {
      font-size: 2.5rem;
      font-weight: 800;
      color: #4f46e5;
      margin-bottom: 0.5rem;
    }
    .profile-text p {
      line-height: 1.6;
    }
    h2 {
      font-size: 1.75rem;
      color: #4338ca;
      margin-top: 2.5rem;
    }
    .badge {
      display: inline-block;
      background: #eef2ff;
      color: #4338ca;
      padding: 0.4em 0.8em;
      border-radius: 9999px;
      margin: 0.3em;
      font-size: 0.875rem;
      font-weight: 500;
    }
    .projects-grid {
      display: grid;
      grid-template-columns: repeat(auto-fit, minmax(220px, 1fr));
      gap: 1rem;
      margin-top: 1rem;
    }
    .project-card {
      background: #fff;
      border: 1px solid #e0e7ff;
      border-radius: 1rem;
      padding: 1rem;
      box-shadow: 0 4px 10px rgba(0,0,0,0.03);
    }
    .project-card h4 {
      color: #4f46e5;
      font-size: 1.25rem;
      margin-bottom: 0.5rem;
    }
    .project-image {
      width: 100%;
      max-height: 200px;
      object-fit: cover;
      border-radius: 0.5rem;
      margin-top: 0.5rem;
      border: 1px solid #e5e7eb;
    }
    .empty-msg {
      color: #9ca3af;
      font-style: italic;
    }
    .contact-section {
      margin-top: 1rem;
    }
    .contact-item {
      background: #f9fafb;
      border: 1px solid #e5e7eb;
      padding: 1rem;
      border-radius: 0.75rem;
      margin-bottom: 1rem;
    }
    .copy-btn {
      margin-top: 0.5rem;
      padding: 0.4rem 0.75rem;
      background: #4f46e5;
      color: white;
      border: none;
      border-radius: 6px;
      cursor: pointer;
      font-size: 0.875rem;
    }
    .copy-btn:hover {
      background: #4338ca;
    }
    @media (max-width: 600px) {
      body { padding: 1rem; }
    }
  </style>
</head>
<body>
  <div class="profile-container">
    <img src="${profileImage || "https://via.placeholder.com/180"}" alt="Profile" class="profile-image" />
    <div class="profile-text">
      <h1>Hi, I'm ${name || "Your Name"}</h1>
      <p>${about?.replace(/\n/g, "<br>") || "Tell us about yourself."}</p>
    </div>
  </div>

  <h2>Skills</h2>
  <div>${skillBadges}</div>

  <h2>Projects</h2>
  <div class="projects-grid">
    ${projectsHTML}
  </div>

  <h2>Contact</h2>
  <div class="contact-section">
    ${contactHTML}
  </div>

  <script>
    function copyContact(index) {
      const text = document.getElementById("contact-" + index).innerText;
      navigator.clipboard.writeText(text).then(() => {
        alert("Contact copied!");
      });
    }
  </script>
</body>
</html>`;
}