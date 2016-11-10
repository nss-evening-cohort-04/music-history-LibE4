(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
"use strict";

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

module.exports = addSongToDOM;

},{}],2:[function(require,module,exports){

"use strict";
let loadJsonFB = require("./songs.js").loadJsonFB;
let addSongToDOM = require("./DOM.js");

let $artist = $("#artist");
let $album = $("#album");

function filterSongs(apiKeys, type, choice){
  loadJsonFB(apiKeys).then(function(dataPass){
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

},{"./DOM.js":1,"./songs.js":5}],3:[function(require,module,exports){
"use strict";

let firebaseCredentials = require("./songs.js").firebaseCredentials;
let addSong = require("./songs.js").addSong;
let deleteSong = require("./songs.js").deleteSong;
let loadSongs = require("./songs.js").loadSongs;
let showSongList = require("./showView.js").showSongList;
let showSongForm = require("./showView.js").showSongForm;
let filterSongs = require("./filter.js");

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
		
		// load song from firebase
		loadSongs(apiKeys);
	});


	// load song from json2 file
	$contentElement.on("click", ".btnDelete", function(e){
		let itemId = $(this).data("fbid");
		deleteSong(apiKeys, itemId);
	});

	$($liEmt[1]).click(function(){
		showSongList();
	}); // end addEventListener

	$($liEmt[2]).click(function(){
		showSongForm();
	}); // end addEventListener

	$addSongBtn.click(function(e){
		addSong(apiKeys);
	}); // end addEventListener

	$filterBtn.on("click", () =>{
		console.log("aa", artist, album );
		if (album !== "") {
			filterSongs(apiKeys, "album", album);
		} else {
			filterSongs(apiKeys, "artist", artist);
		}
	});
	
	$artist.on('change', ()=>{
		artist = $artist.find('option:selected').val();

	});

	$album.on('change', ()=>{
		album = $album.find('option:selected').val();
	});
});


},{"./filter.js":2,"./showView.js":4,"./songs.js":5}],4:[function(require,module,exports){
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

},{}],5:[function(require,module,exports){

"use strict";
let addSongToDOM = require("./DOM");

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

function loadJsonFB(apiKeys){
  return new Promise((resolve, reject)=>{
    $.ajax({
      method: "GET",
      url: `${apiKeys.databaseURL}/songs.json`
    }).then((response)=>{
      console.log("response", response);
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

function loadSongs(apiKeys){
  loadJsonFB(apiKeys).then(function(dataPass){
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
      console.log("response", response);
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
      console.log("delete", response);
      resolve(response);
    }, (error)=>{
      reject(error);
    });
  });
}

function addSong(apiKeys){
  let newSong = {};
  newSong.name = $songNameEmt.val();
  newSong.artist = $artistEmt.val();
  newSong.album = $albumEmt.val();
  postSongInFB(apiKeys, newSong).then(function(response){
    loadSongs(apiKeys);
  });
}

function deleteSong(apiKeys, itemId){
  deleteSongInFB(apiKeys, itemId).then(function(response){
    loadSongs(apiKeys);
  });
}

module.exports.loadSongs = loadSongs;
module.exports.addSong = addSong;
module.exports.deleteSong = deleteSong;
module.exports.loadJsonFB = loadJsonFB;
module.exports.firebaseCredentials = firebaseCredentials;

},{"./DOM":1}]},{},[3]);
