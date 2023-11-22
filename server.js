const dotenv = require('dotenv');
const mongoose = require('mongoose');

dotenv.config({ path: './config.env' });

const DB = process.env.DATABASE.replace(
  '<PASSWORD>',
  process.env.DATABASE_PASSWORD,
);

mongoose
  .connect(DB, {
    useNewUrlParser: true,
    useCreateIndex: true,
    useFindAndModify: false,
  })
  .then(() => {
    //console.log(con.connection);
    console.log('DB Connection successful');
  });

const app = require('./app');

//console.log(process.env);

//server
const port = process.env.PORT || 3000;
app.listen(port, () => {
  console.log(`running on ${port} ......`);
});
