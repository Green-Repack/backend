export default {
    JWT_KEY: process.env.JWT_KEY ?? "simpleKey",
    DB_URI: process.env.DB_URI ?? "",
    PORT: Number(process.env.PORT) ?? 5000,
    TOKEN_EXPIRATION: Number(process.env.TOKEN_EXPIRATION) ?? 172800
}