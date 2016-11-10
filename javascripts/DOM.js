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
