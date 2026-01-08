require("dotenv").config();
const express = require("express");
const cors = require("cors");
const bcrypt = require("bcryptjs");
const { Pool } = require("pg");

const app = express();
app.use(cors());
app.use(express.json());

// Connexion à PostgreSQL via Supabase Pooler IPv4
const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
  ssl: { rejectUnauthorized: false }
});

// Test de connexion
pool.query("SELECT 1")
  .then(() => console.log("✅ PostgreSQL OK"))
  .catch(err => console.error("❌ PostgreSQL KO", err.message));

// ------------------ ROUTES ------------------ //

// INSCRIPTION
app.post("/register", async (req, res) => {
  try {
    const { email, password, role } = req.body;

    // Vérifier si l'email existe déjà
    const result = await pool.query(
      "SELECT * FROM users WHERE email = $1",
      [email]
    );

    if (result.rows.length > 0) {
      return res.status(400).json({ message: "Cet email est déjà utilisé" });
    }

    const hash = await bcrypt.hash(password, 10);

    await pool.query(
      "INSERT INTO users (email, password, role) VALUES ($1, $2, $3)",
      [email, hash, role]
    );

    res.json({ message: "inscription ok" });
  } catch (err) {
    console.error("ERREUR POSTGRES 👉", err.message);
    res.status(500).json({ message: "erreur serveur" });
  }
});

// CONNEXION
app.post("/login", async (req, res) => {
  try {
    const { email, password } = req.body;

    const result = await pool.query(
      "SELECT * FROM users WHERE email = $1",
      [email]
    );

    if (result.rows.length === 0) {
      return res.status(401).json({ message: "utilisateur non trouvé" });
    }

    const user = result.rows[0];
    const ok = await bcrypt.compare(password, user.password);

    if (!ok) {
      return res.status(401).json({ message: "mot de passe incorrect" });
    }

    res.json({ message: "connexion ok", role: user.role });
  } catch (err) {
    console.error("ERREUR LOGIN 👉", err.message);
    res.status(500).json({ message: "erreur serveur" });
  }
});

// ------------------ LANCEMENT SERVEUR ------------------ //
app.listen(3001, () => console.log("Serveur OK sur http://localhost:3001"));
