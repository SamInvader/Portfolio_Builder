import { generateHTML } from "./generateHTML";

/**
 * Generates and downloads the portfolio HTML as a file
 * @param {Object} params - portfolioData + theme
 * @param {string} filename - The name of the file to save (default: "portfolio.html")
 */
export function downloadPortfolio({ portfolioData = {}, theme }, filename = "portfolio.html") {
  const html = generateHTML({ ...portfolioData, theme });
  const blob = new Blob([html], { type: "text/html" });
  const url = URL.createObjectURL(blob);

  const a = document.createElement("a");
  a.href = url;
  a.download = filename;
  a.click();

  URL.revokeObjectURL(url);
}