export function getWorkData(tasks, users) {
    return tasks.map((task) => {
        const inspector = users.find((user) => user.id === task.inspector_id);

        return {
            id: task.id,
            title: task.title,
            ends_in: task.ends_in,
            priority: task.priority,
            status: task.status,
            inspector: `${inspector.last_name} ${inspector.first_name} ${inspector.third_name}`,
        };
    });
}
