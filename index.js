import express from "express";
import ejs from "ejs";
import bodyParser from "body-parser";

const port = 3000;
const app = express();

app.use(express.static("public"));
app.use(bodyParser.urlencoded({extended:true}));

const blogs = [];
var initialized = false;

app.get("/", (req, res) => {
    res.render("index.ejs",
    {
        blogs
    });
});

app.get("/post-blog", (req, res) => {
    res.render("blogform.ejs");
});

app.get("/about", (req, res) => {
    res.render("about.ejs");
});

app.get("/contact", (req, res) => {
    res.render("contact.ejs");
});

app.post("/blogpost", (req, res) => {
    var date = new Date();
    var month1 = date.toLocaleString('en-US', { month: 'long' });
    var day1 = date.getDate();

    var blogData = {
        title:req.body.blogTitle,
        month:month1,
        day:day1,
        blogText: req.body.blogContent
    }

    blogs.push(blogData);
    res.redirect("/");
});

app.get('/viewBlog/:blogID', (req, res) => {

    var blogTitle = req.params.blogID;
    var title = '';
    var blogText='';
    
    blogs.forEach((blog) => {
      title = blog.title,
      blogText = blog.blogText
    });

    if (blogTitle.toLowerCase() === title.toLowerCase()) {
        res.render('fullBlog.ejs', 
          {
            title,
            blogText
          });
      }
});

app.post('/deleteitems/:blog', (req, res) => {
    const blogIndex = req.params.blog;
    console.log(blogIndex);
    if (blogIndex !== -1) {
      blogs.splice(blogIndex, 1);
    };
    res.redirect("/");
});

app.listen(port, () => {
    console.log("Server active on port "+port);
});