//fetch gas status fo n days
exports.fetch = (req, res) => { 
    res.header("Access-Control-Allow-Origin", "*"); 
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
    res.status(200).send({
        message: "successful"
    });
    return;
}