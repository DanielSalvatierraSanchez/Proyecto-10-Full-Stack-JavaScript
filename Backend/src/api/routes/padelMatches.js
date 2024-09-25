const padelMatchesRoutes = require("express").Router();
const { postPadelMatch, getPadelMatchByDate, getPadelMatches, deletePadelMatch } = require("../controllers/padelMatches");

padelMatchesRoutes.post("/register", postPadelMatch);
padelMatchesRoutes.get("/getBy/:date", getPadelMatchByDate);
padelMatchesRoutes.get("/", getPadelMatches);
padelMatchesRoutes.delete("/delete/:id", deletePadelMatch);

module.exports = padelMatchesRoutes;
