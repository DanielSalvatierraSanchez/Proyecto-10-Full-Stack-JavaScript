const resultUserDeleted = (res, userVar) => {
    userVar ? res.status(200).json({ message: `Usuario eliminado correctamente.`, userVar }) : res.status(400).json({ message: `No se puede eliminar ese usuario ya que no existe.` });
};

module.exports = { resultUserDeleted };
