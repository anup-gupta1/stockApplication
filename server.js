const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const passport = require('passport');
const path = require('path');
const authRouter = require('./routes/authRoutes');
const stockRouter = require('./routes/stockRoutes');

const app = express();
const server = require('http').Server(app);

const io = require('socket.io').listen(server);
app.set('server', server);
io.set('origins', '*:*');


let userSockets = {};
app.set("sockets", userSockets);
const nsp = io.of("/stock");
// connection establishment
nsp.on("connect", function (client) {
    client.on("initClientInfo", function (data) {
        if (userSockets[data.userId]) {
            userSockets[data.userId].push(client);
        } else {
            userSockets[data.userId] = [client];
        }
        app.set("sockets", userSockets);
    });
    // on socket disconnect
    client.on("disconnect", function (id) {
        for (let i in userSockets) {
            const index = userSockets[i].findIndex(socket => socket.id === client.id);
            if (index >= 0) {
                if (userSockets.length === 1) {
                    delete userSockets[i];
                } else {
                    userSockets[i].splice(index, 1);
                }
                break;
            }
        }
    });
});


//Middleware to parse body of incoming request
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

/* initializing passport for to authenticat user for incoming request */
app.use(passport.initialize());
require('./middleware/passport')(passport);

// mlab db uri to get connected to db
const mongoURI = "mongodb://anup:anup123gupta@ds013024.mlab.com:13024/mernapp";
mongoose.connect(mongoURI)
    .then(console.log("MongoDb Successfully connected"))
    .catch(err => console.log(err));

// routes for auth apis
app.use('/api/auth', authRouter);
app.use('/api/stock', stockRouter);


if (process.env.NODE_ENV === 'production') {
    app.use(express.static("clientapp/build"));
    app.get('*', (req, res) => {
        res.sendFile(path.resolve(__dirname, 'clientapp', 'build', 'index.html'))
    })
}

const port = process.env.PORT || 5000;

server.listen(port, () => console.log(`Server running on port ${port}`));

exports.userSockets = userSockets;