//BLOGS TIME
const months = [
  "Jan",
  "Feb",
  "Mar",
  "Apr",
  "Mei",
  "Jun",
  "Jul",
  "Aug",
  "Sep",
  "Oct",
  "Nov",
  "Dec",
];

// const convertedDate = getFullTime(new Date());

// console.log(convertedDate);

console.log(
    getDistanceTime{
        new Date("")
    }
);

function getDistanceTime(timePost) {
    const timeNow = new Date()
    const distance = timeNow - timePost //hasilnya miliseconds => 1 detik = 1000ms

    const seconds = Math.floor(distance / 1000)
    const minutes = Math.floor(seconds / 60)
    const hours = Math.floor(minutes / 60)
    const day = Math.floor(hours / 24)

    console.log("seconds", seconds);
    console.log("minutes", minutes);
    console.log("hours", hours);
    console.log("day", day);
    
    if(seconds < 60) {
        return `${seconds} seconds ago`
    } else if (minutes < 60) {
        return `${minutes} minutes ago`
    } else if (minutes < 60) {
        return `${hours} hours ago`
    } else if (minutes < 60) {
        return `${days} days ago`
    }
    
    
    return distance
}

function getFullTime(time) {
  const date = time.getDate();
  const monthIndex = time.getMonth();
  const year = time.getFullYear();
  let hours = time.getHours(); //menggunakan let agar fungsi lebih dinamis
  let minutes = time.getMinutes();

  if (hours < 10) {
    hours = "0" + hours;
  }

  if (minutes < 10) {
    minutes = "0" + minutes;
  }

  return `${date} ${months[monthIndex]} ${year} ${hours}:${minutes} WIB`;
}
