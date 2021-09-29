export default {
    JWT_KEY: process.env.JWT_KEY ?? "simpleKey",
    DB_URI: process.env.DB_URI ?? "",
    PORT: process.env.PORT ?? 5000,
    TOKEN_EXPIRATION: process.env.TOKEN_EXPIRATION ?? 172800,
    STRIPE_SECRET_KEY: process.env.STRIPE_SECRET_KEY ?? "",
    STRIPE_PUBLIC_KEY: process.env.STRIPE_PUBLIC_KEY ?? ""
}