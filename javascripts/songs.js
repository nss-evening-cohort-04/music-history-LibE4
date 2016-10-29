
"use strict";
let addSongToDOM = require("./DOM");

let $songNameEmt = $("#add-name");
let $artistEmt = $("#add-artist");
let $albumEmt = $("#add-album");
let songs = [];

function loadJson(fileName){
  return new Promise((resolve, reject)=>{
    $.ajax({
      url:`../${fileName}`
    }).done(function(data){
      resolve(data);
    }).fail(function(xhr, status, error){
      reject(error);
    });
  });
}

function loadJson2(resultOfFirstAjax){
  return new Promise((resolve, reject)=>{
    $.ajax({
      url:"../songs2.json"
    }).done(function(data2){
      songs = resultOfFirstAjax.songs;
      resolve(data2);
    }).fail(function(xhr2, status2, error2){
      reject(error2);
    });
  });
}

function addSong(){
  let newSong = {};
  newSong.name = $songNameEmt.val();
  newSong.artist = $artistEmt.val();
  newSong.album = $albumEmt.val();
  songs.push(newSong);
  addSongToDOM(songs);
}

function loadSongs(fileName){
  loadJson(fileName).then(function(dataPass){
    dataPass.songs.forEach(function(song){
      songs.push(song);
    });
    addSongToDOM(songs);
  });
}

function getSongs(){
  return songs;
}

module.exports.addSong = addSong;
module.exports.loadSongs = loadSongs;
module.exports.getSongs = getSongs;
