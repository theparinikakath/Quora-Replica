const express=require('express');
const { url } = require('inspector');
const app=express();
const path=require("path");
const { v4: uuidv4 }=require('uuid');
const methodOverride=require("method-override");

const port=3000;

app.use(express.urlencoded({extended:true}));
app.use(methodOverride('_method'));

app.set("view engine","ejs");
app.set("views",path.join(__dirname,"views"));
app.use(express.static(path.join(__dirname,'public')));

let posts=[
    {
        id:uuidv4(),
        username:"pari",
        content:"I am the best!"
    },
    {
        id:uuidv4(),
        username:"ritik",
        content:"I love dogs"
    },
    {
        id:uuidv4(),
        username:"sam",
        content:"I love cats"
    },
    {
        id:uuidv4(),
        username:"rahul",
        content:"I love coding!"
    },
];

app.get("/posts",(req,res)=>{
    res.render("index.ejs",{posts});
});

app.get("/posts/new",(req,res)=>{
    res.render("new.ejs");
});
app.get("/posts/:id",(req,res)=>{
    let { id }=req.params;
    let post=posts.find((p)=>id ===p.id);
        res.render("show.ejs",{post});
    
});

app.post("/posts",(req,res)=>{
    let {username,content}=req.body;
    let id=uuidv4();
    posts.push({id,username,content});
    // console.log(req.body);
    //res.send("post requests work");
    res.redirect("/posts");
});

app.patch("/posts/:id",(req,res)=>{
    let {id}=req.params;
    let newcontent=req.body.content;
    let post=posts.find((p)=>id===p.id);
    //console.log(newcontent);
    post.content=newcontent;
    console.log(post);
    res.redirect("/posts");
});

app.get("/posts/:id/edit",(req,res)=>{
    let {id}=req.params;
    let post=posts.find((p)=> id===p.id);
    res.render("edit.ejs",{post});
});

app.delete("/posts/:id",(req,res)=>{
    let {id}=req.params;
    posts = posts.filter((p)=>id!==p.id);
    res.redirect("/posts");
});

app.listen(port,()=>{
    console.log("listening on port");
});