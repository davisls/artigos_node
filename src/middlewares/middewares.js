exports.csrfTokenError = (err, req, res, next) => {
    if(err && err.code == 'EBADCSRFTOKEN'){
        return res.render('404Error');
    }
}

exports.csrfTokenMiddeware = (req, res, next) => { 
    res.locals.csrfToken = req.csrfToken();
    next();
}

exports.localErrors = (req, res, next) => { 
    res.locals.errors = req.flash('errors');
    next();
}

exports.localSuccess = (req, res, next) => { 
    res.locals.success = req.flash('success');
    next();
}
