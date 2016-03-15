var menuGetter = $.ajax({
  url: "https://galvanize-eats-api.herokuapp.com/menu",
  method: "GET",
  dataType: "json"
});

var orderPoster = $.ajax({
  url: "https://galvanize-eats-api.herokuapp.com/orders",
  method: "POST"
});

///split object into two arrays Item and Item price
menuGetter.done(function(response){
  var menu = response.menu
  var pizzaArray = [];
  var pizzaArrayPrice=[];
  var burgerArr = [];
  var burgerArrPrice=[];

  $.each(menu, function (i, item){
    if (menu[i].type === 'pizza') {
      pizzaArray.push(menu[i].name)
      pizzaArrayPrice.push(menu[i].price)
    }else{
      burgerArr.push(menu[i].name)
      burgerArrPrice.push(menu[i].price)
    }
  })
  appendPizza(pizzaArray, pizzaArrayPrice);
  appendBurgers(burgerArr, burgerArrPrice)
})

// DOM Manipulation

function appendPizza(pizzaArray, pizzaArrayPrice){
  var i = 0;
  $("#saleTotal").append("<option class='menuTitle op' disabled>Pizza</option>")
  $.each(pizzaArray, function(i, item){
    if(i===0){
      $("#saleTotal").append("<option name='pizzaArray[i]' class='op' value="+pizzaArrayPrice[i]+" selected>"+pizzaArray[i]+"<option disabled name='pizzaArrayPrice[i]' class='menuPrice' value="+pizzaArrayPrice[i]+">$"+pizzaArrayPrice[i]+"</option>"+"</option>");
    }else{
      $("#saleTotal").append("<option name='pizzaArray[i]' class='op' value="+pizzaArrayPrice[i]+">"+pizzaArray[i]+"<option disabled name='pizzaArrayPrice[i]' class='menuPrice' value="+pizzaArrayPrice[i]+">$"+pizzaArrayPrice[i]+"</option>"+"</option>")
    }
  })
};

function appendBurgers(burgerArr, burgerArrPrice){
  var i = 0;
  $("#saleTotal").append("<option class='menuTitle op' disabled>Burgers</option>")
  burgerArr.forEach(function(){
    $("#saleTotal").append("<option name="+burgerArr[i]+" class='op' value="+burgerArrPrice[i]+">"+burgerArr[i]+"<option disabled name="+burgerArrPrice[i]+" class='menuPrice' value="+burgerArrPrice[i]+">$"+burgerArrPrice[i++]+"</option>"+"</option>")
  })
};

//Math is Hard + more DOM Manipulation
var sTotal = 0;
$("#aitBtn").on('click',function(){
  var count = $("#quantity").val();
  if($("#quantity").val()>99 || $("#quantity").val()<1){
    alert("Add Quantity")
  }else{
    while (count>0) {
      $("#ordersPlaced").append("<option class='op'>"+$("#saleTotal :selected").html()+"<option class='opP'>$"+$("#saleTotal :selected").val()+"</option></option>")
      sTotal += parseFloat($("#saleTotal").val());
      count--
    }
  }
  $("#area").html("Subtotal: $" + sTotal.toFixed(2)+"               ")
  $("#area").append("Sales Tax: 3.81%                  ")
  $("#area").append("Total: $" + (sTotal+sTotal * .0381).toFixed(2));
})
$("#deliverIt").on('click', function(){
  orderPoster.done(function(response){
    alert(response);
  })
})
