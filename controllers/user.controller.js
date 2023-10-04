/** load model for `users` table */ 
const userModel = require(`../models/index`).user 

/** load Operation from Sequelize */ 
const Op = require(`sequelize`).Op

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
        password: request.body.password, 
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