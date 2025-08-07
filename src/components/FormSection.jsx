import React from "react";

function FormSection({ portfolioData, setPortfolioData }) {
  const handleChange = (e) => {
    const { name, value } = e.target;
    setPortfolioData({ ...portfolioData, [name]: value });
  };

  const handleProjectChange = (index, field, value) => {
    const updatedProjects = [...portfolioData.projects];
    updatedProjects[index][field] = value;
    setPortfolioData({ ...portfolioData, projects: updatedProjects });
  };

  const handleContactChange = (index, value) => {
    const updatedContacts = [...portfolioData.contacts];
    updatedContacts[index] = value;
    setPortfolioData({ ...portfolioData, contacts: updatedContacts });
  };

  const addContact = () => {
    setPortfolioData({ ...portfolioData, contacts: [...portfolioData.contacts, ""] });
  };

  const addProject = () => {
    setPortfolioData({
      ...portfolioData,
      projects: [...portfolioData.projects, { title: "", description: "", image: null }],
    });
  };

  const handleProfileImage = (e) => {
    const file = e.target.files[0];
    if (!file) return;
    try {
      const imageURL = URL.createObjectURL(file);
      setPortfolioData({ ...portfolioData, profileImage: imageURL });
    } catch (err) {
      console.error("Error loading profile image:", err);
    }
  };

  const removeProject = (index) => {
    const updated = [...portfolioData.projects];
    updated.splice(index, 1);
    setPortfolioData({...portfolioData, projects: updated})
  };

  const removeContact = (index) => {
    const updated = [...portfolioData.contacts];
    updated.splice(index, 1);
    setPortfolioData({...portfolioData, contacts:updated})
  }

  return (
    <div className="bg-white rounded-2xl shadow-lg p-6 space-y-4">
      <h2 className="text-2xl font-semibold text-indigo-500">Your Details</h2>

      <input
        type="file"
        accept="image/*"
        onChange={handleProfileImage}
        className="border-2 border-dashed border-gray-400 p-4 rounded-xl bg-white text-center cursor-pointer hover:bg-gray-100 transition-all duration-200 hover:scale-105
              file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-blue-50 file:text-blue-700 hover:file:bg-blue-100"
      />

      <input
        type="text"
        name="name"
        placeholder="Your Name"
        value={portfolioData.name}
        onChange={handleChange}
        className="w-full px-4 py-2 border rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-300"
      />

      <textarea
        name="about"
        placeholder="About You"
        value={portfolioData.about}
        onChange={handleChange}
        className="w-full px-4 py-2 border rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-300"
        rows={4}
      />

      <textarea
        name="skills"
        placeholder="Your Skills (e.g. React, Tailwind, JS)"
        value={portfolioData.skills}
        onChange={handleChange}
        className="w-full px-4 py-2 border rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-300"
        rows={2}
      />

      <div className="pt-4 space-y-2">
        <h3 className="text-xl font-semibold text-indigo-500">Contact Info</h3>
        {portfolioData.contacts.map((contact, index) => (
          <div className="space-y-2 mb-4 p-4 bg-slate-100 rounded-xl">
            <input
              key={index}
              type="text"
              placeholder="Contact Info"
              value={contact}
              onChange={(e) => handleContactChange(index, e.target.value)}
              className="w-full px-4 py-2 border rounded-xl"
            />
            <button
              className="px-4 py-2 bg-red-500 text-white rounded-xl hover:bg-indigo-600 transition"
              onClick={() => removeContact(index)}
            >
              Remove
            </button>
          </div>
        ))}
        <button
          type="button"
          onClick={addContact}
          className="px-4 py-2 bg-indigo-500 text-white rounded-xl hover:bg-indigo-600 transition"
        >
          + Add Contact
        </button>
      </div>

      <div className="pt-4">
        <h3 className="text-xl font-semibold text-indigo-500 mb-2">Projects</h3>
        {(portfolioData.projects || []).map((project, index) => (
          <div key={index} className="space-y-2 mb-4 p-4 bg-slate-100 rounded-xl">
            <input
              type="text"
              placeholder="Project Title"
              value={project.title}
              onChange={(e) => handleProjectChange(index, "title", e.target.value)}
              className="w-full px-3 py-2 border rounded-md"
            />

            <textarea
              placeholder="Project Description"
              value={project.description}
              onChange={(e) => handleProjectChange(index, "description", e.target.value)}
              className="w-full px-3 py-2 border rounded-md"
              rows={3}
            />

            <input
              type="file"
              accept="file/*"
              onChange={(e) => {
                const file = e.target.files[0];
                if (!file) return;
                try {
                  const imageURL = URL.createObjectURL(file);
                  const updatedProjects = [...portfolioData.projects];
                  updatedProjects[index].image = imageURL;
                  setPortfolioData({ ...portfolioData, projects: updatedProjects });
                } catch (err) {
                  console.error("Error loading file:", err);
                }
              }}
              className="border-2 border-dashed border-gray-400 p-4 rounded-xl bg-white text-center cursor-pointer hover:bg-gray-100 transition-all duration-200 hover:scale-105
              file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-blue-50 file:text-blue-700 hover:file:bg-blue-100"
              />
              <p className="text-sm text-gray-500 mt-2">Click or drag to upload file</p>
              <button
                className="mt-2 px-4 py-2 text-white bg-red-500 rounded-xl hover:bg-red-600 transition"
                onClick={() => removeProject(index)}
              >
                Remove Project
              </button>
          </div>
        ))}
        <button
          type="button"
          onClick={addProject}
          className="mt-2 px-4 py-2 text-white bg-indigo-500 rounded-xl hover:bg-indigo-600 transition"
        >
          + Add Project
        </button>
      </div>
    </div>
  );
}

export default FormSection;