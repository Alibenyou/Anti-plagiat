import { useState } from "react";
import axios from "axios";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faCircleCheck,
  faArrowUpFromBracket,
} from "@fortawesome/free-solid-svg-icons";
import { Link } from "react-router-dom";

import Header from "../components/Header";
import Footer from "../components/Footer";
import Avantage from "../components/Avantages";
import OffreStudent from "../components/OffreStudent";
import Offresteacher from "../components/OffreTeacher";
import Avistudent from "../components/AvisStudent";
import Avisteacher from "../components/Avisteacher";
import "../Styles/home.css";

function Home() {
  const [text, setText] = useState("");
  const [file, setFile] = useState(null);
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState(null);

  //  l'URL directe de ton backend Render
  const BACKEND_URL = "https://anti-plagiat-backend.onrender.com";

  const handleCheck = async () => {
    if (!text && !file) {
      alert("Veuillez entrer un texte ou sélectionner un fichier");
      return;
    }

    setLoading(true);
    setResult(null);

    const formData = new FormData();
    if (file) formData.append("file", file);
    else formData.append("text", text);

    try {
      const res = await axios.post(
        `${BACKEND_URL}/plagiarism/check`,
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
    <>
      <Header />

      <div className="div1">
        <div className="div2">
          <div className="div3">
            <textarea
              placeholder="Entrer du texte ou importer un fichier"
              value={text}
              disabled={!!file}
              onChange={(e) => setText(e.target.value)}
            />

            <div className="btn-text">
              <button
                className="detection"
                onClick={handleCheck}
                disabled={loading}
              >
                {loading ? "Analyse..." : "Détecter le texte"}
              </button>
        
        <Link to="/connexion">
              <label >
                <FontAwesomeIcon icon={faArrowUpFromBracket} />
                 Importer un document
              </label>
         </Link>     
            </div>

            {result && (
              <div className="result-box">
                <h3>Taux de similarité</h3>
                <div className="score">{result?.globalSimilarity ?? 0} %</div>

                {result?.report && (
                  <a
                    href={`${BACKEND_URL}/${result.report}`}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    Télécharger le rapport PDF
                  </a>
                )}
              </div>
            )}
          </div>

          <div className="comment">
            <p>
              <FontAwesomeIcon icon={faCircleCheck} /> Logiciel Anti-plagiat
            </p>
            <p>
              <FontAwesomeIcon icon={faCircleCheck} /> Détection de contenu IA
            </p>
          </div>
        </div>
      </div>
      
      <Avantage />
      <OffreStudent />
      <Avistudent />
      <Offresteacher />
      <Avisteacher />
      <hr />
      <Footer />
    </>
  );
}

export default Home;