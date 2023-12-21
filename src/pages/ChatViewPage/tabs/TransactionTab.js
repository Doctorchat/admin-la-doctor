import { React, useState, useEffect } from "react";
import { Button, Input, Pagination, Modal } from "antd";
import Highlighter from 'react-highlight-words';
import { UnorderedListOutlined, TableOutlined, SearchOutlined, ArrowDownOutlined, ArrowUpOutlined, MenuOutlined } from '@ant-design/icons';
import { useChatViewContext } from "../ChatViewContext";
import date from "../../../utils/date";
import { useFunctions } from "./common";
import MobileView from "./MobileView";
import TableHeader from "./TableHeader";
import TabControls from "./TabControls";


export default function TransactionTab() {
  const [transactionsResult, setTransactionsResult] = useState([]);
  const { chatInfo } = useChatViewContext();
  const {
    toggleView,
    pageSize,
    clientWidth,
    layout,
    searchText,
    setSearchText,
    currentPage,
    inputValue,
    setInputValue,
    isModalVisible,
    setIsModalVisible,
    handleChangePage,
    handleSearch,
    handleKeyDown,
    filterType,
    setFilterType,
    sortType,
    setSortType,
    toggleFilterType,
    handleFilter,
    showModal
  } = useFunctions();
  const transactions = chatInfo?.transactions.map((item, index) => ({ ...item, id: index })) || [];
  const totalFilteredTransactions = transactions.filter(item => date(item.created_at).full.toLowerCase().includes(searchText.toLowerCase())).length || 0;

  useEffect(() => {
    const transactionsFilterConditions = item => (
      date(item.created_at).full.toLowerCase().includes(searchText.toLowerCase()) ||
      String(item.user_id).toLowerCase().includes(searchText.toLowerCase()) ||
      item.amount.toLowerCase().includes(searchText.toLowerCase())
    );
    const result = handleFilter(transactions, transactionsFilterConditions);
    setTransactionsResult(result);
  }, [searchText, sortType, filterType, currentPage,]);

  const columns = [
    { id: 0, title: 'ID', style: { width: '80px', textAlign: 'center' }, sortable: false },
    { id: 1, title: 'Amount', style: { width: '300px', textAlign: 'center', position: 'relative', borderLeft: '1px solid #ccc' }, sortable: true, sortType: 'amount', buttonStyle: { position: 'absolute', top: '1px', right: '10px' }, sortAscendingIcon: <ArrowUpOutlined />, sortDescendingIcon: <ArrowDownOutlined />, filterType: 'big' },
    { id: 2, title: 'Currency', style: { width: '70px', textAlign: 'center', borderLeft: '1px solid #ccc', boxSizing: 'border-box', height: '100%', position: 'relative' } },
    { id: 3, title: 'Promocode', style: { width: '200px', flex: 1, textAlign: 'center', borderLeft: '1px solid #ccc', boxSizing: 'border-box', height: '100%', position: 'relative' } },
    { id: 4, title: 'Status', style: { width: '70px', textAlign: 'center', borderLeft: '1px solid #ccc', boxSizing: 'border-box', height: '100%', position: 'relative' } },
    { id: 5, title: 'Created at', style: { width: '300px', textAlign: 'center', borderLeft: '1px solid #ccc', boxSizing: 'border-box', height: '100%', position: 'relative' }, sortable: false, sortType: 'date', buttonStyle: { position: 'absolute', top: '1px', right: '10px', display: 'none' } },
  ];
  const filterButtons = [
    { id: 0, title: 'Sort by amount', type: 'amount', icon: filterType === 'big' ? <ArrowDownOutlined /> : <ArrowUpOutlined /> }
  ];

  return (
    <>
      {clientWidth >= 600 ? (
        <TabControls
          searchText={searchText}
          setSearchText={setSearchText}
          layout={layout}
          toggleView={toggleView}
          filterType={filterType}
          toggleFilterType={toggleFilterType}
          setSortType={setSortType}
          filterButtons={filterButtons}
          setFilterType={setFilterType}
          handleKeyDown={handleKeyDown}
        />
      ) : (
        <div style={{ display: 'flex', justifyContent: 'end' }}>
          <Button icon={<MenuOutlined />} onClick={showModal}   >
            {''}
          </Button>
        </div>
      )}

      {layout === 'horizontal' && (
        <TableHeader columns={columns} toggleFilterType={toggleFilterType} setFilterType={setFilterType} setSortType={setSortType} filterType={filterType} />
      )}
      {
        transactionsResult.map((item) => (
          layout === "horizontal" ? (
            <div style={{ display: 'flex', justifyContent: 'space-between', borderBottom: '1px solid #ccc', borderLeft: '1px solid #ccc', borderRight: '1px solid #ccc', lineHeight: '35px' }} key={item.id}>
              <div style={{ width: '80px', textAlign: 'center' }}>
                <Highlighter
                  searchWords={[searchText]}
                  textToHighlight={item.user_id + ''}
                  highlightStyle={{ color: 'red', fontWeight: 'bold', padding: '0' }}
                />
              </div>
              <div style={{ width: '300px', textAlign: 'center', borderLeft: '1px solid #ccc', boxSizing: 'border-box', height: '100%' }}>
                <Highlighter
                  searchWords={[searchText]}
                  textToHighlight={`${item.amount}`}
                  highlightStyle={{ color: 'red', fontWeight: 'bold', padding: '0' }}
                />
              </div>
              <div style={{ width: '70px', textAlign: 'center', borderLeft: '1px solid #ccc', boxSizing: 'border-box', height: '100%' }}>
                <Highlighter
                  searchWords={[searchText]}
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
                  searchWords={[searchText]}
                  textToHighlight={date(item.created_at).full}
                  highlightStyle={{ color: 'red', fontWeight: 'bold', padding: '0' }}
                />
              </div>
            </div>
          ) : (
            <MobileView key={item.id} item={item} type={'transactions'} searchText={searchText} />
          )
        ))}
      {chatInfo?.transactions.length > 0 && (
        <Pagination
          current={currentPage}
          pageSize={pageSize}
          total={totalFilteredTransactions}
          onChange={handleChangePage}
          style={layout === 'horizontal' ? { float: 'right', marginTop: '10px' } : { float: 'left', marginTop: '10px' }}
          size='small'
        />
      )}

      <Modal
        title="Choose an option"
        open={isModalVisible}
        onOk={() => { setIsModalVisible(false) }}
        onCancel={() => { setIsModalVisible(false) }}
      >
        <div>
          <Input
            placeholder="Enter date or action"
            onKeyDown={handleKeyDown}
            suffix={
              <Button icon={<SearchOutlined />} onClick={() => { handleSearch(); setIsModalVisible(false) }} >
                {''}
              </Button>
            }
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
            style={{ width: '100%' }}
          />
          <div style={{ display: 'flex', justifyContent: 'start', gap: '30px', marginTop: '15px' }}>
            <div>
              <span style={{ fontSize: '16px', marginRight: '10px' }}>View: </span>
              <Button
                icon={layout === 'horizontal' ? <UnorderedListOutlined /> : <TableOutlined />}
                onClick={toggleView}
              >
                {''}
              </Button>
            </div>
          </div>
          <div style={{ height: '100%', display: 'flex', alignItems: 'center', gap: '10px', marginTop: '15px' }}>
            <span style={{ fontSize: '16px' }}>Sort: </span>
            <div style={{ display: 'flex', gap: '5px', fontSize: '16px', alignItems: 'center', paddingRight: '10px', borderRight: '1px solid #e5e5e5' }}>
              <div >Amount</div>
              <Button
                icon={filterType === 'big' ? <ArrowDownOutlined /> : <ArrowUpOutlined />}
                onClick={() => { toggleFilterType('amount'); setSortType('amount') }}
              >
                {''}
              </Button>
            </div>
            <div style={{ display: 'none', gap: '5px', fontSize: '16px', alignItems: 'center' }}>
              <div>Date</div>
              <Button
                icon={filterType === 'olderDate' ? <ArrowDownOutlined /> : <ArrowUpOutlined />}
                onClick={() => { toggleFilterType('date'); setSortType('date') }}
              >
                {''}
              </Button>
            </div>
          </div>
        </div>
      </Modal>
    </>
  );

}