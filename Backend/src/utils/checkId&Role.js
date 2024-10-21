const idAndRoleChecked = (user) => {
    if (user._id.toString() !== user.id.toString() && user.role !== "admin") {
        return "¡Cuidado! No puedes hacer eso, únicamente puede hacerlo un Administrador.";
    }
    // if (userId !== userId && user.role !== "admin") {
    //     return "¡Cuidado! No puedes hacer eso, únicamente puede hacerlo un Administrador.";
    // }
    return null;
};

module.exports = { idAndRoleChecked };
