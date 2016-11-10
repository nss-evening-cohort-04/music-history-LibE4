
"use strict";
let addSongToDOM = require("./DOM");

let $songNameEmt = $("#add-name");
let $artistEmt = $("#add-artist");
let $albumEmt = $("#add-album");

function firebaseCredentials(){
  return new Promise((resolve, reject)=>{
    $.ajax({
      method: 'GET',
      url: 'apiKeys.json'
    }).then((response)=>{
      resolve(response);
    }, (error)=>{
      reject(error);
    });
  });
}

function loadJsonFB(apiKeys){
  return new Promise((resolve, reject)=>{
    $.ajax({
      method: "GET",
      url: `${apiKeys.databaseURL}/songs.json`
    }).then((response)=>{
      console.log("response", response);
      let songs = [];
      switch (Array.isArray(response)){
        case false:
          Object.keys(response).forEach(function(key){
            response[key].id = key;
            songs.push(response[key]);
          });
        break;  
        case true:
          response.forEach(function(item, index){
            item.id = index;
          });
          songs = response;
        break;
      }
      resolve(songs);
    }, (error)=>{
      reject(error);
    });
  });
}

function loadSongs(apiKeys){
  loadJsonFB(apiKeys).then(function(dataPass){
    addSongToDOM(dataPass);
  });
}

function postSongInFB(apiKeys, newItem){
  return new Promise((resolve, reject)=>{
    $.ajax({
      method: "POST",
      url: `${apiKeys.databaseURL}/songs.json`,
      data:JSON.stringify(newItem),
      dataType:"json"
    }).then((response)=>{
      console.log("response", response);
      resolve(response);
    }, (error)=>{
      reject(error);
    });
  });
}

function deleteSongInFB(apiKeys, itemId){
  return new Promise((resolve, reject)=>{
    $.ajax({
      method: "DELETE",
      url: `${apiKeys.databaseURL}/songs/${itemId}.json`,
    }).then((response)=>{
      console.log("delete", response);
      resolve(response);
    }, (error)=>{
      reject(error);
    });
  });
}

function addSong(apiKeys){
  let newSong = {};
  newSong.name = $songNameEmt.val();
  newSong.artist = $artistEmt.val();
  newSong.album = $albumEmt.val();
  postSongInFB(apiKeys, newSong).then(function(response){
    loadSongs(apiKeys);
  });
}

function deleteSong(apiKeys, itemId){
  deleteSongInFB(apiKeys, itemId).then(function(response){
    loadSongs(apiKeys);
  });
}

module.exports.loadSongs = loadSongs;
module.exports.addSong = addSong;
module.exports.deleteSong = deleteSong;
module.exports.loadJsonFB = loadJsonFB;
module.exports.firebaseCredentials = firebaseCredentials;
