function notFound(req, res, next){
    next({ 
        status: 404, 
        message: `Ooooof. Sorry, this path does not exist: ${req.originalUrl}`
    })
}

module.exports = notFound;