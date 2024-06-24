const express = require("express")
const router = express.Router();
const connection = require('../db/db');

router.get("/", (req, res)=>{
const sql=`SELECT * FROM  authors`
    return connection.query(sql, function(err,results){
        if(err){
            return res.status(400).json({error:err});
        }
        res.status(200).json(results)
    });
})

router.get("/", (req, res)=>{
    const sql=`SELECT * FROM  authors WHERE id =${req.params.id}`
        return connection.query(sql, function(err,results){
            if(err){
                return res.status(400).json({error:err});
            }
            res.status(200).json(results)
        });
    })

router.post("/create", (req, res)=>{
        const{author_name} =req.body;
        const sql= `INSERT INTO  authors(author_name) VALUES ('${author_name}');`;

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
        
            const sql = `UPDATE  authors SET ${updateColumns `,`})WHERE id = ${req.params.id}`;
        
            connection.query(sql, function(err, results) {
                if (err) {
                    return res.status(400).json({ error: err });
                }
                res.status(200).json(results);
            });
        })

router.delete("/:id", (req, res)=>{
            const sql=`DELETE FROM  authors WHERE id=${req.params.id}`
                return connection.query(sql, function(err,results){
                    if(err){
                        return res.status(400).json({error:err});
                    }
                    res.status(200).json(results)
                });
        })
            
        

module.exports = router