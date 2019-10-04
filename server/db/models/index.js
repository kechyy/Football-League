const mongoose = require('mongoose');

const mongoDB = 'mongodb://localhost/backend_developer_test';
mongoose.connect(mongoDB, { useNewUrlParser: true, useUnifiedTopology: true });
const db = mongoose.connection;
db.on('error', console.error.bind(console, 'Mongodb connection error'));

export default db;
