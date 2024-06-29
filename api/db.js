const mongoose=require("mongoose");

module.exports.connect=()=>{
    mongoose.connect("mongodb+srv://rkriskysinghania123:Rk9758667840@cluster0.sw2els5.mongodb.net/?retryWrites=true&w=majority",
        {
            useNewUrlParser:true,
            useUnifiedTopology:true,
        }).then(()=>{
            console.log("Database Connected");
        }).catch((e)=>{
            console.log("No Database Connected");
        });
}
