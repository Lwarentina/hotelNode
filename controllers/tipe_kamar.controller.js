/** load model for `tipe_kamars` table */ 
const tipe_kamarModel = require(`../models/index`).tipe_kamar 

/** load Operation from Sequelize */ 
const Op = require(`sequelize`).Op

/** create function for read all data */ 
exports.getAlltipe_kamar = async (request, response) => { 
    /** call findAll() to get all data */ 
    let tipe_kamars = await tipe_kamarModel.findAll() 
    return response.json({ 
        success: true, 
        data: tipe_kamars, 
        message: `All tipe_kamars have been loaded` 
    }) 
}

/** create function for filter */ 
exports.findtipe_kamar = async (request, response) => { 
    /** define keyword to find data */ 
    let keyword = request.body.keyword 
    /** call findAll() within where clause and operation * to find data based on keyword */ 
    let tipe_kamars = await tipe_kamarModel.findAll({ 
        where: { 
            [Op.or]: [  
                { id_tipe_kamar: { [Op.substring]: keyword } },
                { nama_tipe_kamar: { [Op.substring]: keyword } },
                { harga: { [Op.substring]: keyword } },
                { deskripsi: { [Op.substring]: keyword } },
                { foto: { [Op.substring]: keyword } }
            ] 
        } 
    })
    return response.json({ 
        success: true, 
        data: tipe_kamars, 
        message: `All tipe_kamars have been loaded` 
    }) 
}

/** create function for add new tipe_kamar */ 
exports.addtipe_kamar = (request, response) => { 
    /** prepare data from request */ 
    let newtipe_kamar = {  
        id_tipe_kamar: request.body.id_tipe_kamar,
        nama_tipe_kamar: request.body.nama_tipe_kamar,
        harga: request.body.harga,
        deskripsi: request.body.deskripsi,
        foto: request.body.foto
    } 

        /** execute inserting data to tipe_kamar's table */ 
        tipe_kamarModel.create(newtipe_kamar) .then(result => { 
            /** if insert's process success */ 
            return response.json({ 
                success: true, 
                data: result, 
                message: `New tipe_kamar has been inserted` 
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

/** create function for update tipe_kamar */ 
exports.updatetipe_kamar = (request, response) => { 
    /** prepare data that has been changed */ 
    let datatipe_kamar = { 
        id_tipe_kamar: request.body.id_tipe_kamar,
        nama_tipe_kamar: request.body.nama_tipe_kamar,
        harga: request.body.harga,
        deskripsi: request.body.deskripsi,
        foto: request.body.foto
    } 

    /** define id tipe_kamar that will be update */ 
    let idtipe_kamar = request.params.id
    
    /** execute update data based on defined id tipe_kamar */ 
    tipe_kamarModel.update(datatipe_kamar, { where: { id: idtipe_kamar } }) 
        .then(result => { 
            /** if update's process success */ 
            return response.json({ 
                success: true, 
                message: `Data tipe_kamar has been updated` 
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
exports.deletetipe_kamar = (request, response) => { 
    /** define id tipe_kamar that will be update */ 
    let idtipe_kamar = request.params.id 
    
    /** execute delete data based on defined id tipe_kamar */ 
    tipe_kamarModel.destroy({ where: { id: idtipe_kamar } }) 
        .then(result => { 
            /** if update's process success */ 
            return response.json({ 
                success: true, 
                message: `Data tipe_kamar has been updated` 
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

