const path = require("path");

module.exports = (app) => {
    // Homepage
    app.get("/", (req, res) => {
        res.sendFile(path.join(__dirname, "../public/index.html"));
    });

    // Add exercise page
    app.get("/exercise", (req, res) => {
        res.sendFile(path.join(__dirname, "../public/ejercicio.html"));
    });

    // Dashboard page
    app.get("/stats", (req, res) => {
        res.sendFile(path.join(__dirname, "../public/dashboard.html"));
    });

    // Workout history page
    app.get("/history", (req, res) => {
        res.sendFile(path.join(__dirname, "../public/historial.html"));
    });
}