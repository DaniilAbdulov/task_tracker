export function formattedEmployeesList(l) {
    return l.map((e) => {
        const str = e.last_name + " " + e.first_name + " " + e.third_name;
        return { id: e.id, text: str, value: str };
    });
}
