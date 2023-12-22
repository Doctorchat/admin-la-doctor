import { useState, useEffect } from "react";
import { Button, Pagination } from "antd";
import { SortDescendingOutlined, SortAscendingOutlined, MenuOutlined, ArrowUpOutlined, ArrowDownOutlined } from '@ant-design/icons';
import { useChatViewContext } from "../ChatViewContext";
import date from "../../../utils/date";
import 'antd/dist/antd.css';
import { useFunctions } from './common.js'
import MobileView from "./MobileView.js";
import TableHeader from "./TableHeader.js";
import TabControls from "./TabControls.js";
import Popup from "./Popup.js";
import TableRow from "./TableRow.js";
export default function ChatLogs() {

  const { chatInfo } = useChatViewContext();
  const chatLogs = chatInfo?.chatLogs.map((item, index) => ({ ...item, id: index })) || [];
  const {
    renderFilterButtons,
    toggleView,
    pageSize,
    clientWidth,
    layout,
    setSearchText,
    searchText,
    currentPage,
    inputValue,
    setInputValue,
    isModalVisible,
    setIsModalVisible,
    handleChangePage,
    handleSearch,
    handleKeyDown,
    sortType,
    setSortType,
    filterType,
    setFilterType,
    handleFilter,
    toggleFilterType,
    showModal
  } = useFunctions();
  const totalFilteredLogs = chatLogs.filter(item => date(item.created_at).full.toLowerCase().includes(searchText.toLowerCase())).length || 0;
  const [chatLogsResult, setChatLogsResult] = useState([]);

  useEffect(() => {
    const chatLogsFilterConditions = item => (
      date(item.created_at).full.toLowerCase().includes(searchText.toLowerCase()) ||
      item.action.toLowerCase().includes(searchText.toLowerCase())
    );
    const result = handleFilter(chatLogs, chatLogsFilterConditions);
    setChatLogsResult(result);
  }, [searchText, sortType, filterType, currentPage])

  const columns = [
    { id: 7, title: '№', style: { width: '30px', textAlign: 'center', borderRight: '1px solid #ccc', boxSizing: 'border-box', height: '100%' } },
    {
      id: 8,title: 'Action',style: { flex: 1, textAlign: 'center', position: 'relative' }, sortable: true, sortType: 'action', buttonStyle: { position: 'absolute', right: '10px', top: '1px' },sortAscendingIcon: <SortAscendingOutlined />,sortDescendingIcon: <SortDescendingOutlined />,filterType: 'AZ'
    },
    {
      title: 'Created at',style: { width: '200px', textAlign: 'center', borderLeft: '1px solid #ccc', boxSizing: 'border-box', height: '100%', position: 'relative' }, sortable: true, sortType: 'date', buttonStyle: { position: 'absolute', right: '10px', top: '1px' },sortAscendingIcon: <ArrowDownOutlined />,sortDescendingIcon: <ArrowUpOutlined />,filterType: 'newerDate',
    },
  ];

  const filterButtons = [
    { id: 0, title: 'Sort by action', type: 'action', icon: filterType === 'AZ' ? <SortDescendingOutlined /> : <SortAscendingOutlined /> },
    { id: 1, title: 'Sort by date', type: 'date', icon: filterType === 'newerDate' ? <ArrowUpOutlined /> : <ArrowDownOutlined /> },
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
        />
      ) : (
        <div style={{ display: 'flex', justifyContent: 'end' }}>
          <Button icon={<MenuOutlined />} onClick={showModal}   >
            {''}
          </Button>
        </div>
      )
      }
      <div>
        {layout === 'horizontal' && (
          <TableHeader columns={columns} toggleFilterType={toggleFilterType} setFilterType={setFilterType} setSortType={setSortType} filterType={filterType} />
        )}
        {chatLogsResult.map((item) => (
          layout === 'vertical' ? (
            <MobileView key={item.id} item={item} type={'logs'} searchText={searchText} />
          ) : (
            <TableRow item={item} searchText={searchText} type="logs" />
          )
        ))}
        {chatInfo?.chatLogs.length > 0 && (
          <Pagination
            current={currentPage}
            pageSize={pageSize}
            total={totalFilteredLogs}
            onChange={handleChangePage}
            style={layout === 'horizontal' ? { float: 'right', marginTop: '10px' } : { float: 'left', marginTop: '10px' }}
            size='small'
          />
        )}
      </div>

      <Popup
        renderFilterButtons={renderFilterButtons}
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
      />
    </>

  )

}
