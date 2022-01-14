var getParams = function(url) {
    var params = {};
    var parser = document.createElement('a');
    parser.href = url;
    var query = parser.search.substring(1);
    var vars = query.split('&');
    for (var i = 0; i < vars.length; i++) {
        var pair = vars[i].split('=');
        params[pair[0]] = decodeURIComponent(pair[1]);
    }
    return params;
};
console.log(getParams(window.location.href));
var par = getParams(window.location.href);
var text = document.getElementById("text");
text.innerHTML = par.text;
if (par.isSuccess === "true") {
    console.log("if");
    var fail = document.getElementsByClassName("fail")[0];
    fail.style.display = "none";
} else {
    console.log("else");
    var success = document.getElementsByClassName("success")[0];
    success.style.display = "none";
}

setTimeout(function() {
    if (par.isSuccess === "true") {
        location.href = './index.html';
    } else {
        history.back();
    }
}, 1500);