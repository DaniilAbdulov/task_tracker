import React from "react";
import { Pagination } from "antd";
export const MyPagination = ({ currentPage, setCurrentPage, totalCount }) => {
    const onChange = (page) => {
        setCurrentPage(page);
    };
    return (
        <Pagination
            current={currentPage}
            onChange={onChange}
            total={totalCount}
        />
    );
};
