const idAndRoleChecked = (id, user) => {
    if (id !== user._id.toString() && user.role !== "admin") {
        return "¡Cuidado! No puedes hacer eso, únicamente puede hacerlo un Administrador.";
    }
    return null;
};

module.exports = { idAndRoleChecked };
