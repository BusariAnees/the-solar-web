const Order = require('../models/order.model');
const Auth = require('../models/auth');

function getOrders(req, res) {
    res.render('customer/orders/all-orders');
}


async function addOrder (req, res, next) {
    const cart = res.locals.cart;
    let userDocument

    try {
         userDocument = await Auth.findById(res.locals.uid);
    } catch (error) {
        return next(error);
    }
  

    const order = new Order(cart, userDocument);
    try {
       await  order.save();
    } catch (error) {
        next(error);
        return;
    }

   req.session.cart = null;

    res.redirect('/orders');


}

module.exports = {
    addOrder: addOrder,
    getOrders: getOrders,
}