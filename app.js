import auth from "./auth.js";

const gallery = document.querySelector(".gallery");
const searchInput = document.querySelector(".search-input");
const searchForm = document.querySelector(".search-form");
const likeButton = document.querySelector(".like-button");
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
// Toggle like button when clicked
document.querySelector("body").addEventListener("click", (event) => {
  if (event.target.id === "like") {
    event.target.classList.toggle("fas");
    event.target.classList.toggle("colorRed");
  }
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

// Adds HTML to display image, the title of the image, and a like button
function addInnerHTML(data) {
  return `
    <p class="date">Date: ${data.date}</p>
    <img src="${data.url}"></img>
    <div class="title-like">
      <p>${data.title}</p>
      <button class="like-button"><i id="like" class="far fa-heart"></i></button>
    </div>
  `;
}

function displayImages(data) {
  console.log(data);
  if (data.length > 1) {
    // If multiple images are fetched, use forEach loop to display them
    data.forEach((photo) => {
      if (photo.media_type === "image") {
        const galleryImg = document.createElement("div");
        galleryImg.classList.add("gallery-img");
        galleryImg.innerHTML = addInnerHTML(photo);
        gallery.appendChild(galleryImg);
      }
    });
  } else {
    // If user searches for one image display that image
    if (data.media_type === "image") {
      const galleryImg = document.createElement("div");
      galleryImg.classList.add("gallery-img");
      galleryImg.innerHTML = addInnerHTML(data);
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
  clear();
  const data = await fetchAPI(
    `https://api.nasa.gov/planetary/apod?api_key=${authKey}&date=${search}`
  );
  // If date is not within the correct range, display an error message
  if (data.msg) {
    alert(data.msg);
  }
  displayImages(data);
}

// Clears images from page and clears text from search input form
function clear() {
  gallery.innerHTML = "";
  searchInput.value = "";
}

apodImages();
