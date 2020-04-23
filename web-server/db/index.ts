import mongoose from "mongoose";

mongoose
  .connect("mongodb://127.0.0.1:27017/WhatsappClone", {
    useNewUrlParser: true,
    useUnifiedTopology: true
  })
  .catch(err => {
    console.log("Mongoose Error 2 : " + JSON.stringify(err));
  });

export default mongoose.connection;
