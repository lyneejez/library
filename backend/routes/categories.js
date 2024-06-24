const express = require("express")
const router = express.Router();
const connection = require('../db/db');


router.get("/", (req, res)=>{
const sql=`SELECT * FROM categories`
    return connection.query(sql, function(err,results){
        if(err){
            return res.status(400).json({error:err});
        }
        res.status(200).json(results)
    });
})

router.get("/", (req, res)=>{
    const sql=`SELECT * FROM categories WHERE id =${req.params.id}`
        return connection.query(sql, function(err,results){
            if(err){
                return res.status(400).json({error:err});
            }
            res.status(200).json(results)
        });
    })

router.post("/create", (req, res)=>{
        const{name} =req.body;
        const sql= `INSERT INTO categories(category_name,description) VALUES ('${category_name}','${description}');`;

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
        
            const sql = `UPDATE categories SET ${updateColumns `,`})WHERE id = ${req.params.id}`;
        
            connection.query(sql, function(err, results) {
                if (err) {
                    return res.status(400).json({ error: err });
                }
                res.status(200).json(results);
            });
        })

router.delete("/:id", (req, res)=>{
            const sql=`DELETE FROM categories WHERE id=${req.params.id}`
                return connection.query(sql, function(err,results){
                    if(err){
                        return res.status(400).json({error:err});
                    }
                    res.status(200).json(results)
                });
        })
            
        


module.exports = router