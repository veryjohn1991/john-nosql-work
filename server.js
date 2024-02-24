const express = require('express');
const mongoose = require("mongoose");

const app = express();
const PORT = process.env.PORT || 3001;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static('public'));


const uri = "mongodb+srv://ahmeddanawi:CgKWAY24cQdtRV97@cluster0.vdn5cgj.mongodb.net/?retryWrites=true&w=majority";

mongoose.connect(uri, { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => console.log("MongoDB connected"))
    .catch(err => console.log(err));

mongoose.set("debug", true);

app.use(require('./routes'));   

app.listen(PORT, () => console.log(`🌍 Connected on localhost:${PORT}`));
