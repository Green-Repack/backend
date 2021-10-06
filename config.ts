import { config } from 'dotenv';
config()

export default {
    JWT_KEY: process.env.JWT_KEY ?? "",
    DB_URI: process.env.DB_URI ?? "",
    PORT: process.env.PORT ?? 5000,
    TOKEN_EXPIRATION: process.env.TOKEN_EXPIRATION ?? 172800,
    STRIPE_SECRET_KEY: process.env.STRIPE_SECRET_KEY ?? "",
    STRIPE_PUBLIC_KEY: process.env.STRIPE_PUBLIC_KEY ?? "",
    STRIPE_ENDPOINT_SECRET: process.env.STRIPE_ENDPOINT_SECRET ?? "",
    AZURE_STORAGE_CONNECTION_STRING: process.env.AZURE_STORAGE_CONNECTION_STRING ?? "",
    REFESH_URL_EXPRESS: process.env.REFESH_URL_EXPRESS ?? "",
    REFESH_URL_STD: process.env.REFESH_URL_STD ?? "",
    RETURN_URL: process.env.RETURN_URL ?? "",
    STATIC_DIR: process.env.STATIC_DIR ?? "",
    DOMAIN: process.env.DOMAIN ?? ""
}