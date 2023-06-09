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

document.addEventListener("DOMContentLoaded", function() {
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
                method: "POST",
                body: formData,
            });
            if (response.ok) {
                let result = await response.json();
                alert(result.message);
                formPreview.innerHTML = "";
                form.reset();
                form.classList.remove("_sending");
            } else {
                alert("Error");
                form.classList.remove("_sending");
            }
        } else {
            alert("Please fill in the required fields");
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

    function emailTest(input) {
        return !/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,8})+$/.test(input.value);
    }

    // // File preview
    // const formItems = document.querySelectorAll(".file__item");

    // formItems.forEach((formItem, index) => {
    //     const formImage = formItem.querySelector(".file__input");
    //     const formPreview = formItem.querySelector(".file__preview");
    //     const buttonPlus = formItem.querySelector(".file__button-plus img");

    //     //Toggle plus/minus icon
    //     formImage.addEventListener("change", () => {
    //         if (formImage.files.length > 0) {
    //             // Файл було обрано
    //             uploadFile(formImage.files[0], formPreview);
    //             buttonPlus.src = "./img/form/minus.svg";
    //         } else {
    //             // Файл не було обрано
    //             formPreview.innerHTML = "";
    //             buttonPlus.src = "./img/form/plus.svg";
    //         }
    //     });
    // });

    const formItems = document.querySelectorAll(".file__item");

    formItems.forEach((formItem, index) => {
        const formImage = formItem.querySelector(".file__input");
        const formPreview = formItem.querySelector(".file__preview");
        const buttonPlus = formItem.querySelector(".file__button-plus");
        const buttonMinus = formItem.querySelector(".file__button-minus");

        // Toggle plus/minus icon
        formImage.addEventListener("change", () => {
            if (formImage.files.length > 0) {
                // File was selected
                uploadFile(formImage.files[0], formPreview);
                buttonPlus.style.display = "none";
                buttonMinus.style.display = "flex";
            } else {
                // File was not selected
                formPreview.innerHTML = "";
                buttonPlus.style.display = "flex";
                buttonMinus.style.display = "none";
            }
        });
    });

    function uploadFile(file, preview) {
        if (!["image/jpeg", "image/png", "image/gif"].includes(file.type)) {
            alert("Only images are allowed");
            return;
        }
        if (file.size > 5 * 1024 * 1024) {
            alert("File size should be less than 5MB");
            return;
        }

        const reader = new FileReader();
        reader.onload = function(e) {
            const img = document.createElement("img");
            img.src = e.target.result;
            img.alt = "photo";
            preview.innerHTML = "";
            preview.appendChild(img);
        };
        reader.onerror = function(e) {
            alert("Error");
        };
        reader.readAsDataURL(file);
    }
});

// =============animation==================

window.addEventListener("scroll", function() {
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

// ----------------------------------------------

// var images = document.querySelectorAll(".product-image");
// var initialImages = [];

// // Зберігаємо початкові зображення
// images.forEach(function (image) {
//   initialImages.push(image.getAttribute("src"));
// });

// // Об'єкт зі шляхами до нових зображень для кожного об'єкта
// var newImages = {
//   product1: [
//     "./img/kyiv/models1.1.jpg",
//     "./img/kyiv/models1.2.jpg",
//     "./img/kyiv/models1.3.jpg",
//   ],
//   product2: [
//     "./img/kyiv/models2.1.jpg",
//     "./img/kyiv/models2.3.jpg",
//     "./img/kyiv/models2.5.jpg",
//   ],
//   product3: [
//     "./img/kyiv/models3.1.jpg",
//     "./img/kyiv/models3.2.jpg",
//     "./img/kyiv/models3.3.jpg",
//   ],
//   product4: [
//     "./img/kyiv/models4.1.jpg",
//     "./img/kyiv/models4.2.jpg",
//     "./img/kyiv/models4.3.jpg",
//   ],
// };

// // Додаємо обробник події для кожного зображення
// images.forEach(function (image, index) {
//   image.addEventListener("mouseover", function () {
//     // Отримуємо атрибут data-product поточного зображення
//     var currentProduct = this.getAttribute("data-product");

//     // Змінюємо зображення для всіх інших, які не мають такий самий data-product значення
//     images.forEach(function (otherImage, otherIndex) {
//       if (
//         otherIndex !== index &&
//         otherImage.getAttribute("data-product") !== currentProduct
//       ) {
//         var newProductImages = newImages[currentProduct];
//         if (newProductImages && newProductImages.length === 3) {
//           var newIndex = otherIndex - (otherIndex > index ? 1 : 0);
//           otherImage.src = newProductImages[newIndex % 3]; // Змінюємо шлях до нового зображення
//           otherImage.classList.add("new-photo"); // Додаємо клас для стилізації нових фото
//         }
//       }
//     });
//   });

//   image.addEventListener("mouseout", function () {
//     // Повертаємо зображення до початкових значень
//     images.forEach(function (otherImage, otherIndex) {
//       otherImage.src = initialImages[otherIndex];
//       otherImage.classList.remove("new-photo"); // Видаляємо клас, щоб скасувати стилі нових фото
//     });
//   });
// });
// ------------------------------

function updateImageHover() {
    var screenWidth = window.innerWidth || document.documentElement.clientWidth || document.body.clientWidth;
    var rows = document.querySelectorAll(".city-row4");

    rows.forEach(function(row) {
        var images = row.querySelectorAll(".product-image");
        var initialImages = [];

        // Зберігаємо початкові зображення
        images.forEach(function(image) {
            initialImages.push(image.getAttribute("src"));
        });

        // Об'єкт зі шляхами до нових зображень для кожного об'єкта
        var newImages = {
            product1: [
                "./img/kyiv/models1.1.jpg",
                "./img/kyiv/models1.2.jpg",
                "./img/kyiv/models1.3.jpg",
            ],
            product2: [
                "./img/kyiv/models2.1.jpg",
                "./img/kyiv/models2.3.jpg",
                "./img/kyiv/models2.5.jpg",
            ],
            product3: [
                "./img/kyiv/models3.1.jpg",
                "./img/kyiv/models3.2.jpg",
                "./img/kyiv/models3.3.jpg",
            ],
            product4: [
                "./img/kyiv/models4.1.jpg",
                "./img/kyiv/models4.2.jpg",
                "./img/kyiv/models4.3.jpg",
            ],
        };

        if (screenWidth >= 480) {
            // Додаємо обробник події для кожного зображення
            images.forEach(function(image, index) {
                image.addEventListener("mouseover", function() {
                    // Отримуємо атрибут data-product поточного зображення
                    var currentProduct = this.getAttribute("data-product");

                    // Змінюємо зображення для всіх інших, які не мають такий самий data-product значення
                    images.forEach(function(otherImage, otherIndex) {
                        if (
                            otherIndex !== index &&
                            otherImage.getAttribute("data-product") !== currentProduct
                        ) {
                            var newProductImages = newImages[currentProduct];
                            if (newProductImages && newProductImages.length === 3) {
                                var newIndex =
                                    Math.floor(otherIndex / 4) * 3 +
                                    (otherIndex % 4) -
                                    (otherIndex > index ? 1 : 0);
                                otherImage.src = newProductImages[newIndex % 3]; // Змінюємо шлях до нового зображення
                                otherImage.classList.add("new-photo"); // Додаємо клас для стилізації нових фото

                            }
                        }
                    });
                });

                image.addEventListener("mouseout", function() {
                    // Повертаємо зображення до початкових значень
                    images.forEach(function(otherImage, otherIndex) {
                        otherImage.src = initialImages[otherIndex];
                        otherImage.classList.remove("new-photo"); // Видаляємо клас, щоб скасувати стилі нових фото

                    });
                });
            });
        } else {
            // Відключаємо обробники подій при ширині екрану менше 480px
            images.forEach(function(image) {
                image.removeEventListener("mouseover", null);
                image.removeEventListener("mouseout", null);
            });
        }
    });
}

// Викликати функцію при завантаженні сторінки та при зміні розміру вікна
window.addEventListener("load", updateImageHover);
window.addEventListener("resize", updateImageHover);


// // -----------------------------------
function checkScreenWidth() {
    var screenWidth = window.innerWidth || document.documentElement.clientWidth || document.body.clientWidth;

    if (screenWidth > 480) {

        var rows = document.querySelectorAll(".city-row4");

        rows.forEach(function(row) {
            var productCards = row.querySelectorAll(".product-card");

            productCards.forEach(function(card) {
                var productImage = card.querySelector(".product-image");
                var podloga = card.querySelector(".podloga");

                card.addEventListener("mouseover", function() {
                    // Змінюємо видимість .podloga на всіх .product-card елементах у поточному ряду
                    productCards.forEach(function(card) {
                        var podloga = card.querySelector(".podloga");
                        podloga.classList.add("hidden");
                    });

                    // Показуємо .podloga тільки на поточному .product-card елементі
                    podloga.classList.remove("hidden");
                });

                card.addEventListener("mouseout", function() {
                    // Відновлюємо видимість .podloga на всіх .product-card елементах у поточному ряду
                    productCards.forEach(function(card) {
                        var podloga = card.querySelector(".podloga");
                        podloga.classList.remove("hidden");
                    });
                });
            });
        });

    }
}

// Викликати функцію при завантаженні сторінки та при зміні розміру вікна
window.addEventListener("load", checkScreenWidth);
window.addEventListener("resize", checkScreenWidth);


// =========================slider=================================





// ------------------------
// window.addEventListener('load', function() {
//     // Отримуємо посилання на фото з картки товару
//     var productImage = document.querySelector('.product-card .product-image');

//     // Додаємо обробник події для кліку на фото
//     productImage.addEventListener('click', function() {
//         // Показуємо слайдеровий контейнер та перекриваючий шар
//         var sliderContainer = document.querySelector('.slider-container');
//         var overlay = document.querySelector('.overlay');
//         sliderContainer.style.display = 'block';
//         overlay.style.display = 'block';

//         // Ініціалізуємо Swiper
//         var swiper = new Swiper('.swiper-container', {
//             // Налаштування Swiper
//             // Додайте будь-які налаштування, які вам потрібні
//             // Див. документацію Swiper для повного списку налаштувань: https://swiperjs.com/api/
//             navigation: {
//                 nextEl: '.swiper-button-next',
//                 prevEl: '.swiper-button-prev',
//             },
//             pagination: {
//                 el: '.swiper-pagination',
//                 clickable: true,
//             },
//             scrollbar: {
//                 el: '.swiper-scrollbar',
//             },
//             hiddenClass: null, // Показувати стрілки для свайпу відразу
//         });

//         // Додаємо обробник події для закриття слайдера
//         var closeButton = document.querySelector('.close-button');
//         closeButton.addEventListener('click', function() {
//             // Ховаємо слайдеровий контейнер та перекриваючий шар
//             sliderContainer.style.display = 'none';
//             overlay.style.display = 'none';

//             // Знищуємо Swiper
//             swiper.destroy(true, true);
//         });
//     });
// });

// =========================slider=================================

// var productImage = document.querySelector('.product-card .product-image');
// var sliderContainer = document.querySelector('.slider-container');
// var overlay = document.querySelector('.overlay');

// productImage.addEventListener('click', function() {
//     var windowWidth = window.innerWidth || document.documentElement.clientWidth;

//     if (windowWidth <= 480) {
//         // Заборона прокручування контента
//         document.body.style.overflow = 'hidden';
//         document.documentElement.style.overflow = 'hidden';
//         document.body.style.position = 'fixed';
//         document.documentElement.style.position = 'fixed';

//         // Показуємо слайдеровий контейнер та перекриваючий шар
//         sliderContainer.style.display = 'block';
//         overlay.style.display = 'block';

//         // Ініціалізуємо Swiper
//         var swiper = new Swiper('.swiper-container', {
//             // Налаштування Swiper
//             // Додайте будь-які налаштування, які вам потрібні
//             // Див. документацію Swiper для повного списку налаштувань: https://swiperjs.com/api/
//             navigation: {
//                 nextEl: '.swiper-button-next',
//                 prevEl: '.swiper-button-prev',
//             },
//             pagination: {
//                 el: '.swiper-pagination',
//                 clickable: true,
//             },
//             scrollbar: {
//                 el: '.swiper-scrollbar',
//             },
//             hiddenClass: null, // Показувати стрілки для свайпу відразу
//         });

//         var closeButton = document.querySelector('.close-button');
//         closeButton.addEventListener('click', function() {
//             // Відновлення прокрутки контента
//             document.body.style.overflow = '';
//             document.documentElement.style.overflow = '';
//             document.body.style.position = '';
//             document.documentElement.style.position = '';

//             // Ховаємо слайдеровий контейнер та перекриваючий шар
//             sliderContainer.style.display = 'none';
//             overlay.style.display = 'none';

//             // Знищуємо Swiper
//             swiper.destroy(true, true);
//         });
//     }
// });


// / Отримуємо всі карти товарів на сторінці
var productCards = document.querySelectorAll('.product-card');

// Проходимося по кожній картці товару і створюємо слайдер
productCards.forEach(function(productCard) {
    var productImage = productCard.querySelector('.product-image');
    var sliderContainer = productCard.querySelector('.slider-container');
    var overlay = productCard.querySelector('.overlay');

    productImage.addEventListener('click', function() {
        var windowWidth = window.innerWidth || document.documentElement.clientWidth;
        console.log("swiper");

        if (windowWidth <= 480) {
            // Заборона прокручування контента
            document.body.style.overflow = 'hidden';
            document.documentElement.style.overflow = 'hidden';
            document.body.style.position = 'fixed';
            document.documentElement.style.position = 'fixed';

            // Показуємо слайдеровий контейнер та перекриваючий шар
            sliderContainer.style.display = 'block';
            overlay.style.display = 'block';

            // Ініціалізуємо Swiper
            const swiper = new Swiper('.swiper', {

                // Optional parameters
                loop: true,

                // If we need pagination
                pagination: {
                    el: '.swiper-pagination',
                    clickable: true,
                },

                // Navigation arrows
                navigation: {
                    nextEl: '.swiper-button-next',
                    prevEl: '.swiper-button-prev',
                },

                // And if we need scrollbar
                // scrollbar: {
                //     el: '.swiper-scrollbar',
                // },
                hiddenClass: null,
            });

            var closeButton = productCard.querySelector('.close-button');
            closeButton.addEventListener('click', function() {
                // Відновлення прокрутки контента
                document.body.style.overflow = '';
                document.documentElement.style.overflow = '';
                document.body.style.position = '';
                document.documentElement.style.position = '';

                // Ховаємо слайдеровий контейнер та перекриваючий шар
                sliderContainer.style.display = 'none';
                overlay.style.display = 'none';

                // Знищуємо Swiper
                swiper.destroy(true, true);
            });
        }
    });
});
// =========================bag===================