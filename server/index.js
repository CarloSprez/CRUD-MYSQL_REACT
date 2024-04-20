const express = require("express");
const app = express();
const mysql = require("mysql");
const cors = require("cors");

app.use(cors());
app.use(express.json());

const db = mysql.createConnection({
    host: "localhost",
    user: "Perez",
    password: "",
    database: "TEST"
});

// POST
app.post("/create",(req,res)=>{
    const nombre = req.body.nombre;
    const edad = req.body.edad;
    const telefono = req.body.telefono;

    db.query('INSERT INTO datospersona(nombre,edad,telefono)VALUES(?,?,?)',[nombre,edad,telefono],
(err,result)=>{
    if(err){
        console.log(err)
    }else{
        res.send("Registrado con exito");
    }
}
);
});

//GET
app.get("/view",(req,res)=>{
    db.query('SELECT * FROM datospersona',
(err,result)=>{
    if(err){
        console.log(err)
    }else{
        res.send(result);
    }
}
);
});

//UPDATE
app.put("/update",(req,res)=>{
    const id = req.body.id;
    const nombre = req.body.nombre;
    const edad = req.body.edad;
    const telefono = req.body.telefono;

    db.query('UPDATE datospersona SET nombre=?,edad=?,telefono=? WHERE id=?',[nombre,edad,telefono,id],
(err,result)=>{
    if(err){
        console.log(err)
    }else{
        res.send("Actualizado con exito con exito");
    }
}
);
});

//DELETE
app.delete("/delete/:id",(req,res)=>{
    const id = req.params.id;

    db.query('DELETE FROM datospersona WHERE id=?',id,
(err,result)=>{
    if(err){
        console.log(err)
    }else{
        res.send("Eliminado con exito con exito");
    }
}
);
});

app.listen(3001,()=>{
    console.log("corriendo en el puerto 3001");
})