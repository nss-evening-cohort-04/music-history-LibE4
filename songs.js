// Each student must add one song to the beginning and the end of the array.
// Loop over the array and remove any words or characters that obviously don't belong.
// Students must find and replace the > character in each item with a - character.
// Must add each string to the DOM in index.html in the main content area.
var songs = [];

songs[songs.length] = "Legs > by Z*ZTop on the album Eliminator";
songs[songs.length] = "The Logical Song > by Supertr@amp on the album Breakfast in America";
songs[songs.length] = "Another Brick in the Wall > by Pink Floyd on the album The Wall";
songs[songs.length] = "Welco(me to the Jungle > by Guns & Roses on the album Appetite for Destruction";
songs[songs.length] = "Ironi!c > by Alanis Moris*ette on the album Jagged Little Pill";
songs.push("The Power of Love > by Celine Dion on the album Color of My Love");
songs.unshift("From This Moment On > by Shania Twain on the album Come On Over");
console.log(songs);
var songName, artist, album;
var contentElement = document.getElementById("content");

for (var i = 0; i < songs.length; i++) {
	songs[i] = songs[i].replace(/>/g, "-");
	var charCode = 0, songsEdit = "";
	for (var j = 0; j < songs[i].length; j++) {
		charCode = songs[i].charCodeAt(j);
		if ((65 <= charCode && charCode <=90) || (97 <= charCode && charCode <= 122) || (charCode == 45) || (charCode == 32)) {
			songsEdit += songs[i].charAt(j);
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

}