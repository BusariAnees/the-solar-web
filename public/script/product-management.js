const deleteProductButtonElements = document.querySelectorAll('.product-item button');

async function deleteProduct (event) {
 const buttonElement = event.target;
 const productId = buttonElement.dataset.productid;
 const csrfToken = buttonElement.dataset.csrf;

 const response = await fetch('/admin/products/' + productId + '?_csrf=' + csrfToken, {
    method: 'DELETE'
 });   //if you are sending the http request from a different domain you inlude the name at the start e.g localhost3000/admin/products

 if(!response.ok) {
    alert('Something went wrong!');
    return;
 }
buttonElement.parentElement.parentElement.parentElement.parentElement.remove();

}

for (const deleteProductButtonElement of deleteProductButtonElements) {
    deleteProductButtonElement.addEventListener('click', deleteProduct);
}
