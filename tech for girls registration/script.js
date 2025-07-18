const form = document.getElementById("registrationForm");
const submitBtn = document.getElementById("submitBtn");
const shareBtn = document.getElementById("shareBtn");
const shareCounter = document.getElementById("shareCounter");
const successMessage = document.getElementById("successMessage");

let shareCount = parseInt(localStorage.getItem("shareCount")) || 0;
let submitted = localStorage.getItem("submitted") === "true";

updateUI();

shareBtn.addEventListener("click", () => {
  if (shareCount >= 5) return;

  const message = encodeURIComponent("Hey Buddy, Join Tech For Girls Community 💖");
  const whatsappURL = `https://wa.me/?text=${message}`;
  window.open(whatsappURL, "_blank");

  shareCount++;
  localStorage.setItem("shareCount", shareCount);
  updateUI();
});

function updateUI() {
  shareCounter.textContent = `Click count: ${shareCount}/5`;
  if (shareCount >= 5 && !submitted) {
    submitBtn.disabled = false;
    shareCounter.textContent += " ✅ Sharing complete. Please continue.";
  }
  if (submitted) {
    submitBtn.disabled = true;
    form.querySelectorAll("input").forEach(i => i.disabled = true);
    shareBtn.disabled = true;
    successMessage.textContent = "🎉 Your submission has been recorded. Thanks for being part of Tech for Girls!";
  }
}

form.addEventListener("submit", function(e) {
  e.preventDefault();
  if (submitted || shareCount < 5) return;

  const formData = new FormData(form);

  fetch("https://script.google.com/macros/s/AKfycbyH3kKfdPBjmQA6-g9fWhtWtOn_jl7Vc20xzLr-2daE8vbTE1LEk1_I2EYS-WV7rlID/exec", {
    method: "POST",
    body: formData
  })
  .then(res => {
    if (res.ok) {
      localStorage.setItem("submitted", "true");
      submitted = true;
      updateUI();
    } else {
      alert("❌ Something went wrong. Please try again.");
    }
  })
  .catch(() => {
    alert("❌ Submission failed. Check your internet or script URL.");
  });
});
