export const TaskItem = ({ t }) => {
    const { title, priority, ends_in, status } = t;
    return (
        <div className="task__item item">
            <div className="item">
                <div className="item__block">
                    <h2 className="item__block-title">Задача</h2>
                    <div className="item__block-body">{title}</div>
                </div>
                <div className="item__block">
                    <h2 className="item__block-title">Приоритет</h2>
                    <div className="item__block-body">{priority}</div>
                </div>
                <div className="item__block">
                    <h2 className="item__block-title">К исполнению</h2>
                    <div className="item__block-body">{ends_in}</div>
                </div>
                <div className="item__block">
                    <h2 className="item__block-title">Ответственный</h2>
                    <div className="item__block-body item__inspector">
                        {/* <span>{task.inspector.last_name}</span>
                        <span>{task.inspector.first_name}</span>
                        <span>{task.inspector.third_name}</span> */}
                        <span>Иванова</span>
                        <span>Анна</span>
                        <span>Владимировна</span>
                    </div>
                </div>
                <div className="item__block">
                    <h2 className="item__block-title">Статус</h2>
                    <div className="item__block-body">{status}</div>
                </div>
            </div>
        </div>
    );
};
