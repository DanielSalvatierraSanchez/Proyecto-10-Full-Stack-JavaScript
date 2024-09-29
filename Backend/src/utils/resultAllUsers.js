const resultAllUsers = (res, userVar) => {
    userVar.length ? res.status(200).json({ message: "Listado completo de usuarios:", userVar }) : res.status(400).json({ message: "¡Hola! Eres el único usuario que existe... por ahora..." });
};

module.exports = { resultAllUsers };
