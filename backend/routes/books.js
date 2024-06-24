const connection = require('../db/db');
const express = require("express")
const router = express.Router();


router.get("/", (req, res)=>{
    const sql =`
    SELECT
        b.*,
        c.category_name AS category,
        a.author_name AS author
    FROM books b
    INNER JOIN authors a ON a.author_id = b.author
    INNER JOIN categories c ON c.category_id= b.category_id
    ORDER BY b.title
    `;

    return connection.query(sql, function(err,results){
        if(err){
            return res.status(400).json({error:err});
        }
        res.status(200).json(results)
    });
})

router.get("/:id", (req, res)=>{
    id = req.params.id
    const sql =`
     SELECT
        b.*,
        c.name AS category,
        a.name AS author
    FROM books a
    INNER JOIN authors a ON a.author_id = b.author
    INNER JOIN categories c ON c.category_id= b.category_id
    WHERE b.id = ${id}
    ORDER BY b.title
    `;

    return connection.query(sql, function(err,results){
        if(err){
            return res.status(400).json({error:err});
        }
        res.status(200).json(results)
    });
})

router.post("/create", (req, res)=> {
    const{title,category_id,author_id} =req.body;
    const sql= `INSERT INTO books(title,category_id,author) VALUES ('${title}', '${category_id}', '${author_id}');`;
    console.log({body: req.body})
    console.log({sql})
        return connection.query(sql, function(err,results){
            if(err){
                return res.status(400).json({error:err});
            }
            res.status(200).json(results)
        });
 })

 router.patch("/:id/edit", (req, res) => {
    const books = req.body;
    const updateColumns = Object.entries(books).map(b =>{
        const [column,value] = b
        return `${column} = '${value}'`;
    });

    const sql = `UPDATE books SET ${updateColumns.join (',')} WHERE id = ${req.params.id}`;
// console.log({sql})
    connection.query(sql, function(err, results) {
        if (err) {
            return res.status(400).json({ error: err });
        }
        res.status(200).json(results);
    });
})



router.delete("/:id", (req, res)=>{
    const sql=`DELETE FROM books WHERE id=${req.params.id}`
        return connection.query(sql, function(err,results){
            if(err){
                return res.status(400).json({error:err});
            }
            res.status(200).json(results)
        });
})
   
    
    
module.exports = router