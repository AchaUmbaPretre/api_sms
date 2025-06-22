import app from "./src/app";

const PORT = Number(process.env.PORT) || 8080;

app.listen(PORT, () => {
  console.log(`🚀 Serveur lancé sur http://localhost:${PORT}`);
});
