const express = require("express")

const booksRoutes = require('./routes/books')
const authorsRoutes = require('./routes/authors')
const categoriesRoutes = require('./routes/categories')


const app = express();

app.use(express.urlencoded({extended: true}))
app.use(express.json());


app.use('/backend/authors', authorsRoutes);
app.use('/backend/categories', categoriesRoutes);
app.use('/backend/books', booksRoutes);

const port = 3000;

app.listen(port,(req, res) =>console.log(`listening at port ${port}`));