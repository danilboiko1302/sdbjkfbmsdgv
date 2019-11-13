var amount = 0;
var u = [];
var numbers = [];
var c = [];
var n = [], o = 1;
var sel = document.getElementById('cartCount');
if(numbers.length===0&&localStorage.getItem("number")!=null){

   numbers = JSON.parse(localStorage.getItem("number"));
   console.log(numbers)
   var amountOf = document.getElementsByClassName('cart-quantity-input')
   console.log(amountOf)
   for (var i = 0; i < amountOf.length; i++) {
       amountOf[i].value = numbers[i].toString();
   }
}
if(u.length===0&&localStorage.getItem("cart")!=null){
    u = JSON.parse(localStorage.getItem("cart"));
    copy()
    for (var i = 0, o = 0; o < u.length; o++) {
        for (var l = 0, a = 0; a < c.length; a++)
            u[o].id === c[a].id && l++;
        u[o].count = l;
        i = null != u[o].special_price ? u[o].special_price : u[o].price;
        //     console.log(u[o])
        addItem(u[o].name,i,u[o].image_url);
       // blyat();
      //  updateCartTotal();

    }
    var t = document.getElementById("cartPopup");
    t.innerHTML += '<div class="send"><p class="form">Your name</p>' +
        '<input type="text" id="name"><p class="form">Your email</p><input type="text" id="email">' +
        '<p class="form">Your phone number</p><input type="text" id="phone"> <br><button type="submit" ' +
        'class="btn red-button submit"> Submit </button> </div>'
}
function copy() {
    for (var h = 0; h < u.length; h++) {
        c.push(u[h]);
    }
}


check();
updateCartTotal();

if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', check)
} else {

}

function blyat() {
    var numbers1 = [];
    var amountOf = document.getElementsByClassName('cart-quantity-input')
    for (var i = 0; i < amountOf.length; i++) {
        numbers1.push(parseInt(amountOf[i].value));
    }
    numbers = numbers1;
}
function deleteA(a) {
    var test = [];
    var test1 = [];
    var test2 = [];
    for(var i = 0; i<u.length;i++){
        if(i!==a){
            test.push(u[i]);
            test1.push(c[i]);
            test2.push(numbers[i]);
        }
    }
    u = test;
    c = test1;
    numbers=test2
}
function check() {
   var remove = document.getElementsByClassName('btn-danger');
   for(var i = 0; i<remove.length;i++){
       remove[i].addEventListener('click', function (event) {
           amount--;
           sel.innerHTML=amount;

           for(var j =0; j<c.length;j++)
           {
               var ts = event.target;
               var hhh = ts.parentElement.parentElement;
               ts = hhh.getElementsByClassName("cart-item-title")[0].innerHTML;
                   if (ts === c[j].name) {
                       if(c.length===1){
                           c={};
                           u={};
                       }
                       deleteA(j);
                   }

           }
           event.target.parentElement.parentElement.remove()
           updateCartTotal()
       });
   }
    var amountOf = document.getElementsByClassName('cart-quantity-input')
    for (var i = 0; i < amountOf.length; i++) {
        var input = amountOf[i];

        input.addEventListener('change', amountChange)
    }
}
function removeItem(event) {
    amount--;
    sel.innerHTML=amount;

    for(var j =0; j<c.length;j++)
    {
        var ts = event.target;
        var hhh = ts.parentElement.parentElement;
        ts = hhh.getElementsByClassName("cart-item-title")[0].innerHTML;
        if (ts === c[j].name) {
            if(c.length===1){
                c={};
                u={};
            }
            deleteA(j);
        }

    }
    event.target.parentElement.parentElement.remove()
    updateCartTotal()
}
function amountChange(event) {

    var input = event.target
    if (isNaN(input.value) || input.value <= 0) {
        removeItem(event);
    }
    blyat();
    updateCartTotal()
}
function updateCartTotal() {

    var remove = document.getElementsByClassName('btn-danger')
    for (var i = 0; i < remove.length; i++) {
        var button = remove[i];
        button.addEventListener('click', removeItem);
    }
    var amountOf = document.getElementsByClassName('cart-quantity-input')
    for (var i = 0; i < amountOf.length; i++) {
        var input = amountOf[i]
        input.addEventListener('change', amountChange)
    }
    for ( i = 0; i < amountOf.length; i++) {
        try{
            amountOf[i].value = numbers[i].toString();
        }catch (e) {
            console.log(e)
        }

    }
    var item = document.getElementsByClassName('cart-items')[0];
    var rows = item.getElementsByClassName('cart-row');
    var total = 0;
    for (var i = 0; i < rows.length; i++) {
        var row = rows[i];
        var priceE = row.getElementsByClassName('cart-price')[0];
        var price = parseFloat(priceE.innerText.replace('$', ''));
        var number = row.getElementsByClassName('cart-quantity-input')[0].value;
        total = total + (price * number)
    }
    total = Math.round(total * 100) / 100;
    document.getElementsByClassName('cart-total-price')[0].innerText = total+' грн';
    var test = document.getElementsByClassName('cart-quantity-input');
    amount = 0;
    for (var g = 0; g < test.length; g++) {
        amount +=Number.parseInt( test[g].value);
    }
    sel.innerHTML=amount;
    var send = document.getElementsByClassName('send');
    for(var tt=1;tt<send.length;tt++){
        send[tt].remove();
    }
    blyat()
    localStorage.setItem("number", JSON.stringify(numbers));
    localStorage.setItem("cart", JSON.stringify(u));
}
function addItem(title, price, imageSrc) {
    var row = document.createElement('div')
    row.classList.add('cart-row')
    var items = document.getElementsByClassName('cart-items')[0]
    var itemNames = items.getElementsByClassName('cart-item-title')
    for (var i = 0; i < itemNames.length; i++) {
        if (itemNames[i].innerText === title) {
          //  alert('Sorry, this item is already in cart');
            return;
        }
    }
    row.innerHTML = `<div class="cart-item cart-column">
                                 <img class="cart-item-image" src="${imageSrc}" width="100" height="100">
                                  <span class="cart-item-title">${title}</span>
                         </div>
                         <span class="cart-price cart-column">${price}</span>
                         <div class="cart-quantity cart-column">
                                <input class="cart-quantity-input" type="number" value="1">
                                <button class="btn btn-danger" type="button">REMOVE</button>
                                  </div>`;
    items.append(row);
   row.getElementsByClassName('btn-danger')[0].addEventListener('click', removeItem);
    row.getElementsByClassName('cart-quantity-input')[0].addEventListener('change', amountChange);
}
var e = {};
!function (t) {


    function n(o) {
        if (e[o]) return e[o].exports;
        var r = e[o] = {i: o, l: !1, exports: {}};
        return t[o].call(r.exports, r, r.exports, n), r.l = !0, r.exports
    }

    n.m = t, n.c = e, n.d = function (t, e, o) {
        n.o(t, e) || Object.defineProperty(t, e, {enumerable: !0, get: o})
    }, n.r = function (t) {
        "undefined" != typeof Symbol && Symbol.toStringTag && Object.defineProperty(t, Symbol.toStringTag,
            {value: "Module"}),
            Object.defineProperty(t, "__esModule", {value: !0})
    }, n.t = function (t, e) {
        if (1 & e && (t = n(t)), 8 & e) return t;
        if (4 & e && "object" == typeof t && t && t.__esModule) return t;
        var o = Object.create(null);
        if (n.r(o), Object.defineProperty(o, "default", {
            enumerable: !0,
            value: t
        }), 2 & e && "string" != typeof t) for (var r in t) n.d(o, r, function (e) {
            return t[e]
        }.bind(null, r));
        return o
    }, n.n = function (t) {
        var e = t && t.__esModule ? function () {
            return t.default
        } : function () {
            return t
        };
        return n.d(e, "a", e), e
    }, n.o = function (t, e) {
        return Object.prototype.hasOwnProperty.call(t, e)
    }, n.p = "", n(n.s = 0)
}([function (t, e) {


    function r() {
        var t = document.getElementById("products");
        t.innerHTML = " ";
        for (var e = 0; e < n.length; e++) {
            var o = "";
            null != n[e].special_price && (o = "Special price: " + n[e].special_price), t.innerHTML += '<div class="col-md-12 container-product" style="margin-top: 150px;" ><div class="product"><button style="border: none" class="btn" data-toggle="modal" data-target="#container-products' + n[e].id + '"><img src="' + n[e].image_url + '" class="img-fluid" style="max-height: 300px"></button><div class="modal" id="container-products' + n[e].id + '" style="background-color: rgba(0, 0, 0, 0.3)"><div class="modal-dialog"><div class="modal-content"><div class="modal-header"><h4 class="modal-title">' + n[e].name + '</h4><button type="button" class="close" data-dismiss="modal">&times;</button></div><div class="modal-body">' + n[e].description + '<img src="' + n[e].image_url + '" class="img-fluid" style="max-height: 250px"></div><div class="modal-footer"><button type="button" class="btn btn-danger" data-dismiss="modal">Close</button></div></div></div></div></div><div class="text-product"><p>' + n[e].name + "</p>" + n[e].price + " UAH" + o + '</div><div class="button-group"><button class="btn red-button addToCart" style="font-size: 40px" id = ' + n[e].id + ' style="width: 90%">Buy</button></div></div>'
        }
    }

    jQuery.ajax({
        url: "https://nit.tron.net.ua/api/product/list",
        method: "get",
        dataType: "json",
        success: function (t) {

            var e = 0;
            for (e = 0; e < t.length; e++) n.push(t[e]);
            r()
        },
        error: function (t) {
            alert("An error occured: " + t.status + " " + t.statusText)
        }
    });
    var a = [];

    function i() {
        document.getElementById("simpleModal").style.display = 'none';
    }

    jQuery.ajax({
        url: "https://nit.tron.net.ua/api/category/list",
        method: "get",
        dataType: "json",
        success: function (t) {
            a = [];
            for (var e = 0; e < t.length; e++) a.push(Object.create(t[e]));
            !function () {
                var t = document.getElementById("categoriesList");
                t.innerHTML += '<option value="0">  All </option>';
                for (var e = 0; e < a.length; e++) t.innerHTML += '<option value="' + a[e].id + '">' + a[e].name + "</option>"
            }()
        },
        error: function (t) {
            alert("An error occured: " + t.status + " " + t.statusText)
        }
    }), $(document).on("click", ".addToCart", function () {

        !function (t) {

            o = document.getElementById("categoriesList").value, jQuery.ajax({

                url: "https://nit.tron.net.ua/api/product/list/category/" + o,
                method: "get",
                dataType: "json",
                success: function (e) {

                    for (var n = 0; n < e.length; n++) if (e[n].id == t) {
                        c.push(e[n]);
                        break
                    }
                    !function () {

                        document.getElementById("cartCount").innerHTML = c.length;
                        var t = document.getElementById("cartPopup");
                      // t.innerHTML = "";
                        for (var e = 0, n = 0, o = 0; o < c.length; o++) {
                            n = null != c[o].special_price ? c[o].special_price : c[o].price, e += Number(n);
                            for (var r = !1, a = 0; a < u.length; a++) if (c[o].id === u[a].id) {
                                r = !0;
                                break
                            }
                            r || u.push(c[o])

                        }
                        for (var i = 0, o = 0; o < u.length; o++) {
                            for (var l = 0, a = 0; a < c.length; a++)
                                u[o].id === c[a].id && l++;
                             u[o].count = l;
                            i = null != u[o].special_price ? u[o].special_price : u[o].price;
                           addItem(u[o].name,i,u[o].image_url);
                           blyat();
                            updateCartTotal();

                        }
                            t.innerHTML += '<div class="send"><p class="form">Your name</p>' +
                                '<input type="text" id="name"><p class="form">Your email</p><input type="text" id="email">' +
                                '<p class="form">Your phone number</p><input type="text" id="phone"> <br><button type="submit" ' +
                                'class="btn red-button submit"> Submit </button> </div>'

                        check();
                    }()
                },
                error: function (t) {
                    alert("An error occured: " + t.status + " " + t.statusText)
                }
            })

        }($(this).attr("id"))

    }), $(document).on("click", ".openCart", function () {
        document.getElementById("simpleModal").style.display = 'block';
    }), $(document).on("click", ".closeCat", function () {
        i()
    }), $(document).on("change", ".changeCat", function () {
        o = document.getElementById("categoriesList").value, jQuery.ajax({
            url: "https://nit.tron.net.ua/api/product/list/category/" + o,
            method: "get",
            dataType: "json",
            success: function (t) {
                n = [];
                for (var e = 0; e < t.length; e++) n.push(t[e]);
                r()
            },
            error: function (t) {
                alert("An error occured: " + t.status + " " + t.statusText)
            }
        })
    }), $(document).on("click", ".submit", function () {
        !function () {
            var t = document.getElementById("name").value, e = document.getElementById("phone").value,
                n = document.getElementById("email").value, o = {};
            for (var r in o = {
                name: t,
                phone: e,
                email: n,
                token: "aaHcxyieBlPb8SQf9oBk"
            }, Object.keys(u)) o["products[" + u[r].id + "]"] = u[r].count;
            $.ajax({
                url: "https://nit.tron.net.ua/api/order/add",
                method: "post",
                data: o,
                dataType: "json",
                success: function (t) {
                    console.log(t), alert("Your order is accepted"), $("#name").val(""), $("#phone").val(""), $("#email").val(""), c = [];
                }
            })
        }()
    }), window.onclick = function (t) {
       // t.clientX > 500 && i()
    };

}]);

window.addEventListener('click', function (e) {
   // check();
    updateCartTotal();
    var modal = document.getElementById('simpleModal');
    if(e.target===modal){
        modal.style.display = 'none';
    }
});