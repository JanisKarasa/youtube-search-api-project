// 9. Creating an event listener to a Search Form ...
let searchForm = document.querySelector("#search-form");
// ... 9.a to preventing a Default - Clicking on a "Submit" button, prevent it from submitting a form
searchForm.addEventListener("submit", function (e) {
  e.preventDefault();

  // ... 9.b put entire AJAX request in event listener
  // 1. Sending AJAX XMLHttpRequest to fetch data
  var xhttp = new XMLHttpRequest();
  xhttp.onreadystatechange = function () {
    if (this.readyState == 4 && this.status == 200) {
      // Typical action to be performed when the document is ready:
      // 2. Parse the JSON into a JS Object in variable
      let res = JSON.parse(xhttp.responseText);
      console.log(res);

      // 3. Mapping the part of JSON to see and extract what key-value pairs/objects are in 'items' part. Returns and Array
      // can go deeper in object with 'return item.snippet'
      let videoData = res.items.map(function (item) {
        console.log("Item Snippets: " + item);
        return item;
      });
      console.log("videoData: " + videoData);

      // 6. selecting a container to append a new div for each video (forEach in 7. step ;))
      let container = document.querySelector("#video-divs");

      // 11. resetting previous search results before load new search results
      container.innerHTML = "";

      // 7. Looping trough - For each video in (search result) videoData array ...
      videoData.forEach(function (video) {
        console.log(video);
        // ... create a div element 'videoDiv' and giving a class 'video-div' to add some styles
        let videoDiv = document.createElement("div");
        videoDiv.classList.add("video-div");
        // ... and populate that videoDiv with information
        videoDiv.innerHTML = `
                  <a href="https://www.youtube.com/watch?v=${video.id.videoId}">
                    <img src=${video.snippet.thumbnails.high.url}>
                  </a>
                  <h4>${video.snippet.title}</h4>
                  <p>${video.snippet.channelTitle}</p>
                  <p>${new Date(
                    video.snippet.publishTime
                  ).toLocaleDateString()}</p>
              `;
        // ... and appending that videoDiv to a container #video-divs
        container.appendChild(videoDiv);
      });
    }
  };
  // 10.a getting a value from Search Bar ...
  let textValue = document.querySelector("#search-bar").value;
  xhttp.open(
    // Requesting a Search endpoint
    "GET",
    // 8. adding '&maxResults=9' to a URL to show 9 result on the page
    // 10.b and change the link to Template String and pass in a value of the search bar
    `https://www.googleapis.com/youtube/v3/search?part=snippet&q=${textValue}&maxResults=9&key=AIzaSyAR8356hqr2uGBOvaLEtC1g6T-IGTXtA84`,
    true
  );
  xhttp.send();
});
