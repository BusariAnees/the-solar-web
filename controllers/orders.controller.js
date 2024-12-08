const stripe = require('stripe')('sk_test_51QTiBwRpCowEiAwJhqRAOjDqjQw31A2equnLlonEUqIMXwGH27N83MthC5BsU7rsbfqoe0elr0wH8p1bHgw4B1U200vFhJgS9m');


const Order = require('../models/order.model');
const Auth = require('../models/auth');


async function getOrders(req, res,next) {
  let orders
    try {
     orders = await Order.findAllForUser(res.locals.uid);
      res.render('customer/orders/all-orders', {
        orders: orders,
       

      });
    } catch (error) {
      next(error);
    }

  }


async function addOrder (req, res, next) {
    const cart = res.locals.cart;
    let userDocument
    try {
         userDocument = await Auth.findById(res.locals.uid);
     
    } catch (error) {
        return next(error);
    }
          
    const order = new Order(cart, userDocument,);
    console.log(userDocument)
    try {
       await  order.save();
    } catch (error) {
        next(error);
        return;
    }


   req.session.cart = null;



  const session = await stripe.checkout.sessions.create({
    line_items: cart.item.map(function(item) {
      return  {
        // Provide the exact Price ID (for example, pr_1234) of the product you want to sell
        price_data: {
          currency: 'usd',    // created by us
          product_data: {
            name: item.product.title,
          },
          unity_amount: +item.product.price.toFixed(2) * 100 // its in pennies thats why it is multiplied by 100
        },
        quantity: item.quantity,
      }
    }) ,
    mode: 'payment',
    success_url: `http://localhost:3000/orders/success`,
    cancel_url: `http://localhost:3000/orders/failure`,
});

  res.redirect(303, session.url);

}

function getSuccess(req, res) {
  res.render('customer/orders/success');
}

function getFailure(req, res) {
  res.render('customer/orders/failure');
}

module.exports = {
    addOrder: addOrder,
    getOrders: getOrders,
    getSuccess: getSuccess,
    getFailure: getFailure,
}