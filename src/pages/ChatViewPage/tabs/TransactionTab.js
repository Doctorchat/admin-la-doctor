import { React, useState, useEffect } from "react";
import { Button,Pagination } from "antd";
import { ArrowDownOutlined, ArrowUpOutlined, MenuOutlined } from '@ant-design/icons';
import { useChatViewContext } from "../ChatViewContext";
import date from "../../../utils/date";
import { useFunctions } from "./common";
import MobileView from "./MobileView";
import TableHeader from "./TableHeader";
import TabControls from "./TabControls";
import Popup from "./Popup";
import TableRow from "./TableRow";


export default function TransactionTab() {
  const [transactionsResult, setTransactionsResult] = useState([]);
  const { chatInfo } = useChatViewContext();
  const {
    renderFilterButtons,
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
      String(item.amount).toLowerCase().includes(searchText.toLowerCase())
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
          renderFilterButtons={renderFilterButtons}
          prop={'id, amount, date'}
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
            <TableRow item={item} searchText={searchText} type="transactions" />
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

      <Popup
        isModalVisible={isModalVisible}
        handleKeyDown={handleKeyDown}
        inputValue={inputValue}
        layout={layout}
        toggleView={toggleView}
        setFilterType={setFilterType}
        setIsModalVisible={setIsModalVisible}
        handleSearch={handleSearch}
        setInputValue={setInputValue}
        filterButtons={filterButtons}
        toggleFilterType={toggleFilterType}
        setSortType={setSortType}
        renderFilterButtons={renderFilterButtons}
      />
    </>
  );

}