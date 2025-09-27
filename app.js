const express =require("express");
const app=express();
const mongoose=require("mongoose");
const Listing = require("./models/listing.js");
const path = require("path"); // for index.ejs and it must be inside views folder



// mongo connection
main()
.then(()=>{
    console.log("mongo db connected");
})
.catch((err)=>{
    comsole.log("error");
});

async function main() {
  await mongoose.connect('mongodb://127.0.0.1:27017/wanderlust');
}

//for ejs file
app.set("view engine","ejs");
app.set("views",path.join(__dirname,"views"));
app.use(express.urlencoded({extended : true}));

//basic route
app.get("/",(req,res)=>{
    res.send("root is working");
})

//index route
app.get("/listings",async (req,res)=>{
    const allListings = await Listing.find({});
    res.render("./listings/index.ejs",{allListings});
})

// new route
app.get("/listings/new",async(req,res)=>{
    res.render("./listings/new.ejs");
});

// show route(read)
app.get("/listings/:id", async(req,res)=>{
    let{id} = req.params; // is used when we are finding by id
     const listing= await Listing.findById(id); //find in db by id
     res.render("./listings/show.ejs",{listing});
})
 
//create route
app.post("/listings/show.ejs",async(req,res)=>{

})



app.listen(8080,()=>{
    console.log("app is listening on port 8080"); 
});


