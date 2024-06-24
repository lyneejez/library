const express = require("express")
const app = express();
 


app.set('view engine', 'ejs')

app.use(express.urlencoded({extended:true}))
app.use(express.json());


const port = 5000;
app.listen(port, ()=>{
    console.log(`Example app listening on port ${port}`)})

const apiURL = "http://localhost:3000/backend";

app.get("/",(req,res)=>{
    fetch(apiURL+'/books').then(res => res.json()).then((books) =>{
        res.render('template', {books, main_content: 'books/index'})
    });
});


app.get("/create",(req,res)=>{
    fetch(apiURL+'/authors').then(res => res.json()).then((authors) => {
        fetch(apiURL+'/categories').then(res => res.json()).then((categories) =>{
            res.render('template', {categories, authors, main_content: 'books/create'})
        });
    });
});


app.post("/create",function(req,res){
    fetch(`${apiURL}/books/create`,{
        method:'POST',
        headers: {
            'Accept':'application/json',
            'Content-Type':'application/json'
        },
        body: JSON.stringify(req.body)
    }).then(res =>res.json()).then((results)=>{
        res.redirect("/")
    })
})


app.get("/:id/edit",function(req,res){
    const id = req.params.id
    fetch(`${apiURL}/books/${id}`).then((res)=>res.json()).then(books => {
        const animal= books[0]
        fetch(apiURL + '/authors').then(res=> res.json()).then((authors)=> {
            fetch(apiURL + '/categories').then(res => res.json()).then((categories)=>{
                res.render('template',{animal,authors,categories,main_content: "books/edit"});
            })
        })
    }).catch(err =>{
        console.log({err})
    return res.send(err.toString())

    })
})


app.post("/:id/edit", function(req,res){
    fetch(`${apiURL}/books/${req.params.id}/edit`,{
        method:'PATCH',
        headers: {
            'Accept':'application/json',
            'content-type':'application/json'
        },
        body:JSON.stringify(req.body)
    }).then(res =>res.json()).then((results)=> {
        res.redirect("/")
    })
})


app.get("/:id/delete", function(req,res){
    fetch(`${apiURL}/books/${req.params.id}`,{
        method:'DELETE',
    })
.then(response =>{
    if(response.ok){
        return response.json();
    }
    throw new error("error deleting an item");
}).then((results)=>{
    res.redirect("/")
    })
    .catch(err =>{
        console.error(err);
        res.status(5000).send(err.toString());
    });
});


