const jsonwebtoken = require("jsonwebtoken");
const md5 = require("md5");
const SECRET_KEY = "secretcode"
const userModel = require("../models/index").user
const upload = require(`./upload_fotouser`).single(`fotouser`)
const path = require(`path`);
const fs = require(`fs`);

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
    let user = await userModel.findAll();
    if (user.length === 0) {
      return response.status(400).json({
        success: false,
        message: "nothing user to show",
      });
    } else {
      return response.json({
        success: true,
        data: user,
        message: `All User have been loaded`,
      });
    }
  };

/** create function for filter */ 
exports.finduser = async (request, response) => {
    let id = request.params.id;
    if (!id) {
      return response.status.json({
        success: false,
        message: "masukkan id user di url",
      });
    } else {
      let user = await userModel.findOne({
        where: {
          [Op.and]: [{ id: id }],
        },
      });
  
      if (!user) {
        return response.status(400).json({
          success: false,
          message: "nothing user to show",
        });
      } else {
        return response.json({
          success: true,
          data: user,
          message: `User have been loaded`,
        });
      }
    }
  };

/** create function for add new user */ 
exports.adduser = (request, response) => {
    upload(request, response, async (error) => {
      if (error) {
        return response.status(400).json({ message: error });
      }
      if (!request.file) {
        return response.status(400).json({
          message: `harap mengupload foto dan pastikan semua sudah terisi`,
        });
      }
  
      let newUser = {
        nama_user: request.body.nama_user,
        foto: request.file.filename,
        email: request.body.email,
        password: md5(request.body.password),
        role: request.body.role,
      };
  
      let user = await userModel.findAll({
        where: {
          [Op.or]: [{ nama_user: newUser.nama_user }, { email: newUser.email }],
        },
      });
  
      if (
        newUser.nama_user === "" ||
        newUser.email === "" ||
        newUser.password === "" ||
        newUser.role === ""
      ) {
        //karena gagal hapus foto yang masuk
        const oldFotoUser = newUser.foto;
        const patchFoto = path.join(__dirname, `../foto_user`, oldFotoUser);
        if (fs.existsSync(patchFoto)) {
          fs.unlink(patchFoto, (error) => console.log(error));
        }
  
        return response.status(400).json({
          success: false,
          message: "Harus diisi semua",
        });
      } else {
        //nama dan email tidak boleh sama
        if (user.length > 0) {
          //karena gagal hapus foto yang masuk
          const oldFotoUser = newUser.foto;
          const patchFoto = path.join(__dirname, `../foto_user`, oldFotoUser);
          if (fs.existsSync(patchFoto)) {
            fs.unlink(patchFoto, (error) => console.log(error));
          }
          return response.status(400).json({
            success: false,
            message: "Cari nama atau email lain",
          });
        } else {
          console.log(newUser);
          userModel
            .create(newUser)
            .then((result) => {
              return response.json({
                success: true,
                data: result,
                message: `New User has been inserted`,
              });
            })
            .catch((error) => {
              return response.status(400).json({
                success: false,
                message: error.message,
              });
            });
        }
      }
    });
  };

/** create function for update user */ 
exports.updateuser = (request, response) => {
    upload(request, response, async (error) => {
      if (error) {
        return response.status(400).json({ message: error });
      }
  
      let idUser = request.params.id;
  
      let getId = await userModel.findAll({
        where: {
          [Op.and]: [{ id: idUser }],
        },
      });
  
      if (getId.length === 0) {
        return response.status(400).json({
          success: false,
          message: "User dengan id tersebut tidak ada",
        });
      }
  
      let dataUser = {
        nama_user: request.body.nama_user,
        email: request.body.email,
        password: md5(request.body.password),
        role: request.body.role,
        foto: getId.foto,
      };
  
      if (request.file) {
        const selectedUser = await userModel.findOne({
          where: { id: idUser },
        });
  
        const oldFotoUser = selectedUser.foto;
  
        const patchFoto = path.join(__dirname, `../foto_user`, oldFotoUser);
  
        if (fs.existsSync(patchFoto)) {
          fs.unlink(patchFoto, (error) => console.log(error));
        }
  
        dataUser.foto = request.file.filename;
      }
  
      if (
        dataUser.nama_user === "" ||
        dataUser.email === "" ||
        dataUser.password === "" ||
        dataUser.role === ""
      ) {
        return response.status(400).json({
          success: false,
          message:
            "Harus diisi semua kalau tidak ingin merubah isi dengan value sebelumnya",
        });
      }
  
      let user = await userModel.findAll({
        where: {
          [Op.and]: [
            { id: { [Op.ne]: idUser } },
            {
              [Op.or]: [
                { nama_user: dataUser.nama_user },
                { email: dataUser.email },
              ],
            },
          ],
        },
      });
  
      if (user.length > 0) {
        return response.status(400).json({
          success: false,
          message: "Cari nama atau email lain",
        });
      }
  
      userModel
        .update(dataUser, { where: { id: idUser } })
        .then((result) => {
          return response.json({
            success: true,
            message: `Data user has been updated`,
          });
        })
        .catch((error) => {
          return response.status(400).json({
            success: false,
            message: error.message,
          });
        });
    });
  };

/** create function for delete data */
exports.deleteuser = async (request, response) => {
    let idUser = request.params.id;
  
    let getId = await userModel.findAll({
      where: {
        [Op.and]: [{ id: idUser }],
      },
    });
  
    if (getId.length === 0) {
      return response.status(400).json({
        success: false,
        message: "User dengan id tersebut tidak ada",
      });
    }
  
    const user = await userModel.findOne({ where: { id: idUser } });
  
    const oldFotoUser = user.foto;
  
    const patchFoto = path.join(__dirname, `../foto_user`, oldFotoUser);
  
    if (fs.existsSync(patchFoto)) {
      fs.unlink(patchFoto, (error) => console.log(error));
    }
  
    userModel
      .destroy({ where: { id: idUser } })
  
      .then((result) => {
        return response.json({
          success: true,
          message: `data user has ben delete where id_user :` + idUser,
        });
      })
      .catch((error) => {
        return response.status(400).json({
          success: false,
          message: error.message,
        });
      });
  };