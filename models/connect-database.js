
const  {mongoose}  = require("mongoose");
const config = require("../config/config.js");
const logger = require("../config/logger.js");

class connectDB{
    constructor(){
      if (connectDB._instance) {
        logger.log("error", "Singleton classes can't be instantiated more than once.")
      }
      connectDB._instance = this;

      this.DBurl = config.MONGO_URL
    }
    
    connect(){
        mongoose
        .connect(this.DBurl)
        .then(() => logger.log("info", "Connected to DB"))
        .catch((e) => {
          logger.log("error", "cannot connect to DB")
          //console.error(e);
          //throw "cannot connect to DB";
        });
    }
}

module.exports = connectDB