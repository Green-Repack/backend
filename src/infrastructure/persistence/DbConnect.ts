import { connect } from "mongoose"

export class DbConnect {
    public static async connect() {
        try{
            const connectionURI = process.env.DB_URI
            if (connectionURI != undefined) {
                await connect(connectionURI, () => {
                    console.log("Connected to DB")
                })
            } else {
                console.log("No DB URI found!")
            } 
        } catch(error) {
            console.log(error)
        }
    }
}