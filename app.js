//jshint esversion:6

const express = require("express");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
const ejs = require("ejs");
const _ = require("lodash");

mongoose.connect('mongodb://localhost:27017/blogDB', {useNewUrlParser: true, useUnifiedTopology: true});

const Post = mongoose.model('Post', { title: String, content: String });



const homeStartingContent = "If you have skewed opinions, views, and outlook, then it is highly encouraged that you read inspirational books. It changes one’s mindset by expanding the views and belief of the reader and influences the conviction of the reader and strengthens his ideas. Individuals who read motivational books are usually more enthusiastic and deliberate than those who do not. Motivation is critical and has been proven to be the difference between the underachievers and the highly successful individuals. Scientific research has established that there is a connection between motivation and the unseen residual energy levels. This explains why motivation books and speakers have been accepted by all the individuals regardless of the age. This article looks at the benefits of reading inspirational books, and takes you into a 100 days challenge for you to discover the benefit of motivational reading. Let's go.";
const aboutContent = "The start of a new year is a good time to reflect on the past year and your achievements. Are you plodding along with life, or do you fancy kick-starting bigger plans? We’re here to help motivate you achieve more. It's one thing going to work, coming home, cracking open a bottle of wine and clocking off for the day, but it's another to really live; to get up at six am and work on that novel for two hours, to train for that marathon, to set up that start up, Relationships can be repaired, reputations can be regained but time once squandered is lost forever' - Anon. Yes, that's one of our favourite quotes here at The GWG. In light of this, we've scoured the web to come up with the very best sites for self-motivating - now all you have to do is STEP UP!";
const contactContent = "Please get in touch with us and our expert support will answer all your question.<br> if you need a personal coach our team will be in touch with you and we will arranage a one on one meeting to check what is perfect for you. Address: Gaziosmanpaşa Mah,   Ankara, 06700.  Tel: +90 362 34 71.  email: sejourmedicalturquie@gmail.com";

const app = express();

app.set('view engine', 'ejs');

app.use(bodyParser.urlencoded({extended: true}));
app.use(express.static("public"));


app.get("/", function(req, res){


Post.find({}, function(err, posts){ 

      res.render("home", {
        startingContent: homeStartingContent,
        posts: posts
        });

      })

});

app.get("/about", function(req, res){
  res.render("about", {aboutContent: aboutContent});
});

app.get("/contact", function(req, res){
  res.render("contact", {contactContent: contactContent});
});

app.get("/compose", function(req, res){
  res.render("compose");
});

app.post("/compose", function(req, res){

  const post = new Post({
    title: req.body.postTitle,
    content: req.body.postBody
  });
  
    post.save(function(err){if(!err){
    
      // posts.push(post);
     res.redirect("/");
     }
  });
  

});

app.get("/posts/:postId", function(req, res){
  
  const requestedPostId = req.params.postId;

  Post.findOne({_id: requestedPostId},function(err, post){ 

      res.render("post", {
        title: post.title,
        content: post.content
      });
    }
  );

});

app.listen(3000, function() {
  console.log("Server started on port 3000");
});
