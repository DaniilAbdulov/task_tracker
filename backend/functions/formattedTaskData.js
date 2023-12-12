export function formattedTaskData(d) {
    return {
        id: d.id,
        author: d.author,
        inspector_id: d.inspector_id,
        inspector_text: d.inspector,
        inspector_value: d.inspector,
        priority: d.priority,
        title: d.title,
        description: d.description,
        ends_in: d.ends_in,
        created_at: d.created_at,
        updated_at: d.updated_at,
        status: d.status,
    };
}
