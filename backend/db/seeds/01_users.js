import bcrypt from "bcrypt";
const saltRounds = 7;

export const seed = async function (knex) {
    await knex("users").del();

    // хеширование паролей
    const hashedPasswords = await Promise.all([
        bcrypt.hash("director1", saltRounds),
        bcrypt.hash("director2", saltRounds),
        bcrypt.hash("user1", saltRounds),
        bcrypt.hash("user2", saltRounds),
        bcrypt.hash("user3", saltRounds),
        bcrypt.hash("user4", saltRounds),
        bcrypt.hash("user5", saltRounds),
    ]);

    await knex("users").insert([
        {
            first_name: "Хусаинов",
            last_name: "Ильдар",
            third_name: "Борисович",
            login: "director1",
            password: hashedPasswords[0], // Использование хешированного пароля
            role: "director",
        },
        {
            first_name: "Хусаинова",
            last_name: "Елена",
            third_name: "Владимировна",
            login: "director2",
            password: hashedPasswords[1],
            role: "director",
        },
        {
            first_name: "Светлана",
            last_name: "Сидорова",
            third_name: "Алексеевна",
            login: "user1",
            password: hashedPasswords[2],
            role: "employee",
        },
        {
            first_name: "Светлана",
            last_name: "Сидорова",
            third_name: "Алексеевна",
            login: "user2",
            password: hashedPasswords[3],
            role: "employee",
        },
        {
            first_name: "Светлана",
            last_name: "Сидорова",
            third_name: "Алексеевна",
            login: "user3",
            password: hashedPasswords[4],
            role: "employee",
        },
        {
            first_name: "Светлана",
            last_name: "Сидорова",
            third_name: "Алексеевна",
            login: "user4",
            password: hashedPasswords[5],
            role: "employee",
        },
        {
            first_name: "Светлана",
            last_name: "Сидорова",
            third_name: "Алексеевна",
            login: "user5",
            password: hashedPasswords[6],
            role: "employee",
        },
    ]);
};
