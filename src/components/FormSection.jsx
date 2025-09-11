import React from "react";

function FormSection({ portfolioData, setPortfolioData, goToPreview }) {
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
    setPortfolioData({
      ...portfolioData,
      contacts: [...portfolioData.contacts, ""],
    });
  };

  const addProject = () => {
    setPortfolioData({
      ...portfolioData,
      projects: [
        ...portfolioData.projects,
        { title: "", description: "", image: null, imageName: "" },
      ],
    });
  };

  const handleProfileImage = (e) => {
    const file = e.target.files[0];
    if (!file) return;
    try {
      const imageURL = URL.createObjectURL(file);
      setPortfolioData({
        ...portfolioData,
        profileImage: imageURL,
        profileImageName: file.name,
      });
    } catch (err) {
      console.error("Error loading profile image:", err);
    }
  };

  const removeProject = (index) => {
    const updated = [...portfolioData.projects];
    updated.splice(index, 1);
    setPortfolioData({ ...portfolioData, projects: updated });
  };

  const removeContact = (index) => {
    const updated = [...portfolioData.contacts];
    updated.splice(index, 1);
    setPortfolioData({ ...portfolioData, contacts: updated });
  };

  return (
    <>
      <div className="rounded-2xl shadow-lg p-6 space-y-6 border border-gray-300 bg-gradient-to-br from-purple-300 to-white">
        <h2 className="text-2xl font-bold text-purple-700">Your Details</h2>

        {/* Profile Image */}
        <label className="flex flex-col items-center justify-center w-full border-2 border-dashed border-gray-400 rounded-xl bg-white p-6 cursor-pointer hover:bg-purple-50 transition hover:scale-105">
          <span className="mb-2 text-sm text-gray-600">
            Upload Profile Image
          </span>
          <input
            type="file"
            accept="image/*"
            onChange={handleProfileImage}
            className="hidden"
          />
          {portfolioData.profileImage && (
            <div className="mt-3 flex flex-col items-center">
              <img
                src={portfolioData.profileImage}
                alt="Profile Preview"
                className="w-24 h-24 rounded-full object-cover border"
              />
              <p className="text-xs text-gray-500 mt-1">
                {portfolioData.profileImageName}
              </p>
            </div>
          )}
        </label>

        {/* Name */}
        <input
          type="text"
          name="name"
          placeholder="Your Name"
          value={portfolioData.name}
          onChange={handleChange}
          className="w-full px-4 py-2 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-purple-400 bg-white text-gray-900"
        />

        {/* About */}
        <textarea
          name="about"
          placeholder="About You"
          value={portfolioData.about}
          onChange={handleChange}
          className="w-full px-4 py-2 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-purple-400 bg-white text-gray-900"
          rows={4}
        />

        {/* Skills */}
        <textarea
          name="skills"
          placeholder="Your Skills (e.g. React, Tailwind, JS)"
          value={portfolioData.skills}
          onChange={handleChange}
          className="w-full px-4 py-2 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-purple-400 bg-white text-gray-900"
          rows={2}
        />

        {/* Contacts */}
        <div className="pt-4 space-y-3">
          <h3 className="text-xl font-semibold text-purple-700">Contact Info</h3>
          {portfolioData.contacts.map((contact, index) => (
            <div
              key={index}
              className="space-y-2 mb-4 p-4 bg-white rounded-xl border border-gray-300"
            >
              <input
                type="text"
                placeholder="Contact Info"
                value={contact}
                onChange={(e) => handleContactChange(index, e.target.value)}
                className="w-full px-4 py-2 border border-gray-300 rounded-xl bg-white text-gray-900"
              />
              <button
                className="w-full px-4 py-2 bg-red-500 text-white rounded-xl hover:bg-red-600 transition"
                onClick={() => removeContact(index)}
              >
                Remove
              </button>
            </div>
          ))}
          <button
            type="button"
            onClick={addContact}
            className="w-full px-4 py-2 bg-purple-500 text-white rounded-xl hover:bg-purple-600 transition"
          >
            + Add Contact
          </button>
        </div>

        {/* Projects */}
        <div className="pt-4 space-y-3">
          <h3 className="text-xl font-semibold text-purple-700">Projects</h3>
          {(portfolioData.projects || []).map((project, index) => (
            <div
              key={index}
              className="space-y-2 mb-4 p-4 bg-white rounded-xl border border-gray-300"
            >
              <input
                type="text"
                placeholder="Project Title"
                value={project.title}
                onChange={(e) =>
                  handleProjectChange(index, "title", e.target.value)
                }
                className="w-full px-3 py-2 border border-gray-300 rounded-md bg-white text-gray-900"
              />

              <textarea
                placeholder="Project Description"
                value={project.description}
                onChange={(e) =>
                  handleProjectChange(index, "description", e.target.value)
                }
                className="w-full px-3 py-2 border border-gray-300 rounded-md bg-white text-gray-900"
                rows={3}
              />

              <label className="flex flex-col items-center justify-center w-full border-2 border-dashed border-gray-400 rounded-xl bg-white p-6 cursor-pointer hover:bg-purple-50 transition hover:scale-105">
                <span className="mb-2 text-sm text-gray-600">
                  Upload Project Image
                </span>
                <input
                  type="file"
                  accept="image/*"
                  onChange={(e) => {
                    const file = e.target.files[0];
                    if (!file) return;
                    try {
                      const imageURL = URL.createObjectURL(file);
                      const updatedProjects = [...portfolioData.projects];
                      updatedProjects[index].image = imageURL;
                      updatedProjects[index].imageName = file.name;
                      setPortfolioData({
                        ...portfolioData,
                        projects: updatedProjects,
                      });
                    } catch (err) {
                      console.error("Error loading file:", err);
                    }
                  }}
                  className="hidden"
                />
                {project.image && (
                  <div className="mt-3 flex flex-col items-center">
                    <img
                      src={project.image}
                      alt="Project Preview"
                      className="w-32 h-24 rounded-lg object-cover border"
                    />
                    <p className="text-xs text-gray-500 mt-1">
                      {project.imageName}
                    </p>
                  </div>
                )}
              </label>

              <button
                className="w-full mt-2 px-4 py-2 bg-red-500 text-white rounded-xl hover:bg-red-600 transition"
                onClick={() => removeProject(index)}
              >
                Remove Project
              </button>
            </div>
          ))}
          <button
            type="button"
            onClick={addProject}
            className="w-full mt-2 px-4 py-2 bg-purple-500 text-white rounded-xl hover:bg-purple-600 transition"
          >
            + Add Project
          </button>
        </div>
      </div>

      {/* Preview Button */}
      <div className="flex justify-center mt-6">
        <button
          type="button"
          onClick={goToPreview}
          className="px-8 py-3 bg-gradient-to-r from-purple-500 to-pink-400 text-white font-semibold rounded-xl shadow-lg hover:opacity-90 transition transform hover:scale-105"
        >
          🚀 Preview My Portfolio
        </button>
      </div>
    </>
  );
}

export default FormSection;