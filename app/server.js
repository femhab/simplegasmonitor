const express = require("express");
const app = express();

var cors = require("cors");
var corsOption = {
    origin: "*"
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

// const Web3 = require("web3");
// const ethNetwork = 'https://ropsten.infura.io/v3/17c54743049449a39c919ba3fccbac4a';
// const web3 = new Web3(new Web3.providers.HttpProvider(ethNetwork));

// web3.eth.getTransaction('0xe27520018bbcc1cad463e9cc2cbc358ba16a61b52d34ea294e8204d8c7c713a1', async (err, result) => {
//     if (err) {
//         console.log(err);
//         return;
//     }
//     let gasUsed = web3.utils.fromWei(result.gasPrice, "ether");
//     console.log("gasUsed is" + gasUsed + " ETH");
// });



// set port, listen for requests
const PORT = process.env.PORT || 8082;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}.`);
});