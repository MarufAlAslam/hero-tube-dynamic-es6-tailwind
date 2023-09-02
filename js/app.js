const categories = document.getElementById("categories");
const videos = document.getElementById("videos");

const loadCategories = () => {
  fetch("https://openapi.programming-hero.com/api/videos/categories", {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
  })
    .then((res) => res.json())
    .then((data) => {
      const flex = document.createElement("div");
      flex.classList.add(
        "flex",
        "justify-center",
        "items-center",
        "gap-[24px]"
      );
      data.data.forEach((category) => {
        // console.log(category.category);
        const button = document.createElement("button");
        button.classList.add(
          "category-btn",
          "px-[20px]",
          "py-[8px]",
          "bg-[#d3dce3]",
          "rounded-[4px]",
          "text-[#5d5d5d]",
          "hover:bg-[#FF1F3D]",
          "hover:text-white",
          "transition",
          "duration-300"
        );
        button.innerText = category.category;
        button.setAttribute("category_id", category.category_id);
        // make the first button active
        if (category.category_id == 1000) {
          button.classList.add("active");
        }
        button.addEventListener("click", () => {
          if (button.attributes["category_id"].value == category.category_id) {
            const active = document.querySelectorAll(".active");
            active.forEach((btn) => {
              btn.classList.remove("active");
            });
            button.classList.add("active");

            loadVideos(category.category_id);
          }
        });
        flex.appendChild(button);
      });
      categories.appendChild(flex);
    });
};

const loadVideos = (id) => {
  videos.innerHTML = "";
  fetch(`https://openapi.programming-hero.com/api/videos/category/${id}`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
  })
    .then((res) => res.json())
    .then((data) => {
      if (data.data.length === 0) {
        videos.innerHTML = `<div class="py-[200px] flex justify-center items-center text-center flex-col">
            <img src="img/error.svg" alt="error" class="w-[200px] h-[200px] mb-[32px]">
            <h2 class="text-[32px] font-bold">
            Oops!! Sorry, There is no<br/> content here
            </h2>
            </div>`;
      } else {
        const grid = document.createElement("div");
        grid.classList.add(
          "grid",
          "lg:grid-cols-4",
          "md:grid-cols-3",
          "grid-cols-2",
          "gap-[24px]"
        );
        data.data.forEach((video) => {
          const card = document.createElement("div");
          card.classList.add("card");
          card.innerHTML = `
                  <div class="card-img">
                      <img src="${
                        video.thumbnail
                      }" class="h-[200px] w-full object-cover object-center rounded-[8px]" alt="" />
                  </div>

                  <div class="card-body py-[20px]">
                  <div class="flex justify-start items-start gap-[12px]">
                  <img src="${
                    video.authors[0].profile_picture
                  }" class="h-[40px] w-[40px] rounded-full object-cover object-top" alt="" />
                  <div className="details">
                  <p class="text-lg font-bold">
                  ${video.title}
                  </p>
                  <p class="text-sm text-[#5d5d5d] flex justify-start items-center gap-[10px]">
                  ${video.authors[0].profile_name}
                  ${
                    video.authors[0].verified &&
                    `<img src="img/verified.svg" alt="verified">`
                  }
                  </p>
                  <p class="text-sm text-[#5d5d5d]">
                  ${video.others.views} views
                  </p>
                  </div>
                  </div>
                  </div>
                  `;

          grid.appendChild(card);
        });
        videos.appendChild(grid);
      }
    });
};

loadCategories();
loadVideos(1000);
