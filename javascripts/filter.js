
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
