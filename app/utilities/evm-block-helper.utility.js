const axios = require('axios');

function getBlockNumber(no_of_days_ago){
    var date = new Date();
    var currentTimeStamp = Math.trunc(date.getTime() / 1000);
    var previousTimeStamp = Math.trunc(date.setDate(date.getDate() - no_of_days_ago) / 1000);
    var currentBlock = requestBlockNumber(currentTimeStamp);
    var previosBlock = requestBlockNumber(previousTimeStamp);
    console.log(currentBlock + "and " + previosBlock );
    return {currentBlock, previosBlock};
}

async function requestBlockNumber(timestamp){
    return await axios.get(`https://api.etherscan.io/api?module=block&action=getblocknobytime&timestamp=${timestamp}&closest=before&apikey=8RJR4G44DZ4AEQVP5HGWZ65EF1EGKITWEP`);
}

module.exports = {getBlockNumber}