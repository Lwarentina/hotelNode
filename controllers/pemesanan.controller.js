/** load model for `pemesanans` table */ 
const pemesananModel = require(`../models/index`).pemesanan 

/** load Operation from Sequelize */ 
const Op = require(`sequelize`).Op

/** create function for read all data */ 
exports.getAllpemesanan = async (request, response) => { 
    /** call findAll() to get all data */ 
    let pemesanans = await pemesananModel.findAll() 
    return response.json({ 
        success: true, 
        data: pemesanans, 
        message: `All pemesanans have been loaded` 
    }) 
}

/** create function for filter */ 
exports.findpemesanan = async (request, response) => { 
    /** define keyword to find data */ 
    let keyword = request.body.keyword 
    /** call findAll() within where clause and operation * to find data based on keyword */ 
    let pemesanans = await pemesananModel.findAll({ 
        where: { 
            [Op.or]: [ 
                { nomor_pemesanan: { [Op.substring]: keyword } }, 
                { nama_pemesanan: { [Op.substring]: keyword } }, 
                { email_pemesanan: { [Op.substring]: keyword } },
                { tgl_pemesanan: { [Op.substring]: keyword } },
                { tgl_check_in: { [Op.substring]: keyword } },
                { tgl_check_out: { [Op.substring]: keyword } },  
                { nama_tamu: { [Op.substring]: keyword } },   
                { jumlah_kamar: { [Op.substring]: keyword } }, 
                { nomor_pemesanan: { [Op.substring]: keyword } }, 
                { id_tipe_kamar: { [Op.substring]: keyword } },
                { status_pemesanan: { [Op.substring]: keyword } }, 
                { id_user: { [Op.substring]: keyword } } 
            ] 
        } 
    })
    return response.json({ 
        success: true, 
        data: pemesanans, 
        message: `All pemesanans have been loaded` 
    }) 
}

/** create function for add new pemesanan */ 
exports.addpemesanan = (request, response) => { 
    /** prepare data from request */ 
    let newpemesanan = { 
        nomor_pemesanan: request.body.nomor_pemesanan,
        nama_pemesanan: request.body.nama_pemesanan, 
        email_pemesanan: request.body.email_pemesanan,
        tgl_pemesanan: request.body.tgl_pemesanan,
        tgl_check_in: request.body.tgl_check_in,
        tgl_check_out: request.body.tgl_check_out,
        nama_tamu: request.body.nama_tamu,
        jumlah_kamar: request.body.jumlah_kamar,
        id_tipe_pemesanan: request.body.id_tipe_pemesanan,
        status_pemesanan: request.body.status_pemesanan,
        id_user: request.body.id_user
    } 

        /** execute inserting data to pemesanan's table */ 
        pemesananModel.create(newpemesanan) .then(result => { 
            /** if insert's process success */ 
            return response.json({ 
                success: true, 
                data: result, 
                message: `New pemesanan has been inserted` 
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

/** create function for update pemesanan */ 
exports.updatepemesanan = (request, response) => { 
    /** prepare data that has been changed */ 
    let datapemesanan = { 
        nomor_pemesanan: request.body.nomor_pemesanan,
        nama_pemesanan: request.body.nama_pemesanan, 
        email_pemesanan: request.body.email_pemesanan,
        tgl_pemesanan: request.body.tgl_pemesanan,
        tgl_check_in: request.body.tgl_check_in,
        tgl_check_out: request.body.tgl_check_out,
        nama_tamu: request.body.nama_tamu,
        jumlah_kamar: request.body.jumlah_kamar,
        id_tipe_pemesanan: request.body.id_tipe_pemesanan,
        status_pemesanan: request.body.status_pemesanan,
        id_user: request.body.id_user
    } 

    /** define id pemesanan that will be update */ 
    let idpemesanan = request.params.id
    
    /** execute update data based on defined id pemesanan */ 
    pemesananModel.update(datapemesanan, { where: { id: idpemesanan } }) 
        .then(result => { 
            /** if update's process success */ 
            return response.json({ 
                success: true, 
                message: `Data pemesanan has been updated` 
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
exports.deletepemesanan = (request, response) => { 
    /** define id pemesanan that will be update */ 
    let idpemesanan = request.params.id 
    
    /** execute delete data based on defined id pemesanan */ 
    pemesananModel.destroy({ where: { id: idpemesanan } }) 
        .then(result => { 
            /** if update's process success */ 
            return response.json({ 
                success: true, 
                message: `Data pemesanan has been updated` 
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

