const uri = "mongodb://localhost:27017/?replicaSet=rs0";
const client = new MongoClient(uri);

async function transactionMongoExample(client: MongoClient) {
  const session = client.startSession(); //start SESSION
  try {
    session.startTransaction(); //start TRANSACTION - pay attention bitxxx
    const savingsColl = client.db("bank").collection("savings_accounts");
    const checkingColl = client.db("bank").collection("checking_accounts");
    
    await savingsColl.findOneAndUpdate(
      {account_id: "9876"}, 
      {$inc: {amount: -100 }}, 
      { session });
    
    await checkingColl.findOneAndUpdate(
      {account_id: "9876"}, 
      {$inc: {amount: 100 }}, 
      { session });
   
    await session.commitTransaction();
    console.log("Transaction committed.");
  
  } catch (error) {
    console.log("An error occurred during the transaction:" + error);
    await session.abortTransaction();
  } finally {
    await session.endSession();
  }
}
