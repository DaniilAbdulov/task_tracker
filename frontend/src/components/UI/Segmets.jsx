import { Segmented } from "antd";
const segmentHandler = (value) => {
    console.log(value);
};
export const Segmets = () => {
    return (
        <>
            <span style={{ marginLeft: "10px" }}>Срок исполнения:</span>
            <Segmented
                style={{ marginLeft: "10px" }}
                options={["Сегодня", "1-7 дней", "Больше недели"]}
                onChange={segmentHandler}
            />
        </>
    );
};
