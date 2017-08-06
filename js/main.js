const CLIENT_ID = 'qjcy28dvrj8o2hp969uhnqs46m2lb3'
const ROOT_URL = 'https://api.twitch.tv/kraken/';
const USER_TWITCHTV = ["cglsoft","ESL_SC2", "OgamingSC2", "cretetion", "freecodecamp", "habathcx", "RobotCaleb", "noobs2ninjas"];
//const USER_TWITCHTV = ["ESL_SC2"];

var game, status;

var aUserInfo = [];

function getStream(pCanal, pUser){
  var myHeaders = {'client-id' : CLIENT_ID};
  var url = `${ROOT_URL}/channels/freecodecamp`;
  var url2 = ROOT_URL + pCanal + '/' + pUser;

  var myInit = { method: 'GET',
  headers: myHeaders,
  cache: 'default' };

  fetch( url2, myInit )
  .then(response => response.json())
  .then(result => { (pCanal === "channels") ? drawHtmlDiv(result) : userStatus(result) })
  .catch( (err) => console.log(err) );
}

function teste(){
 USER_TWITCHTV.forEach( (user) => getStream('streams', user));
}

function teste2(){
  USER_TWITCHTV.forEach( (user) => getStream('channels', user));

}


function userTwitchTV(){
  USER_TWITCHTV.forEach( (user) => {
    getStream('streams', user);
    getStream('channels', user);
  });
}

function userStatus(result){
  if (result.stream) {
    aUserInfo.push(result.stream.channel.name);
    console.log(result.stream.channel.name);
  }
}

function drawHtmlDiv(jsonTwitch){
  let cardElement = document.getElementById("idCardBlock");
  let html = '';
  html =  '<div class="card text-center">' +
  '    <img class="card-img-top rounded-circle w-50 p-1" src="'+ jsonTwitch['logo'] + '" alt="Logo TwitchTV">' +
  '    <div class="card-block"> '+
  '      <h4 class="card-title"> '+ jsonTwitch.display_name + '</h4>' +
  ( (aUserInfo.indexOf(jsonTwitch.name) === -1) ? '<span class="badge badge-danger">Offline</span>' : '<span class="badge badge-primary">Online</span>' ) +
  '      <p class="card-text"> '+ jsonTwitch.game + '</p>' +
  '      <small class="text-muted"> <a href="' + jsonTwitch.url +'" class="card-link">'+jsonTwitch.status+'<a> </small>' +
  '      </div> ' +
  '  </div>';

  console.log(aUserInfo.indexOf(jsonTwitch.name));
  console.log(aUserInfo + ': ' + jsonTwitch.name + ' - ' +  aUserInfo.indexOf(jsonTwitch.name) );

  cardElement.insertAdjacentHTML('afterbegin',html);
}

 userTwitchTV();




/*

var channels = ["freecodecamp","test_channel","ESL_SC2","cglsoft"];

function getChannelInfo() {
channels.forEach(function(channel) {
function makeURL(type, name) {
return 'https://wind-bow.gomix.me/twitch-api/' + type + '/' + name + '?callback=?';
};
$.getJSON(makeURL("streams", channel), function(data) {
var game,
status;
if (data.stream === null) {
game = "Offline";
status = "offline";
} else if (data.stream === undefined) {
game = "Account Closed";
status = "offline";
} else {
game = data.stream.game;
status = "online";
};
$.getJSON(makeURL("channels", channel), function(data) {
var logo = data.logo != null ? data.logo : "https://dummyimage.com/50x50/ecf0e7/5c5457.jpg&text=0x3F",
name = data.display_name != null ? data.display_name : channel,
description = status === "online" ? ': ' + data.status : "";
html = '<div class="row ' +
status + '"><div class="col-xs-2 col-sm-1" id="icon"><img src="' +
logo + '" class="logo"></div><div class="col-xs-10 col-sm-3" id="name"><a href="' +
data.url + '" target="_blank">' +
name + '</a></div><div class="col-xs-10 col-sm-8" id="streaming">'+
game + '<span class="hidden-xs">' +
description + '</span></div></div>';
status === "online" ? $("#display").prepend(html) : $("#display").append(html);
});
});
});
};

$(document).ready(function() {
getChannelInfo();
$(".selector").click(function() {
$(".selector").removeClass("active");
$(this).addClass("active");
var status = $(this).attr('id');
if (status === "all") {
$(".online, .offline").removeClass("hidden");
} else if (status === "online") {
$(".online").removeClass("hidden");
$(".offline").addClass("hidden");
} else {
$(".offline").removeClass("hidden");
$(".online").addClass("hidden");
}
})
});

// getStreamByUser('freecodecamp');
*/
