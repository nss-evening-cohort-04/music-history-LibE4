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

