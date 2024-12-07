const mongoose =require('mongoose');

mongoose.connect(process.env.DATABASE_URL)

const CollectionSchema = new mongoose.Schema({
    title : String,
    description : String,
    CDN_id : String
})

const EpisodeSchema = new mongoose.Schema({
    title : String,
    description : String,
    drive_id : String
})

const Collection = mongoose.model("Collection" , CollectionSchema)
const Episode = mongoose.model("Episode" , EpisodeSchema)

module.exports = { 
    Collection ,
    Episode
} 
