var songs = [];
songs[songs.length] = "Legs > by Z*ZTop on the album Eliminator";
songs[songs.length] = "The Logical Song > by Supertr@amp on the album Breakfast in America";
songs[songs.length] = "Another Brick in the Wall > by Pink Floyd on the album The Wall";
songs[songs.length] = "Welco(me to the Jungle > by Guns & Roses on the album Appetite for Destruction";
songs[songs.length] = "Ironi!c > by Alanis Moris*ette on the album Jagged Little Pill";
songs.push("The Power of Love > by Celine Dion on the album Color of My Love");
songs.unshift("From This Moment On > by Shania Twain on the album Come On Over");

var Song ={};
var contentElement = document.getElementById("content");
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

// to display song in DOM
function addSongToDOM(Song, lastNode) {
	var newSection = document.createElement("section");
	newSection.className = "songs";
		var newH4 = document.createElement("h4");
		newH4.innerHTML = Song.name;
		var newUl = document.createElement("ul");
		newUl.className = "content-item";
		var btnDelete = document.createElement("button");
		btnDelete.innerHTML = "Delete";
		btnDelete.addEventListener("click", function(){
			this.parentNode.remove();
		});
			var newLi1 = document.createElement("li");
			newLi1.innerHTML = Song.artist;
			var newLi2 = document.createElement("li");
			newLi2.innerHTML = Song.album;
			newUl.appendChild(newLi1);
			newUl.appendChild(newLi2);
		newSection.appendChild(newH4);
		newSection.appendChild(newUl);
		newSection.appendChild(btnDelete);
	contentElement.insertBefore(newSection, lastNode);
} // end function addSongToDOM

// start of user input block
var navEmt = document.getElementById("nav-item");
var filterEmt = document.getElementById("filter");
var addMusicEmt = document.getElementById("add-music-view");
var songNameEmt = document.getElementById("songname");
var artistEmt = document.getElementById("artist");
var albumEmt = document.getElementById("album");
var addSongBtn = document.getElementById("addsong");

navEmt.childNodes[3].addEventListener("click", function(){
	filterEmt.classList.add("show");
	filterEmt.classList.remove("hidden");
	contentElement.classList.add("show");
	contentElement.classList.remove("hidden");
	addMusicEmt.classList.add("hidden");
	addMusicEmt.classList.remove("show");
}) // end addEventListener

navEmt.childNodes[5].addEventListener("click", function(){
	filterEmt.classList.add("hidden");
	filterEmt.classList.remove("show");
	contentElement.classList.add("hidden");
	contentElement.classList.remove("show");
	addMusicEmt.classList.add("show");
	addMusicEmt.classList.remove("hidden");
}) // end addEventListener

addSongBtn.addEventListener("click", function(e){
	Song.name = songNameEmt.value;
	Song.artist = artistEmt.value;
	Song.album = albumEmt.value;
	addSongToDOM(Song, btnMore);
}) // end addEventListener
// end of user input block

// load song from json file
var songRequest = new XMLHttpRequest;
songRequest.addEventListener("load", getSongFromJSON); //Callback
songRequest.open("GET", "songs.json")
songRequest.send();
var btnMore = document.createElement("button");
btnMore.innerHTML = "More>";
btnMore.addEventListener("click", function(){
	// load song from json2 file
	var songRequest = new XMLHttpRequest;
	songRequest.addEventListener("load", getSongFromJSON2); //Callback
	songRequest.open("GET", "songs2.json")
	songRequest.send();
}) // end addEnventListener

function getSongFromJSON() {
  var data = JSON.parse(songRequest.responseText);
  for (var i = 0; i < data.songs.length; i++) {
  	addSongToDOM(data.songs[i]); // to add new element at the end
  }
  contentElement.appendChild(btnMore);
} // end of getSongFromJSON

function getSongFromJSON2() {
  var data = JSON.parse(songRequest.responseText);
	for (var i = 0; i < data.songs.length; i++) {
  	addSongToDOM(data.songs[i], btnMore); // to add new element before btnMore
  }
  } // end of getSongFromJSON2








