const { MongoClient } = require("mongodb");

const uri = "mongodb+srv://woo23017:Yoshicw2004@cluster0.axatpzq.mongodb.net/?retryWrites=true&w=majority";

const client = new MongoClient(uri);  // No options needed

async function run() {
  try {
    await client.connect();
    console.log("Connected!");
  } catch (err) {
    console.error(err);
  } finally {
    await client.close();
  }
}

run();
