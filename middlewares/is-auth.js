module.exports = (req, res, next) => {
  
  console.log("in auth js........",req.session.user)
 if (req.session.user) 
     next();
 else
     return res.redirect("/auth/signup");
  //  next();
  };