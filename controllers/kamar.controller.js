/** load model for `kamars` table */ 
const kamarModel = require(`../models/index`).kamar 

/** load Operation from Sequelize */ 
const Op = require(`sequelize`).Op

/** create function for read all data */ 
exports.getAllkamar = async (request, response) => { 
    /** call findAll() to get all data */ 
    let kamars = await kamarModel.findAll() 
    return response.json({ 
        success: true, 
        data: kamars, 
        message: `All kamars have been loaded` 
    }) 
}

/** create function for filter */ 
exports.findkamar = async (request, response) => { 
    /** define keyword to find data */ 
    let keyword = request.body.keyword 
    /** call findAll() within where clause and operation * to find data based on keyword */ 
    let kamars = await kamarModel.findAll({ 
        where: { 
            [Op.or]: [ 
                { nomor_kamar: { [Op.substring]: keyword } }, 
                { id_tipe_kamar: { [Op.substring]: keyword } }
            ] 
        } 
    })
    return response.json({ 
        success: true, 
        data: kamars, 
        message: `All kamars have been loaded` 
    }) 
}

/** create function for add new kamar */ 
exports.addkamar = (request, response) => { 
    /** prepare data from request */ 
    let newkamar = { 
        nomor_kamar: request.body.nomor_kamar, 
        id_tipe_kamar: request.body.id_tipe_kamar
    } 

        /** execute inserting data to kamar's table */ 
        kamarModel.create(newkamar) .then(result => { 
            /** if insert's process success */ 
            return response.json({ 
                success: true, 
                data: result, 
                message: `New kamar has been inserted` 
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

/** create function for update kamar */ 
exports.updatekamar = (request, response) => { 
    /** prepare data that has been changed */ 
    let datakamar = { 
        nomor_kamar: request.body.nomor_kamar, 
        id_tipe_kamar: request.body.id_tipe_kamar
    } 

    /** define id kamar that will be update */ 
    let idkamar = request.params.id
    
    /** execute update data based on defined id kamar */ 
    kamarModel.update(datakamar, { where: { id: idkamar } }) 
        .then(result => { 
            /** if update's process success */ 
            return response.json({ 
                success: true, 
                message: `Data kamar has been updated` 
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
exports.deletekamar = (request, response) => { 
    /** define id kamar that will be update */ 
    let idkamar = request.params.id 
    
    /** execute delete data based on defined id kamar */ 
    kamarModel.destroy({ where: { id: idkamar } }) 
        .then(result => { 
            /** if update's process success */ 
            return response.json({ 
                success: true, 
                message: `Data kamar has been updated` 
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

