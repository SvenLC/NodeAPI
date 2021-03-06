const sequelize = require('../util/database');

const ContenuType = sequelize.import('../models/T_R_CONTENU_EDITORIAL_TYPE_CET');

exports.getContenuTypes = (req, res, next) => {
    ContenuType.findAll()
        .then(contenuTypes => {
            res.status(200).json({ ContenuType: contenuTypes });
        })
        .catch(err => {
            if (!err.statusCode) {
                err.statusCode = 500;
            }
            next(err);
        });
}

exports.getContenuType = (req, res, next) => {
    const ContenuTypeId = req.params.contenuTypeId;
    ContenuType.findByPk(ContenuTypeId)
        .then(contenuType => {
            if (!contenuType) {
                const error = new Error('type de contenu inexistante !');
                error.statusCode = 404;
                throw error;
            }
            res.status(200).json({ ContenuType: contenuType });
        })
        .catch(err => {
            if (!err.statusCode) {
                err.statusCode = 500;
            }
            next(err);
        });

};

exports.createContenuType = (req, res, next) => {
    const libelle = req.body.CET_LIBELLE;

    ContenuType.create({
        CET_LIBELLE: libelle

    })
        .then(contenuType => {
            res.status(201).json({contenuType: contenuType})
        })
        .catch(err => {
            if (!err.statusCode) {
                err.statusCode = 500;
            }
            next(err);
            console.log('Failed to create');
        });
}



exports.deleteContenuType = (req, res, next) => {
    const ContenuTypeId = req.params.contenuTypeId;
    ContenuType.findByPk(ContenuTypeId)
        .then(contenuType => {
            if (!contenuType) {
                const error = new Error('Type de contenu inexistant !');
                error.statusCode = 404;
                throw error;
            }
            return contenuType.destroy();
        }).then(contenuType => {
            res.status(200).json({ contenuType: contenuType});

        })
        .catch(err => {
            if (!err.statusCode) {
                err.statusCode = 500;
            }
            next(err);
        });
}

exports.updateContenuType = (req, res, next) => {
    const contenuTypeId = req.params.contenuTypeId;
    const libelle = req.body.CET_LIBELLE;

    ContenuType.findByPk(contenuTypeId)
        .then(contenuType => {
            if (!contenuType) {
                const error = new Error( 'Type de contenu inexistant !');
                error.statusCode = 404;
                throw error;
            }

            contenuType.CET_LIBELLE = libelle;
            return contenuType.save();
        }).then(contenuType => {
            res.status(200).json({ contenuType: contenuType});

        })
        .catch(err => {
            if (!err.statusCode) {
                err.statusCode = 500;
            }
            next(err);
        });
}

