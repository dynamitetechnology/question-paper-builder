module.exports = {
    indexPage: (req, res, next) => {
        res.render('index');
    },

    loginPage: (req, res, next) => {
        res.render('admin/login');
    },

    register: (req, res, next) => {
        res.render('admin/register');
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