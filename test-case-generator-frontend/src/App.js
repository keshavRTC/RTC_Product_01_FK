
import React, { useState } from 'react';
import axios from 'axios';
import './App.css'; 

function App() {
  const [inputPrompt, setInputPrompt] = useState("");
  const [testCases, setTestCases] = useState("");
  const [loading, setLoading] = useState(false);

  const handleGenerate = async () => {
    setLoading(true);
    setTestCases(""); 
    try {
      const res = await axios.post('http://localhost:5000/generate', { prompt: inputPrompt });
      setTestCases(res.data.testCases);
    } catch (err) {
      setTestCases(" Error: " + err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={{ padding: 20, fontFamily: 'sans-serif' }}>
      <h2>🧪 Test Case Generator</h2>
      <input
        type="text"
        placeholder="Enter feature description (e.g., login form)"
        value={inputPrompt}
        onChange={(e) => setInputPrompt(e.target.value)}
        style={{ width: "60%", padding: "8px" }}
      />
      <button onClick={handleGenerate} style={{ marginLeft: "10px", padding: "8px 16px" }}>
        Generate
      </button>

      <div style={{ marginTop: 30 }}>
        {loading ? (
          <div className="spinner"> Generating test cases...</div>
        ) : (
          <pre style={{
            whiteSpace: "pre-wrap",
            background: "#f9f9f9",
            padding: "15px",
            borderRadius: "8px",
            maxHeight: "400px",
            overflowY: "auto"
          }}>
            {testCases}
          </pre>
        )}
      </div>
    </div>
  );
}

export default App;
