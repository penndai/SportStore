var setCategory = function (category) {
    setView("list");
    customerModel.selectedCategory(category);
    filterProductsByCategory();
}
var setView = function (view) {
    console.log('before set view: ' + this.customerModel.currentView());
    customerModel.currentView(view);
    console.log('after set view: ' + this.customerModel.currentView());
}

var addToCart = function (product) {
    var found = false;
    var cart = customerModel.cart();
    for (var i = 0; i < cart.length; i++) {
        if (cart[i].product.Id == product.Id) {
            found = true;
            count = cart[i].count + 1;
            customerModel.cart.splice(i, 1); //remove the existing product in the cart
            customerModel.cart.push({ //add the new product in the cart, update the count to count +1;
                count: count,
                product: product
            });
            break;
        }
    }

    if (!found) {
        customerModel.cart.push({ count: 1, product: product });
    }

    setView("cart");
}

var removeFromCart = function (productSelection) {
    customerModel.cart.remove(productSelection);
}

var placeOrder = function () {
    var order = {
        Customer: model.username(),
        // each item in the cart is the type of object which has properties {count, product}
        Lines: customerModel.cart().map(function (item) { // defined callback function on each element of an array
            return {
                Count: item.count,
                ProductId: item.product.Id
            }
        })
    };

    saveOrder(order, function () {
        setView("thankyou");
    });
}

model.products.subscribe(function (newProducts) {
    filterProductsByCategory();
    customerModel.productCategories.removeAll();
    customerModel.productCategories.push.apply(customerModel.productCategories,
        model.products().map(function (p) {
            return p.Category;
        })
        .filter(function (value, index, self) {
            return self.indexOf(value) === index; //just get the first category from the array, skip the same category on the other positions.
        }).sort()
    );
});

customerModel.cart.subscribe(function (newCart) {
    customerModel.cartTotal(
        newCart.reduce(
        function (prev, item) {
            return prev + (item.count * item.product.Price);
        }, 0)
    );
    customerModel.cartCount(newCart.reduce(
        function (prev, item) {
            return prev + item.count;
        }, 0));
});

var filterProductsByCategory = function () {
    var category = customerModel.selectedCategory();
    customerModel.filteredProducts.removeAll();
    customerModel.filteredProducts.push.apply(customerModel.filteredProducts,
    model.products().filter(function (p) {
        return category == null || p.Category == category;
    }));
}
$(document).ready(function () {
    getProducts();
})