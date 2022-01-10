import auth from "./auth.js";

const gallery = document.querySelector(".gallery");
const searchInput = document.querySelector(".search-input");
const searchForm = document.querySelector(".search-form");
let searchValue;

const authKey = auth.API_KEY;

// Event listeners

// Update the value of the search form input as the user types
searchInput.addEventListener("input", updateInput);
// When the search button is clicked, call the searchImage function with 'searchValue' as an argument
searchForm.addEventListener("submit", (event) => {
  event.preventDefault();
  searchImage(searchValue);
});

function updateInput(event) {
  searchValue = event.target.value;
}

async function fetchAPI(url) {
  // Fetch data from NASA image api
  const fetchedData = await fetch(url, {
    method: "GET",
    headers: {
      Accept: "application/json",
    },
  });
  // Parse response into JSON
  return await fetchedData.json();
}

function displayImages(data) {
  if (data.length > 1) {
    // If multiple images are fetched, use forEach loop to display them
    data.forEach((photo) => {
      if (photo.media_type === "image") {
        const galleryImg = document.createElement("div");
        galleryImg.classList.add("gallery-img");
        galleryImg.innerHTML = `<img src="${photo.url}"></img>
    <p>${photo.title}</p>`;
        gallery.appendChild(galleryImg);
      }
    });
  } else {
    // If user searches for one image display that image
    if (data.media_type === "image") {
      const galleryImg = document.createElement("div");
      galleryImg.classList.add("gallery-img");
      galleryImg.innerHTML = `<img src="${data.url}"></img>
  <p>${data.title}</p>`;
      gallery.appendChild(galleryImg);
    }
  }
}

// Display random images when the page loads
async function apodImages() {
  const data = await fetchAPI(
    `https://api.nasa.gov/planetary/apod?api_key=${authKey}&count=15&concept_tags=false`
  );
  displayImages(data);
}
// Search for image using a specific date
async function searchImage(search) {
  const data = await fetchAPI(
    `https://api.nasa.gov/planetary/apod?api_key=${authKey}&date=${search}`
  );
  // If date is not within the correct range, display an error message
  if (data.msg) {
    alert(data.msg);
  }
  displayImages(data);
}

apodImages();
