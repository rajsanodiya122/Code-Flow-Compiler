
// compiler by coding thinker major project
import React, { useState } from "react";
import CodeMirror from "@uiw/react-codemirror";
import { cpp } from "@codemirror/lang-cpp";
import { java } from "@codemirror/lang-java";
import { python } from "@codemirror/lang-python";
import "bootstrap/dist/css/bootstrap.min.css";

// Function to return boilerplate code for each language
const getBoilerplateCode = (lang) => {
  switch (lang) {
    case "java":
      return `import java.util.*;

public class Main {
  public static void main(String[] args) {
    System.out.println("Hello Coders");
  }
}`;
    case "cpp":
      return `#include <iostream>
using namespace std;

int main() {
  cout << "Hello Coders" << endl;
  return 0;
}`;
    case "python":
      return `print("Hello Coders")`;
    default:
      return "";
  }
};

export default function Dashboard() {
  const [language, setLanguage] = useState("java");
  const [code, setCode] = useState(getBoilerplateCode("java"));
  const [input, setInput] = useState("");
  const [output, setOutput] = useState("");
  const [theme, setTheme] = useState("dark");

  const getExtension = () => {
    if (language === "cpp") return { ext: ".cpp", lang: cpp() };
    if (language === "java") return { ext: ".java", lang: java() };
    return { ext: ".py", lang: python() };
  };

  const handleDownload = () => {
    const { ext } = getExtension();
    const blob = new Blob([code], { type: "text/plain;charset=utf-8" });
    const a = document.createElement("a");
    a.href = URL.createObjectURL(blob);
    a.download = "code" + ext;
    a.click();
  };

  const toggleTheme = () => {
    setTheme(theme === "dark" ? "light" : "dark");
  };

  const runCode = async () => {
    setOutput("Running...");

    try {
      const response = await fetch(
        "https://judge0-ce.p.rapidapi.com/submissions?base64_encoded=false&wait=true",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            "X-RapidAPI-Key": "3b594c98d8mshc5bd4fbcee0b19fp1afceejsn98ea1317cefa",
            "X-RapidAPI-Host": "judge0-ce.p.rapidapi.com",
          },
          body: JSON.stringify({
            source_code: code,
            language_id: language === "java" ? 62 : language === "cpp" ? 54 : 71,
            stdin: input,
          }),
        }
      );
      const data = await response.json();

      if (data.stdout) {
        setOutput(data.stdout);
      } else if (data.compile_output) {
        setOutput(data.compile_output);
      } else if (data.stderr) {
        setOutput(data.stderr);
      } else {
        setOutput("Unknown error occurred.");
      }
    } catch (error) {
      setOutput("Error: " + error.message);
    }
  };

  const { lang } = getExtension();

  return (
    <div className={`vh-100 d-flex flex-column ${theme === "dark" ? "bg-dark text-light" : "bg-light text-dark"}`}>
      {/* Navbar */}
      <nav className={`navbar ${theme === "dark" ? "navbar-dark bg-dark" : "navbar-light bg-light"} px-4 py-2`}>
        <span className="navbar-brand mb-0 h1">Code Editor</span>

        <div className="d-flex align-items-center gap-3">
          <select
            className={`form-select ${theme === "dark" ? "bg-secondary text-white border-0" : ""}`}
            style={{ width: "120px" }}
            value={language}
            onChange={(e) => {
              const selectedLang = e.target.value;
              setLanguage(selectedLang);
              setCode(getBoilerplateCode(selectedLang));
            }}
          >
            <option value="cpp">C++</option>
            <option value="java">Java</option>
            <option value="python">Python</option>
          </select>

          <button className="btn btn-success" onClick={runCode}>
            Run
          </button>

          <div className="dropdown">
            <button
              className={`btn ${theme === "dark" ? "btn-secondary" : "btn-outline-secondary"} dropdown-toggle`}
              type="button"
              id="dropdownMenuButton"
              data-bs-toggle="dropdown"
              aria-expanded="false"
            >
              ⋮
            </button>
            <ul className="dropdown-menu dropdown-menu-end" aria-labelledby="dropdownMenuButton">
              <li>
                <button className="dropdown-item" onClick={handleDownload}>
                  Download File
                </button>
              </li>
            </ul>
          </div>

          <button
            className={`btn ${theme === "dark" ? "btn-outline-light" : "btn-outline-dark"}`}
            onClick={toggleTheme}
            title="Toggle Theme"
          >
            {theme === "dark" ? "☀ Light" : "🌙 Dark"}
          </button>
        </div>
      </nav>

      {/* Editor */}
      <div className="flex-grow-1 overflow-hidden">
        <CodeMirror
          value={code}
          height="60vh"
          theme={theme === "dark" ? "dark" : "light"}
          extensions={[lang]}
          onChange={(value) => setCode(value)}
          style={{ fontSize: "1.1rem" }}
        />
      </div>

      {/* Input */}
      <div className={`p-3 ${theme === "dark" ? "bg-secondary text-white" : "bg-light text-dark"}`}>
        <label htmlFor="stdinInput" className="form-label">
          Standard Input (stdin):
        </label>
        <textarea
          id="stdinInput"
          className="form-control"
          rows="4"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="Enter input for your program here"
        />
      </div>

      {/* Output */}
      <div
        className={`p-3 ${theme === "dark" ? "bg-dark text-success" : "bg-white text-success"} overflow-auto`}
        style={{ height: "15vh", fontFamily: "monospace", whiteSpace: "pre-wrap" }}
      >
        <strong>Output:</strong>
        <pre>{output}</pre>
      </div>
    </div>
  );
}




























// import React, { useState } from 'react';
// import 'bootstrap/dist/css/bootstrap.min.css';
// import 'bootstrap-icons/font/bootstrap-icons.css';

// import 'bootstrap/dist/js/bootstrap.bundle.min.js';


// const Dashboard = () => {
//   const [theme, setTheme] = useState('light');
//   const [language, setLanguage] = useState('C++');
//   const [code, setCode] = useState('// Write your code here...');
//   const [output, setOutput] = useState('');

//   const toggleTheme = () => {
//     setTheme(prev => (prev === 'light' ? 'dark' : 'light'));
//   };

//   const handleLanguageChange = (lang) => {
//     setLanguage(lang);
//     setCode(`// ${lang} code starts here...`);
//     setOutput('');
//   };

//   const handleRun = () => {
//     // Simulated output
//     setOutput(`Compiling and running ${language} code...\nOutput:\nHello, World!`);
//   };

//   const handleDownload = () => {
//     const blob = new Blob([code], { type: 'text/plain;charset=utf-8' });
//     const url = URL.createObjectURL(blob);
//     const link = document.createElement('a');
//     link.href = url;
//     link.download = `code.${language === 'Python' ? 'py' : language === 'Java' ? 'java' : 'cpp'}`;
//     document.body.appendChild(link);
//     link.click();
//     document.body.removeChild(link);
//     URL.revokeObjectURL(url);
//   };

//   return (
//     <div className={`container-fluid p-3 bg-${theme} text-${theme === 'light' ? 'dark' : 'light'}`} style={{ minHeight: '100vh' }}>
//       <nav className="navbar navbar-expand-lg mb-3">
//         <div className="container-fluid">
//           <a className="navbar-brand" href="#">🖥️ Code Compiler</a>
//           <div className="d-flex align-items-center ms-auto gap-3">

//             {/* Language Dropdown */}
//             <div className="dropdown">
//               <button className="btn btn-outline-primary dropdown-toggle" type="button" data-bs-toggle="dropdown">
//                 Language: {language}
//               </button>
//               <ul className="dropdown-menu">
//                 {['C++', 'Java', 'Python'].map((lang) => (
//                   <li key={lang}>
//                     <button className="dropdown-item" onClick={() => handleLanguageChange(lang)}>{lang}</button>
//                   </li>
//                 ))}
//               </ul>
//             </div>

//             {/* Run Button */}
//             <button className="btn btn-success" onClick={handleRun}>
//               <i className="bi bi-play-fill me-1"></i> Run
//             </button>

//             {/* Download Button */}
//             <button className="btn btn-secondary" onClick={handleDownload}>
//               <i className="bi bi-download me-1"></i> Download
//             </button>

//             {/* Theme Toggle */}
//             <button className="btn btn-outline-dark" onClick={toggleTheme}>
//               {theme === 'light' ? (
//                 <i className="bi bi-moon-fill"></i>
//               ) : (
//                 <i className="bi bi-sun-fill text-warning"></i>
//               )}
//             </button>
//           </div>
//         </div>
//       </nav>

//       {/* Code Editor */}
//       <div className="mb-3">
//         <label htmlFor="codeArea" className="form-label"><strong>Editor:</strong></label>
//         <textarea
//           id="codeArea"
//           className="form-control"
//           rows="10"
//           value={code}
//           onChange={(e) => setCode(e.target.value)}
//           style={{
//             backgroundColor: theme === 'light' ? '#f8f9fa' : '#1e1e1e',
//             color: theme === 'light' ? '#000' : '#fff',
//             fontFamily: 'monospace'
//           }}
//         />
//       </div>

//       {/* Output Panel */}
//       <div className="mb-3">
//         <label htmlFor="outputArea" className="form-label"><strong>Output:</strong></label>
//         <textarea
//           id="outputArea"
//           className="form-control"
//           rows="5"
//           value={output}
//           readOnly
//           style={{
//             backgroundColor: theme === 'light' ? '#e9ecef' : '#2d2d2d',
//             color: theme === 'light' ? '#000' : '#0f0',
//             fontFamily: 'monospace'
//           }}
//         />
//       </div>
//     </div>
//   );
// };

// export default Dashboard;


