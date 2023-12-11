import pool from "../db.js";

export const addProducts = async (userId, arr) => {
    for (const order of arr) {
        await pool.query(
            "insert into carts_users (users_id, product_id, count) values($1, $2, $3)",
            [userId, order.product_id, order.count]
        );
    }
};
