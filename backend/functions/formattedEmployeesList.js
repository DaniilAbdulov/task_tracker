export function formattedEmployeesList(l) {
    return l.map((e) => {
        const str = e.first_name + " " + e.last_name + " " + e.third_name;
        return { id: e.id, text: str, value: str };
    });
}
