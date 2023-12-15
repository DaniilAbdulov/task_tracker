import bcrypt from "bcrypt";
const saltRounds = 7;

export const seed = async function (knex) {
    await knex("users").del();

    // хеширование паролей
    // пароли пользователей нельзя хранить в незашифрованном виде;
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
            first_name: "Директор",
            last_name: "Директоров",
            third_name: "Директорович",
            login: "director1",
            password: hashedPasswords[0], // Использование хешированного пароля
            role: "director",
        },
        {
            first_name: "Директрисса",
            last_name: "Директорова",
            third_name: "Директоровна",
            login: "director2",
            password: hashedPasswords[1],
            role: "director",
        },
        {
            first_name: "Сатоши",
            last_name: "Накамото",
            third_name: "Биткоинович",
            login: "user1",
            password: hashedPasswords[2],
            role: "employee",
        },
        {
            first_name: "Тупак",
            last_name: "Шакур",
            third_name: "Амару",
            login: "user2",
            password: hashedPasswords[3],
            role: "employee",
        },
        {
            first_name: "Майкл",
            last_name: "Тайсон",
            third_name: "Джеральд",
            login: "user3",
            password: hashedPasswords[4],
            role: "employee",
        },
        {
            first_name: "Хабиб",
            last_name: "Нурмагомедов",
            third_name: "Абдулманапович",
            login: "user4",
            password: hashedPasswords[5],
            role: "employee",
        },
        {
            first_name: "Петр",
            last_name: "Ян",
            third_name: "Евгеньевич",
            login: "user5",
            password: hashedPasswords[6],
            role: "employee",
        },
    ]);
};
