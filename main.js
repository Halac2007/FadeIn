// JavaScript để xử lý hiệu ứng khi cuộn trang
const mainContent = document.querySelector(".main-content");
const mainContentSide = document.querySelector(".main-content-side");
const mainContentText = document.querySelector(".main-content-text");
const mainContentTextCol = document.querySelector(".main-content-text-col");

// Hàm kiểm tra phần tử có trong viewport không
function isInViewport(element) {
  const rect = element.getBoundingClientRect();
  return (
    rect.top >= 0 &&
    rect.left >= 0 &&
    rect.bottom <= (window.innerHeight || document.documentElement.clientHeight) &&
    rect.right <= (window.innerWidth || document.documentElement.clientWidth)
  );
}

// Hàm xử lý sự kiện cuộn trang
function handleScroll() {
  if (isInViewport(mainContentSide)) {
    mainContentSide.classList.add("show");
  }
  if (isInViewport(mainContentText)) {
    mainContentText.classList.add("show");
  }
  if (isInViewport(mainContentTextCol)) {
    mainContentTextCol.classList.add("show");
  }
}

// Sử dụng sự kiện scroll để gọi hàm xử lý
window.addEventListener("scroll", handleScroll);

// Gọi hàm handleScroll ban đầu để kiểm tra trạng thái khi tải trang
handleScroll();

/*-------------------------*/
document.addEventListener("DOMContentLoaded", function () {
  const mainImage = document.querySelector(".gallery-main-image");
  const thumbnails = document.querySelectorAll(".thumbnail-item");
  const lightbox = document.getElementById("lightbox");
  const lightboxImage = document.getElementById("lightbox-image");
  const lightboxClose = document.getElementById("lightbox-close");
  const prevBtn = document.getElementById("prev-btn");
  const nextBtn = document.getElementById("next-btn");

  const fadein = document.querySelectorAll(".fade-in.visible");

  let currentIndex = 0;

  thumbnails.forEach((thumbnail, index) => {
    thumbnail.addEventListener("click", function (event) {
      event.preventDefault();

      currentIndex = index;
      const imageUrl = this.querySelector(".thumbnail-image").src;
      mainImage.src = imageUrl;
      lightboxImage.src = imageUrl;
      lightbox.style.display = "flex";
      fadein.style.opacity = 0;
      document.body.classList.add("no-scroll");
    });
  });

  function closeLightbox() {
    lightbox.style.display = "none";
    document.body.classList.remove("no-scroll");
  }

  lightboxClose.addEventListener("click", closeLightbox);

  lightbox.addEventListener("click", function (event) {
    if (event.target === lightbox) {
      closeLightbox();
    }
  });

  document.addEventListener("keydown", function (event) {
    if (event.key === "Escape") {
      closeLightbox();
    }
  });

  prevBtn.addEventListener("click", function () {
    currentIndex = (currentIndex - 1 + thumbnails.length) % thumbnails.length;
    const imageUrl = thumbnails[currentIndex].querySelector(".thumbnail-image").src;
    mainImage.src = imageUrl;
    lightboxImage.src = imageUrl;
  });

  nextBtn.addEventListener("click", function () {
    currentIndex = (currentIndex + 1) % thumbnails.length;
    const imageUrl = thumbnails[currentIndex].querySelector(".thumbnail-image").src;
    mainImage.src = imageUrl;
    lightboxImage.src = imageUrl;
  });
});

/*-----------------------*/
document.addEventListener("DOMContentLoaded", function () {
  const footer = document.querySelector(".footer");

  let lastScrollTop = 0;
  window.addEventListener("scroll", function () {
    const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
    const windowHeight = window.innerHeight;
    const documentHeight = document.documentElement.scrollHeight;

    if (scrollTop + windowHeight >= documentHeight - 10) {
      // Show footer when near the bottom
      footer.classList.add("visible");
    } else if (scrollTop < lastScrollTop) {
      // Hide footer when scrolling up
      footer.classList.remove("visible");
    }

    lastScrollTop = scrollTop;
  });
});

/*----------------------*/
document.addEventListener("DOMContentLoaded", function () {
  const paragraphs = document.querySelectorAll(".fade-in");

  const observerOptions = {
    root: null,
    rootMargin: "0px",
    threshold: 0.5, // Thay đổi ngưỡng threshold tại đây
  };

  const observer = new IntersectionObserver((entries, observer) => {
    entries.forEach((entry) => {
      if (entry.intersectionRatio > 0.5) {
        entry.target.classList.add("visible");
      } else {
        entry.target.classList.remove("visible");
      }
    });
  }, observerOptions);

  paragraphs.forEach((paragraph) => {
    observer.observe(paragraph);
  });
});
