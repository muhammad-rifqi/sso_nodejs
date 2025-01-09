const md5 = require('md5');
const { executeQuery } = require('./postgres');
//::::::::::::::::::::::::::::::Start Of LOGIN LOGOUT :::::::::::::::::::::::::::::::::::::::::::::::::::::
const do_login = async (req, res) => {
    const email = req?.body?.email;
    const uri = req.body.url;
    const password = md5(req?.body?.password);
    const sql = await executeQuery("SELECT * FROM users where email = $1 AND password =$2 AND approve = 'Y'", [email, password])
    if (sql?.length > 0) {
        const isLogin = true;
        res.cookie("islogin", isLogin, {
            expires: new Date(Date.now() + 86400000 * 24)
        });
        res.cookie("id", sql[0]?.id, {
            expires: new Date(Date.now() + 86400000 * 24)
        });
        res.cookie("name", sql[0]?.name, {
            expires: new Date(Date.now() + 86400000 * 24)
        });
        res.cookie("roles_id", sql[0]?.roles_id, {
            expires: new Date(Date.now() + 86400000 * 24)
        });
        res.cookie("id_province", sql[0]?.id_province, {
            expires: new Date(Date.now() + 86400000 * 24)
        });
        res.cookie("directorat_id", sql[0]?.directorat_id, {
            expires: new Date(Date.now() + 86400000 * 24)
        });

        res.redirect(uri + '/dashboard');
    } else {
        res.status(200).json({ "success": false })
    }

}

const do_logout = (req, res) => {

    const uri_local = "http://localhost:3005";
    const uri_dev = "http://sso.rifhandi.com";

    res.clearCookie("islogin");
    res.clearCookie("name");
    res.clearCookie("id");
    res.clearCookie("roles_id");
    res.clearCookie("id_province");
    res.clearCookie("directorat_id");
    res.redirect(uri_dev + '/login');
}

//::::::::::::::::::::::::::::::End Of Login :::::::::::::::::::::::::::::::::::::::::::::::::::::
//::::::::::::::::::::::::::::::Start Of Modules:::::::::::::::::::::::::::::::::::::::::::::::::::::
module.exports = {
    do_login,
    do_logout
}
//::::::::::::::::::::::::::::::End Of Module:::::::::::::::::::::::::::::::::::::::::::::::::::::