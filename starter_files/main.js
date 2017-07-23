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
var divWithSample = document.querySelector(".sampleSrc")


function runThatIsh(){
  console.log("you pressed a button");
  var source = document.querySelector(".audioSource");
  source.src = this.divWithSample.src

  musicPlayer.load();
  musicPlayer.play();
}



siteControls.addEventListener("click", function(e) {
  let inputValue = input.value;
  console.log("E is: ", e)




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
              let sample = track.previewUrl
              let artist = track.artistName
              let songTitle = track.trackName
              console.log(artist)


              let renderTracks = `<h3>${artist}</h3>
                          <div class="box">

                          <div class="sampleSrc" src="${sample}"></div>

                          <button class="albumBtn" name="button" onclick="runThatIsh()"> <img class="image" src="${albumCover}" alt="album_cover" data-value:"${sample}"> </button>

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
})
