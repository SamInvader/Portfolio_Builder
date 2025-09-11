export function generateHTML({ name, about, skills, contacts, projects, profileImage, theme }) {
  const skillBadges =
    skills?.split(",").map((s) => `<span class="badge">${s.trim()}</span>`).join(" ") || "";

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
            <p id="contact-${i}" class="contact-text">${c.replace(/\n/g, "<br>")}</p>
            <button id="copy-btn-${i}" class="copy-btn" onclick="copyContact(${i})">Copy</button>
          </div>`
          )
          .join("")
      : "<p class='empty-msg'>No contact info provided.</p>";

  // inline theme CSS
  const themeStyles = `
    <style>
      :root {
        --bg: #0d0d1a;
        --text: #e0f7fa;
        --card: #1a1a2e;
      }

      /* Aurora Theme */
      @keyframes aurora {
        0% { background-position: 0% 50%; }
        50% { background-position: 100% 50%; }
        100% { background-position: 0% 50%; }
      }
      [data-theme="aurora"] {
        --bg: #0d0d1a;
        --text: #e0f7fa;
        --card: #1a1a2e;
        background: linear-gradient(270deg, #00ffcc, #ff00ff, #00ccff);
        background-size: 600% 600%;
        animation: aurora 30s ease infinite;
      }

      /* Default Gradient Theme */
      @keyframes defaultAnim {
        0% { background-position: 0% 0%; }
        50% { background-position: 100% 100%; }
        100% { background-position: 0% 0%; }
      }
      [data-theme="default"] {
        --bg: linear-gradient(135deg, #a78bfa, #ffffff);
        --text: #3b0064;
        --card: #e0d7ff;
        background: linear-gradient(135deg, #a78bfa, #ffffff);
        background-size: 400% 400%;
        animation: defaultAnim 20s ease infinite;
      }

      body {
        font-family: 'Segoe UI', sans-serif;
        background: var(--bg);
        color: var(--text);
        padding: 2rem;
        max-width: 1000px;
        margin: auto;
        text-align: center;
      }
      .profile-container {
        display: flex;
        flex-direction: column;
        align-items: center;
        gap: 1.5rem;
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
      .profile-text p { line-height: 1.6; }
      h2 {
        font-size: 1.75rem;
        color: #4338ca;
        margin-top: 2.5rem;
      }
      .badge {
        display: inline-block;
        background: inherit; /* moving gradient */
        color: white;
        padding: 0.4em 0.8em;
        border-radius: 9999px;
        margin: 0.3em;
        font-size: 0.875rem;
        font-weight: 500;
        box-shadow: 0 2px 6px rgba(0,0,0,0.4);
      }
      .projects-grid {
        display: grid;
        grid-template-columns: repeat(auto-fit, minmax(220px, 1fr));
        gap: 1rem;
        margin-top: 1rem;
      }
      .project-card {
        background: inherit; /* moving gradient */
        border-radius: 1rem;
        padding: 1rem;
        box-shadow: 0 4px 10px rgba(0,0,0,0.4);
        color: white;
        text-align: left;
      }
      .project-card h4 {
        color: #fff;
        font-size: 1.25rem;
        margin-bottom: 0.5rem;
      }
      .project-image {
        width: 100%;
        max-height: 200px;
        object-fit: cover;
        border-radius: 0.5rem;
        margin-top: 0.5rem;
      }
      .empty-msg {
        color: #9ca3af;
        font-style: italic;
      }
      .contact-section { margin-top: 1rem; }
      .contact-item {
        display: flex;
        justify-content: space-between;
        align-items: center;
        background: inherit; /* moving gradient */
        padding: 0.75rem 1rem;
        border-radius: 0.75rem;
        margin-bottom: 1rem;
        box-shadow: 0 3px 8px rgba(0,0,0,0.5);
      }
      .contact-text {
        color: white;
        margin: 0;
      }
      .copy-btn {
        padding: 0.4rem 0.75rem;
        background: #4f46e5;
        color: white;
        border: none;
        border-radius: 6px;
        cursor: pointer;
        font-size: 0.875rem;
        flex-shrink: 0;
        transition: background 0.2s;
      }
      .copy-btn:hover { background: #4338ca; }
      @media (max-width: 600px) {
        body { padding: 1rem; }
      }
    </style>
  `;

  return `
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0"/>
  <title>${name}'s Portfolio</title>
  ${themeStyles}
</head>
<body data-theme="${theme || "default"}">
  <div class="profile-container">
    <img src="${profileImage || "https://via.placeholder.com/180"}" alt="Profile" class="profile-image" />
    <div class="profile-text">
      <h1>Hi, I'm ${name || "Your Name"}</h1>
      <p>${about?.replace(/\n/g, "<br>") || ""}</p>
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
      const btn = document.getElementById("copy-btn-" + index);
      navigator.clipboard.writeText(text).then(() => {
        const oldText = btn.innerText;
        btn.innerText = "Copied";
        btn.disabled = true;
        setTimeout(() => {
          btn.innerText = oldText;
          btn.disabled = false;
        }, 2000);
      });
    }
  </script>
</body>
</html>`;
}