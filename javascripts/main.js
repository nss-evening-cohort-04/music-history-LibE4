"use strict";

let firebaseCredentials = require("./songs.js").firebaseCredentials;
let addSong = require("./songs.js").addSong;
let deleteSong = require("./songs.js").deleteSong;
let loadSongs = require("./songs.js").loadSongs;
let showSongList = require("./showView.js").showSongList;
let showSongForm = require("./showView.js").showSongForm;
let filterSongs = require("./filter.js");
let registerUser = require("./authentic.js").registerUser;
let loginUser = require("./authentic.js").loginUser;
let credentialsCurrentUser = require("./authentic.js").credentialsCurrentUser;
let logoutUser = require("./authentic.js").logoutUser;
let addUser = require("./user.js").addUser;
let createLogoutButton = require("./DOM.js").createLogoutButton;

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
		// loadSongs(apiKeys, uid); //load song from firebase
	});


	// load song from json2 file
	$contentElement.on("click", ".btnDelete", function(e){
		let itemId = $(this).data("fbid");
		deleteSong(apiKeys, uid, itemId);
	});

	$($liEmt[1]).click(function(){
		showSongList();
	}); // end addEventListener

	$($liEmt[2]).click(function(){
		showSongForm();
	}); // end addEventListener

	$addSongBtn.click(function(e){
		addSong(apiKeys, uid);
	}); // end addEventListener

	$filterBtn.on("click", () =>{
		if (album !== "") {
			filterSongs(apiKeys, uid, "album", album);
		} else {
			filterSongs(apiKeys, uid, "artist", artist);
		}
	});
	
	$artist.on('change', ()=>{
		artist = $artist.find('option:selected').val();

	});

	$album.on('change', ()=>{
		album = $album.find('option:selected').val();
	});

	$("#registerButton").on("click", function(){
		let email = $("#inputEmail").val();
		let password = $("#inputPassword").val();
		let username = $("#inputUsername").val();
		let user = {
			"email": email,
			"password": password
		};
		registerUser(user).then(function(registerResponse){
			let newUser = {
				"username":username,
				"uid":registerResponse.uid
			};
			return addUser(apiKeys, newUser);
		}).then(function(addUserResponse){
			return loginUser(user);
		}).then(function(loginResponse){
			uid = loginResponse.uid;
			createLogoutButton(apiKeys, uid);
			loadSongs(apiKeys, uid); //load song from firebase
			$("#login-container").addClass("hide");
			$("#music-container").removeClass("hide");		
		});
	});	

	$("#loginButton").on("click", function(){
		let email = $("#inputEmail").val();
		let password = $("#inputPassword").val();
		let user = {
			"email": email,
			"password": password
		};
		loginUser(user).then(function(loginResponse){
			uid = loginResponse.uid;
			console.log("uid", uid);
			createLogoutButton(apiKeys, uid);
			loadSongs(apiKeys, uid); //load song from firebase
			$("#login-container").addClass("hide");
			$("#music-container").removeClass("hide");		
		});
	});

	$("#logout-container").on("click", "#logoutButton", function(){
		logoutUser();
		uid = "";
		$("#content").html("");
		$("#logout-container").html("");
		$("#inputEmail").val("");
		$("#inputPassword").val("");
		$("#inputUsername").val("");
		$("#login-container").removeClass("hide");
		$("#music-container").addClass("hide");
	});	
});

