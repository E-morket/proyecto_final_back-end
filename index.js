const express= require('express')
const mysql=require('mysql')

const port =3001
const app= express()
app.use((req, res, next) => {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Headers', 'Authorization, X-API-KEY, Origin, X-Requested-With, Content-Type, Accept, Access-Control-Allow-Request-Method');
    res.header('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, DELETE');
    res.header('Allow', 'GET, POST, OPTIONS, PUT, DELETE');
    next();
  });
app.use(express.json())

const conectBaseD =mysql.createConnection({
    host:'localhost',
    user:'root',
    password:'root',
    database:'profinal'
})

app.get('/',(req,res)=>
{
  res.sendStatus(200)
})

app.get('/profinal',(req,res)=>
{
    const sql = 'SELECT * FROM tablafinal'
    conectBaseD.query(sql,(error,result)=>
    {
        if(error) throw error;
        if(result.length >0)
        {
            res.json(result)
        }else{
            res.send('not results')
        }
    })
})

app.get('/profinal/:id',(req, res)=>
{
    const id=req.params.id
    const sql =`SELECT * FROM tablafinal WHERE idtablaFinal = ${id}`

    conectBaseD.query(sql, (error,result) =>
    {
        if(error)throw error;
        if(result.length>0)
        {
            res.json(result)
        }else{
            res.send('Not result')
        }
    })
})

app.post('/adduser',(req,res)=>
{
    const sql='INSERT INTO tablafinal SET?'
    const userObj= {
        idtablaFinal: req.body.idtablaFinal,
        nombre: req.body.nombre,
        correo: req.body.correo,
        telefono: req.body.telefono,
        solicitud: req.body.solicitud,
        comentario: req.body.comentario,
        
    }
    conectBaseD.query(sql,userObj,error =>
        {
            if(error) throw error
            res.send('user added')
        })
})
app.post('/addlog', (req,res) => { 
    const {user, password} = req.body
    const values = [user, password]
    const sql = 'select * from login where user = ? and password = ?'
    console.log('values',values)

    conectBaseD.query(sql, values,(err,result) => {
        if(err) {
            res.status(500).send(err)
        } else {
            if (result.length > 0) {
                res.status(200).send({
                    "idLogin": result[0].idproyectoFinal,
                    "user": result[0].user
                    //"password": result[0].password
                })
            } else {
                res.status(400).send('Usuario no existe')
            }
        }
    })
})


app.put('/update/:id',(req,res)=>
{       const id= req.params.id
        const { nombre, correo, telefono, solicitud, comentario, }= req.body
        const sql= `UPDATE tablafinal SET nombre= '${nombre}', correo= '${correo}', telefono= '${telefono}', solicitud= '${solicitud}', comentario= '${comentario}'
        WHERE idtablaFinal = '${id}'`
        conectBaseD.query(sql,error =>
            {
                if(error) throw error;
                res.send('user updated')
            })
})


app.delete('/eliminar/:id',(req,res)=>

 {
     const id = req.params.id
    
     const sql =`DELETE FROM tablafinal WHERE idtablaFinal = '${id}'`
     
     conectBaseD.query(sql,error => 
         {
             if(error)throw error
             res.send('usuario eliminado')
         })
 })




 app.listen(3001,(req,res)=>
 {
    console.log('conect by 3001 port',port)
 })

 








