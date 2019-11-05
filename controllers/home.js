const Band = require("../models/band");

exports.getHome = (req, res, next) => {

  console.log("gethome",req.session.user)
    Band.findAll({
        where: {
            userId : req.session.user.id
        }
      }).then(bands=> {
        console.log("bands",JSON.stringify(bands, null, 4));
        return res.render("pages/home",{bands:bands})})
    //   console.log(".....",bands.dataValues);
    // return res.render("pages/home",{bands:bands.dataValues});
  };

exports.createBand = (req, res, next) => {
    console.log("cr id",req.session.user.id)
    return res.render('pages/createBand');
};  

exports.bandAdded = async (req, res) => {

      console.log(" band added");
  const body = req.body;
  console.log("body",body);
  
  if (!body.bandname || !body.bandtype) {
    return res.redirect("/create/band");
  }

  band = await Band.findOne({
    where: {
      name: body.bandname,
      userId: req.session.user.id
    }
  });

  if (band) return res.redirect("/create/band");

  

  try {
    band = await Band.create({
      name: body.bandname,
      type: body.bandtype,
      userId: req.session.user.id

    });
    console.log(band);
  } catch (err) {
    console.log(err);
  }

  return res.redirect("/home");

};

exports.editBand = (req, res, next) => {
  try {
     Band.findOne({
      where : {
        id: req.params.id
      }

    }).then(band=> {
      console.log("band.....",JSON.stringify(band, null, 4));
      return res.render("pages/editBand",{band:band})});
  
  } catch (err) {
    console.log(err);
  }
  
};  

exports.updateBand = (req, res, next) => {

Band.update({ name:  req.body.bandname, type: req.body.bandtype }, {
  where: {
  id: req.params.id
  }
}).then(() => {
  return res.redirect("/home");
});
  
}; 

exports.deleteBand = (req, res, next) => {

Band.destroy({
  where: {
  id: req.params.id
  }
}).then(() => {
  return res.redirect("/home");
});
  
}; 

