import express from 'express'
import helmet from "helmet";

export const app = express()

app.use(express.json())
app.use(helmet())

app.get('/', async (_, res) => {
    return res.status(200).json({ data: 'success' })
})
