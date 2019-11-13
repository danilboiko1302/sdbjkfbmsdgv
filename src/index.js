
var products = [];
var category_id = 1;
jQuery.ajax({
    url: 'https://nit.tron.net.ua/api/product/list',
    method: 'get',
    dataType: 'json',
    success: function (json) {
        var i = 0;
        for (var i = 0; i < json.length; i++)
            products.push(json[i]);

        showProducts();

    },
    error: function (xhr) {
        alert("An error occured: " + xhr.status + " " + xhr.statusText);
    },
});

function changeCategories() {
    category_id = document.getElementById('categoriesList').value;
    jQuery.ajax({
        url: 'https://nit.tron.net.ua/api/product/list/category/' + category_id,
        method: 'get',
        dataType: 'json',
        success: function (json) {
            products = [];
            for (var i = 0; i < json.length; i++)
                products.push(json[i]);

            showProducts();

        },
        error: function (xhr) {
            alert("An error occured: " + xhr.status + " " + xhr.statusText);
        },
    });
}

function showProducts() {
    var productsContainer = document.getElementById('products');
    productsContainer.innerHTML = " ";
    for (var i = 0; i < products.length; i++) {
        var specialPrice = "";
        if (products[i].special_price != null) {
            specialPrice = "Special price: " + products[i].special_price;
        }
        productsContainer.innerHTML += "<div class=\"col-md-4 container-product\"><div class=\"product\"><button style=\"border: none\" " +
            "class=\"btn\" data-toggle=\"modal\" data-target=\"#container-products" + products[i].id +
            "\"><img src=\"" + products[i].image_url + "\" class=\"img-fluid\" style=\"max-height: 200px\">" +
            "</button><div class=\"modal\" id=\"container-products" + products[i].id + "\" style=\"background-color: rgba(0, 0, 0, 0.3)\">" +
            "<div class=\"modal-dialog\"><div class=\"modal-content\"><div class=\"modal-header\"><h4 class=\"modal-title\">"
            + products[i].name + "</h4><button type=\"button\" class=\"close\" data-dismiss=\"modal\">&times;</button></div><div class=\"modal-body\">"
            + products[i].description + "<img src=\"" + products[i].image_url + "\" class=\"img-fluid\" style=\"max-height: 250px\">" + "</div><div class=\"modal-footer\"><button type=\"button\" class=\"btn btn-danger\" data-dismiss=\"modal\">" +
            "Close</button></div></div></div></div></div><div class=\"text-product\"><p>" + products[i].name + "</p><br>"
            + products[i].price + ' UAH' + "<br>" + specialPrice + "</div><div class=\"button-group\"><button class=\"btn red-button addToCart\" id = " + products[i].id + " style=\"width: 90%\">" +
            "Buy</button></div></div>";
    }
}

var categories = [];

function Category(id, name, description) {
    this.id = id;
    this.name = name;
    this.description = description;
}

jQuery.ajax({
    url: 'https://nit.tron.net.ua/api/category/list',
    method: 'get',
    dataType: 'json',
    success: function (json) {
        categories = [];
        for (var i = 0; i < json.length; i++) {
            categories.push(Object.create(json[i]));
        }
        category();
    },
    error: function (xhr) {
        alert("An error occured: " + xhr.status + " " + xhr.statusText);
    },
});

function category() {
    var select = document.getElementById('categoriesList');
    select.innerHTML += "<option value=\"" + 0 + "\">  All </option>";

    for (var i = 0; i < categories.length; i++) {
        select.innerHTML += "<option value=\"" + categories[i].id + "\">" + categories[i].name + "</option>"
    }
}

$(document).on('click', '.addToCart', function () {
    var id = $(this).attr('id');
    buy(id);
});

$(document).on('click', '.openCart', function () {
    openCart();
});

$(document).on('click', '.closeCat', function () {
    closeCart();
});
$(document).on('change', '.changeCat', function () {
    changeCategories();
});
$(document).on('click', '.submit', function () {
    submitOrder();
});
window.onclick = function (event) {
    if (event.clientX > 500) {
        closeCart();
    }
}

function openCart() {
    document.getElementById("cartPopup").style.left = "0px";
    document.getElementById("wrap").style.marginLeft = "0px";
    document.getElementById("body").style.overflowX = "hidden";
    document.getElementById("curtain").style.display = "inline";

}

function closeCart() {
    document.getElementById("cartPopup").style.left = "-500px";
    document.getElementById("wrap").style.marginLeft = "0";
    document.getElementById("body").style.overflowX = "visible";
    document.getElementById("curtain").style.display = "none";
}

var boughtProducts = [];

function buy(productID) {
    category_id = document.getElementById('categoriesList').value;
    jQuery.ajax({
        url: 'https://nit.tron.net.ua/api/product/list/category/' + category_id,
        method: 'get',
        dataType: 'json',
        success: function (json) {
            for (var i = 0; i < json.length; i++)
                if (json[i].id == productID) {
                    boughtProducts.push(json[i]);
                    break;
                }

            addToCart(productID);
        },
        error: function (xhr) {
            alert("An error occured: " + xhr.status + " " + xhr.statusText);
        },
    });
}
var uniqueProd = [];
function addToCart() {
    document.getElementById('cartCount').innerHTML = boughtProducts.length;
    var cart = document.getElementById('cartPopup');
    cart.innerHTML = "";
    // uniqueProd = [];
    var totalPrice = 0;
    var price = 0;
    for (var i = 0; i < boughtProducts.length; i++) {
        if (boughtProducts[i].special_price != null)
        {
            price = boughtProducts[i].special_price;
        }
        else price = boughtProducts[i].price;
        totalPrice += Number(price);
        var exists = false;
        for (var j = 0; j < uniqueProd.length; j++) {
            if (boughtProducts[i].id === uniqueProd[j].id) {
                exists = true;
                break;
            }
        }
        if (!exists)
            uniqueProd.push(boughtProducts[i]);
    }
    var priceProduct = 0;
    for (var i = 0; i < uniqueProd.length; i++) {
        var count = 0;
        for (var j = 0; j < boughtProducts.length; j++) {
            if (uniqueProd[i].id === boughtProducts[j].id)
                count++;
                uniqueProd[i].count = count;
        }
        if (uniqueProd[i].special_price != null)
        {
            priceProduct = uniqueProd[i].special_price;
        }
        else priceProduct = uniqueProd[i].price;
        cart.innerHTML += "<a href=\"javascript:void(0)\" class=\"closebtn closeCat\">&times;</a><div class=\"row\"><div class=\"col-8 text-left cartProduct\">" + uniqueProd[i].name + "</div><div class=\"col-2 text-center cartProduct\">X" + count + "</div><div class=\"col-2 text-right cartProduct\">" + priceProduct + "</div></div>";
    }
    cart.innerHTML += "<div class=\"col-12 text-center cartProduct\">Total " + totalPrice + ".00 UAH</div><br><br><br>";
    cart.innerHTML += "<div class=\"send\">" + "\<p class=\"form\">Your name</p>" + "\<input type=\"text\" id=\"name\">" + "\<p class=\"form\">Your email</p>" + "\<input type=\"text\" id=\"email\">" + "\<p class=\"form\">Your phone number</p>" + "\<input type=\"text\" id=\"phone\"> <br>" + "<button type=\"submit\" class=\"btn red-button submit\"> Submit </button>" + "\ </div>"

}

function submitOrder() {
    var name = document.getElementById('name').value;
    var phone = document.getElementById('phone').value;
    var email = document.getElementById('email').value;
    var postSend = {};
    postSend = {
        name: name,
        phone: phone,
        email: email,
        token: "aaHcxyieBlPb8SQf9oBk"
    };
    //console.log(uniqueProd);

    for (var k in Object.keys(uniqueProd)) {
        postSend["products[" + uniqueProd[k].id + "]"] = uniqueProd[k].count;
    }
    //console.log(postSend);
    $.ajax({
        url: 'https://nit.tron.net.ua/api/order/add',
        method: 'post',
        data: postSend,
        dataType: 'json',
        success: function (json) {
            console.log(json);
            alert("Your order is accepted");
            $('#name').val("");
            $('#phone').val("");
            $('#email').val("");
            boughtProducts = [];
            var cart = document.getElementById('cartPopup');
            cart.innerHTML = "Your cart is empty";
        },
    });


}

