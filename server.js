const express = require('express');
const bodyParser = require('body-parser');
const path = require('path');

const tableRoutes = require('./routes/tableRoutes');
const orderRoutes = require('./routes/orderRoutes');

const app = express();

app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(express.static(path.join(__dirname, 'public')));

// Home - show members
app.get('/', (req, res) => {
  const members = [
    "Tanatuch Terasunthornwat",
    "Althea Mariz Lindugan",
    "Manam Sut Jat Aung",
    "Satayu Saengchan",
    "Nattapong Ngamwiliaipan"
  ];
  res.render('index', { members });
});

app.use('/tables', tableRoutes);
app.use('/orders', orderRoutes);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`🚀 Server running at http://localhost:${PORT}`));
