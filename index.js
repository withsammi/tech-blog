import express from "express";
import ejs from "ejs";
import bodyParser from "body-parser";

const app = express();
const port = 3000;
app.set('view engine', 'ejs');

app.set('views', './views');
app.use(express.static("public"));

app.use(bodyParser.urlencoded({ extended: true }));

const posts = [];

app.get("/new",(req, res) =>{
    res.render("new");
})

app.get("/", (req, res) =>{
    res.render("index", { posts});    
})

app.post("/tech-blog/index.js",(req, res) =>{
    const { title, content } = req.body;

    if (title && content) {
        posts.push({ title, content });
        console.log(`New Post: ${title}`);
        console.log(posts);
    }
    res.redirect("/");
})

app.get("/edit/:index", (req, res) =>{
    const index = req.params.index;
    const post = posts[index];
    if (post){
        res.render("edit", { post, index });
    }
    else{
        res.redirect("/");
    }

})

app.post("/edit/:index", (req, res) => {
    const index = req.params.index;
    const { title, content } = req.body;

    if (posts[index] && title && content) {
        posts[index] = { title, content }; // Updating the post
        console.log(`Post updated: ${title}`);
    }
    res.redirect("/");
});

app.post("/delete/:index", (req, res) => {
    const index = req.params.index;
    if (posts[index]) {
        posts.splice(index, 1); // Removes the post at 'index'
        console.log(`Post at index ${index} deleted.`);
    }
    res.redirect("/");
});

app.listen(port, () =>{
    console.log(`server is running on ${port} !`);
})