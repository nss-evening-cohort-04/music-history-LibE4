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
