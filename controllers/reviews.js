const Resort = require('../models/resort');

module.exports = {
  create,
  delete: deleteReview,
  update
  
};

function update(req, res) {
  Resort.findOne({'reviews._id': req.params.id}, function(err, resort) {
      const review = resort.reviews.id(req.params.id);
      if (!review.user.equals(req.user._id)) return res.redirect(`/resorts/${resort._id}`);
      review.content = req.body.content;
      resort.save(function(err) {
          res.redirect(`/resorts/${resort._id}`);
      });
  });
}

function deleteReview(req, res, next) {
  Resort.findOne({'reviews._id': req.params.id}).then(function(resort) {
    const review = resort.reviews.id(req.params.id);
    if (!review.user.equals(req.user._id)) return res.redirect(`/resorts/${resorts._id}`);
    review.remove();
    resort.save().then(function() {
      res.redirect(`/resorts/${resort._id}`);
    }).catch(function(err) {
      return next(err);
    });
  });
}





function create(req, res) {
  Resort.findById(req.params.id, function(err, resort) {
    req.body.user = req.user._id;
    req.body.userName = req.user.name;
    req.body.userAvatar =  req.user.avatar;
    resort.reviews.push(req.body);
    // Save the updated resort doc
    resort.save(function(err) {
      // Step 5 says to redirect
      res.redirect(`/resorts/${resort._id}`);
    });
  });
}