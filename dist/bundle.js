(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
"use strict";

let getUser = require("./user.js").getUser;

// to display song in DOM
var $contentElement = $("#content");

function addSongToDOM(songs) {
	$contentElement.html("");
	for (var i = 0; i < songs.length; i++) {
		let Song = songs[i];
		$contentElement.append(
			`<section class= 'songs'>
				<h4>${Song.name}</h4>
				<ul class='content-item'>
					<li>${Song.artist}</li>
					<li>${Song.album}</li>
				</ul>
				<button class='btnDelete' data-fbid="${Song.id}">Delete</button>
			</section>`
		);
	}
} // end function addSongToDOM

function createLogoutButton(apiKeys, uid){
	getUser(apiKeys, uid).then(function(userResponse){
		$("#content").html("");
		let currentUsername = userResponse.username;
		let logoutButton = `<button class="btn btn-danger" id="logoutButton">LOGOUT ${currentUsername}</button>`;
		$("#logout-container").append(logoutButton);
	});
}

module.exports.addSongToDOM = addSongToDOM;
module.exports.createLogoutButton = createLogoutButton;

},{"./user.js":7}],2:[function(require,module,exports){
'use strict';

function registerUser(credentials){
  return new Promise((resolve, reject) => {
    firebase.auth().createUserWithEmailAndPassword(credentials.email, credentials.password)
    .then((authData) =>{
      resolve(authData);
    })
    .catch((error)=>{
      reject(error);
    });
  });
}

function loginUser(credentials){
  return new Promise((resolve, reject) => {
    firebase.auth().signInWithEmailAndPassword(credentials.email, credentials.password)
    .then((authData) =>{
      resolve(authData);
    })
    .catch((error)=>{
      reject(error);
    });
  });
}

function credentialsCurrentUser(){
  return firebase.auth().currentUser;
}

function logoutUser(){
   firebase.auth().signOut();
}

module.exports.registerUser = registerUser;
module.exports.loginUser = loginUser;
module.exports.credentialsCurrentUser = credentialsCurrentUser;
module.exports.logoutUser = logoutUser;

},{}],3:[function(require,module,exports){

"use strict";
let loadJsonFB = require("./songs.js").loadJsonFB;
let addSongToDOM = require("./DOM.js").addSongToDOM;

let $artist = $("#artist");
let $album = $("#album");

function filterSongs(apiKeys, uid, type, choice){
  loadJsonFB(apiKeys, uid).then(function(dataPass){
		let filteredSongs = [];
		dataPass.forEach((Song)=>{
			if(Song[type] === choice){
				filteredSongs.push(Song);
			}
		});
		addSongToDOM(filteredSongs);
  });
}

module.exports = filterSongs;

},{"./DOM.js":1,"./songs.js":6}],4:[function(require,module,exports){
"use strict";

let firebaseCredentials = require("./songs.js").firebaseCredentials;
let addSong = require("./songs.js").addSong;
let deleteSong = require("./songs.js").deleteSong;
let loadSongs = require("./songs.js").loadSongs;
let showSongList = require("./showView.js").showSongList;
let showSongForm = require("./showView.js").showSongForm;
let filterSongs = require("./filter.js");
let registerUser = require("./authentic.js").registerUser;
let loginUser = require("./authentic.js").loginUser;
let credentialsCurrentUser = require("./authentic.js").credentialsCurrentUser;
let logoutUser = require("./authentic.js").logoutUser;
let addUser = require("./user.js").addUser;
let createLogoutButton = require("./DOM.js").createLogoutButton;

let apiKeys = {};
let uid = "";
let artist = "";
let album = "";

$(document).ready(function(){

	// start of user input block
	let $contentElement = $("#content");
	let $navEmt = $("#nav-item");
	let $filterEmt = $("#filter");
	let $addMusicEmt = $("#add-music-view");
	let $addSongBtn = $("#addsong");
	let $liEmt = $($navEmt).children("li");
	let $artist = $("#artist");
	let $album = $("#album");
	let $filterBtn = $("#filterBtn");

	firebaseCredentials().then(function(keys){
		console.log("keys", keys);
		apiKeys = keys;
		firebase.initializeApp(apiKeys);
		// loadSongs(apiKeys, uid); //load song from firebase
	});


	// load song from json2 file
	$contentElement.on("click", ".btnDelete", function(e){
		let itemId = $(this).data("fbid");
		deleteSong(apiKeys, uid, itemId);
	});

	$($liEmt[1]).click(function(){
		showSongList();
	}); // end addEventListener

	$($liEmt[2]).click(function(){
		showSongForm();
	}); // end addEventListener

	$addSongBtn.click(function(e){
		addSong(apiKeys, uid);
	}); // end addEventListener

	$filterBtn.on("click", () =>{
		if (album !== "") {
			filterSongs(apiKeys, uid, "album", album);
		} else {
			filterSongs(apiKeys, uid, "artist", artist);
		}
	});
	
	$artist.on('change', ()=>{
		artist = $artist.find('option:selected').val();

	});

	$album.on('change', ()=>{
		album = $album.find('option:selected').val();
	});

	$("#registerButton").on("click", function(){
		let email = $("#inputEmail").val();
		let password = $("#inputPassword").val();
		let username = $("#inputUsername").val();
		let user = {
			"email": email,
			"password": password
		};
		registerUser(user).then(function(registerResponse){
			let newUser = {
				"username":username,
				"uid":registerResponse.uid
			};
			return addUser(apiKeys, newUser);
		}).then(function(addUserResponse){
			return loginUser(user);
		}).then(function(loginResponse){
			uid = loginResponse.uid;
			createLogoutButton(apiKeys, uid);
			loadSongs(apiKeys, uid); //load song from firebase
			$("#login-container").addClass("hide");
			$("#music-container").removeClass("hide");		
		});
	});	

	$("#loginButton").on("click", function(){
		let email = $("#inputEmail").val();
		let password = $("#inputPassword").val();
		let user = {
			"email": email,
			"password": password
		};
		loginUser(user).then(function(loginResponse){
			uid = loginResponse.uid;
			console.log("uid", uid);
			createLogoutButton(apiKeys, uid);
			loadSongs(apiKeys, uid); //load song from firebase
			$("#login-container").addClass("hide");
			$("#music-container").removeClass("hide");		
		});
	});

	$("#logout-container").on("click", "#logoutButton", function(){
		logoutUser();
		uid = "";
		$("#content").html("");
		$("#logout-container").html("");
		$("#inputEmail").val("");
		$("#inputPassword").val("");
		$("#inputUsername").val("");
		$("#login-container").removeClass("hide");
		$("#music-container").addClass("hide");
	});	
});


},{"./DOM.js":1,"./authentic.js":2,"./filter.js":3,"./showView.js":5,"./songs.js":6,"./user.js":7}],5:[function(require,module,exports){
"use strict";

let $contentElement = $("#content");
let $filterEmt = $("#filter");
let $addMusicEmt = $("#add-music-view");

function showSongList(){
	$filterEmt.addClass("show");
	$filterEmt.removeClass("hidden");
	$contentElement.addClass("show");
	$contentElement.removeClass("hidden");
	$addMusicEmt.addClass("hidden");
	$addMusicEmt.removeClass("show");
}

function showSongForm(){
	$filterEmt.addClass("hidden");
	$filterEmt.removeClass("show");
	$contentElement.addClass("hidden");
	$contentElement.removeClass("show");
	$addMusicEmt.addClass("show");
	$addMusicEmt.removeClass("hidden");
}

module.exports.showSongList = showSongList;
module.exports.showSongForm = showSongForm;

},{}],6:[function(require,module,exports){

"use strict";
let addSongToDOM = require("./DOM").addSongToDOM;

let $songNameEmt = $("#add-name");
let $artistEmt = $("#add-artist");
let $albumEmt = $("#add-album");

function firebaseCredentials(){
  return new Promise((resolve, reject)=>{
    $.ajax({
      method: 'GET',
      url: 'apiKeys.json'
    }).then((response)=>{
      resolve(response);
    }, (error)=>{
      reject(error);
    });
  });
}

function loadJsonFB(apiKeys, uid){
  return new Promise((resolve, reject)=>{
    $.ajax({
      method: "GET",
      url: `${apiKeys.databaseURL}/songs.json?orderBy="uid"&equalTo="${uid}"`
    }).then((response)=>{
      console.log("loadJsonFB response", response);
      let songs = [];
      switch (Array.isArray(response)){
        case false:
          Object.keys(response).forEach(function(key){
            response[key].id = key;
            songs.push(response[key]);
          });
        break;  
        case true:
          response.forEach(function(item, index){
            item.id = index;
          });
          songs = response;
        break;
      }
      resolve(songs);
    }, (error)=>{
      reject(error);
    });
  });
}

function loadSongs(apiKeys, uid){
  loadJsonFB(apiKeys, uid).then(function(dataPass){
    addSongToDOM(dataPass);
  });
}

function postSongInFB(apiKeys, newItem){
  return new Promise((resolve, reject)=>{
    $.ajax({
      method: "POST",
      url: `${apiKeys.databaseURL}/songs.json`,
      data:JSON.stringify(newItem),
      dataType:"json"
    }).then((response)=>{
      resolve(response);
    }, (error)=>{
      reject(error);
    });
  });
}

function deleteSongInFB(apiKeys, itemId){
  return new Promise((resolve, reject)=>{
    $.ajax({
      method: "DELETE",
      url: `${apiKeys.databaseURL}/songs/${itemId}.json`,
    }).then((response)=>{
      resolve(response);
    }, (error)=>{
      reject(error);
    });
  });
}

function addSong(apiKeys, uid){
  let newSong = {};
  newSong.name = $songNameEmt.val();
  newSong.artist = $artistEmt.val();
  newSong.album = $albumEmt.val();
  newSong.uid = uid;
  postSongInFB(apiKeys, newSong).then(function(response){
    loadSongs(apiKeys, uid);
  });
}

function deleteSong(apiKeys, uid, itemId){
  deleteSongInFB(apiKeys, itemId).then(function(response){
    loadSongs(apiKeys, uid);
  });
}

module.exports.loadSongs = loadSongs;
module.exports.addSong = addSong;
module.exports.deleteSong = deleteSong;
module.exports.loadJsonFB = loadJsonFB;
module.exports.firebaseCredentials = firebaseCredentials;

},{"./DOM":1}],7:[function(require,module,exports){
'use strict';

function getUser(apiKeys, uid){
	return new Promise((resolve, reject)=>{
		$.ajax({
			method: "GET",
			url: `${apiKeys.databaseURL}/users.json?orderBy="uid"&equalTo="${uid}"`
		}).then((response)=>{
			console.log("response", response);
			let users = [];
			Object.keys(response).forEach(function(key){
				response[key].id = key;
				users.push(response[key]);
			});
			resolve(users[0]);
		}, (error)=>{
			reject(error);
		});
	});

}

function addUser(apiKeys, newUser){
	return new Promise((resolve, reject)=>{
		$.ajax({
			method: "POST",
			url: `${apiKeys.databaseURL}/users.json`,
			data:JSON.stringify(newUser),
			dataType:"json"
		}).then((response)=>{
			console.log("response", response);
			resolve(response);
		}, (error)=>{
			reject(error);
		});
	});
}

module.exports.getUser = getUser;
module.exports.addUser = addUser;


},{}]},{},[4]);
