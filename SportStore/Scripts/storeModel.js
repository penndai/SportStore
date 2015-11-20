//client-side model, which I will use to store the product and order data and keep track of
//the client application state
var model = {
    products: ko.observableArray([]),
    orders: ko.observableArray([]),
    authenticated: ko.observable(false),
    username: ko.observable(null),
    password: ko.observable(null),
    //This property is set to the error string that will be displayed to the user when an Ajax request fails
    error: ko.observable(""),
    //use this property to decide when to display error messages to the user
    gotError: ko.observable(false)
};

$(document).ready(function () {
    ko.applyBindings();
    setDefaultCallbacks(function (data) {
        if (data) {
            console.log("---Begin Success---");
            console.log(JSON.stringify(data));
            console.log("---End Success---");
        } else {
            console.log("Success (no data)");
        }
        model.gotError(false);
    },
    function (statusCode, statusText) {
        console.log("Error: " + statusCode + " (" + statusText + ")");
        model.error(statusCode + " (" + statusText + ")");
        model.gotError(true);
    });
});

