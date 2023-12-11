export function getCategoryId(getCategories, category) {
    let categoryId = 0;
    if (!getCategories.rows) {
        return res
            .status(500)
            .json({ message: "Ошибка получения категорий товара" });
    } else {
        categoryId = getCategories.rows.filter(
            (cat) => cat.name === category
        )[0].id;
    }
    return Number(categoryId);
}
