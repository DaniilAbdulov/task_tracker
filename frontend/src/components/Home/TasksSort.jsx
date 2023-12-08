import { useState } from "react";
import { usersNames } from "../../data/usersNames";

export const TasksSort = () => {
    const deadlines = [
        { id: 1, title: "Срок исполнения", value: "" },
        { id: 2, title: "Сегодня", value: "now" },
        { id: 3, title: "В течение недели", value: "week" },
        { id: 4, title: "Срок больше недели", value: "moreThanWeek" },
    ];

    const [selectedDeadline, setSelectedDeadline] = useState("");
    const [selectedUser, setSelectedUser] = useState("");

    const handleDeadlineChange = (e) => {
        setSelectedDeadline(e.target.value);
    };

    const handleUserChange = (e) => {
        setSelectedUser(e.target.value);
    };

    const handleFormReset = () => {
        setSelectedDeadline("");
        setSelectedUser("");
        console.log("Форма сброшена");
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        console.log("Выбранный срок исполнения:", selectedDeadline);
        console.log("Выбранный ответственный:", selectedUser);
    };

    return (
        <div className="sort">
            <form className="sort__form" onSubmit={handleSubmit}>
                <ul className="sort__values">
                    <li className="sort__value">
                        <select
                            name="ends_in"
                            id="ends_in"
                            value={selectedDeadline}
                            onChange={handleDeadlineChange}
                        >
                            {deadlines.map((dl) => (
                                <option key={dl.id} value={dl.value}>
                                    {dl.title}
                                </option>
                            ))}
                        </select>
                    </li>
                    <li className="sort__value">
                        <select
                            name="inspector"
                            id="inspector"
                            value={selectedUser}
                            onChange={handleUserChange}
                        >
                            <option value="">Ответственный</option>
                            {usersNames.map((user) => (
                                <option key={user.id} value={user.id}>
                                    {user.last_name} {user.first_name}{" "}
                                    {user.third_name}
                                </option>
                            ))}
                        </select>
                    </li>
                </ul>
                <button type="submit">Применить</button>
                <button type="reset" onClick={handleFormReset}>
                    Очистить форму
                </button>
            </form>
        </div>
    );
};
