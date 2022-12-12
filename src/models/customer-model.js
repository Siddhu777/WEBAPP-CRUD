var conn = require('../../config/db.config');
let create = async (data) => { 
    return new Promise(async (resolve, reject) => {
        try {
            let q = conn.query("INSERT INTO tbl_customer (first_name, username, email, phone, dob, gender, password, confirm_password, image, last_name) VALUES (?,?,?,?,?,?,?,?,?,?);", [data.first_name, data.username, data.email, data.phone, data.dob, data.gender, data.password, data.confirm_password, data.image, data.last_name], function (err, results) {    
                if(err){
                    reject(err);
                }else{
                    console.log("results",results)
                    resolve(
                        {result:"success", id: results.insertId}
                        );
                }
            })
            
        } catch (error) {
            reject(error);
        }
    });
}
let insertAddress = async (data) => { 
    return new Promise(async (resolve, reject) => {
        try {
            let q = conn.query("INSERT INTO address (customerid, address, landmark, city, state, country, zipcode) VALUES (?,?,?,?,?,?,?);", [data.customerid, data.address, data.landmark, data.city, data.state, data.country, data.zipcode], function (err, results) {    
                if(err){
                    console.log("err",q.sql)
                    reject(err);
                }else{
                    console.log("results",results)
                    resolve(
                        {result:"success", id: results.insertId}
                        );
                }
            })
            
        } catch (err) {
            reject(err);
        }
    });
}

let getCustomers = () => {
    return new Promise(async (resolve, reject) => {
        try {
           let sql =  conn.query('SELECT * FROM tbl_customer AS c JOIN address AS ad WHERE ad.customerid = c.customerid AND c.status = "active" ', function(err, rows){
                if(err){
                    reject(err.message);
                }else{
                    resolve(rows);
                }
            } )
        } catch (err) {
            reject(err);
        }
    });
}
let getCustomer = (id) => {
    return new Promise(async (resolve, reject) => {
        try {
            conn.query('SELECT * FROM tbl_customer AS c JOIN address AS ad WHERE ad.customerid = c.customerid AND c.status = "active" AND c.customerid = ?', id, function(err, rows){
                if(err){
                    reject(err.message);
                }else{
                    resolve(rows);
                }
            } )
        } catch (err) {
            reject(err);
        }
    });
}
let archive = (id) => {
    let result = {}
    return new Promise(async (resolve, reject) => {
      try {
        conn.query("UPDATE tbl_customer SET status = 'archived' WHERE customerid = ?", id, (err, res) => {
          if (err) {
            result.result = 'fail';
            result.message = err.message;
            reject(result);
          } else {
            result.result = 'success';
            result.message = 'Deleted Successfully';
            resolve(result);
          }
        })
      } catch (err) {
        resolve(err);
      }
    });
}
let updateCustomer = (data, id) => {
    return new Promise(async (resolve, reject) => {
        try {
            conn.query("UPDATE tbl_customer SET first_name = ?, last_name = ?, username = ?, email = ?, phone = ?, dob = ?, gender = ?, password = ?, confirm_password = ?, image = ? WHERE customerid = ?;", [data.first_name,  data.last_name, data.username, data.email, data.phone, data.dob, data.gender, data.password, data.confirm_password, data.image,id], function(err, result){
                if(err){
                    reject(err);
                }else{
                    resolve(result.affectedRows);
                }
            })
        } catch (err) {
            reject(err);
        }
    })
}
let updateAddress = (data, id) => {
    return new Promise(async (resolve, reject) => {
        try {
            conn.query("UPDATE address SET address = ?, city = ?, state = ?, country = ?, zipcode = ? WHERE customerid = ?;", [data.address, data.city, data.state, data.country, data.zipcode,id], function(err, result){
                if(err){
                    reject(err);
                }else{
                    resolve(result.affectedRows);
                }
            })
        } catch (err) {
            reject(err);
        }
    })
}

module.exports = {
    create:create,
    insertAddress:insertAddress,
    getCustomers:getCustomers,
    getCustomer:getCustomer,
    archive:archive,
    updateCustomer:updateCustomer,
    updateAddress:updateAddress
};