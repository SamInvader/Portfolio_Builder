import React, { useEffect, useState } from "react";
import { generateHTML } from "../utils/generateHTML";
import { downloadPortfolio } from "../utils/downloadPortfolio";

export default function PreviewSection({ portfolioData, goBack, theme }) {
  const { name, about, skills, contacts, projects, profileImage } = portfolioData;

  const renderText = (text) =>
    text?.split("\n").map((line, idx) => <p key={idx}>{line}</p>);

  return (
    <div className="relative w-full max-w-6xl">
        {/* Back Button */}
        <div className="flex justify-center mt-6">
          <button
            onClick={goBack}
            className="mt-4 px-6 py-3 border border-border bg-primary text-primary-foreground font-semibold rounded-xl hover:bg-primary/90 transition"
          >
            Back To Edit
          </button>
        </div>
      {/* Main Card (Theme applied here) */}
      <div
        data-theme={theme}
        className="relative z-10 bg-card rounded-3xl shadow-2xl p-8 text-text max-w-6xl mx-auto space-y-10 border border-border"
      >
        {/* Profile */}
        <div className="flex flex-col md:flex-row items-center gap-8">
          {profileImage && (
            <img
              src={profileImage}
              alt="Profile"
              className="w-40 h-40 object-cover rounded-full shadow-md border border-border"
            />
          )}

          <div className="text-center md:text-left space-y-2">
            <h2 className="text-4xl font-extrabold tracking-wide text-gradient">
              Hi, I'm {name || "Your Name"}
            </h2>
            <div className="text-muted">{renderText(about)}</div>
          </div>
        </div>

        {/* Skills */}
        <section>
          <h3 className="text-2xl font-semibold mb-2 text-gradient">Skills</h3>
          <div className="flex flex-wrap gap-3 text-sm mt-2">
            {skills
              ?.split(",")
              .filter((s) => s.trim())
              .map((skill, idx) => (
                <span
                  key={idx}
                  className="bg-subtle text-accent px-3 py-1 rounded-full shadow-md hover:shadow-lg transition"
                >
                  {skill.trim()}
                </span>
              ))}
          </div>
        </section>

        {/* Projects */}
        <section>
          <h3 className="text-2xl font-semibold mb-4 text-gradient">Projects</h3>
          {projects.length > 0 ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
              {projects.map((project, idx) => (
                <div
                  key={idx}
                  className="bg-subtle rounded-xl p-4 shadow-md hover:shadow-xl hover:scale-[1.02] transition-all border border-border"
                >
                  <h4 className="font-bold text-lg text-accent">
                    {project.title}
                  </h4>
                  <div className="text-sm text-muted">
                    {renderText(project.description)}
                  </div>
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
            <p className="text-sm text-muted italic">No projects added yet.</p>
          )}
        </section>

        {/* Contacts */}
        <section>
          <h3 className="text-2xl font-semibold mb-2 text-gradient">
            Contact Me
          </h3>
          <div className="space-y-3">
            {contacts?.map((c, i) => (
              <div
                key={i}
                className="flex items-center justify-between bg-subtle rounded-lg px-4 py-2 text-text shadow"
              >
                <span className="truncate">{c}</span>
                <button
                  onClick={(e) => {
                    navigator.clipboard.writeText(c);
                    e.target.textContent = "Copied!";
                    setTimeout(() => (e.target.textContent = "Copy"), 1500);
                  }}
                  className="ml-4 px-3 py-1 text-sm text-white bg-accent rounded hover:bg-accentHover transition"
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
            className="mt-4 px-6 py-3 border border-border bg-primary text-primary-foreground font-semibold rounded-xl shadow-md hover:shadow-xl hover:bg-primary/90 transition"
            onClick={() => downloadPortfolio({portfolioData, theme})}
          >
            Download Portfolio Source Code
          </button>
          <button
            className="mt-4 px-6 py-3 border border-border bg-primary text-primary-foreground font-semibold rounded-xl shadow-md hover:shadow-xl hover:bg-primary/90 transition"
            onClick={() => {
              const html = generateHTML({...portfolioData, theme:theme});
              const newWindow = window.open();
              newWindow.document.write(html);
              newWindow.document.close();
            }}
          >
            View in New Tab
          </button>
        </div>
      </div>
    </div>
  );
}