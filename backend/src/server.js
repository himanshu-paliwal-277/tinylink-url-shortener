import express from 'express';

const app = express();

app.get('/', (req, res) => {
  res.send('Hello, TinyLink URL Shortener Backend!');
});

app.listen(4000, () => {
  console.log('Server is running on port 4000' + '\nVisit http://localhost:4000' );
});
