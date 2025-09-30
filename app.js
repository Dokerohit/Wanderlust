const express =require("express");
const app=express();
const mongoose=require("mongoose");
const Listing = require("./models/listing.js");
const path = require("path"); // for index.ejs and it must be inside views folder
const methodOverride = require("method-override");
const ejsMate=require("ejs-mate");

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
app.engine("ejs",ejsMate); // copy from npm ejs mate 
app.set("view engine","ejs");
app.set("views",path.join(__dirname,"views"));
app.use(express.urlencoded({extended : true}));
app.use(methodOverride("_method"));
app.use(express.static(path.join(__dirname,"/public"))); // for static file like js and css




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
app.post("/listings",async(req,res)=>{
  const newlisting = new Listing(req.body.listing);
  await newlisting.save();
  res.redirect("/Listings");

}); 

//edit route
app.get("/listings/:id/edit",async(req,res)=>{
    let{id} = req.params; // is used when we are finding by id
     const listing= await Listing.findById(id); //find in db by id
    res.render("listings/edit.ejs",{listing});
})

//update route
app.put("/listings/:id", async(req,res)=>{
    let{id} = req.params; // is used when we are finding by id
     await Listing.findByIdAndUpdate(id,{...req.body.listing});
     res.redirect("/listings");
})

//delete route
app.delete("/listings/:id", async(req,res)=>{
    let{id} = req.params; // is used when we are finding by id
   let deleteListings= await Listing.findByIdAndDelete(id);
   console.log(deleteListings);
    res.redirect("/listings");
});




app.listen(8080,()=>{
    console.log("app is listening on port 8080"); 
});


