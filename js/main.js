const CLIENT_ID = 'qjcy28dvrj8o2hp969uhnqs46m2lb3'
const ROOT_URL = 'https://api.twitch.tv/kraken/';
const USER_TWITCHTV = ["cglsoft","ESL_SC2", "OgamingSC2", "cretetion", "freecodecamp", "habathcx", "RobotCaleb", "noobs2ninjas"];
//const USER_TWITCHTV = ["ESL_SC2"];

var game,
    status;

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

function userTwitchTV(){
    USER_TWITCHTV.forEach( (user) => {

      getStream('streams', user);
      getStream('channels', user);


    });
}

function userStatus(result){
  console.log(result);


  if (result.stream === null) {
    game = "Offline";
    status = "offline";
  } else if (result.stream === undefined) {
    game = "Account Closed";
    status = "offline";
  } else {
    // game = result.stream.game;
    status = "online";
    console.log(result.stream.stream_type);
    console.log(result.stream.game);
    console.log(result.stream.channel.display_name);
  };
}



function drawHtmlDiv(jsonTwitch){
  let cardElement = document.getElementById("idCardBlock");
  let html = '';
  let htmlDiv =  '<div id="rowTit" class="row">' +
  '  <div class="col-md-2"> ';

  let htmlP1 =    '    </div> ' +
  '    <div class="col-md-4"> ' +
  '      <h4 class="card-title text-left">';

  let htmlP2 =    '</h4> ' +
  '    </div> ' +
  '    <div class="col-md-2"> ' +
  '      <h4 class="card-title text-left">';

  let htmlP3 = '      </h4> ' +
  '    </div> ' +
  '  </div> ' +
  '  <div class="row"> ' +
  '    <div class="col-md-12 text-left"> ' +
  '      <p class="card-text">';

  let htmlP4 = '</p> ' +
  '    </div> ' +
  '  </div> ' +
  ' </div> ';

    html += htmlDiv + '<img class="card-img-top rounded-circle width="50" height="50"" src="'+ jsonTwitch['logo'] + '" alt="Logo TwitchTV">' + htmlP1;
    html += jsonTwitch.display_name + htmlP2 + status + htmlP3;
    html += jsonTwitch.status + htmlP4;


    cardElement.insertAdjacentHTML('afterbegin',html);
}

//userTwitchTV();

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
