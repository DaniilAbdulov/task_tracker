export function transformPrice(price) {
    const number = Number(price);
    return number.toLocaleString("ru-RU", {
        style: "currency",
        currency: "RUB",
        minimumFractionDigits: 0,
    });
}
