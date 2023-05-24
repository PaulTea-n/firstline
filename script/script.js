"use strict";
//=================== newbar menu ====================

const hamburger = document.querySelector(".hamburger");
const navMenu = document.querySelector(".nav-container");

hamburger.addEventListener("click", () => {
  hamburger.classList.toggle("active");
  navMenu.classList.toggle("active");
});

document.querySelectorAll(".nav-link").forEach((n) =>
  n.addEventListener("click", () => {
    hamburger.classList.remove("active");
    navMenu.classList.remove("active");
  })
);

// ================== form ==========================
document.addEventListener("DOMContentLoaded", function () {
  const form = document.getElementById("form");
  form.addEventListener("submit", formSend);

  async function formSend(e) {
    e.preventDefault();

    let error = formValidate(form);

    let formData = new FormData(form);
    formData.append("image", formImage.files[0]);

    if (error === 0) {
      form.classList.add("_sending");
      let response = await fetch("sendmail.php", {
        mathod: "POST",
        body: formData,
      });
      if (response.ok) {
        let result = await response.json();
        alert(result.massage);
        formPreview.innerHTML = "";
        form.reset();
        form.classList.remove("_sending");
      } else {
        alert("Error");
        form.classList.remove("_sending");
      }
    } else {
      alert("fill in the required fields");
    }
  }

  function formValidate(form) {
    let error = 0;
    let formReq = document.querySelectorAll("._req");

    for (let index = 0; index < formReq.length; index++) {
      const input = formReq[index];
      formRemoveError(input);

      if (input.classList.contains("_email")) {
        if (emailTest(input)) {
          formAddError(input);
          error++;
        }
      } else if (
        input.getAttribute("type") === "checkbox" &&
        input.checked === false
      ) {
        formAddError(input);
        error++;
      } else {
        if (input.value === "") {
          formAddError(input);
          error++;
        }
      }
    }
    return error;
  }

  function formAddError(input) {
    input.parentElement.classList.add("_error");
    input.classList.add("_error");
  }

  function formRemoveError(input) {
    input.parentElement.classList.remove("_error");
    input.classList.remove("_error");
  }

  // ---test email---
  function emailTest(input) {
    return !/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,8})+$/.test(input.value);
  }

  // ---file preview---
  const formImage1 = document.getElementById("formImage1");
  const formImage2 = document.getElementById("formImage2");
  const formImage3 = document.getElementById("formImage3");
  const formImage4 = document.getElementById("formImage4");

  // img preview
  const formPreview1 = document.getElementById("formPreview1");
  const formPreview2 = document.getElementById("formPreview2");
  const formPreview3 = document.getElementById("formPreview3");
  const formPreview4 = document.getElementById("formPreview4");

  formImage1.addEventListener("change", () => {
    uploadFile1(formImage1.files[0], formPreview1);
  });
  formImage2.addEventListener("change", () => {
    uploadFile2(formImage2.files[0], formPreview2);
  });
  formImage3.addEventListener("change", () => {
    uploadFile3(formImage3.files[0], formPreview3);
  });
  formImage4.addEventListener("change", () => {
    uploadFile4(formImage4.files[0], formPreview4);
  });

  function uploadFile1(file) {
    if (!["image/jpeg", "image/png", "image/gif"].includes(file.type)) {
      alert("only images are allowed");
      formImage1.value = "";

      return;
    }
    if (file.size > 5 * 1024 * 1024) {
      alert("File requirement is 5MB per image");
      return;
    }

    const reader = new FileReader();
    reader.onload = function (e) {
      formPreview1.innerHTML = `<img src="${e.target.result}" alt="photo">`;
    };
    reader.onerror = function (e) {
      alert("Error");
    };
    reader.readAsDataURL(file);
  }

  function uploadFile2(file) {
    if (!["image/jpeg", "image/png", "image/gif"].includes(file.type)) {
      alert("only images are allowed");
      formImage2.value = "";

      return;
    }
    if (file.size > 5 * 1024 * 1024) {
      alert("File requirement is 5MB per image");
      return;
    }

    const reader = new FileReader();
    reader.onload = function (e) {
      formPreview2.innerHTML = `<img src="${e.target.result}" alt="photo">`;
    };
    reader.onerror = function (e) {
      alert("Error");
    };
    reader.readAsDataURL(file);
  }

  function uploadFile3(file) {
    if (!["image/jpeg", "image/png", "image/gif"].includes(file.type)) {
      alert("only images are allowed");
      formImage3.value = "";

      return;
    }
    if (file.size > 5 * 1024 * 1024) {
      alert("File requirement is 5MB per image");
      return;
    }

    const reader = new FileReader();
    reader.onload = function (e) {
      formPreview3.innerHTML = `<img src="${e.target.result}" alt="photo">`;
    };
    reader.onerror = function (e) {
      alert("Error");
    };
    reader.readAsDataURL(file);
  }

  function uploadFile4(file) {
    if (!["image/jpeg", "image/png", "image/gif"].includes(file.type)) {
      alert("only images are allowed");
      formImage4.value = "";

      return;
    }
    if (file.size > 5 * 1024 * 1024) {
      alert("File requirement is 5MB per image");
      return;
    }

    const reader = new FileReader();
    reader.onload = function (e) {
      formPreview4.innerHTML = `<img src="${e.target.result}" alt="photo">`;
    };
    reader.onerror = function (e) {
      alert("Error");
    };
    reader.readAsDataURL(file);
  }
});

// =============animation==================

window.addEventListener("scroll", function () {
  const photo2 = document.querySelector(".photo2");
  const photo3 = document.querySelector(".photo3");
  var windowHeight = window.innerHeight;
  var documentHeight = document.documentElement.scrollHeight;
  var scrollPosition = window.pageYOffset;
  var scrollPercentage =
    (scrollPosition / (documentHeight - windowHeight)) * 100;
  // console.log(scrollPercentage.toFixed(2));

  if (scrollPercentage.toFixed(2) > 10) {
    photo2.classList.add("_active-img");
  } else {
    photo2.classList.remove("_active-img");
  }
  if (scrollPercentage.toFixed(2) > 16) {
    photo3.classList.add("_active-img");
  } else {
    photo3.classList.remove("_active-img");
  }
});

// window.addEventListener("scroll", function () {
//   var block = document.querySelector(".about-line_three"); // Замініть "#your-block-id" на селектор вашого блока
//   var blockHeight = block.offsetHeight;
//   var blockOffsetTop = block.offsetTop;
//   var windowHeight = window.innerHeight;
//   var scrollPosition = window.pageYOffset;
//   const photo2 = document.querySelector(".photo2");
//   const photo3 = document.querySelector(".photo3");

//   var visibleArea = Math.max(
//     0,
//     Math.min(windowHeight, blockOffsetTop + blockHeight - scrollPosition) -
//       Math.max(blockOffsetTop - scrollPosition, 0)
//   );
//   var visiblePercentage = (visibleArea / blockHeight) * 100;

//   console.log(visiblePercentage.toFixed(2));

//   if (visiblePercentage.toFixed(2) > 30) {
//     photo2.classList.add("_active-img");
//   } else {
//     photo2.classList.remove("_active-img");
//   }

//   if (visiblePercentage.toFixed(2) > 70) {
//     photo3.classList.add("_active-img");
//   } else {
//     photo3.classList.remove("_active-img");
//   }
// });
// ----------------------------------------------
