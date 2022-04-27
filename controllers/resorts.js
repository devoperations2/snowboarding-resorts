const Resort = require('../models/resort');

module.exports = {
    index,
    new: newResort,
    create
};

function index(req, res) {
    Resort.find({}, function(err, resorts){
        
        res.render('resorts/index', {title: 'Resorts', resorts})
    })
}
function newResort(req, res) {
    res.render('resorts/new', {title:'Add Resort'});
}

function create(req,res) {
    req.body.user = req.user._id
    console.log(req.body)
    let resort = new Resort(req.body)
    resort.save(function(err){
        if (err) return res.redirect('/resorts/new')
        res.redirect('/resorts')
    })  
}


