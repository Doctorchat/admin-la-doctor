import PropTypes from "prop-types";
import { Empty, Table } from "antd";

import "./styles/index.scss";

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
  } = props;

  return (
    <div className="dc-table">
      {title && <h3 className="dc-table-title text-center">{title}</h3>}
      <div className="dc-table-content position-relative">
        <Table
          bordered
          scroll={{ x: 600 }}
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
          pagination={{
            pageSize: pagination.per_page,
            showSizeChanger: false,
            total: pagination.total,
            current: pagination.current_page,
            position: pagination.position,
          }}
        />
      </div>
      {extra && extra}
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
};

DcTable.defaultProps = {
  rowKey: "id",
  dataSource: [],
  pagination: {
    per_page: 20,
    total: 20,
    current_page: 1,
  },
};
