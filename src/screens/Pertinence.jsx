import React, { useState } from "react";
import axios from "axios";
import "../Styles/pertinence.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowUpFromBracket } from "@fortawesome/free-solid-svg-icons";

function Pertinence() {
  const [file, setFile] = useState(null);
  const [text, setText] = useState("");
  const [topic, setTopic] = useState("");
  const [structure, setStructure] = useState("");
  const [weights, setWeights] = useState({
    theme: 0.5,
    structure: 0.3,
    content: 0.2,
  });
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState(null);

  //  URL du backend
  const BACKEND_URL = "https://anti-plagiat-backend.onrender.com";

  const handleCheck = async () => {
    if (!text && !file) {
      alert("Veuillez entrer un texte ou sélectionner un fichier");
      return;
    }
    if (!topic) {
      alert("Veuillez entrer le sujet attendu");
      return;
    }

    setLoading(true);
    setResult(null);

    const formData = new FormData();
    if (file) formData.append("file", file);
    else formData.append("text", text);

    formData.append("topic", topic);
    formData.append("structure", structure);
    formData.append("weights", JSON.stringify(weights));

    try {
      const res = await axios.post(
        `${BACKEND_URL}/pertinence/check`,
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );

      setResult(res.data);
    } catch (err) {
      console.error("Erreur Axios:", err.response?.data || err.message);
      alert("Erreur lors de l'analyse, voir console");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="pertinence-container">
      <h2>Vérification de la pertinence (Pro Ultra)</h2>

      <textarea
        placeholder="Saisir votre texte ou importer un pdf"
        value={text}
        disabled={!!file}
        onChange={(e) => setText(e.target.value)}
      />

      <input
        type="text"
        placeholder="Sujet attendu"
        value={topic}
        onChange={(e) => setTopic(e.target.value)}
      />

      <textarea
        placeholder="Structure attendue (séparer par des lignes)"
        value={structure}
        onChange={(e) => setStructure(e.target.value)}
      />

      <div className="weights-inputs">
        <label>
          Thème :
          <input
            type="number"
            step="0.05"
            min="0"
            max="1"
            value={weights.theme}
            onChange={(e) =>
              setWeights({ ...weights, theme: parseFloat(e.target.value) })
            }
          />
        </label>

        <label>
          Structure :
          <input
            type="number"
            step="0.05"
            min="0"
            max="1"
            value={weights.structure}
            onChange={(e) =>
              setWeights({ ...weights, structure: parseFloat(e.target.value) })
            }
          />
        </label>

        <label>
          Contenu :
          <input
            type="number"
            step="0.05"
            min="0"
            max="1"
            value={weights.content}
            onChange={(e) =>
              setWeights({ ...weights, content: parseFloat(e.target.value) })
            }
          />
        </label>
      </div>

      <div className="file-upload">
        <label>
          <FontAwesomeIcon icon={faArrowUpFromBracket} /> Importer un fichier
          <input
            type="file"
            hidden
            onChange={(e) => {
              setFile(e.target.files[0]);
              setText("");
            }}
          />
        </label>
      </div>

      <button onClick={handleCheck} disabled={loading}>
        {loading ? "Analyse en cours..." : "Vérifier la pertinence"}
      </button>

      {result && (
        <div className="result-box">
          <h3>Résultats détaillés</h3>
          <p>Score global : {result.globalScore}%</p>
          <ul>
            <li>Thème : {result.themeScore}%</li>
            <li>Structure : {result.structureScore}%</li>
            <li>Qualité du contenu : {result.contentScore}%</li>
          </ul>

          {result.report && (
            <a
              href={`${BACKEND_URL}/${result.report}`}
              target="_blank"
              rel="noopener noreferrer"
            >
              Télécharger le rapport PDF Pro Ultra
            </a>
          )}
        </div>
      )}
    </div>
  );
}

export default Pertinence;