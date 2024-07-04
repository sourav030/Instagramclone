const express=require('express')
const router = require('./routes/auth')
const routers=require('./routes/user')
const app = express();
const port=5000
const cors=require('cors') // for trainsfer the data from backend to forntend 
app.use(express.json());
const mongoose = require('mongoose');
 app.use(cors())
app.use(routers)
main().then(()=>{
    console.log('connected to db')
})
.catch(err => console.log(err));
app.use(router)
async function main() {
  await mongoose.connect('mongodb://127.0.0.1:27017/Instagram');

  // use `await mongoose.connect('mongodb://user:password@127.0.0.1:27017/test');` if your database has auth enabled
}

app.listen(port,()=>{
    console.log(`server is running on port ${port}`)
})