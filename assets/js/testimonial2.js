const testimonials = [
    {
        image : "https://images.pexels.com/photos/428364/pexels-photo-428364.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
        content : "mantap kali",
        author : "Budi",
        rating : 1,
    },
    {
        image : "https://images.pexels.com/photos/3763188/pexels-photo-3763188.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
        content : "gilee mantap euy",
        author : "Mia",
        rating : 2,
    },
    {
        image : "https://images.pexels.com/photos/1462980/pexels-photo-1462980.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
        content : "belum terpuaskan",
        author : "Roger",
        rating : 1,
    },
    {
        image : "https://st.depositphotos.com/1518767/1390/i/450/depositphotos_13909347-stock-photo-young-employee-standing-upright-in.jpg",
        content : "kurang greget",
        author : "Jinx",
        rating : 2,
    },
    {
        image : "https://images.pexels.com/photos/428361/pexels-photo-428361.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
        content : "menyala abangku",
        author : "Razor",
        rating : 3,
    },
    {
        image : "https://images.pexels.com/photos/733872/pexels-photo-733872.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
        content : "I recomend it",
        author : "Hana",
        rating : 4,
    },
    {
        image : "https://images.pexels.com/photos/1542085/pexels-photo-1542085.jpeg?auto=compress&cs=tinysrgb&w=600",
        content : "I recomend it",
        author : "Miranda",
        rating : 4,
    },
    {
        image : "https://images.pexels.com/photos/1370750/pexels-photo-1370750.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
        content : "keren sekali",
        author : "Ryukk",
        rating : 5,
    },
]

function allTestimonial() {
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

document.getElementById("testimonials").innerHTML = testimonialHTML.join(" ")
}

function filterTestimonial (rating) {
    const filteredTestimonialByRating = testimonials.filter(testimonial => {
        return testimonial.rating == rating
    })

    const testimonialHTML = filteredTestimonialByRating.map((testimonial) => {
        return `
            <div class="column2">
              
                    <img class="card2-img" src="${testimonial.image}" alt="image">
                    <p>${testimonial.content}</p>
                    <h3>${testimonial.author}</h3>
                    <h4 class="card2-rating">☆${testimonial.rating}</h4>
               
            </div>
        `;
})
document.getElementById("testimonials").innerHTML = testimonialHTML.join(" ")
}


allTestimonial()