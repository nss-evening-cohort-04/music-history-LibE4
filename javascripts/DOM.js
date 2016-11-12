"use strict";

let getUser = require("./user.js").getUser;

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

function createLogoutButton(apiKeys, uid){
	getUser(apiKeys, uid).then(function(userResponse){
		$("#content").html("");
		let currentUsername = userResponse.username;
		let logoutButton = `<button class="btn btn-danger" id="logoutButton">LOGOUT ${currentUsername}</button>`;
		$("#logout-container").append(logoutButton);
	});
}

module.exports.addSongToDOM = addSongToDOM;
module.exports.createLogoutButton = createLogoutButton;
