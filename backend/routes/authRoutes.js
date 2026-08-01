const express = require("express");

const router = express.Router();

const pool = require("../config/db");

const jwt = require("jsonwebtoken");

router.post("/login", async (req, res) => {

    try {

        const { username, password } = req.body;

        const result = await pool.query(
            "SELECT * FROM users WHERE username = $1",
            [username]
        );

        if (result.rows.length === 0) {

            return res.status(401).json({
                success: false,
                message: "Invalid Username"
            });
        }

        const user = result.rows[0];

        if (password !== user.password) {

            return res.status(401).json({
                success: false,
                message: "Invalid Password"
            });
        }

        const token = jwt.sign(

            {
                userId: user.user_id,
                username: user.username,
                role: user.role
            },

            "SECRET_KEY",

            {
                expiresIn: "1h"
            }
        );

        res.status(200).json({
            success: true,
            token: token,
            user: {
                userId: user.user_id,
                username: user.username,
                role: user.role
            }
        });

    } catch (error) {

        console.error(error);

        res.status(500).json({
            success: false,
            message: "Server Error"
        });
    }
});

module.exports = router;