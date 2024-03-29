const User = require('../models/user');
const service = require('../services');

const signUp = (req, res) => {
    const user = new User({
        email: req.body.email,
        displayName: req.body.displayName,
    });

    user.save((err) => {
        if (err) res.status(500).send({ message: `Error al crear el usuario: ${err}` });

        return res.status(200).send({ token: service.createToken(user) });
    });
};

const signIn = (req, res) => {
    user.find({ email: req.body.email }, (err, user) => {
        if (err) return res.status(500).send({ message: `Hubo un error: ${err}` })
        if(!user) return res.status(404).send({ message: 'No se encontró el usuario.' })

        req.user = user;
        res.status(200).send({
            message: 'Has iniciado sesión correctamente.',
            token: service.createToken(user),
        });

    });
};

module.exports = {
    signUp,
    signIn,
};