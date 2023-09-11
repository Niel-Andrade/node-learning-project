const express = require('express')
const { v4: uuidv4 } = require('uuid');

const app = express()
const port = 3001
app.use(express.json())
/*app.get('/projects', (request,response) =>{
    const {name, age} = request.query
    
    console.log(name,age)
    return response.json({nome: name, Idade: age})
})*/

/*app.get('/users/:id', (request,response) => {

    const { id } = request.params
    console.log(id)
    console.log(response)

    return response.json({id})
})*/

/*app.get('/projects', (request, response) => {
    const {name, age} = request.body
    console.log(request.body)
    console.log(name,age)

    return response.json({name, age})
}) // Insonminia > { "name": "Nataniel", "age": 21 } */


const users = []

const checkUsersId = (request, response, next) => {
    const {id} = request.params

    const index = users.findIndex(user => user.id === id)

    if(index < 0){
        return response.status(404).json({error: "User Not Found"})
    }

    request.userIndex = index
    request.userId = id

    next()
}

app.get('/users', (request, response) => {
    return response.json(users)
})

app.post('/users', (request,response) =>{
    const {name, age} = request.body
    
    const user = {id:uuidv4(), name:name, age:age}

    users.push(user)

    return response.status(201).json(user)
})

app.put('/users/:id',checkUsersId, (request, response) => {
    const {name, age} = request.body
    const index = request.userIndex
    const id = request.userId

    const updateUsers = {id, name, age}

    users[index] = updateUsers

    return response.json(updateUsers)
})


app.delete('/users/:id',checkUsersId,(request, response)=> {
    const index = request.userIndex

    users.splice(index,1)

    return response.status(204).json()
})










app.listen(port, () =>{
    console.log('🚀 Server Started on port ' + port + ' 🚀' )
    
    console.log(users)
})