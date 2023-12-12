import { formattedDate } from "./formattedDate.js";

export function validateTaskFields(task) {
    // author_id и inspector_id - числа
    if (
        typeof task.author_id !== "number" ||
        typeof task.inspector_id !== "number"
    ) {
        return false;
    }

    // Проверяем, что можно создать дату из ends_in, created_at, updated_at
    console.log();
    console.log(Date.parse(task.ends_in));
    if (
        isNaN(Date.parse(task.ends_in)) ||
        isNaN(Date.parse(task.created_at)) ||
        isNaN(Date.parse(task.updated_at))
    ) {
        return false;
    }

    // Проверяем, что остальные поля - строки
    if (
        typeof task.title !== "string" ||
        typeof task.description !== "string" ||
        typeof task.priority !== "string" ||
        typeof task.status !== "string"
    ) {
        return false;
    }

    return {
        title: task.title,
        description: task.description,
        ends_in: formattedDate(task.ends_in),
        created_at: formattedDate(task.created_at),
        updated_at: formattedDate(task.updated_at),
        priority: task.priority,
        status: task.status,
        author_id: task.author_id,
        inspector_id: task.inspector_id,
    };
}
