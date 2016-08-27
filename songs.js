var songs = [];
songs[songs.length] = "Legs > by Z*ZTop on the album Eliminator";
songs[songs.length] = "The Logical Song > by Supertr@amp on the album Breakfast in America";
songs[songs.length] = "Another Brick in the Wall > by Pink Floyd on the album The Wall";
songs[songs.length] = "Welco(me to the Jungle > by Guns & Roses on the album Appetite for Destruction";
songs[songs.length] = "Ironi!c > by Alanis Moris*ette on the album Jagged Little Pill";
songs.push("The Power of Love > by Celine Dion on the album Color of My Love");
songs.unshift("From This Moment On > by Shania Twain on the album Come On Over");

var songName, artist, album;
var contentElement = document.getElementById("content");
for (var i = 0; i < songs.length; i++) {
	addSongToDOM(songs[i]);
}

function addSongToDOM(song) {
	song = song.replace(/>/g, "-");
	var charCode = 0, songsEdit = "";
	for (var j = 0; j < song.length; j++) {
		charCode = song.charCodeAt(j);
		if ((65 <= charCode && charCode <=90) || (97 <= charCode && charCode <= 122) || (charCode == 45) || (charCode == 32)|| (charCode == 38)) {
			songsEdit += song.charAt(j);
		}
	}
	songName = songsEdit.substring(0, songsEdit.indexOf(" -"));
	artist = songsEdit.substring((songsEdit.indexOf("by ") + 3), songsEdit.indexOf(" on the album"));
	album = songsEdit.substring((songsEdit.indexOf("album ") + 5), songsEdit.length);
	var newSection = document.createElement("section");
	newSection.className = "songs";
	var newH4 = document.createElement("h4");
	var newUl = document.createElement("ul");
	newUl.className = "content-item";
	var newLi1 = document.createElement("li");
	var newLi2 = document.createElement("li");
	newH4.innerHTML = songName;
	newLi1.innerHTML = artist;
	newLi2.innerHTML = album;
	contentElement.appendChild(newSection);
	newSection.appendChild(newH4);
	newSection.appendChild(newUl);
	newUl.appendChild(newLi1);
	newUl.appendChild(newLi2);
} // end function addSongToDOM

var navEmt = document.getElementById("nav-item");
var filterEmt = document.getElementById("filter");
var contentEmt = document.getElementById("content");
var addMusicEmt = document.getElementById("add-music-view");
var songNameEmt = document.getElementById("songname");
var artistEmt = document.getElementById("artist");
var albumEmt = document.getElementById("album");
var addSongBtn = document.getElementById("addsong");

navEmt.childNodes[3].addEventListener("click", function(){
	filterEmt.classList.add("show");
	filterEmt.classList.remove("hidden");
	contentEmt.classList.add("show");
	contentEmt.classList.remove("hidden");
	addMusicEmt.classList.add("hidden");
	addMusicEmt.classList.remove("show");
}) // end addEventListener

navEmt.childNodes[5].addEventListener("click", function(){
	filterEmt.classList.add("hidden");
	filterEmt.classList.remove("show");
	contentEmt.classList.add("hidden");
	contentEmt.classList.remove("show");
	addMusicEmt.classList.add("show");
	addMusicEmt.classList.remove("hidden");
}) // end addEventListener

addSongBtn.addEventListener("click", function(e){
	e.preventDefault();
	songs.push(songNameEmt.value + " > by " + artistEmt.value + " on the album " + albumEmt.value);
	addSongToDOM(songs[songs.length-1]);
}) // end addEventListener
