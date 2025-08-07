import { useState } from "react";
import FormSection from "./components/FormSection";
import PreviewSection from "./components/PreviewSection";
import { generateHTML } from "./utils/generateHTML";

export default function App() {
  const [portfolioData, setPortfolioData] = useState({
    name: "",
    about: "",
    skills: "",
    projects: [],
    contacts: [],
    profileImage: null,
  });

  const handleGenerate = () => {
    const htmlContent = generateHTML(FormData);
    const blob = new Blob([htmlContent], {type:"text/html"});
    const url = URL.createObjectURL(blob);

    const a = document.createElement("a");
    a.href = url;
    a.download = "portfolio.html";
    a.click();

    const newTab = window.open();
    if (newTab) {
      newTab.document.write(htmlContent);
      newTab.document.close();
    } else {
      alert("Pop-up blocked! Please allow pop-ups to view the portfolio")
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-50 to-white py-10">
      <h1 className="text-4xl font-bold text-center text-indigo-600 mb-8 drop-shadow-sm">
        Portfolio Builder
      </h1>

      <div className="grid md:grid-cols-2 gap-8 mb-10">
        <FormSection
          portfolioData={portfolioData}
          setPortfolioData={setPortfolioData}
        />
        <PreviewSection portfolioData={portfolioData} />
      </div>
    </div>
  );
}
