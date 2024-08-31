//MENANGKAP DATA POST
const blogs = [];

function addBlog(event) {
  event.preventDefault();

  const inputTitle = document.getElementById("titleinput").value;
  const inputContent = document.getElementById("contentinput").value;
  const inputImage = document.getElementById("imageinput").files;
  
  const blobImage = URL.createObjectURL(inputImage[0]);

  const data = {
    title: inputTitle,
    content: inputContent,
    image: blobImage,
    author: "Natsu",
    createdAt: new Date(),
  };

  blogs.unshift(data);

  console.log(blogs);
  renderBlog();
  document.getElementById('myForm').reset();
}


//MENAMPILKAN POST BLOG
function renderBlog() {
  let html = "";

  for (let index = 0; index < blogs.length; index++) {
    html += `
       

    <div class="post-container">
      <div class="post-container-img">
        <img 
        src="${blogs[index].image}" 
        alt=""
        class="post-img">
      </div>
      <div class="post-text">
        <h3>${blogs[index].title}</h3>
        <p>${blogs[index].createdAt} | ${blogs[index].author}</p>
        <p>${blogs[index].content}</p>
        <p>${getDistanceTime(blogs[index].createdAt)}</p>
      </div>
    </div>
        `;
  }

  document.getElementById("contents").innerHTML = html;
}

renderBlog();


//MENAMPILKAN DURATION
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

  // seconds, minutes, hours, day
  // round => membulatkan ke angkat terdekat | 7.3 => 7 | 7.5 => 8
  // floor => membulatkan ke bawah | 7.9 => 7 | 7.99 => 7
  // ceil => membulatkan ke atas | 8.01 => 9 | 8.3 => 9
  const seconds = Math.floor(distance / 1000);
  const minutes = Math.floor(seconds / 60);
  const hours = Math.floor(minutes / 60);
  const day = Math.floor(hours / 24);

  if(seconds < 60) {
    return `${seconds} seconds ago`
  } else if (minutes < 60) {
    return `${minutes} minutes ago`
  } else if(hours < 60) {
    return `${hours} hours ago`
  } else if(day < 24) {
    return `${day} day ago`
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