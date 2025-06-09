// Constants
const API_BASE_URL = "http://localhost:3000/v1";
const MAX_FILE_SIZE = 5 * 1024 * 1024; // 5MB
const ALLOWED_TYPES = ["image/jpeg", "image/png", "image/gif"];

// Upload Image
document.getElementById("uploadForm").addEventListener("submit", async (e) => {
  e.preventDefault();

  // UI Elements
  const name = document.getElementById("name").value.trim();
  const imageFile = document.getElementById("image").files[0];
  const resultText = document.getElementById("uploadResult");
  const submitBtn = e.target.querySelector('button[type="submit"]');
  const originalBtnText = submitBtn.textContent;

  // Reset UI
  resultText.textContent = "";
  resultText.className = "";

  // Validation
  if (!name || !imageFile) {
    resultText.textContent = "Please provide both a name and an image.";
    resultText.classList.add("error");
    return;
  }

  if (!ALLOWED_TYPES.includes(imageFile.type)) {
    resultText.textContent = "Only JPG, PNG, or GIF images are allowed.";
    resultText.classList.add("error");
    return;
  }

  if (imageFile.size > MAX_FILE_SIZE) {
    resultText.textContent = "Image must be less than 5MB.";
    resultText.classList.add("error");
    return;
  }

  // Prepare and send
  const formData = new FormData();
  formData.append("name", name);
  formData.append("image", imageFile);

  try {
    submitBtn.disabled = true;
    submitBtn.textContent = "Uploading...";

    const res = await fetch(`${API_BASE_URL}/upload-image`, {
      method: "POST",
      body: formData,
    });

    const data = await res.json();
    if (res.ok) {
      resultText.textContent = data.message || "Image uploaded successfully!";
      resultText.classList.add("success");
      e.target.reset();
      
      setTimeout(() => {
        resultText.textContent = "";
        resultText.className = "";
      }, 2000);
    } else {
      resultText.textContent =
        data.message || "Upload failed. Please try again.";
      resultText.classList.add("error");
    }
  } catch (err) {
    const errorMsg = navigator.onLine
      ? "Server error. Please try again later."
      : "You appear to be offline. Please check your connection.";
    resultText.textContent = errorMsg;
    resultText.classList.add("error");
    console.error("Upload error:", err);
  } finally {
    submitBtn.disabled = false;
    submitBtn.textContent = originalBtnText;
  }
});

// Fetch Image
async function fetchImage() {
  const name = document.getElementById("fetchName").value.trim();
  const fetchResult = document.getElementById("fetchResult");
  const imageEl = document.getElementById("fetchedImage");

  // Reset UI
  fetchResult.textContent = "";
  fetchResult.className = "";
  imageEl.style.display = "none";

  if (!name) {
    fetchResult.textContent = "Please enter an image name to fetch.";
    fetchResult.classList.add("error");
    return;
  }

  try {
    const res = await fetch(
      `http://localhost:3000/v1/get-image/${encodeURIComponent(name)}`
    );
    const data = await res.json();

    if (res.ok && data.data) {
      // Ensure data.data exists and is a string
      if (typeof data.data === "object" && data.data.url) {
        // If data.data is an object with url property
        var imageUrl = data.data.url;
      } else if (typeof data.data === "string") {
        // If data.data is directly the URL string
        var imageUrl = data.data;
      } else {
        throw new Error("Invalid image data format");
      }

      // Ensure the URL is properly formatted
      if (!imageUrl.startsWith("http")) {
        // Prepend base URL if it's a relative path
        imageUrl = `http://localhost:3000${
          imageUrl.startsWith("/") ? "" : "/"
        }${imageUrl}`;
      }

      fetchResult.textContent = data.message || "Image found!";
      fetchResult.classList.add("success");

      // Set up error handler before assigning src
      imageEl.onerror = () => {
        console.error("Failed to load image at:", imageUrl);
        fetchResult.textContent = "Error: The image exists but failed to load.";
        fetchResult.classList.replace("success", "error");
        imageEl.style.display = "none";
      };

      imageEl.src = imageUrl;
      imageEl.style.display = "block";
    } else {
      fetchResult.textContent = data.message || "Image not found.";
      fetchResult.classList.add("error");
    }
  } catch (err) {
    console.error("Fetch error:", err);
    fetchResult.textContent = "Error fetching image. Please try again.";
    fetchResult.classList.add("error");
    imageEl.style.display = "none";
  }
}
