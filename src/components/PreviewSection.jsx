import React from "react";
import { generateHTML } from "../utils/generateHTML";

export default function PreviewSection({ portfolioData }) {
  const { name, about, skills, contacts, projects, profileImage } = portfolioData;

  const renderText = (text) =>
    text?.split("\n").map((line, idx) => <p key={idx}>{line}</p>);

  const copyContact = () => {
    navigator.clipboard.writeText(contacts);
    alert("Contact info copied!");
  };

  return (
    <div className="bg-gradient-to-br from-white via-indigo-50 to-indigo-100 rounded-3xl shadow-2xl p-8 text-gray-800 max-w-6xl mx-auto space-y-10 border border-indigo-200">
      
      {/* Profile Section */}
      <div className="flex flex-col md:flex-row items-center gap-8">
        {profileImage && (
          <img
            src={profileImage}
            alt="Profile"
            className="w-40 h-40 object-cover rounded-full shadow-md border border-indigo-200"
          />
        )}
        <div className="text-center md:text-left">
          <h2 className="text-4xl font-extrabold tracking-wide bg-gradient-to-r from-indigo-700 via-purple-600 to-pink-500 text-transparent bg-clip-text drop-shadow-md">
            Hi, I'm {name || "Your Name"}
          </h2>
          <p className="mt-2 text-gray-600">{renderText(about)}</p>
        </div>
      </div>

      {/* Skills Section */}
      <section>
        <h3 className="text-2xl font-semibold mb-2 bg-gradient-to-r from-indigo-600 to-purple-500 text-transparent bg-clip-text">
          Skills
        </h3>
        <div className="flex flex-wrap gap-3 text-sm">
          {skills?.split(",").map((skill, idx) => (
            <span key={idx} className="bg-indigo-100 text-indigo-700 px-3 py-1 rounded-full shadow-sm">
              {skill.trim()}
            </span>
          ))}
        </div>
      </section>

      {/* Projects Section */}
      <section>
        <h3 className="text-2xl font-semibold mb-4 bg-gradient-to-r from-indigo-600 to-purple-500 text-transparent bg-clip-text">
          Projects
        </h3>
        {projects.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {projects.map((project, idx) => (
              <div
                key={idx}
                className="bg-white/90 rounded-xl p-4 shadow-md hover:shadow-xl hover:scale-[1.02] transition-all border border-indigo-100"
              >
                <h4 className="font-bold text-lg text-indigo-700">{project.title}</h4>
                <div className="text-sm text-gray-600">{renderText(project.description)}</div>
                {project.image && (
                  <img
                    src={project.image}
                    alt={`Project ${idx + 1}`}
                    className="w-full h-40 object-cover rounded-lg border mt-2"
                  />
                )}
              </div>
            ))}
          </div>
        ) : (
          <p className="text-sm text-gray-500 italic">No projects added yet.</p>
        )}
      </section>

      {/* Contact Section */}
      <section>
        <h3 className="text-2xl font-semibold mb-2 bg-gradient-to-r from-indigo-600 to-purple-500 text-transparent bg-clip-text">
          Contact Me
        </h3>
        <div className="space-y-3">
            {portfolioData.contacts?.map((c,i) => (
                <div
                    key={i}
                    className="flex items-center justify-between bg-indigo-50 rounded-lg px-4 py-2 text gray-700 shadow">
                        <span className="truncate">
                            {c}
                        </span>
                        <button onClick={() => {
                            navigator.clipboard.writeText(c);
                            alert("Copied!");
                        }}
                        className="ml-4 px-3 py-1 text-sm text-white bg-indigo-500 rounded hover:bg-indigo-600 transition"
                        >
                            Copy
                        </button>
                </div>
            ))}
        </div>
      </section>

      {/* Actions */}
      <div className="flex flex-col sm:flex-row gap-4 justify-center pt-4">
        <button
          className="bg-gradient-to-r from-indigo-500 to-purple-500 text-white px-6 py-2 rounded-xl hover:brightness-110 transition shadow-md shadow-indigo-300"
          onClick={() => {
            const html = generateHTML(portfolioData);
            const blob = new Blob([html], { type: "text/html" });
            const url = URL.createObjectURL(blob);
            const a = document.createElement("a");
            a.href = url;
            a.download = "portfolio.html";
            a.click();
            URL.revokeObjectURL(url);
          }}
        >
          Download Portfolio Source Code
        </button>
        <button
          className="bg-white text-indigo-600 px-6 py-2 rounded-xl border border-indigo-600 hover:bg-indigo-50 hover:shadow transition shadow"
          onClick={() => {
            const html = generateHTML(portfolioData);
            const newWindow = window.open();
            newWindow.document.write(html);
            newWindow.document.close();
          }}
        >
          View in New Tab
        </button>
      </div>
    </div>
  );
}