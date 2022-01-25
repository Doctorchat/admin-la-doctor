import PropTypes from "prop-types";
import { useEffect, useState } from "react";
import { Empty, Table } from "antd";

import "./styles/index.scss";
import cs from "../../utils/classNames";

export default function DcTable(props) {
  const {
    dataSource,
    dataColumns,
    pagination,
    title,
    onTabelChange,
    rowKey,
    loading,
    extra,
    rowClassName,
    expandable,
  } = props;
  const [tableXScroll, setTableXScroll] = useState(null);

  useEffect(() => {
    const updateTableXScroll = () => {
      if (window.innerWidth < 951) {
        setTableXScroll(600);
      } else {
        setTableXScroll(null);
      }
    };

    window.addEventListener("resize", updateTableXScroll);

    updateTableXScroll();

    return () => window.removeEventListener("resize", updateTableXScroll);
  }, []);

  console.log(tableXScroll);

  return (
    <div className={cs("dc-table", !title && "no-title", !extra && "no-footer")}>
      <div className="dc-table-content position-relative">
        <Table
          title={() => (title && <h3 className="dc-table-title m-0">{title}</h3>) || null}
          footer={() => extra && extra}
          bordered
          scroll={{ x: tableXScroll }}
          size="small"
          locale={{
            emptyText: <Empty description="Nu-s date" />,
          }}
          rowKey={rowKey}
          dataSource={dataSource}
          columns={dataColumns}
          onChange={onTabelChange}
          loading={loading}
          rowClassName={rowClassName}
          expandable={expandable}
          pagination={{
            pageSize: pagination.per_page,
            showSizeChanger: false,
            total: pagination.total,
            current: pagination.current_page,
            position: pagination.position,
          }}
        />
      </div>
    </div>
  );
}

DcTable.propTypes = {
  dataSource: PropTypes.array,
  dataColumns: PropTypes.array,
  rowKey: PropTypes.string,
  pagination: PropTypes.shape({
    per_page: PropTypes.number,
    total: PropTypes.number,
    current_page: PropTypes.number,
    position: PropTypes.arrayOf(PropTypes.string),
  }),
  title: PropTypes.string,
  onTabelChange: PropTypes.func,
  loading: PropTypes.bool,
  extra: PropTypes.element,
  fetching: PropTypes.bool,
  rowClassName: PropTypes.func,
  expandable: PropTypes.object,
};

DcTable.defaultProps = {
  rowKey: "id",
  dataSource: [],
  pagination: {
    per_page: 20,
    total: 20,
    current_page: 1,
  },
  expandable: {},
};
