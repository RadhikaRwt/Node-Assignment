const User = require("../models/user");

exports.getLogin = (req, res, next) => {
  return res.render('auth/login');
};
exports.getSignup = (req, res, next) => {
    return res.render('auth/signup');
};



exports.postLogin = (req, res, next) => {
 
    const body = req.body;
    
    if (!body.email || !body.password) return res.redirect("/auth/login");
  
     

    User.findOne({
      where: {
        email: body.email
      }
    })
      .then(user => {
        let loadedUser = user;
        if (!user) return res.status(404).json({ error: "User not found!" });
       // as user is created now, initialize session with login status
          
          req.session.user = {
            id: user.id,
            email: user.email,
            username: user.username
          };
        return res.redirect("/home");
      
      })
      .catch(err => console.log(err));
};

module.exports.postSignup = async (req, res) => {

      
      const body = req.body;
     
      
      if (!body.email || !body.password) {
        return res.redirect("/auth/signup");
      }
    
      user = await User.findOne({
        where: {
          email: body.email
        }
      });
    
      if (user) return res.redirect("/auth/signup");
    
      
    
      try {
        user = await User.create({
          email: body.email,
          password: body.password
        });
        console.log(user);
      } catch (err) {
        console.log(err);
      }
      req.session.user = {
        id: user.id,
        email: user.email,
        username: user.username
      };
  
      return res.redirect("/home");

  };

