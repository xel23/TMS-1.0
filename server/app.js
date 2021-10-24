const express = require('express');
const {MONGO_URL} = require('./config');
const mongoose = require('mongoose');
const cors = require('cors')
const app = express();
const port = 3000;

app.use(cors());
app.use(express.urlencoded());
app.use(express.json({extended: true}));

app.use('/api/auth', require('./routes/auth.routes'));
app.use('/api/tasks', require('./routes/task.routes'));
app.use('/api/users', require('./routes/user.routes'));
app.use('/api/comments', require('./routes/comment.routes'));
app.use('/api/history', require('./routes/history.routes'));

app.get('/', (req, res) => {
    res.send('Hello World!');
});

async function start() {
    try {
        await mongoose.connect(MONGO_URL);
    } catch (err) {
        console.log('Server Error', err.message);
        process.exit(1);
    }
}

start();

app.listen(port, () => {
    console.log(`Example app listening at http://localhost:${port}`);
});
