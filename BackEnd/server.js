const express = require('express')
const app = express()
const port = 4000
const cors = require('cors');
const bodyParser = require('body-parser');

app.use(cors());
app.use(function(req, res, next) {
res.header("Access-Control-Allow-Origin", "*");
res.header("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE, OPTIONS");
res.header("Access-Control-Allow-Headers",
"Origin, X-Requested-With, Content-Type, Accept");
next();
});

// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }))

// parse application/json
app.use(bodyParser.json())

const mongoose = require('mongoose');

//link to connect to my made mongo database (generic admin name and password were created)
const strConnection = 'mongodb+srv://admin:admin@cluster0.vn1nv.mongodb.net/movies?retryWrites=true&w=majority'

main().catch(err => console.log(err));

//connect to my database after waiting
async function main() {
  await mongoose.connect(strConnection);
}

//schema to tell what kinda data is going to be there and types
const movieSchema = new mongoose.Schema({
    Title:String,
    Year:String,
    Poster:String
});

//model for the data base (use variable whenever you want to call)
const movieModel = mongoose.model('donal', movieSchema);

app.get('/', (req, res) => {
    res.send('Hello World!')
})

//post the type of data i want from create
app.post('/api/movies', (req,res)=>{
    console.log(req.body);
    console.log(req.body.Title);
    console.log(req.body.Year);
    console.log(req.body.Poster);

    movieModel.create({
        Title:req.body.Title,
        Year:req.body.Year,
        Poster:req.body.Poster
    });
    res.send('Data Sent to Server!')
})

//get infomation from the json
app.get('/api/movies/:id',(req, res)=>{
    console.log(req.params.id);

    movieModel.findById(req.params.id,(error,data)=>{
        res.json(data);
    })
})

//put my information to moviemodel
app.put('/api/movies/:id',(req, res)=>{
    console.log('update');
    console.log(req.body);
    console.log("Updating: " + req.params.id);

    movieModel.findByIdAndUpdate(req.params.id, req.body, {new:true},
        (err,data)=>{
            res.send(data);
        })

})

//delete code to connect later in /read
app.delete('/api/movies/:id',(req, res)=>{
    console.log("Delete Movie: "+req.params.id);

    movieModel.findByIdAndDelete(req.params.id,(err, data)=>{
        res.send(data);
    })
})

app.get('/api/movies', (req, res) => {
    movieModel.find((err, data)=>{
        res.json(data);
    })
          
           // https://m.media-amazon.com/images/M/MV5BNDQ4YzFmNzktMmM5ZC00MDZjLTk1OTktNDE2ODE4YjM2MjJjXkEyXkFqcGdeQXVyNTA4NzY1MzY@._V1_SX300.jpg
      
})



app.listen(port, () => {
    console.log(`Example app listening at http://localhost:${port}`)
})