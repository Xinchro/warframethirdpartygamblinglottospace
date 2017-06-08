var mutableArray = []
var usableArray = []

var itemNumber = 22

var moneynotes = []

function itemArray() {
  var array = []
  for (var i = 1; i <= itemNumber; i++) {
    array.push(i)
  }
  return array
}

function refreshItems() {
  usableArray = []
  mutableArray = itemArray()

  for (var i = 1; i <= 15; i++) {
    var randItem = randomItem(mutableArray)
    usableArray.push(mutableArray[randItem])
    mutableArray.splice(randItem, 1)
  }

  refreshBackgrounds()
}

function randomItem(array) {
  var randItem = Math.floor(Math.random() * (itemNumber - 1)) + 1
  if(jQuery.inArray(randItem, array) !== -1){
    return jQuery.inArray(randItem, array)
  } else {
    return randomItem(array)
  }
}

function refreshBackgrounds() {
  for (var y = 1; y <= 3; y++) {
    for (var x = 1; x <= 5; x++) {
      var id = "#" + y + x
      var col = randomColor(360,50,100)
      $(id).css("background-image", "url(./img/items/" + usableArray[randomItem(usableArray)] + ".png)")
      $(id).css("background-color", "hsl(" + col.h + "," + col.s + "%," + col.l + "%)")
    }
  }
}

function randomColor(h, s, l) {
  h = Math.floor(Math.random() * (h - 0)) + 0
  s = Math.floor(Math.random() * (s - 0)) + 0
  l = Math.floor(Math.random() * (l - 50)) + 50

  return {
    h,
    s,
    l
  }
}

refreshItems()

function newVector() {
  var randx = Math.random() * 2 - 1
  var randy = Math.random() * 2 - 1

  var vect = Math.sqrt(Math.pow(randx, 2) + Math.pow(randy, 2))

  var x = randx/vect
  var y = randy/vect
  var magnitude = vect/vect

  return {
    x: x,
    y: y
  }
}

function multVector(amount) {
  var vector = newVector()

  return {
    x: vector.x * amount,
    y: vector.y * amount
  }
}

function moveMoney() {
  for (var i = 0; i < moneynotes.length; i++) {
    moneynotes[i].pos.x += moneynotes[i].vector.x
    moneynotes[i].pos.y += moneynotes[i].vector.y

    $("#" + moneynotes[i].id).css("left", moneynotes[i].pos.x)
    $("#" + moneynotes[i].id).css("top", moneynotes[i].pos.y)
    moneynotes[i].ttl -= 1

    if(moneynotes[i].ttl <= 0) {
      $("#" + moneynotes[i].id).remove()
    }
  }
}

function spawnMoney(x, y) {
  var moneyid = Math.floor(Math.random()*1000+500)
  var img = $("<img>",
    {
      src: './img/moneywithwings.png',
      class: 'moneynote',
      css: {
        "left": x - 25,
        "top": y - 25
      },
      id: moneyid
    }
  )
  .appendTo( "body" )

  moneynotes.push({
    vector: multVector(2),
    id: moneyid,
    ttl: 100,
    pos: {
      x: x - 25,
      y: y - 25
    }
  })
}

$(".bet-button").click(function(e) {
  for (var i = 0; i < 5; i++) {
    spawnMoney(e.pageX, e.pageY)
  }
})


setInterval(function(){refreshItems()}, 1000)
setInterval(function(){moveMoney()}, 1)

