const PadelMatch = require("../models/padelMatches");

const postPadelMatch = async (req, res, next) => {
    try {
        const { location, date, hour, place, author } = req.body;
        // const padelMatchDuplicated = await PadelMatch.findOne({ date, hour })
        // padelMatchDuplicated ? res.status(400).json({ message: `Ya existe un partido el dia ${date} a las ${hour} creado por ${author}.` }) : padelMatchDuplicated
        const newPadelMatch = new PadelMatch(req.body);
        const padelMatchSaved = await newPadelMatch.save();
        return res.status(201).json({ message: "Partido creado.", padelMatchSaved });
    } catch (error) {
        return res.status(400).json(`❌ Fallo en postPadelMatch: ${error.message}`);
    }
};

const getPadelMatches = async (req, res, next) => {
    try {
        const allPadelMatches = await PadelMatch.find();
        return allPadelMatches.length
            ? res.status(200).json({
                  message: `Estos son todos los partidos que hay: ${allPadelMatches}`
              })
            : res.status(400).json({ message: "No hay ningún partido programado." });
    } catch (error) {
        return res.status(400).json(`❌ Fallo en getPadelMatches: ${error.message}`);
    }
};

const getPadelMatchByDate = async (req, res, next) => {
    try {
        const { date } = req.params;
        const findPadelMatch = await PadelMatch.find({
            date: new RegExp(date, "i")
        });
        findPadelMatch.length
            ? res.status(200).json({
                  message: `Se han encontrado los siguientes partidos: `,
                  findPadelMatch
              })
            : res.status(400).json({ message: `No se ha encontrado ningún partido.` });
    } catch (error) {
        return res.status(400).json(`❌ Fallo en getPadelMatchByDate: ${error.message}`);
    }
};

const updatePadelMatch = async (req, res, next) => {
    try {
        const { id } = req.params;

        const padelMatchModify = new PadelMatch(req.body);
        padelMatchModify._id = id;
        const padelMatchUpdate = await PadelMatch.findByIdAndUpdate(id, padelMatchModify, { new: true });
        padelMatchUpdate ? res.status(200).json("No existe ese partido.") : res.status(400).json("Partido actualizado correctamente.", padelMatchUpdate);
    } catch (error) {
        return res.status(400).json(`❌ Fallo en updatePadelMatch: ${error.message}`);
    }
};

const deletePadelMatch = async (req, res, next) => {
    try {
        const { id } = req.params;
        const padelMatchDeleted = await PadelMatch.findByIdAndDelete(id);
        padelMatchDeleted ? res.status(200).json({ message: `Partido eliminado.`, padelMatchDeleted }) : res.status(400).json({ message: `No se ha encontrado ese partido.` });
    } catch (error) {
        return res.status(400).json(`❌ Fallo en deletePadelMatch: ${error.message}`);
    }
};

module.exports = {
    postPadelMatch,
    getPadelMatches,
    getPadelMatchByDate,
    deletePadelMatch
};
