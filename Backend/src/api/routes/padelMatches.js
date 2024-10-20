const padelMatchesRoutes = require("express").Router();
const { isAuth } = require("../../middlewares/isAuth");
const uploadFolders = require("../../middlewares/uploadFolders");
const { createPadelMatch, getPadelMatchByDay, getPadelMatches, updatePadelMatch, deletePadelMatch } = require("../controllers/padelMatches");

padelMatchesRoutes.post("/register", isAuth, uploadFolders("Padel_Matches_Of_Appadel").single("image"), createPadelMatch);
padelMatchesRoutes.get("/getByDay/:day", getPadelMatchByDay); // isAuth,
// padelMatchesRoutes.get("/getByAuthor/:author", getPadelMatchByAuthor); // isAuth,
padelMatchesRoutes.get("/", getPadelMatches); // isAuth,
padelMatchesRoutes.put("/update/:id", updatePadelMatch); // isAuth, SI ERES SU CREADOR
padelMatchesRoutes.delete("/delete/:id", isAuth, deletePadelMatch);

module.exports = padelMatchesRoutes;
