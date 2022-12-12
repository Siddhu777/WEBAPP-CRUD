const custModel = require('../models/customer-model')
let addCustomer = async (req,res) =>{
    var data;
    if(req.method == 'POST'){
        data = req.body;        
        if(data != undefined && data != null){
            let custData = await custModel.create(data)
            if (custData.result == 'success') {
                let address = {
                    "address":data.address,
                    "country":data.country,
                    "state":data.state,      
                    "city":data.city,
                    "zipcode":data.zipcode,
                    "customerid":custData.id
                  }
                await custModel.insertAddress(address).then(query => {
                    if (query.result == 'success') {
                        res.json(
                            {result: query.result, message: 'Inserted Succesfully'}
                        )
                    }
                    else {
                        res.json(
                            {result: 'fail', message: query.error}
                        )
                    }
                });
            }else {
                res.json(
                    {result: 'fail', message: query.error}
                )
            }
        }
    }
}
let getCustomers = async (req,res) =>{
    try{
        const customers = await custModel.getCustomers();
        res.send(customers);
    }catch (error){
        return res.json(error)
    }
}
let getCustomer = async (req,res) =>{
    try{
        const customer = await custModel.getCustomer(req.params.id);
        res.send(customer);
    }catch (error){
        return res.json(error)
    }
}
let deleteCustomer = async (req,res) =>{
    try{
        const result = await custModel.archive(req.params.id);
        res.send(result);
    }catch (error){
        return res.json(error)
    }
}
let updateCustomer = async (req,res) =>{
    var data;
    if(req.method == 'POST'){
        data = req.body;
        if(data != undefined && data != null){
            let custData = await custModel.updateCustomer(data, req.params.id);
            console.log("custData",custData)
            if (custData == 1) {
                console.log("data.address",data.address)
                await custModel.updateAddress(data.address, req.params.id).then(query => {
                    console.log("query",query)
                    if (query.result == 1) {
                        res.json(
                            {result: 'success', message: 'Updated Succesfully'}
                        )
                    }
                    else {
                        res.json(
                            {result: 'fail', message: "Something wrong"}
                        )
                    }
                });
            }else {
                res.json(
                    {result: 'fail', message: "Something wrong"}
                )
            }
        }
    }
}
module.exports = {
    addCustomer:addCustomer,
    getCustomers:getCustomers,
    getCustomer:getCustomer,
    deleteCustomer:deleteCustomer,
    updateCustomer:updateCustomer
}