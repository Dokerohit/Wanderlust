const mongoose =require("mongoose");
const Schema=mongoose.Schema;

const listingSchema = new Schema({
    title : {
        type :String,
        required : true,

    },
    description: String,
    image: {
        filename: String,
        url: {
          type: String,
          default: "https://unsplash.com/photos/an-aerial-view-of-a-house-with-a-swimming-pool-66NY2XFdQb4",
          set: (v) =>
            v === ""
              ? "https://unsplash.com/photos/an-aerial-view-of-a-house-with-a-swimming-pool-66NY2XFdQb4"
              : v,
        }
      },
      
    price: Number,
    location : String,
    country : String,

});

const Listing=mongoose.model("Listing",listingSchema);
module.exports=Listing;