const dotenv = require('dotenv');
const app = require('./app');

dotenv.config({path: './config.env'});

//console.log(process.env);


//server
const port = process.env.PORT || 3000;
app.listen(port, () => {
  console.log(`running on ${port} ......`);
});

