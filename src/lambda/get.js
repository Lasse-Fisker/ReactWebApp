import connectDb from "./server";

export const handler = async (event, context) => {
  context.callbackWaitsForEmptyEventLoop = false;

  try {
    const db = await connectDb();
    const collection = db.collection("doegndata");

    const data = await collection.find().sort({$natural:-1}).limit(24).toArray();
  
    const response = {
      msg: "Products successfully found",
      data      
    };

    return {
      statusCode: 200,      
      body: JSON.stringify(response),
    };
  } catch (err) {
    console.log(err); // output to netlify function log
    return {
      statusCode: 500,
      body: JSON.stringify({ msg: err.message }),
    };
  }
};
