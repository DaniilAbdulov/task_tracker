export function validateChangedTaskFields(task) {
    // inspector_id - число
    if (
        typeof task.inspector_id !== "number" &&
        typeof task.priority !== "number"
    ) {
        return false;
    }
    // Проверяем, что можно создать дату из ends_in, updated_at
    if (isNaN(Date.parse(task.ends_in)) || isNaN(Date.parse(task.updated_at))) {
        return false;
    }
    // Проверяем, что остальные поля - строки
    if (
        typeof task.title !== "string" ||
        typeof task.description !== "string"
    ) {
        return false;
    }

    return {
        title: task.title,
        description: task.description,
        ends_in: task.ends_in,
        updated_at: task.updated_at,
        priority: task.priority,
        inspector_id: task.inspector_id,
    };
}
