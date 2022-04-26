module.exports = {
    index
};
function index(req, res) {
    res.render('resorts/index', {title: 'Resorts'})
}