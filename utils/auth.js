// to authethicate users to make sure they login after their session has expired
const withAuth = (req, res, next) => {
    if (!req.session.user_id){
        res.redirect('/login')
        return
    }else{
        next()
    }

}
// exports the const withAuth
module.exports = withAuth