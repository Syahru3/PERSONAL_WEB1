function getTestimonialData(url) {
  return new Promise((resolve, reject) => {
    const xhr = new XMLHttpRequest();

    xhr.open("GET", url, true);

    xhr.onerror = () => {
      reject("Networ Error!");
    };

    xhr.onload = () => {
      //   resolve(xhr.response);
      //   JSON.stringify() // mengubah array menjadi JSON
      resolve(JSON.parse(xhr.response)); //JSON menjadi array
    };

    xhr.send();
  });
}

async function allTestimonial() {
  const testimonials = await getTestimonialData(
    "https://api.npoint.io/325e40b30ccd5f2c03eb"
  );

  console.log("tipe data testimonials", typeof testimonials);
  console.log("data testimonials", testimonials);

  const testimonialHTML = testimonials.map((testimonial) => {
    return `
            <div class="column2">
              
                    <img class="card2-img" src="${testimonial.image}" alt="image">
                    <p>${testimonial.content}</p>
                    <h3>${testimonial.author}</h3>
                    <h4 class="card2-rating">☆${testimonial.rating}</h4>
              
            </div>
        `;
  });

  document.getElementById("testimonials").innerHTML = testimonialHTML.join(" ");
}

async function filterTestimonial(rating) {
  const testimonials = await getTestimonialData(
    "https://api.npoint.io/325e40b30ccd5f2c03eb"
  );

  const filteredTestimonialByRating = testimonials.filter((testimonial) => {
    return testimonial.rating == rating;
  });

  const testimonialHTML = filteredTestimonialByRating.map((testimonial) => {
    return `
            <div class="column2">
              
                    <img class="card2-img" src="${testimonial.image}" alt="image">
                    <p>${testimonial.content}</p>
                    <h3>${testimonial.author}</h3>
                    <h4 class="card2-rating">☆${testimonial.rating}</h4>
               
            </div>
        `;
  });
  document.getElementById("testimonials").innerHTML = testimonialHTML.join(" ");
}

allTestimonial();
