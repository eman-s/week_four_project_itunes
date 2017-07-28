/*
  Here is a rough idea for the steps you could take:
*/

// 1. First select and store the elements you'll be working with
// 2. Create your `submit` event for getting the user's search term
// 3. Create your `fetch` request that is called after a submission
// 4. Create a way to append the fetch results to your page
// 5. Create a way to listen for a click that will play the song in the audio play
let siteControls = document.querySelector(".container")
let searchButton = document.querySelector(".search_button");
let input = document.querySelector(".search_song");
let searchResults = document.querySelector(".results");
let musicPlayer = document.querySelector(".music_player")
let albumButton = document.querySelectorAll(".albumBtn")
var audioSource = document.querySelector(".audioSource");



siteControls.addEventListener("click", function(e) {
  let inputValue = input.value;
  console.log("e is: ", e)


  if (e.target === searchButton) {

    fetch(`https://itunes.apple.com/search?term=${inputValue}`).then(

        function(response) {

          if (response.status !== 200) {
            console.log(response.status);
            return;
          }

          response.json().then(function(obj) {
            console.log("the object is: ", obj)
            let results = obj.results;



            console.log(results.forEach(function(track) {
              console.log("one of the results is: ", track);

              let albumCover = track.artworkUrl100
              var sample = track.previewUrl
              let artist = track.artistName
              let songTitle = track.trackName
              console.log(artist)


              let renderTracks = `<div class="box">
                          <h3>${artist}</h3>
                          <div class="sampleSrc" src="${sample}"></div>

                          <a href="#" src="${sample}"><button class="albumBtn" name="button" ><img class="image" value="${sample}" src="${albumCover}" alt="album_cover"> </button></a>

                          <div id="title">${songTitle}</div>
                          </div>`

              searchResults.innerHTML += renderTracks;




            }));



          });

        })
      .catch(function(err) {
        console.log("fetch error :-S", err);

      });
  }
//let's sample some music
  if(e.target && e.target.matches("img.image")){
      console.log("you pressed a button", e.target);
      audioSource.src = e.target.getAttribute('value');
      musicPlayer.load();
      musicPlayer.play();
  }
})
