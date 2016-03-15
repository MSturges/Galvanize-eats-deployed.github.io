var menuGetter = $.ajax({
  url: "https://galvanize-eats-api.herokuapp.com/menu",
  method: "GET",
  dataType: "json"
});

var oPoster = $.ajax({
  url: "https://galvanize-eats-api.herokuapp.com/orders",
  method: "POST"
});

///split object into two arrays Item and Item price
menuGetter.done(function(response){
  console.log(response);
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
  $("#fSelL").append("<option class='menuTitle op' disabled>Pizza</option>")
  for (var i = 0; i < pizzaArray.length; i++) {
    if(i===0){
      $("#fSelL").append("<option name='pizzaArray[i]' class='op' value="+pizzaArrayPrice[i]+" selected>"+pizzaArray[i]+"<option disabled name='pizzaArrayPrice[i]' class='menuPrice' value="+pizzaArrayPrice[i]+">$"+pizzaArrayPrice[i]+"</option>"+"</option>");
    }else{
      $("#fSelL").append("<option name='pizzaArray[i]' class='op' value="+pizzaArrayPrice[i]+">"+pizzaArray[i]+"<option disabled name='pizzaArrayPrice[i]' class='menuPrice' value="+pizzaArrayPrice[i]+">$"+pizzaArrayPrice[i]+"</option>"+"</option>")
    }
  }
};

function appendBurgers(burgerArr, burgerArrPrice){
  var i = 0;
  $("#fSelL").append("<option class='menuTitle op' disabled>Burgers</option>")
  burgerArr.forEach(function(){
    $("#fSelL").append("<option name="+burgerArr[i]+" class='op' value="+burgerArrPrice[i]+">"+burgerArr[i]+"<option disabled name="+burgerArrPrice[i]+" class='menuPrice' value="+burgerArrPrice[i]+">$"+burgerArrPrice[i++]+"</option>"+"</option>")

  })
}
