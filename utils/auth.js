// withAuth - if not logged in present login page
const withAuth = (req, res, next) => {
    if(!req.session.logged_in) {
        res.redirect('/login');
    } else {
        next();
    }
};

const apiAuth = (req, res, next) => {
    if (!req.session.logged_in) {
        res.status(403).json({msg: 'you are not logged in - please log in'})
    } else {
        next();
    }
};

const withoutAuth = (req, res, next) => {
    if (!req.session.logged_in) {
        next();
    } else {
        res.redirect('/');
    }
};

module.exports = {
    withAuth,
    apiAuth,
    withoutAuth
};