const dotenv = require('dotenv');
dotenv.config({path: './config.env'});

const app = require('./app');



//console.log(process.env);


//server
const port = process.env.PORT || 3000;
app.listen(port, () => {
  console.log(`running on ${port} ......`);
});

