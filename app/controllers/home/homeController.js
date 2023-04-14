const Role =  require('../../modal/Role')

module.exports = {
    indexPage: (req, res, next) => {
        res.render('index');
    },

    loginPage: (req, res, next) => {
        res.render('dashboard/login');
    },

    register: (req, res, next) => {
        Role.findAllRole().then(result=>{
            console.log('result::::::::::::', result.rows)
            res.render('dashboard/register',{
                roles: result.rows
            });
        })
        
    },

    menu: (req, res, next) => {
        res.render('menu');
    },

    blog: (req, res, next) => {
        res.render('blog');
    },

    event: (req, res, next) => {
        res.render('event');
    },

    reservation: (req, res, next) => {
        res.render('reservation');
    }
}