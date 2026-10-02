const output = document.getElementById("output");
const btn = document.getElementById("download-images-button");

const images = [
  { url: "https://picsum.photos/id/237/200/300" },
  { url: "https://picsum.photos/id/238/200/300" },
  { url: "https://picsum.photos/id/239/200/300" },
];

function loadSingleImage(url) {
  return new Promise((resolve, reject) => {

    const img = new Image();

    img.onload = () => {
      resolve(img);
    };

    img.onerror = () => {
      reject(new Error("Failed to load image: " + url));
    };

    img.src = url;
  });
}

async function loadAllImages() {

  const loading = document.getElementById("loading");
  const error = document.getElementById("error");

  loading.style.display = "block";
  error.textContent = "";

  try {

    const promises = images.map(item =>
      loadSingleImage(item.url)
    );

    const loadedImages = await Promise.all(promises);

    loadedImages.forEach(img => {
      output.appendChild(img);
    });

  } catch (err) {

    error.textContent = err.message;

  } finally {

    loading.style.display = "none";
  }
}

btn.addEventListener("click", loadAllImages);



