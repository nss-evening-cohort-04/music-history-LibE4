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
				<button id='btnDelete'>Delete</button>
			</section>`
		);
	}
  $($contentElement).append("<button id='btnMore'>More\></button>");
} // end function addSongToDOM

module.exports = addSongToDOM;

},{}],2:[function(require,module,exports){

"use strict";
let getSongs = require("./songs.js").getSongs;
let addSongToDOM = require("./DOM.js");

let $artist = $("#artist");
let $album = $("#album");

function filterSongs(type, choice){
	let songs = getSongs();
	let filteredSongs = [];
	songs.forEach((Song)=>{
		if(Song[type] === choice){
			filteredSongs.push(Song);
		}
	});
	addSongToDOM(filteredSongs);

}

module.exports = filterSongs;

},{"./DOM.js":1,"./songs.js":5}],3:[function(require,module,exports){
"use strict";
let addSong = require("./songs.js").addSong;
let loadSongs = require("./songs.js").loadSongs;
let showSongList = require("./showView.js").showSongList;
let showSongForm = require("./showView.js").showSongForm;
let filterSongs = require("./filter.js");

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

	// load song from json file
	loadSongs("songs.json");

	// load song from json2 file
	$contentElement.click(function(e){
		if (e.target.id === "btnMore"){
			loadSongs("songs2.json");
		}
		if (e.target.id === "btnDelete"){
			$(e.target).parent().remove();
		}
	});

	$($liEmt[1]).click(function(){
		showSongList();
	}); // end addEventListener

	$($liEmt[2]).click(function(){
		showSongForm();
	}); // end addEventListener

	$addSongBtn.click(function(e){
		addSong();
	}); // end addEventListener
	
	$artist.on('change', ()=>{
		filterSongs("artist", $artist.find('option:selected').text());
	});

	$album.on('change', ()=>{
		filterSongs("album", $album.find('option:selected').text());
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
let songs = [];

function loadJson(fileName){
  return new Promise((resolve, reject)=>{
    $.ajax({
      url:`../${fileName}`
    }).done(function(data){
      resolve(data);
    }).fail(function(xhr, status, error){
      reject(error);
    });
  });
}

function loadJson2(resultOfFirstAjax){
  return new Promise((resolve, reject)=>{
    $.ajax({
      url:"../songs2.json"
    }).done(function(data2){
      songs = resultOfFirstAjax.songs;
      resolve(data2);
    }).fail(function(xhr2, status2, error2){
      reject(error2);
    });
  });
}

function addSong(){
  let newSong = {};
  newSong.name = $songNameEmt.val();
  newSong.artist = $artistEmt.val();
  newSong.album = $albumEmt.val();
  songs.push(newSong);
  addSongToDOM(songs);
}

function loadSongs(fileName){
  loadJson(fileName).then(function(dataPass){
    dataPass.songs.forEach(function(song){
      songs.push(song);
    });
    addSongToDOM(songs);
  });
}

function getSongs(){
  return songs;
}

module.exports.addSong = addSong;
module.exports.loadSongs = loadSongs;
module.exports.getSongs = getSongs;

},{"./DOM":1}]},{},[3]);
