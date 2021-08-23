const express = require("express");
const app = express();

var cors = require("cors");
var corsOption = {
    origin: "http://localhost:8081"
}

app.use(cors(corsOption));
app.use(express.json()); // parse content-type request of - application/json
app.use(express.urlencoded({ extended: true })); // parse content-type request of - application/x-www-form-urlencoded

//test route
app.get("/", (req, res) => {
    res.json({ message: "Dynamic Gas Monitor" });
});

//setting up routes
require("./routes/monitor.route.js")(app);

//setting up swagger
const swaggerUi = require("swagger-ui-express");
swaggerDocument = require("./swagger.json");
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));

// set port, listen for requests
const PORT = process.env.PORT || 8080;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}.`);
});