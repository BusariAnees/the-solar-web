

const addToCartButtonElement = document.getElementById("cartQuantity");
const cartBadgeElement = document.querySelector('button .badge');

async function addToCart() {
    const productId = addToCartButtonElement.dataset.productid;
    const csrfToken = addToCartButtonElement.dataset.csrf;

  let response
    try{
     response = await
        fetch('/cart/items', {
            method: 'POST',
            body: JSON.stringify({
                productId: productId,
                _csrf: csrfToken,
            }),
            headers:  {
     'Content-Type': 'application/json' //extra metadata that is sent during http request and response 
            }    
        });
    } catch(error) {
        alert('Something went wrong!');
        return;
    }

    if (!response.ok) {
        alert('Something went wrong!');
        return;
    }

    const responseData = await response.json();

    const newTotalQuantity = responseData.newTotalItems;

    cartBadgeElement.textContent = newTotalQuantity;


    }





addToCartButtonElement.addEventListener('click', addToCart);