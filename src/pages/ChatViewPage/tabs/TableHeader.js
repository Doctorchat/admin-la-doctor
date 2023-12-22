import React from 'react';
import { Button } from 'antd';
import PropTypes from 'prop-types';

const TableHeader = ({ columns, toggleFilterType, setFilterType, setSortType, filterType }) => {
  return (
    <div style={{
      display: 'flex', justifyContent: 'space-between', background: '#f0f0f0', borderBottom: '1px solid #ccc', fontWeight: 'bold', borderLeft: '1px solid #ccc',
      borderRight: '1px solid #ccc', lineHeight: '35px'
    }}>
      {columns.map((column) => (
        <div key={column.id} style={column.style}>
          <span>{column.title}</span>
          {column.sortable && (
            <Button
              onClick={() => { toggleFilterType(column.sortType, setFilterType); setSortType(column.sortType) }}
              style={column.buttonStyle}
              icon={filterType === column.filterType ? column.sortDescendingIcon : column.sortAscendingIcon}
            >
              {''}
            </Button>
          )}
        </div>
      ))}
    </div>
  );
};

TableHeader.propTypes = {
  columns: PropTypes.arrayOf(PropTypes.shape({
    title: PropTypes.string.isRequired,
    sortable: PropTypes.bool.isRequired,
    sortType: PropTypes.string.isRequired,
    sortAscendingIcon: PropTypes.elementType.isRequired,
    sortDescendingIcon: PropTypes.elementType.isRequired,
    style: PropTypes.object,
    buttonStyle: PropTypes.object,
  })).isRequired,
  toggleFilterType: PropTypes.func.isRequired,
  setFilterType: PropTypes.func.isRequired,
  setSortType: PropTypes.func.isRequired,
  filterType: PropTypes.string.isRequired,
};

export default TableHeader;
