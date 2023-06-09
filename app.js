const express = require('express');
const ejs = require('ejs');
const Post = require('./models/Post');
const mongoose = require('mongoose');
const methodOverride = require('method-override');
const postController = require('./controllers/postControllers');
const pageController = require('./controllers/pageControllers');
const dotenv = require('dotenv');

dotenv.config();

const app = express();



//Template Engine
app.set('view engine' , 'ejs');


//Connect Database
const cnnct = () => {
  mongoose.connect(process.env.DB_URI , {
    dbName : "cleanblog-test-db",
    useNewUrlParser : true,
    useUnifiedTopology : true,
    // useFindAndModify : false,
  })
  .then(() => {
    console.log("Connected to the DB successfully");
  })
  .catch((err) => {
    console.log(`DB connection err:, ${err}`)
  })
};

cnnct();

//middlewares
app.use(express.static("public"));
app.use(express.urlencoded({extended : true}));
app.use(express.json());
app.use(methodOverride('_method' , {
  methods: ['POST', 'GET']
}));


//routes
app.get("/", postController.getAllPosts);
app.get("/posts/:id" , postController.getPhoto);
app.post('/posts' , postController.createPost);
app.put('/posts/:id' , postController.updatePost);
app.delete('/posts/:id' , postController.deletePost);

app.get("/about", pageController.getAboutPage);
app.get("/add_post", pageController.getAddPage);
app.get("/posts/edit/:id", pageController.getEditPage);



const port = process.env.PORT || 5000;
app.listen(port, () => {
  console.log(`Sunucu ${port} portunda başlatıldı..`);
});
