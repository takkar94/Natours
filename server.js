const app = require('./app');

//server
const port = 3000;
app.listen(port, () => {
  console.log(`running on ${port} ......`);
});

