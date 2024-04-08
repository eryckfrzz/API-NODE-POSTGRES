// import {createServer} from 'node:http'

// const server = createServer((req, res) => {
//     console.log('oi!')

//     return res.end()
// })

// server.listen(8080, () => {
//     console.log('servidor rodando na porta 8080!')
// })
import { DatabaseMemory } from "./database-memory.js"
import {fastify} from "fastify"
import { DatabasePostgres } from "./database-postgres.js"

const server = fastify()

const dataBase = new DatabasePostgres()

server.post('/videos', async (req, res) => {
    const {title, description, duration} = req.body

    await dataBase.create({
        title,
        description,
        duration
    })

    return res.status(201).send()
})

server.get('/videos', async (req) => {
    const search = req.query.search

    const videos = await dataBase.list(search)

    console.log(videos)

    return videos
})

server.put('/videos/:id', async (req, res) => {
    const videoId = req.params.id
    const {title, description, duration} = req.body

    await dataBase.update(videoId, {
        title,
        description,
        duration
    })

    return res.status(204).send()
})

server.delete('/videos/:id', async (req, res) => {
    const videoId = req.params.id

    await dataBase.delete(videoId)

    return res.status(204).send()
})

server.listen({
    port: 8080,
})

