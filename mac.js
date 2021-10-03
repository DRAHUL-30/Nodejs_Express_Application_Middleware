//importing express module
const express= require("express")
//creating server similar to http.createServer()
const app=express();

//middleware function with no mount
//function is excecuted every time when the app gets request
app.use((req,res,next)=>{
    console.log("middleware 1")
    next();
})

app.use((req,res,next)=>{
    console.log("middleware 2")
    next();
})

//middleware function with mount
//function is excecuted every time when /users/:id path
app.use("/users/:id",(req,res)=>{
    console.log("Request Method",req.method)
    res.send("get method")
})

//route and its handler function(middleware).
//function handles the GET request to the users/:id path
app.get("/users",(req,res,next)=>{
    console.log("Router for get method ")
})

//middleware substack
app.use("/users/:id",(req,res,next)=>{
    console.log('Request URL:',req.originalUrl)
    next()
},function(req,res,next){
    console.log('Request Type:',req.method)
    res.end()
});

//using next(route) to skip the rest of the middleware functions from a router middleware stack
app.get('/posts/:id', function (req, res, next) {
    // if the user ID is 0, skip to the next route
    if (req.params.id === '0'){
        next('route')
    }
    // otherwise pass the control to the next middleware function in this stack
    else next()
  }, function (req, res, next) {
    // send a regular response
    res.send('regular')
  })
  
  app.get('/posts/:id', function (req, res, next) {
    res.send('special')
  })
  
//running in port 3001
app.listen(3001,()=>{console.log("server running in port 3001")})