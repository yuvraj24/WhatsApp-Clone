import mongoose from "mongoose";

// const DATABASE_CONNECTION_STRING = 'mongodb://127.0.0.1:27017/WhatsappClone'
const DATABASE_CONNECTION_STRING =
  "mongodb+srv://admin:mongodb123@whclonecluster-cq1it.mongodb.net/test?retryWrites=true&w=majority";

mongoose
  .connect(DATABASE_CONNECTION_STRING, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .catch((err) => {
    console.log("Mongoose Error 2 : " + JSON.stringify(err));
  });

export default mongoose.connection;
