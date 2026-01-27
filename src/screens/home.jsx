import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCircleCheck } from '@fortawesome/free-solid-svg-icons';
import Header from '../components/Header';
import '../Styles/home.css';
import Avantage from '../components/Avantages';
import OffreStudent from '../components/OffreStudent';
import Offresteacher from '../components/OffreTeacher';
import Avistudent from '../components/AvisStudent';
import Avisteacher from '../components/Avisteacher';
import Footer from '../components/Footer';

function Home() {

    return (
        <>
            <Header />

            <div className="div1">
                <div className="div2">

                    {/* ======= DEMO MOCKUP ======= */}
                    <div className="mockup">
                        <div className="mockup-header">
                            <div className="dot red"></div>
                            <div className="dot yellow"></div>
                            <div className="dot green"></div>
                            <h3>Anti-plagiat - Démo</h3>
                        </div>

                        <div className="mockup-body">
                            <div className="mockup-left">
                                <div className="mockup-card">
                                    <h4>Résultat rapide</h4>
                                    <p className="score">Taux de plagiat : <span>12%</span></p>
                                    <p className="status">Statut : <span>Ok</span></p>
                                </div>

                                <div className="mockup-card">
                                    <h4>Sources détectées</h4>
                                    <ul>
                                        <li>📄 Source 1 - <b>4%</b></li>
                                        <li>📄 Source 2 - <b>8%</b></li>
                                        <li>📄 Source 3 - <b>2%</b></li>
                                    </ul>
                                </div>
                            </div>

                            <div className="mockup-right">
                                <div className="mockup-screen">
                                    <h4>Zone d'analyse</h4>
                                    <div className="mockup-text">
                                        <p>
                                            Ici sera affichée la détection de plagiat.
                                            <br />
                                            Tu peux ajouter ton document et obtenir le score.
                                        </p>
                                    </div>

                                    <div className="mockup-buttons">
                                        <button className="btn-mockup">Téléverser un document</button>
                                        <button className="btn-mockup btn-blue">Analyser</button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* ======= COMMENT ======= */}
                    <div className="comment">
                        <p><FontAwesomeIcon icon={faCircleCheck} /> Logiciel Anti-plagiat</p>
                        <p><FontAwesomeIcon icon={faCircleCheck} /> Détection de Contenu IA</p>
                    </div>

                </div>
            </div>

            {/* ======= AUTRES COMPOSANTS ======= */}
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
