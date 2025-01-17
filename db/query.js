// const md5 = require('md5');
const { executeQuery } = require('./postgres');
//::::::::::::::::::::::::::::::Start Of LOGIN LOGOUT :::::::::::::::::::::::::::::::::::::::::::::::::::::
const do_login = async (req, res) => {
    const email = req?.body?.email;
    const uri = req.body.url;
    // const password = md5(req?.body?.password);
    // password = $2
    const sql = await executeQuery("SELECT * FROM users where email = $1 AND users.approve = 'Y' ", [email])
    if (sql?.length > 0) {
        const isLogin = true;
        res.cookie("islogin", isLogin, {
            expires: new Date(Date.now() + 86400000 * 24),
            domain: '.rifhandi.com',
            secure: true,
            httpOnly: false,
            sameSite: 'None',
            overwrite: true,
        });
        res.cookie("id", sql[0]?.id, {
            expires: new Date(Date.now() + 86400000 * 24),
            domain: '.rifhandi.com',
            secure: true,
            httpOnly: false,
            sameSite: 'None',
            overwrite: true,
        });
        res.cookie("name", sql[0]?.name, {
            expires: new Date(Date.now() + 86400000 * 24),
            domain: '.rifhandi.com',
            secure: true,
            httpOnly: false,
            sameSite: 'None',
            overwrite: true,
        });
        res.cookie("roles_id", sql[0]?.role_id, {
            expires: new Date(Date.now() + 86400000 * 24),
            domain: '.rifhandi.com',
            secure: true,
            httpOnly: false,
            sameSite: 'None',
            overwrite: true,
        });
        res.cookie("id_province", sql[0]?.id_province, {
            expires: new Date(Date.now() + 86400000 * 24),
            domain: '.rifhandi.com',
            secure: true,
            httpOnly: false,
            sameSite: 'None',
            overwrite: true,
        });
        res.cookie("directorat_id", sql[0]?.directorat_id, {
            expires: new Date(Date.now() + 86400000 * 24),
            domain: '.rifhandi.com',
            secure: true,
            httpOnly: false,
            sameSite: 'None',
            overwrite: true,
        });
        // res.redirect(uri + '/dashboard');
        res.status(200).json({ "success": true, "callback": uri + '/dashboard' });
    } else {
        res.status(200).json({ "success": false, "callback": uri + '/dashboard' })
    }

}

const do_logout = (req, res) => {

    const uri_local = "http://localhost:3005";
    const uri_dev = "https://sso.rifhandi.com";

    res.clearCookie("islogin", { domain: ".rifhandi.com" });
    res.clearCookie("name", { domain: ".rifhandi.com" });
    res.clearCookie("id", { domain: ".rifhandi.com" });
    res.clearCookie("roles_id", { domain: ".rifhandi.com" });
    res.clearCookie("id_province", { domain: ".rifhandi.com" });
    res.clearCookie("directorat_id", { domain: ".rifhandi.com" });
    res.redirect(uri_dev + '/login');
}

//::::::::::::::::::::::::::::::End Of Login :::::::::::::::::::::::::::::::::::::::::::::::::::::
//::::::::::::::::::::::::::::::Start Of Modules:::::::::::::::::::::::::::::::::::::::::::::::::::::
module.exports = {
    do_login,
    do_logout
}
//::::::::::::::::::::::::::::::End Of Module:::::::::::::::::::::::::::::::::::::::::::::::::::::