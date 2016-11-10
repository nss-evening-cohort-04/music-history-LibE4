
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
