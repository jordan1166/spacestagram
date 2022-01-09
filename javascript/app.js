const gallery = document.querySelector(".gallery");
const searchInput = document.querySelector(".search-input");
const submitButton = document.querySelector(".submit-button");
let searchValue;

const auth = "YZCfYA51pkjZGlYqTpli2XMFTVAxYh133LzrIECX";

async function apodImages() {
  const fetchedData = await fetch(
    `https://api.nasa.gov/planetary/apod?api_key=${auth}&count=15&concept_tags=true'`,
    {
      method: "GET",
      headers: {
        Accept: "application/json",
      },
    }
  );
  const data = await fetchedData.json();
  console.log(data);
  data.forEach((photo) => {
    const galleryImg = document.createElement("div");
    galleryImg.classList.add("gallery-img");
    galleryImg.innerHTML = `<img src="${photo.url}"></img>
    <p>${photo.title}</p>`;
    gallery.appendChild(galleryImg);
  });
}

apodImages();
