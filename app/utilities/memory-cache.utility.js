const memoryCache = require("memory-cache");

function setAsync(key, value, duration){
    try {
        memoryCache.put(key, value, duration);
        return true;
    }
    catch (e) {
        console.log(e);
        return false;
    }
}

function getAsync(key){
    var response = memoryCache.get(key);
    if(response){
        return response
    }else{
        return null;
    }
}

module.exports = {setAsync, getAsync};