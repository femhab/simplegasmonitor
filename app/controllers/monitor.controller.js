//TODO: keep variable in api keys in env.config;
//TODO: work on getting block number with timestamp;

const axios = require('axios');

const Web3 = require("web3");
const ethNetwork = 'https://ropsten.infura.io/v3/17c54743049449a39c919ba3fccbac4a';
const web3 = new Web3(new Web3.providers.HttpProvider(ethNetwork));

//fetch gas status fo n days
exports.fetch = (req, res) => { 
    if(!req.body.address_list || req.body.address_list.length == 0){
        res.status(400).send({
            message: "at least one address is required"
        });
        return;
    }
    if(!req.body.no_of_days_ago){
        res.status(400).send({
            message: "no of days ago is required"
        });
        return;
    }
    const responseArray = [];
    //var tag = null;
    //const currentBlock  = web3.eth.getBlockNumber().then(console.log);
    var taregetUrl = '';
    for(var i=0; i<req.body.address_list.length; i++){
        const address = req.body.address_list[i];
        const currentCount = i;     
        if(address != null && address.length == 42){
            taregetUrl = `https://api.etherscan.io/api?module=account&action=txlist&address=${address}&startblock=0&endblock=99999999&page=1&offset=10&sort=asc&apikey=8RJR4G44DZ4AEQVP5HGWZ65EF1EGKITWEP`;
            axios.get(taregetUrl)
            .then(response => {
                //console.log(response.data.result);
                //const filteredList = response.data.result.filter(x => x.from == address); question not specific if it is incoming or outgoing
                var totalUsed = response.data.result.reduce((n, {gasUsed}) => n + parseInt(gasUsed), 0);
                var gasSpent = web3.utils.fromWei(totalUsed.toString(), "ether");
                var obj = {};
                obj[address] = gasSpent;
                responseArray.push(obj);
                if(currentCount == req.body.address_list.length-1){
                    res.status(200).send({
                        message: "successful",
                        gasUsed: responseArray
                    });
                    return;
                } 
            })
            .catch(error => {
                console.log(error);
            });
        }
    }
    //console.log(responseArray);
    return;
}