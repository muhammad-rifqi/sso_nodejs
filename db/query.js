const md5 = require('md5');
const { executeQuery } = require('./config');

//::::::::::::::::::::::::::::::Start Of LOGIN LOGOUT :::::::::::::::::::::::::::::::::::::::::::::::::::::

const do_login = async (req, res) => {
    const email = req?.body?.email;
    const password = md5(req?.body?.password);
    const sql = await executeQuery('SELECT * FROM users where email = ? AND password = ? ', [email, password])
    if (sql?.length > 0) {
        const isLogin = true;
        res.cookie("islogin", isLogin);
        res.cookie("id", sql[0]?.id);
        res.cookie("name", sql[0]?.name);
        res.redirect("/dashboard");
    } else {
        res.redirect("/");
    }

}

const do_logout = (req, res) => {
    res.clearCookie("islogin");
    res.clearCookie("name");
    res.clearCookie("id");
    res.redirect("/");
}


const user_register = async (req, res) => {
     const sql = await executeQuery("insert into news_categories(title,title_en,created_at,updated_at) values(?,?,?,?)",
        [req.body.title, req.body.title_en, cat_datetime, cat_datetime]);
    if (sql) {
        res.redirect('/nc');
    } else {
        console.log(sql)
        res.redirect('/nc');
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