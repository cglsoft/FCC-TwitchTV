const CLIENT_ID = 'qjcy28dvrj8o2hp969uhnqs46m2lb3'
const ROOT_URL = 'https://api.twitch.tv/kraken/';
const USER_TWITCHTV = ["cglsoft","ESL_SC2", "OgamingSC2", "cretetion", "freecodecamp", "habathcx", "RobotCaleb", "noobs2ninjas"];
//const USER_TWITCHTV = ["ESL_SC2"];

var aUserInfo = [];

getInfo = (pCanal, pUser) =>{
  var myHeaders = {'client-id' : CLIENT_ID};
  var url = `${ROOT_URL}/channels/freecodecamp`;
  var url2 = ROOT_URL + pCanal + '/' + pUser;

  var myInit = { method: 'GET',
  headers: myHeaders,
  cache: 'default' };

  fetch( url2, myInit )
  .then(response => response.json())
  .then(result => { (pCanal === "channels") ? drawHtmlDiv(result) : getUserStatus(result) })
  .catch( (err) => console.log(err) );
}

getUserStatus = (result) => {
  if (result.stream) {
    aUserInfo.push(result.stream.channel.name);
  }
}

drawHtmlDiv = (jsonTwitch) =>{
  let cardElement = document.getElementById("idCardBlock");
  let html = '';
  let idxAchou = aUserInfo.indexOf(jsonTwitch.name);
  let statusLin = ( idxAchou === -1) ? 'offline' : 'online';

  html =  '<div id="' + statusLin + '" class="card  text-center">' +
  '    <img class="img-fluid rounded-circle w-25 p-1" src="'+ jsonTwitch['logo'] + '" alt="Logo TwitchTV">' +
  '    <div class="card-block"> '+
  '      <h4 class="card-title"> '+ jsonTwitch.display_name + '</h4>' +
  ( (idxAchou === -1) ? '<span class="badge badge-danger">Offline</span>' : '<span class="badge badge-primary">Online</span>' ) +
  '      <p class="card-text"> '+ jsonTwitch.game + '</p>' +
  '      <small class="text-muted"> <a href="' + jsonTwitch.url +'" class="card-link">'+jsonTwitch.status+'<a> </small>' +
  '      </div> ' +
  '  </div>';
  // console.log( 'User: ' + jsonTwitch.name + ' Array: ' + aUserInfo +  '- IndexOF:' +  aUserInfo.indexOf(jsonTwitch.name) );
  cardElement.insertAdjacentHTML('afterbegin',html);
}

// Informações do usuário
twitchTVHTMLView = () => USER_TWITCHTV.forEach( (user) =>   getInfo( "channels", user) );

// Carga do status do usuário ONLINE ou OFFLINE
// Esta rotina precisa ser executada primeiro, pois irá impactar na segunda função.
let wait = (ms) => new Promise(resolve => {
  USER_TWITCHTV.forEach( (user) =>  getInfo("streams",user) );
  setTimeout(resolve, ms)
});

// Balancear a carga dos eventos
let loadPageInfo = async () => {
  await wait(2000);
  await this.twitchTVHTMLView();
}

// Filtro para remover o objeto
filtroOnline = (filtro) => {
  let elems    = document.querySelectorAll(filtro);
  let elemsAll = document.querySelectorAll("#online, #offline");

    // Mostrar todos // elems[i].remove();  -- Remove o objeto definitivo!
  Array.prototype.forEach.call(elemsAll, (item) => item.style.display = 'block');
  // Filtro
  Array.prototype.forEach.call(elems, (item) => item.style.display = 'none');
}


// Carregar página principal
loadPageInfo();
