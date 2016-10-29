"use strict";

$(document).ready(function(){
	var Song ={};
	var songs = [];
	songs[songs.length] = "Legs > by Z*ZTop on the album Eliminator";
	songs[songs.length] = "The Logical Song > by Supertr@amp on the album Breakfast in America";
	songs[songs.length] = "Another Brick in the Wall > by Pink Floyd on the album The Wall";
	songs[songs.length] = "Welco(me to the Jungle > by Guns & Roses on the album Appetite for Destruction";
	songs[songs.length] = "Ironi!c > by Alanis Moris*ette on the album Jagged Little Pill";
	songs.push("The Power of Love > by Celine Dion on the album Color of My Love");
	songs.unshift("From This Moment On > by Shania Twain on the album Come On Over");


	// start of user input block
	var $contentElement = $("#content");
	var $navEmt = $("#nav-item");
	var $filterEmt = $("#filter");
	var $addMusicEmt = $("#add-music-view");
	var $songNameEmt = $("#songname");
	var $artistEmt = $("#artist");
	var $albumEmt = $("#album");
	var $addSongBtn = $("#addsong");
	var $liEmt = $($navEmt).children("li")
	$($liEmt[1]).click(function(){
		$filterEmt.addClass("show");
		$filterEmt.removeClass("hidden");
		$contentElement.addClass("show");
		$contentElement.removeClass("hidden");
		$addMusicEmt.addClass("hidden");
		$addMusicEmt.removeClass("show");
	}) // end addEventListener

	$($liEmt[2]).click(function(){
		$filterEmt.addClass("hidden");
		$filterEmt.removeClass("show");
		$contentElement.addClass("hidden");
		$contentElement.removeClass("show");
		$addMusicEmt.addClass("show");
		$addMusicEmt.removeClass("hidden");
	}) // end addEventListener

	$($addSongBtn).click(function(e){
		Song.name = $($songNameEmt).val();
		Song.artist = $($artistEmt).val();
		Song.album = $($albumEmt).val();
		addSongToDOM(Song);
	}) // end addEventListener
	// end of user input block

	// load song from data in this js file
	for (var i = 0; i < songs.length; i++) {
		songs[i] = songs[i].replace(/>/g, "-");
		var charCode = 0, songsEdit = "";
		for (var j = 0; j < songs[i].length; j++) {
			charCode = songs[i].charCodeAt(j);
			if ((65 <= charCode && charCode <=90) || (97 <= charCode && charCode <= 122) || (charCode == 45) || (charCode == 32)|| (charCode == 38)) {
				songsEdit += songs[i].charAt(j);
			}
		}
		Song.name = songsEdit.substring(0, songsEdit.indexOf(" -"));
		Song.artist = songsEdit.substring((songsEdit.indexOf("by ") + 3), songsEdit.indexOf(" on the album"));
		Song.album = songsEdit.substring((songsEdit.indexOf("album ") + 5), songsEdit.length);
		addSongToDOM(Song);
	}

	// load song from json file
	$.ajax({url:"songs.json"}).done(getSongFromJSON);
	// load song from json2 file
	$contentElement.click(function(e){
		if (e.target.id === "btnMore"){
			$.ajax({url:"songs2.json"}).done(getSongFromJSON);
		}
		if (e.target.id === "btnDelete"){
			$(e.target).parent().remove();
		}
	})


	// to display song in DOM
	function addSongToDOM(Song) {
		$($contentElement).append(
			`<section class= 'songs'>
				<h4>${Song.name}</h4>
				<ul class='content-item'>
					<li>${Song.artist}</li>
					<li>${Song.album}</li>
				</ul>
				<button id='btnDelete'>Delete</button>
			</section>`
		);
	} // end function addSongToDOM

	function getSongFromJSON(songData) {
		$("#btnMore").remove();
		for (var i = 0; i < songData.songs.length; i++) {
	  	addSongToDOM(songData.songs[i]); // to add new element before btnMore
	  }
	  $($contentElement).append("<button id='btnMore'>More\></button>");
	} // end of getSongFromJSON
});

