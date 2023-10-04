import { Pool } from "pg";

export const db = new Pool({
    host: "dpg-ck9if46gtj9c73d75m40-a.singapore-postgres.render.com",
    user: "foodiespos_hc2i_user",
    password: "Y8Y7dLKYIgUU54M1Y3F8z7Nm8gDKxD3q",
    database: "foodiespos_hc2i",
    max: 20,
    ssl: true,
    idleTimeoutMillis: 30000,
    connectionTimeoutMillis: 2000,
});