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
        res.redirect(uri+'/dashboard');
    } else {
        res.status(200).json({ "success": false })
    }

}

const do_logout = (req, res) => {
    res.clearCookie("islogin");
    res.clearCookie("name");
    res.clearCookie("id");
    res.redirect('http://localhost:3005/login');
}


const user_register = async (req, res) => {
    const passwords = md5(req?.body?.password);
     const sql = await executeQuery("insert into users(name,email,password) values(?,?,?)",
        [req.body.username, req.body.email, passwords]);
    if (sql) {
        res.status(200).json({ "success": true})
    } else {
        res.status(200).json({ "success": false})
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