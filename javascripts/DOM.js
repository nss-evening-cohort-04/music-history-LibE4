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
