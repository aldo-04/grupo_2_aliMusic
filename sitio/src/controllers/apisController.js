const { validationResult } = require('express-validator');
const capitalizeOneLetter = require('../utils/capitalizeOneLetter');
const fs = require('fs');
const path = require('path');
const db = require('../database/models');
const {Op} = require('sequelize');

const bcryptjs = require('bcryptjs');

const getUrl = req => `${req.protocol}://${req.get('host')}${req.originalUrl}`

module.exports = {
    getMails: async (req, res) => {
        try {
            let result = await db.User.findAll({
                attributes: ['email']
            })
            console.log(result);
            let emails = result.map(user => user.email)
            return res.status(200).json({
                meta: {
                    link: getUrl(req),
                    total: emails.length
                },
                data: emails
            })
        } catch (error) {
            console.log(error)
            throwError(res, error)
    
        }
    },
}