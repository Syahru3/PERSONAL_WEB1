require('dotenv').config();
const express = require("express");
const app = express();
const port = 3000; //bisa mengganti port

const { durationTime } = require("./assets/js/duration-time");
const path = require("path"); //bawaan path node js
const bcrypt = require("bcrypt");
const session = require("express-session");
const flash = require("express-flash");
const upload = require("./midlewares/upload-file"); //midleware multer

const blogModel = require("./models").blogs;
const userModel = require("./models").users;

app.set("view engine", "hbs");
app.set("views", path.join(__dirname, "views")); //dirname merujuk project dgn nama views

app.use("/assets", express.static(path.join(__dirname, "assets"))); //agar bisa membuka file assets
app.use("/uploads", express.static(path.join(__dirname, "uploads"))); //agar bisa membuka file assets

app.use(express.urlencoded({ extended: false })); //"extended" agar post tidak deprecated
app.use(
  session({
    name: "my-session",
    secret: "ewVsqWOyeb",
    resave: false,
    saveUninitialized: true,
    cookie: {
      maxAge: 1000 * 60 * 60 * 24,
    },
  })
);
app.use(flash());

//ROUTING
app.get("/", home);
app.get("/blog", blog);
app.get("/add-blog", addBlogView);
app.post("/add-blog", upload.single("uploadImage"), addBlog);

app.get("/delete-blog/:id", deleteBlog); //penggunaan ":id" adalah properti
app.get("/edit-blog/:id", editBlogView);
app.post("/edit-blog/:id", upload.single("uploadImage"), editBlog);

app.get("/contact", contactMe);
app.get("/testimonial", testimonial);
app.get("/blog-detail/:id", blogDetail);

app.get("/login", loginView);
app.get("/register", registerView);

app.post("/login", login);
app.post("/register", register);
app.get("/logout", logout);

//SERVICE
function loginView(req, res) {
  res.render("login");
}

async function login(req, res) {
  try {
    const { email, password } = req.body;

    // cek email user apakah ada di database
    const user = await userModel.findOne({
      where: {
        email: email,
      },
    });

    if (!user) {
      req.flash("error", "Email / password salah!");
      return res.redirect("/login");
    }

    // cek password apakah valid dengan password yang sudah di hash
    const isValidPassword = await bcrypt.compare(password, user.password);

    if (!isValidPassword) {
      req.flash("error", "Email / password salah!");
      return res.redirect("/login");
    }

    req.session.user = user;

    req.flash("success", "Login berhasil!");

    res.redirect("/");
  } catch (error) {
    req.flash("error", "Something went wrong!");
    res.redirect("/");
  }
}

function registerView(req, res) {
  res.render("register");
}

async function register(req, res) {
  try {
    const { name, email, password } = req.body;

    const saltRounds = 10;
    const hashedPassword = await bcrypt.hash(password, saltRounds);

    await userModel.create({
      name: name,
      email: email,
      password: hashedPassword,
    });

    req.flash("success", "Register berhasil!");
    res.redirect("/register");
  } catch (error) {
    req.flash("error", "Register gagal!");
    res.redirect("/register");
  }
}

async function logout(req, res) {
  try {
    req.flash("success", "Successfully logged out");
    req.session.destroy(() => {
      return res.redirect("/login");
    });
  } catch (error) {
    console.log(error);
    req.flash("danger", "Failed to Logout");
    res.redirect("/login");
  }
}

//HOME INDEX
async function home(req, res) {
  const result = await blogModel.findAll();
  const user = req.session.user;

  res.render("index", { data: result, user });
}

//BLOG
async function blog(req, res) {
  const result = await blogModel.findAll();
  const user = req.session.user;

  res.render("blog", { data: result, user }); //data merujuk ke DB Postgres
}

function addBlogView(req, res) {
  const user = req.session.user;

  if (!user) {
    return res.redirect("/login");
  }

  res.render("add-blog");
}

async function addBlog(req, res) {
  const { title, startDate, endDate, content, image, technologies } = req.body;

  const technologiesArray = Array.isArray(technologies)
    ? technologies
    : [technologies];
  const technologiesString = technologiesArray.join(", ");

  const imagePath = req.file.path;
  const userId = req.file.path.id;
  const duration = durationTime(startDate, endDate);

  const newblog = await blogModel.create({ 
    title: title,
    startDate: startDate,
    endDate: endDate,
    duration: duration,
    content: content,
    image: imagePath,
    userId: req.session.user.id,
    technologies: technologiesString,
  });

  console.log(newblog)
  
  res.redirect("/blog"); //langsung menuju page blog
}

//DELETE BUTTON
async function deleteBlog(req, res) {
  const { id } = req.params;

  let result = await blogModel.findOne({
    where: {
      id: id,
    },
  });

  if (!result) return res.render("not-found");

  await blogModel.destroy({
    where: {
      id: id,
    },
  });

  res.redirect("/blog");
}

//EDIT BUTTON PER id
async function editBlogView(req, res) {
  const user = req.session.user;
  const { id } = req.params;
  const result = await blogModel.findOne({
    where: {
      id: id,
    },
  });
  if (!user) return res.redirect("/login"); //mengamankan routing
  if (!result) return res.render("not-found");
  res.render("edit-blog", { data: result, user });
}

//EDIT PAGE
async function editBlog(req, res) {
  try {
    const { id } = req.params;
    const { title, startDate, endDate, content, existImage, technologies } =
      req.body;

    const technologiesArray = Array.isArray(technologies)
      ? technologies
      : [technologies];
    const technologiesString = technologiesArray.join(", ");

    let imagePath = req.file.path;
    const duration = durationTime(startDate, endDate);

    const blog = await blogModel.findOne({
      where: {
        id: id,
      },
    });

    if (!blog) return res.render("not-found");

    blog.title = title;
    blog.startDate = startDate;
    blog.endDate = endDate;
    blog.duration = duration;
    blog.content = content;
    blog.technologies = technologiesString;

    if (req.file) {
      blog.image = imagePath;
    } else {
      blog.image = existImage;
    }

    await blog.save("/blog"); //upsert = update/insert untuk create jika primary kosong
    res.redirect("/blog");

    // req.flash("success", "Blog updated successfully!");
    // return res.redirect("/blog");
  } catch (error) {
    // req.flash("error", "Something went wrong!");
    return res.redirect("/blog");
  }
}

function contactMe(req, res) {
  const user = req.session.user;

  res.render("contact", { user });
}

function testimonial(req, res) {
  const user = req.session.user;

  res.render("testimonial", { user });
}

async function blogDetail(req, res) {
  try {
    const { id } = req.params;
    const user = req.session.user;

    const result = await blogModel.findOne({
      where: {
        id: id,
      },
      include: [
        {
          model: userModel,
          as: "user",
          attributes: ["id", "name", "email"],
        },
      ],
    });

    // console.log("detail", result);
    const allBlogs = await blogModel.findAll();

    if (!result) {
      // return res.render("not-found");
      return res.redirect("/");
    }

    res.render("blog-detail", { data: result, user, allBlogs });
  } catch (error) {
    console.error("Error in blogDetail:", error);
    return res.redirect("/");
  }
}

//END ROUTING
app.listen(port, () => {
  console.log(`Server berjalan di port ${port}`);
});
