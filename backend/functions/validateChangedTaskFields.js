import { formattedDate } from "./formattedDate.js";

export function validateChangedTaskFields(task) {
    // inspector_id - число
    if (typeof task.inspector_id !== "number") {
        return false;
    }

    // Проверяем, что можно создать дату из ends_in, updated_at
    if (isNaN(Date.parse(task.ends_in)) || isNaN(Date.parse(task.updated_at))) {
        return false;
    }

    // Проверяем, что остальные поля - строки
    if (
        typeof task.title !== "string" ||
        typeof task.description !== "string" ||
        typeof task.priority !== "string"
    ) {
        return false;
    }

    return {
        title: task.title,
        description: task.description,
        ends_in: formattedDate(task.ends_in),
        updated_at: formattedDate(task.updated_at),
        priority: task.priority,
        inspector_id: task.inspector_id,
    };
}