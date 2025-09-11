import { useState } from "react";
import FormSection from "./components/FormSection";
import PreviewSection from "./components/PreviewSection";

export default function App() {
  const [portfolioData, setPortfolioData] = useState({
    name: "",
    about: "",
    skills: "",
    projects: [],
    contacts: [],
    profileImage: null,
  });

  const [currentPage, setCurrentPage] = useState("form");
  const [theme, setTheme] = useState("aurora"); // default

  const themeOptions = [
    { value: "aurora", label: "Aurora Lights" },
    { value: "default", label: "Default Gradient" },
  ];

  return (
    <div className="min-h-screen py-10 transition-all">
      <h1 className="text-4xl font-bold text-center text-indigo-600 mb-8 drop-shadow-sm">
        Portfolio Builder
      </h1>

      {/* Theme Selector Dropdown */}
      <div className="flex justify-center mb-6">
        <select
          value={theme}
          onChange={(e) => setTheme(e.target.value)}
          className="p-2 rounded-md border border-gray-300 shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-400"
        >
          {themeOptions.map((t) => (
            <option key={t.value} value={t.value}>
              {t.label}
            </option>
          ))}
        </select>
      </div>

      {currentPage === "form" ? (
        <FormSection
          portfolioData={portfolioData}
          setPortfolioData={setPortfolioData}
          goToPreview={() => setCurrentPage("preview")}
        />
      ) : (
        <div className="flex justify-center relative w-full min-h-[60vh]">
          <PreviewSection
            portfolioData={portfolioData}
            goBack={() => setCurrentPage("form")}
            theme={theme}
          />
        </div>
      )}
    </div>
  );
}