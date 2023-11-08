const app = require('./app');

console.log(app.get('env'));


//server
const port = 3000;
app.listen(port, () => {
  console.log(`running on ${port} ......`);
});

