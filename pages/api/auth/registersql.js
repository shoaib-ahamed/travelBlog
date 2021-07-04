/* eslint-disable import/no-anonymous-default-export */
import bcrypt from 'bcrypt';
import { sql_query } from '../../../utils/connectSql';
import valid from '../../../utils/valid';

const avatar = 'https://res.cloudinary.com/devatchannel/image/upload/v1602752402/avatar/avatar_cugq40.png'

export default async (req, res) => {
    switch(req.method){
        case "POST":
            await register(req, res)
            break;
    }
}

const register = async (req, res) => {
    try{
        const { name, email, password, cf_password } = req.body
        const errMsg = valid(name, email, password, cf_password)
        if(errMsg) return res.status(400).json({err: errMsg})

        // const user = await sql_query(`SELECT email FROM user`);

        // if(user) return res.status(400).json({err: 'This email already exists.'})

        const passwordHash = await bcrypt.hash(password, 12)

        // const newUser = new Users({ 
        //     name, email, password: passwordHash, cf_password 
        // })

        const userInsert = `INSERT INTO user (name, email, password, cf_password , role , avatar , id) VALUES (?,?,?,?,?,?)`
        await sql_query(userInsert , [name,email,passwordHash , "user" , avatar , 1] , (err,result) => {
            console.log(result)
            cosole.log(err)
        })

        // await mysql.transaction()
        //     .query(`INSERT INTO table (name,email, password) VALUES('asd' , 'asd@gmail.com' , 'asdadasd' , 'asdasdasdasdas)`, [1])
        //     .query('UPDATE table SET x = 1')
        //     .rollback(e => { /* do something with the error */ }) // optional
        //     .commit() // execute the queries

        res.json({msg: "Register Success!"})

    }catch(err){
        return res.status(500).json({err: err.message})
    }
}