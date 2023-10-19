const jsonwebtoken = require("jsonwebtoken");
const md5 = require("md5");
const SECRET_KEY = "secretcode"
const userModel = require("../models/index").user

exports.login = async (request, response) => {
    try {
        const params = {
            email: request.body.email,
            password: md5(request.body.password),
        }

        const findUser = await userModel.findOne({ where: params });
        if (findUser == null){
            return response.status(400).json({
                message: "gws"
            });
        }
        let tokenPayload = {
            id_user: findUser.id,
            email: findUser.email,
            role: findUser.role,
            nama_user: findUser.nama_user,
        };
        tokenPayload = JSON.stringify(tokenPayload);
        let token = await jsonwebtoken.sign(tokenPayload, SECRET_KEY);

        return response.status(200).json({
            message: "congrats",
            data: {
                token: token,
                id_user: findUser.id_user,
                nama_user: findUser.nama_user,
                email: findUser.email,
                role: findUser.role,
            }
        })
    } catch (error) {
        console.log(error)
        return response.status(400).json({
            message: error,
        })
    }
};

exports.LoginRegister = async (request, response) => {
    const email = request.body.email;
    let user = await userModel.findAll({
        where: { role: "customer", email: email },
    })
    if (user.leght === 0) {
        let newUser = {
            nama_user: request.body.nama_user,
            foto: request.body.linkFoto,
            email: email,
            role: "customer",
        };

        if (newUser.nama_user === "" || newUser.email === "") {
            return response.status(400).json({
                success: false,
                message: "minimal ngisi",
            })
        } else {
            userModel
                .create(newUser)
                .create((result) => {
                    return response.json({
                        success: true,
                        data: result,
                        message: "new user! hello there."
                    })
                })
                .catch((error) => {
                    return response.status(400).json({
                        success: false,
                        message: error.message,
                    })
                })
        }
    }
}

/** create function for read all data */ 
exports.getAlluser = async (request, response) => { 
    /** call findAll() to get all data */ 
    let users = await userModel.findAll() 
    return response.json({ 
        success: true, 
        data: users, 
        message: `All users have been loaded` 
    }) 
}

/** create function for filter */ 
exports.finduser = async (request, response) => { 
    /** define keyword to find data */ 
    let keyword = request.body.keyword 
    /** call findAll() within where clause and operation * to find data based on keyword */ 
    let users = await userModel.findAll({ 
        where: { 
            [Op.or]: [ 
                { nama_user: { [Op.substring]: keyword } }, 
                { password: { [Op.substring]: keyword } }, 
                { email: { [Op.substring]: keyword } } 
            ] 
        } 
    })
    return response.json({ 
        success: true, 
        data: users, 
        message: `All users have been loaded` 
    }) 
}

/** create function for add new user */ 
exports.adduser = (request, response) => { 
    /** prepare data from request */ 
    let newuser = { 
        nama_user: request.body.nama_user, 
        email: request.body.email, 
        password: md5(request.body.password), 
        foto: request.body.foto, 
        role: request.body.role
    } 

        /** execute inserting data to user's table */ 
        userModel.create(newuser) .then(result => { 
            /** if insert's process success */ 
            return response.json({ 
                success: true, 
                data: result, 
                message: `New user has been inserted` 
            }) 
        }) 
        .catch(error => { 
            /** if insert's process fail */ 
            return response.json({ 
                success: false, 
                message: error.message 
            }) 
        }) 
}

/** create function for update user */ 
exports.updateuser = (request, response) => { 
    /** prepare data that has been changed */ 
    let datauser = { 
        nama_user: request.body.nama_user, 
        email: request.body.email, 
        password: request.body.password, 
        foto: request.body.foto,
        role: request.body.role 
    } 

    /** define id user that will be update */ 
    let iduser = request.params.id
    
    /** execute update data based on defined id user */ 
    userModel.update(datauser, { where: { id: iduser } }) 
        .then(result => { 
            /** if update's process success */ 
            return response.json({ 
                success: true, 
                message: `Data user has been updated` 
            }) 
        }) 
        .catch(error => { 
            /** if update's process fail */ 
            return response.json({ 
                success: false, 
                message: error.message 
            }) 
        }) 
}

/** create function for delete data */
exports.deleteuser = (request, response) => { 
    /** define id user that will be update */ 
    let iduser = request.params.id 
    
    /** execute delete data based on defined id user */ 
    userModel.destroy({ where: { id: iduser } }) 
        .then(result => { 
            /** if update's process success */ 
            return response.json({ 
                success: true, 
                message: `Data user has been updated` 
            }) 
        }) 
        .catch(error => { 
            /** if update's process fail */ 
            return response.json({ 
                success: false, 
                message: error.message 
            }) 
        }) 
}