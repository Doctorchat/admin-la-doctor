import PropTypes from "prop-types";
import { Table } from "antd";

import "./styles/index.scss";

export default function DcTable(props) {
  const { dataSource, dataColumns, pagination, title, onTabelChange, rowKey, loading, extra } =
    props;

  return (
    <div className="dc-table">
      {title && <h3 className="dc-table-title text-center">{title}</h3>}
      <Table
        bordered
        scroll={{ x: 600 }}
        size="small"
        rowKey={rowKey}
        dataSource={dataSource}
        columns={dataColumns}
        onChange={onTabelChange}
        loading={loading}
        pagination={{
          pageSize: pagination.per_page,
          showSizeChanger: false,
          total: pagination.total,
          current: pagination.current_page,
          position: pagination.position,
        }}
      />
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
