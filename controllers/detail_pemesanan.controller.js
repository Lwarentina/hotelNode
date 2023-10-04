/** load model for `detail_pemesanans` table */ 
const detail_pemesananModel = require(`../models/index`).detail_pemesanan 

/** load Operation from Sequelize */ 
const Op = require(`sequelize`).Op

/** create function for read all data */ 
exports.getAlldetail_pemesanan = async (request, response) => { 
    /** call findAll() to get all data */ 
    let detail_pemesanans = await detail_pemesananModel.findAll() 
    return response.json({ 
        success: true, 
        data: detail_pemesanans, 
        message: `All detail_pemesanans have been loaded` 
    }) 
}

/** create function for filter */ 
exports.finddetail_pemesanan = async (request, response) => { 
    /** define keyword to find data */ 
    let keyword = request.body.keyword 
    /** call findAll() within where clause and operation * to find data based on keyword */ 
    let detail_pemesanans = await detail_pemesananModel.findAll({ 
        where: { 
            [Op.or]: [ 
                { id_pemesanan: { [Op.substring]: keyword } }, 
                { id_kamar: { [Op.substring]: keyword } },
                { tgl_akses: { [Op.substring]: keyword } },
                { harga: { [Op.substring]: keyword } },
            ] 
        } 
    })
    return response.json({ 
        success: true, 
        data: detail_pemesanans, 
        message: `All detail_pemesanans have been loaded` 
    }) 
}

/** create function for add new detail_pemesanan */ 
exports.adddetail_pemesanan = (request, response) => { 
    /** prepare data from request */ 
    let newdetail_pemesanan = { 
        id_pemesanan: request.body.id_pemesanan, 
        id_kamar: request.body.id_kamar,
        tgl_akses: request.body.tgl_akses,
        harga: request.body.harga
    } 

        /** execute inserting data to detail_pemesanan's table */ 
        detail_pemesananModel.create(newdetail_pemesanan) .then(result => { 
            /** if insert's process success */ 
            return response.json({ 
                success: true, 
                data: result, 
                message: `New detail_pemesanan has been inserted` 
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

/** create function for update detail_pemesanan */ 
exports.updatedetail_pemesanan = (request, response) => { 
    /** prepare data that has been changed */ 
    let datadetail_pemesanan = { 
        id_pemesanan: request.body.id_pemesanan, 
        id_kamar: request.body.id_kamar,
        tgl_akses: request.body.tgl_akses,
        harga: request.body.harga
    } 

    /** define id detail_pemesanan that will be update */ 
    let iddetail_pemesanan = request.params.id
    
    /** execute update data based on defined id detail_pemesanan */ 
    detail_pemesananModel.update(datadetail_pemesanan, { where: { id: iddetail_pemesanan } }) 
        .then(result => { 
            /** if update's process success */ 
            return response.json({ 
                success: true, 
                message: `Data detail_pemesanan has been updated` 
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
exports.deletedetail_pemesanan = (request, response) => { 
    /** define id detail_pemesanan that will be update */ 
    let iddetail_pemesanan = request.params.id 
    
    /** execute delete data based on defined id detail_pemesanan */ 
    detail_pemesananModel.destroy({ where: { id: iddetail_pemesanan } }) 
        .then(result => { 
            /** if update's process success */ 
            return response.json({ 
                success: true, 
                message: `Data detail_pemesanan has been updated` 
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

