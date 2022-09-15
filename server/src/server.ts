import express, { application } from "express";

const app = express();

app.get("/ads", (req, res) => {
  return res.json([
    { id: 1, nome: "Anuncio 1" },
    { id: 2, nome: "Anuncio 2" },
    { id: 3, nome: "Anuncio 3" },
  ]);
});

app.listen(3333);
