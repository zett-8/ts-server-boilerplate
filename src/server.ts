import express from 'express'

export const app = express()

app.use(express.json())

app.get('/', async (_, res) => {
    return res.status(200).json({ data: 'success' })
})
