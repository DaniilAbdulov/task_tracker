export function compareObjects(obj1, obj2) {
    for (let key in obj1) {
        if (key === "inspector_value" || key === "author") continue;
        if (obj1[key] !== obj2[key]) {
            return true;
        }
    }
    return false;
}
