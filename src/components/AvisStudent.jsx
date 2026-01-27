import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faChevronLeft,
  faChevronRight,
  faQuoteLeft,
} from "@fortawesome/free-solid-svg-icons";
import "../Styles/Avistudent.css";

const avisData = [
  {
    name: "Ali Yussef",
    text:
      "C’est un excellent logiciel, très rapide et gratuit. Ça m’a énormément aidé.",
  },
  {
    name: "Nadine K.",
    text:
      "Interface moderne, résultats fiables. Je recommande à tous les étudiants.",
  },
  {
    name: "Samuel T.",
    text:
      "Un vrai gain de temps avant les rendus académiques. Top outil !",
  },
];

function Avistudent() {
  const [index, setIndex] = useState(0);

  const next = () => setIndex((index + 1) % avisData.length);
  const prev = () =>
    setIndex((index - 1 + avisData.length) % avisData.length);

  return (
    <div className="avistudent-container">
      <h2 className="avis-title">Ils nous font confiance</h2>

      <div className="avistudent">
        <button onClick={prev} className="nav-btn">
          <FontAwesomeIcon icon={faChevronLeft} />
        </button>

        <AnimatePresence mode="wait">
          <motion.div
            key={index}
            className="Avis"
            initial={{ opacity: 0, y: 40, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -40, scale: 0.95 }}
            transition={{ duration: 0.6, ease: "easeOut" }}
          >
            <FontAwesomeIcon
              icon={faQuoteLeft}
              className="quote-icon"
            />
            <p className="commentaire">{avisData[index].text}</p>
            <span className="author">{avisData[index].name}</span>
          </motion.div>
        </AnimatePresence>

        <button onClick={next} className="nav-btn">
          <FontAwesomeIcon icon={faChevronRight} />
        </button>
      </div>
    </div>
  );
}

export default Avistudent;