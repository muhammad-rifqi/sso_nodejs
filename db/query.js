const md5 = require('md5');
const { executeQuery } = require('./config');

//::::::::::::::::::::::::::::::Start Of LOGIN LOGOUT :::::::::::::::::::::::::::::::::::::::::::::::::::::

const do_login = async (req, res) => {
    const email = req?.body?.email;
    const password = md5(req?.body?.password);
    const sql = await executeQuery('SELECT * FROM users where email = ? AND password = ? ', [email, password])
    if (sql?.length > 0) {
        const isLogin = true;
        res.cookie("islogin", isLogin , {
            expires: new Date(Date.now() + 86400000), 
            path: '/',
            secure: true, 
            httpOnly: true 
        });
        res.cookie("id", sql[0]?.id, {
            expires: new Date(Date.now() + 86400000), 
            path: '/',
            secure: true, 
            httpOnly: true 
        });
        res.cookie("name", sql[0]?.name, {
            expires: new Date(Date.now() + 86400000), 
            path: '/',
            secure: true, 
            httpOnly: true 
        });
        res.status(200).json({ "success": true , "data" : sql })
    } else {
        res.status(200).json({ "success": false })
    }

}

const do_logout = (req, res) => {
    res.clearCookie("islogin");
    res.clearCookie("name");
    res.clearCookie("id");
    res.status(200).json({ "success": true })
}


const user_register = async (req, res) => {
     const sql = await executeQuery("insert into news_categories(title,title_en,created_at,updated_at) values(?,?,?,?)",
        [req.body.title, req.body.title_en, cat_datetime, cat_datetime]);
    if (sql) {
        res.redirect('/registers');
    } else {
        res.redirect('/registers');
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