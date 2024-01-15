import React from 'react';
import Highlighter from 'react-highlight-words';
import date from "../../../utils/date";

const TableRow = ({ item, searchText, type }) => {
  const renderContent = () => {
    switch (type) {
      case 'logs':
        return (
          <div style={{ display: 'flex', justifyContent: 'space-between', borderBottom: '1px solid #ccc', borderLeft: '1px solid #ccc', borderRight: '1px solid #ccc', lineHeight: '35px' }} key={item.id}>
            <div style={{ width: '30px', textAlign: 'center', borderRight: '1px solid #ccc', boxSizing: 'border-box', height: '100%' }}>{item.id + 1}</div>
            <div style={{ flex: 1, textAlign: 'center' }}>
              <Highlighter
                searchWords={[searchText.replace(/\./g, '\\.')]}
                textToHighlight={item.action}
                highlightStyle={{ color: 'red', fontWeight: 'bold', padding: '0' }}
              />
            </div>
            <div style={{ width: '200px', textAlign: 'center', borderLeft: '1px solid #ccc', boxSizing: 'border-box', height: '100%' }}>
              <Highlighter
                searchWords={[searchText.replace(/\./g, '\\.')]}
                textToHighlight={date(item.created_at).full}
                highlightStyle={{ color: 'red', fontWeight: 'bold', padding: '0' }}
              />
            </div>
          </div>
        );

      case 'transactions':
        return (
          <div style={{ display: 'flex', justifyContent: 'space-between', borderBottom: '1px solid #ccc', borderLeft: '1px solid #ccc', borderRight: '1px solid #ccc', lineHeight: '35px' }} key={item.id}>
            <div style={{ width: '80px', textAlign: 'center' }}>
              <Highlighter
                searchWords={[searchText.replace(/\./g, '\\.')]}
                textToHighlight={item.user_id + ''}
                highlightStyle={{ color: 'red', fontWeight: 'bold', padding: '0' }}
              />
            </div>
            <div style={{ width: '300px', textAlign: 'center', borderLeft: '1px solid #ccc', boxSizing: 'border-box', height: '100%' }}>
              <Highlighter
                searchWords={[searchText.replace(/\./g, '\\.')]}
                textToHighlight={`${item.amount}`}
                highlightStyle={{ color: 'red', fontWeight: 'bold', padding: '0' }}
              />
            </div>
            <div style={{ width: '70px', textAlign: 'center', borderLeft: '1px solid #ccc', boxSizing: 'border-box', height: '100%' }}>
              <Highlighter
                searchWords={[searchText.replace(/\./g, '\\.')]}
                textToHighlight={item.currency}
                highlightStyle={{ color: 'red', fontWeight: 'bold', padding: '0' }}
              />
            </div>
            <div style={{ flex: 1, width: '200px', textAlign: 'center', borderLeft: '1px solid #ccc', boxSizing: 'border-box', height: '100%' }}>
              {item.promocode || '----'}
            </div>
            <div style={{ width: '70px', textAlign: 'center', borderLeft: '1px solid #ccc', boxSizing: 'border-box', height: '100%' }}>
              {item.status}
            </div>
            <div style={{ width: '300px', textAlign: 'center', borderLeft: '1px solid #ccc', boxSizing: 'border-box', height: '100%' }}>
              <Highlighter
                searchWords={[searchText.replace(/\./g, '\\.')]}
                textToHighlight={date(item.created_at).full}
                highlightStyle={{ color: 'red', fontWeight: 'bold', padding: '0' }}
              />
            </div>
          </div>
        );

      default:
        return null;
    }
  };

  return renderContent();
};

export default TableRow;
