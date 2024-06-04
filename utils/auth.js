const checkAuth = (req, res, next, loggedInAction, notLoggedInAction) => {
    if (!req.session.logged_in) {
        notLoggedInAction(res);
    } else {
        loggedInAction(res, next);
    }
};

const withAuth = (req, res, next) => {
    checkAuth(req, res, next, 
        (res, next) => next(), 
        (res) => res.redirect('/login')
    );
};

const apiAuth = (req, res, next) => {
    checkAuth(req, res, next, 
        (res, next) => next(), 
        (res) => res.status(403).json({msg: 'you are not logged in - please log in'})
    );
};

const withoutAuth = (req, res, next) => {
    checkAuth(req, res, next, 
        (res) => res.redirect('/'), 
        (res, next) => next()
    );
};

module.exports = {
    withAuth,
    apiAuth,
    withoutAuth
};