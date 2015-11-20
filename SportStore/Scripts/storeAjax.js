var sendRequest = function (url, verb, data, successCallback, errorCallback, options) {
    var requestOptions = options || {};
    requestOptions.type = verb;
    requestOptions.success = successCallback;
    requestOptions.error = errorCallback;

    if (!url || !verb) {
        errorCallback(401, "URL and HTTP verb required");
    }

    if (data) {
        requestOptions.data = data;
    }
    $.ajax(url, requestOptions);
}

var setDefaultCallbacks = function (successCallback, errorCallback) {
    $.ajaxSetup({
        complete: function (jqXHR, status) {
            if (jqXHR.status >= 200 && jqXHR.status < 300) {
                successCallback(jqXHR.responseJSON);
            } else {
                errorCallback(jqXHR.status, jqXHR.statusText);
            }
        }
    });
}

//sets headers for all subsequent Ajax requests by calling the jQuery $.ajaxSetup
var setAjaxHeaders = function (requestHeaders) {
    $.ajaxSetup({ headers: requestHeaders });
}