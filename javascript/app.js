import auth from "../auth.js";

const gallery = document.querySelector(".gallery");
const searchInput = document.querySelector(".search-input");
const searchForm = document.querySelector(".search-form");
let searchValue;

const authKey = auth.API_KEY;

// Event listeners
searchInput.addEventListener("input", updateInput);
searchForm.addEventListener("submit", (event) => {
  event.preventDefault();
  searchImage(searchValue);
});

function updateInput(event) {
  searchValue = event.target.value;
  console.log(typeof searchValue);
}

async function apodImages() {
  // Fetch data from NASA imag api
  const fetchedData = await fetch(
    `https://api.nasa.gov/planetary/apod?api_key=${authKey}&count=15&concept_tags=false'`,
    {
      method: "GET",
      headers: {
        Accept: "application/json",
      },
    }
  );
  // Parse response into JSON
  const data = await fetchedData.json();
  console.log(data);
  // Display images on webpage
  data.forEach((photo) => {
    if (photo.media_type === "image") {
      const galleryImg = document.createElement("div");
      galleryImg.classList.add("gallery-img");
      galleryImg.innerHTML = `<img src="${photo.url}"></img>
      <p>${photo.title}</p>`;
      gallery.appendChild(galleryImg);
    }
  });
}

async function searchImage(search) {
  // Fetch data from NASA imag api
  try {
  } catch (error) {}
  const fetchedData = await fetch(
    `https://api.nasa.gov/planetary/apod?api_key=${authKey}&date=${search}`,
    {
      method: "GET",
      headers: {
        Accept: "application/json",
      },
    }
  );
  // Parse response into JSON
  const data = await fetchedData.json();
  // If date is not within the correct range, display an error message
  if (data.msg) {
    alert(data.msg);
  }
  // Display image on webpage
  if (data.media_type === "image") {
    const galleryImg = document.createElement("div");
    galleryImg.classList.add("gallery-img");
    galleryImg.innerHTML = `<img src="${data.url}"></img>
    <p>${data.title}</p>`;
    gallery.appendChild(galleryImg);
  }
}

apodImages();
