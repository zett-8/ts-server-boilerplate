import dotenv from 'dotenv'
dotenv.config()

import { app } from './server'

const PORT = process.env.PORT || 3000

try {
    app.listen(PORT, () => {
        console.log(`======= Start server =======`)
        console.log(` PORT:     ${PORT}`)
        console.log(` NODE_ENV: ${process.env.NODE_ENV}`)
        console.log('============================')
    })
} catch (e) {
    console.error(e)
    process.exit(1)
}
