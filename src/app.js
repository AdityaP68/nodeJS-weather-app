const path = require('path');
const express = require('express');
const hbs = require('hbs');
const geoCode = require('./utils/geocode');
const weatherAPI = require('./utils/weatherapi');

const app = express();
const PORT = process.env.PORT || 3000;

const publicDirectory = path.join(__dirname,'../public');

//by default only view name is accepted by hbs , therefore u need to define the path for custom folder and set it in express
const viewPath = path.join(__dirname, '../templates/views');
const partialPath = path.join(__dirname,'../templates/partials');

app.use(express.static(publicDirectory));

//setting handlebars as default templating method
app.set('view engine','hbs');
app.set('views',viewPath);
hbs.registerPartials(partialPath);


//this root url will never run as the express static is running index.js/app.use setting
//endpoints/routes

app.get('/',(req,res)=>{
    res.render('index',{
        title: "homepage",
        name: "Aditya Prakash",
        age: 20
    })
})


app.get('/weather',(req,res)=>{
    if(!req.query.search){
        return res.send('Please provide a valid argument');
    }
    geoCode(req.query.search, (g_error, coordinates) =>{
        if(g_error){
            return res.send({g_error});
        }
        weatherAPI(coordinates, (w_error, {temperature,precipitation,location})=>{
            if(w_error){
                return res.send({w_error});
            }
            res.send({temperature,precipitation,location});
        })
    })
})


app.get('/about',(req,res)=>{
    res.render('about',{
        title: 'About',
        name: 'Aditya Prakash',
        age: 20
    });
})

app.get('/help',(req,res)=>{
    res.render('help',{
        title: 'Help',
        name: 'Aditya',
        age: 20
    });
})

app.get('/help/*',(req,res)=>{
    res.render('error',{
        error: 'Lawde Galat Hai',
        name: 'Aditya Prakash'
    });
})

app.get('*',(req,res)=>{
    res.render('error',{
        error: '404 Page not found',
        name: 'Aditya Prakash'
    });
});

//listening
app.listen(PORT,()=>{console.log(`The server is running on port number ${PORT}`)});

