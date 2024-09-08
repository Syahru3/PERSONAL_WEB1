const xhr = new XMLHttpRequest();

xhr.open("GET", "https://api.npoint.io/325e40b30ccd5f2c03eb", true);

xhr.onerror = () => {
  console.log("Networ Error!");
};

xhr.onload = () => {
  console.log(xhr.response);
};

xhr.send()