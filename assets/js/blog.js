//MENANGKAP DATA POST
const blogs = [];

function addBlog(event) {
  event.preventDefault();

  const inputTitle = document.getElementById("pronameinput").value;
  const inputContent = document.getElementById("descriptioninput").value;

  const inputStartDate = new Date(document.getElementById("startdate").value);
  const inputEndDate = new Date(document.getElementById("enddate").value);
  const seconds = inputEndDate - inputStartDate;
  const inputDuration = Math.floor(seconds / 1000 / 60 / 60 / 24);

  const inputJob = Array.from(
    document.querySelectorAll('input[name="brand"]:checked')
  ).map((cb) => cb.value);

  const inputImage = document.getElementById("imageinput").files;

  const blobImage = URL.createObjectURL(inputImage[0]);

  const data = {
    name: inputTitle,

    start: inputStartDate,
    end: inputEndDate,
    duration: inputDuration,

    description: inputContent,
    image: blobImage,

    job: inputJob,

    // author: "Bambang",
    // createdAt: new Date(),
  };

  blogs.unshift(data);

  console.log(blogs);
  renderBlog();

  document.getElementById("myForm").reset();
}

// //MENAMPILKAN DURATION
// function getDistanceTime() {

// }

//MENAMPILKAN POST BLOG
function renderBlog() {
  let html = "";

  for (let index = 0; index < blogs.length; index++) {
    html += `
         


      <div class="container">
      <div class="post-container">
        <div class="post-container-img">
          <img
            src="${blogs[index].image}"
            alt=""
            class="post-img"
          />
        </div>

        <div><h3>${blogs[index].name}</h3></div>

        <div>
          <p class="content-text4">Duration: ${blogs[index].duration} days</p>
        </div>

        <p class="content-text2" rows="4">${blogs[index].description}</p>
      </div>

      <div class="bottom-text">
        <div>
            <p class="content-text3">${blogs[index].job}</p>
          </div>


          <div class="post-btn">
            <div>
                <button>edit</button>
            </div>
            <div>
                <button class="delete-btn">delete</button>
            </div>
          </div>
      </div>
    </div>
          `;
  }

  document.getElementById("postblog").innerHTML = html;

  // Add event listener for the delete button
  postblog.querySelector(".delete-btn").addEventListener("click", function () {
    postblog.remove(); // Remove the card

    // Clear form fields
    document.getElementById("myForm").reset();
  });
}

renderBlog();

//MENAMPILKAN WAKTU POST
const months = [
  "Jan",
  "Feb",
  "Mar",
  "Apr",
  "May",
  "Jun",
  "Jul",
  "Aug",
  "Sep",
  "Oct",
  "Nov",
  "Dec",
];

function getDistanceTime(timePost) {
  const timeNow = new Date();
  const distance = timeNow - timePost; // hasilnya miliseconds => 1 detik = 1000ms

  const seconds = Math.floor(distance / 1000);
  const minutes = Math.floor(seconds / 60);
  const hours = Math.floor(minutes / 60);
  const day = Math.floor(hours / 24);

  if (seconds < 60) {
    return `${seconds} seconds ago`;
  } else if (minutes < 60) {
    return `${minutes} minutes ago`;
  } else if (hours < 60) {
    return `${hours} hours ago`;
  } else if (day < 24) {
    return `${day} day ago`;
  }
}

function getFullTime(time) {
  const date = time.getDate();
  const monthIndex = time.getMonth();
  const year = time.getFullYear();
  let hours = time.getHours();
  let minutes = time.getMinutes();

  if (hours < 10) {
    hours = "0" + hours;
  }

  if (minutes < 10) {
    minutes = "0" + minutes;
  }

  return `${date} ${months[monthIndex]} ${year} ${hours}:${minutes} WIB`;
}
