const express = require("express");
const router = express.Router();

const pool = require("../config/db");

router.get("/", async (req, res) => {
    try {

        const result = await pool.query(
            "SELECT * FROM device_master ORDER BY device_id"
        );

        res.status(200).json({
            success: true,
            data: result.rows
        });

    } catch (error) {

        console.error(error);

        res.status(500).json({
            success: false,
            message: "Server Error"
        });
    }
});
router.get("/:id/details", async (req, res) => {

    try {

        const deviceId = req.params.id;

        // Device Info
        const deviceResult = await pool.query(
            "SELECT * FROM device_master WHERE device_id = $1",
            [deviceId]
        );

        // Device Anomalies
        const anomalyResult = await pool.query(
            `
            SELECT 
                da.device_anomaly_id,
                am.anomaly_name,
                am.severity,
                da.anomaly_status,
                da.remarks,
                da.detected_at
            FROM device_anomalies da
            JOIN anomaly_master am
            ON da.anomaly_id = am.anomaly_id
            WHERE da.device_id = $1
            `,
            [deviceId]
        );

        // Device Actions
        const actionResult = await pool.query(
            `
            SELECT 
                daa.action_id,
                daa.action_taken,
                daa.action_description,
                daa.action_status,
                daa.action_time,
                daa.performed_by
            FROM device_anomalies_action daa
            JOIN device_anomalies da
            ON daa.device_anomaly_id = da.device_anomaly_id
            WHERE da.device_id = $1
            `,
            [deviceId]
        );

        res.status(200).json({
            success: true,
            device: deviceResult.rows[0],
            anomalies: anomalyResult.rows,
            actions: actionResult.rows
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