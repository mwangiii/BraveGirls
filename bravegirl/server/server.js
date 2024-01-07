const app = require('./app');
// Set JSON spaces
app.set('json spaces', 4);
// Set port
const port = process.env.PORT;
app.listen(port, () => {
  console.log(`Server has started on port ${port}`);
});
