//TODO: keep variable in api keys in env.config;
//TODO: BaseUrl to comr from env.config

const axios = require('axios'); //to make http requets
const Web3 = require("web3"); //inject web3
const ethNetwork = 'https://ropsten.infura.io/v3/17c54743049449a39c919ba3fccbac4a'; //EVM node communication- infura
const web3 = new Web3(new Web3.providers.HttpProvider(ethNetwork));
const memoryCache = require("../utilities/memory-cache.utility.js");
const evmBlockHelper = require("../utilities/evm-block-helper.utility.js");
const blockNumberTTL = 10000;

//fetch gas status fo n days
exports.fetch = async (req, res) => { 
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
    var  block  = evmBlockHelper.getBlockNumber(req.body.no_of_days_ago);
    var  taregetUrl = '';

    //loop through the list for transactions list response
    for(var i=0; i<req.body.address_list.length; i++){
        const address = req.body.address_list[i];
        const currentCount = i;     
        if(address != null && address.length == 42){
            try{
                let cachedResponse = memoryCache.getAsync(address + req.body.no_of_days_ago.toString());
                if(cachedResponse){
                    //deserialize value and push to array
                    responseArray.push(JSON.parse(cachedResponse));
                    continue;
                }
            }
            catch (e) {
                console.log(e);
            }
            taregetUrl = `https://api.etherscan.io/api?module=account&action=txlist&address=${address}&startblock=${block.previosBlock.data.result}&endblock=${block.currentBlock.data.result}&page=1&offset=10&sort=asc&apikey=8RJR4G44DZ4AEQVP5HGWZ65EF1EGKITWEP`;
            axios.get(taregetUrl)
            .then(response => {
                //console.log(response.data.result);
                //const filteredList = response.data.result.filter(x => x.from == address); question not specific if it is incoming or outgoing
                var totalUsed = response.data.result.reduce((n, {gasUsed}) => n + parseInt(gasUsed), 0);
                var gasSpent = web3.utils.fromWei(totalUsed.toString(), "ether");
                responseArray.push({key: address, value: gasSpent});
                //cache on memory
                memoryCache.setAsync(address + req.body.no_of_days_ago.toString(), JSON.stringify({key: address, value: gasSpent}), blockNumberTTL);

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
    res.status(200).send({
        message: "successful",
        gasUsed: responseArray
    });
    return;
}