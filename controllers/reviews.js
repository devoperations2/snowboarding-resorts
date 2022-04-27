const Resort = require('../models/resort');

module.exports = {
  create,
  delete: deleteReview
};

function deleteReview(req, res, next) {
  // Note the cool "dot" syntax to query on the property of a subdoc
  Resort.findOne({'reviews._id': req.params.id, 'reviews.user': req.user._id}).then(function(resort) {
    // Rogue user!
    if (!resort) return res.redirect('/resorts');
    // Remove the review using the remove method available on Mongoose arrays
    resort.reviews.remove(req.params.id);
    // Save the updated resort
    resort.save().then(function() {
      // Redirect back to the resort's show view
      res.redirect(`/resorts/${resort._id}`);
    }).catch(function(err) {
      // Let Express display an error
      return next(err);
      // res.redirect(`/resorts/${resort._id}`);
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
      res.redirect(`/resorts/${resort_id}`);
    });
  });
}