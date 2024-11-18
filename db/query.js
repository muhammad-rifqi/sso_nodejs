const md5 = require('md5');
const { executeQuery } = require('./config');
//::::::::::::::::::::::::::::::Start Of LOGIN LOGOUT :::::::::::::::::::::::::::::::::::::::::::::::::::::
const do_login = async (req, res) => {
    const email = req?.body?.email;
    const uri = req.body.url;
    const password = md5(req?.body?.password);
    const sql = await executeQuery('SELECT * FROM users where email = ? AND password = ? ', [email, password])
    if (sql?.length > 0) {
        const isLogin = true;
        res.cookie("islogin", isLogin , {
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
        res.redirect(uri+'/dashboard');
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
    res.redirect(uri_dev+'/login');
}

const user_register = async (req, res) => {
    const passwords = md5(req?.body?.password);
     const sql = await executeQuery("insert into users(name,email,password) values(?,?,?)",
        [req.body.username, req.body.email, passwords]);
    if (sql) {
        res.redirect('/register');
    } else {
        res.redirect('/register');
    }
}

//::::::::::::::::::::::::::::::End Of Login :::::::::::::::::::::::::::::::::::::::::::::::::::::
//::::::::::::::::::::::::::::::Start Of Modules:::::::::::::::::::::::::::::::::::::::::::::::::::::
module.exports = {
    do_login,
    do_logout,
    user_register
}
//::::::::::::::::::::::::::::::End Of Module:::::::::::::::::::::::::::::::::::::::::::::::::::::