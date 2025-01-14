const func = require('../config/function');
const ExpertDetailSchema = require('../model/expert_model');
const { ObjectId } = require('bson');
var jwt = require('jsonwebtoken');
const expertRegisterService = async (body) => {
    console.log(body);
    return new Promise(async (resolve, reject) => {
        let model = {};
        model = new ExpertDetailSchema(body);
        await model.validate(async function (err, data) {
            if (err) {
                const keys = Object.keys(err.errors)
                console.log(keys)
                keys.map(ele => {
                    func.msCons.errorJson['message'] = err.errors[ele].path + ' is ' + err.errors[ele].kind
                    return resolve(func.msCons.errorJson)
                })
            } else {
                await model.save(function (err, docs) {
                    if (err) {
                        console.log('ssssssssssss', err.errors)
                        if (err.code === 11000) {
                            Object.keys(err.keyValue)
                            func.msCons.errorJson['message'] = Object.keys(err.keyValue) + ' already exists'
                            return resolve(func.msCons.errorJson)
                        }
                    }
                    else if (!docs || docs.length === 0) {
                        func.msCons.errorJson['message'] = 'Error in inserting data'
                        func.msCons.errorJson['error'] = err
                        return resolve(func.msCons.errorJson)
                    } else {
                        func.msCons.successJson['data'] = docs;
                        return resolve(func.msCons.successJson)
                    }
                });
            }
        });
    })
}

const expertLoginService = async (body) => {
    console.log(body);
    let query = {
        $and: [{
            email: body.email
        }, {
            password: body.password
        }]
    }
    return new Promise((resolve, reject) => {
        ExpertDetailSchema.find(query, function (err, docs) {
            console.log(docs)
            if (!docs || docs.length === 0) {
                func.msCons.notFoundJson['message'] = 'No expert found';
                return resolve(func.msCons.notFoundJson)
            } else if (err) {
                func.msCons.errorJson['message'] = err;
                return resolve(func.msCons.errorJson)
            } else {
                var token = jwt.sign({ id: docs._id }, 'intralogicitsolutions', {
                    expiresIn: 86400 // expires in 24 hours
                });
                docs[0]['token'] = token;
                func.msCons.successJson['data'] = docs;
                return resolve(func.msCons.successJson)
            }
        });
    })
}

module.exports = { expertRegisterService, expertLoginService }