const bodyParser = require("body-parser");
const app = require("../routes/user.routes");
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true }))

const jsonwebtoken = require("jsonwebtoken");
const { response, request } = require("../routes/user.routes");
const md5 = require("md5");
const SECRET_KEY = "secretcode"

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