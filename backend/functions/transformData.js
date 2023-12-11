import { transformPrice } from "./transformPrice.js";

export function transformData(data) {
    const newArr = data.map((item) => {
        item.date_order = formatDate(item.date_order);
        item.total = transformPrice(item.total);

        if (item.count.includes(",")) {
            const countOfElements = item.count.split(",").length;
            item.products = [];
            for (let i = 0; i < countOfElements; i++) {
                const newData = {
                    id: parseInt(item.product_id.split(",")[i]),
                    img: item.img.split(",")[i],
                    count: item.count.split(",")[i],
                };
                item.products.push(newData);
            }
            delete item.product_id;
            delete item.img;
            delete item.count;
        } else {
            item.products = [];
            const newData = {
                id: item.product_id,
                img: item.img,
                count: item.count,
            };
            item.products.push(newData);
            delete item.product_id;
            delete item.img;
            delete item.count;
        }
        return item;
    });
    return newArr;
}
export function formatDate(d) {
    const date = new Date(d);
    const options = { year: "numeric", month: "long", day: "numeric" };
    const result = date.toLocaleDateString("ru-RU", options);
    return result;
}
