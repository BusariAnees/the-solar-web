function createUserSession(req, user, action) {
    req.session.uid = user._id.toString();
    req.session.isAdmin = user.isAdmin;
    req.session.save(action); 
}


module.exports = {
    createUserSession:createUserSession,
}