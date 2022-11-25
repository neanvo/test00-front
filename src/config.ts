const SERVER_PORT = process.env.SERVER_PORT || 3001
const SERVER_DOMAIN = process.env.SERVER_DOMAIN || 'localhost'

export const config = {
    server: {
        port: SERVER_PORT,
        domain: SERVER_DOMAIN
    }
}