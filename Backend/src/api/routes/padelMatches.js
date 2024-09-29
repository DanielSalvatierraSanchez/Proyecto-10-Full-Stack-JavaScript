const padelMatchesRoutes = require("express").Router();
const { postPadelMatch, getPadelMatchByDate, getPadelMatches, deletePadelMatch } = require("../controllers/padelMatches");

padelMatchesRoutes.post("/register", postPadelMatch); // isAuth,
padelMatchesRoutes.get("/getBy/:date", getPadelMatchByDate); // isAuth,
padelMatchesRoutes.get("/", getPadelMatches); // isAuth,
// update // isAuth, SI ERES SU CREADOR
padelMatchesRoutes.delete("/delete/:id", deletePadelMatch); // isAuth, SI ERES SU CREADOR 

module.exports = padelMatchesRoutes;
