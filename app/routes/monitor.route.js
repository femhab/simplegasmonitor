module.exports = app => {
    const monitor = require("../controllers/monitor.controller.js")
    var router = require("express").Router();

    //fetch gas status fo n days
    router.post("/", monitor.fetch);

    app.use('/api/monitor', router);
} 