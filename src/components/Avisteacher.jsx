import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faChevronLeft,
  faChevronRight,
  faQuoteLeft,
} from "@fortawesome/free-solid-svg-icons";
import "../Styles/Avisteacher.css";

const avisTeacherData = [
  {
    name: "Khaled Oumar",
    text:
      "Outil très performant pour détecter le plagiat et sensibiliser les étudiants.",
  },
  {
    name: "Pr. Nadège M.",
    text:
      "Interface claire, résultats fiables. Excellent pour l’évaluation académique.",
  },
  {
    name: "Dr. Samuel T.",
    text:
      "Un vrai support pédagogique moderne pour l’enseignement supérieur.",
  },
];

function Avisteacher() {
  const [index, setIndex] = useState(0);

  const next = () =>
    setIndex((index + 1) % avisTeacherData.length);
  const prev = () =>
    setIndex(
      (index - 1 + avisTeacherData.length) %
        avisTeacherData.length
    );

  return (
    <div className="avisteacher-container">
      <h2 className="avis-title-teacher">
        Avis des enseignants
      </h2>

      <div className="avisteacher">
        <button onClick={prev} className="nav-btn-teacher">
          <FontAwesomeIcon icon={faChevronLeft} />
        </button>

        <AnimatePresence mode="wait">
          <motion.div
            key={index}
            className="Avis-teacher"
            initial={{ opacity: 0, y: 40, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -40, scale: 0.95 }}
            transition={{ duration: 0.6, ease: "easeOut" }}
          >
            <FontAwesomeIcon
              icon={faQuoteLeft}
              className="quote-icon-teacher"
            />

            <p className="commentaire-teacher">
              {avisTeacherData[index].text}
            </p>

            <span className="author-teacher">
              {avisTeacherData[index].name}
            </span>
          </motion.div>
        </AnimatePresence>

        <button onClick={next} className="nav-btn-teacher">
          <FontAwesomeIcon icon={faChevronRight} />
        </button>
      </div>
    </div>
  );
}

export default Avisteacher;