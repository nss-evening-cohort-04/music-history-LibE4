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

