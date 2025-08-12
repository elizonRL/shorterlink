import 'dotenv/config'


const config = {
    PORT: process.env.PORT,
    MONGODB_URI: process.env.MONGODB_URI,
}
if (process.env.NODE_ENV === 'test') {
    config.MONGODB_URI = process.env.MONGODB_URI_TEST
} else if (process.env.NODE_ENV === 'production') {
    config.MONGODB_URI = process.env.MONGODB_URI_PROD
} else {
    config.MONGODB_URI = process.env.MONGODB_URI
}

export default config;