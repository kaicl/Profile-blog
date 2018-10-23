var express= require("express");
var app = express();
var bodyParser = require('body-parser')
var mongoose = require('mongoose')
mongoose.connect("mongodb://localhost/profile-blog")


app.use(bodyParser.urlencoded({ extended: true}))
app.use(express.static(__dirname + '/public'));

//schema
var profile_schema = new mongoose.Schema({
    name:String,
    desc:String,
    image:String
})

var Profile = mongoose.model("Profile", profile_schema)

        
app.set("view engine", "ejs");

app.get("/",function(req, res){
    //res.render("dashbord",{profiles:profiles});
    Profile.find({},function(err,profileDB){
        if(err){
            console.log("erro");
        }else{
            res.render("dashbord",{profiles:profileDB});
        }
    });
});

app.post("/",function(req, res){
    var name = req.body.name;
    var description = req.body.desc;
    var img = req.body.image;
    
    var newprofile = {name:name, desc:description, image:img}
    //profiles.push(newprofile);
    Profile.create(newprofile,function(err,newCreate){
        if(err){
            console.log("erro create");
        }else{
            res.redirect("/");
        }
    });
    
    
});

app.get("/new", function(req,res){
    res.render("new");
});
app.listen(process.env.PORT, process.env.IP, function(){
    console.log("server start");
});