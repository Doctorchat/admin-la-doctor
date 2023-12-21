import { useState, useEffect } from "react";
import { Comment, Avatar, Button, Pagination, Input, Modal } from "antd";
import { UnorderedListOutlined, TableOutlined, SearchOutlined, SortDescendingOutlined, SortAscendingOutlined, MenuOutlined, ArrowUpOutlined, ArrowDownOutlined } from '@ant-design/icons';
import { useChatViewContext } from "../ChatViewContext";
import Highlighter from 'react-highlight-words';
import date from "../../../utils/date";
import 'antd/dist/antd.css';
import { useFunctions } from './common.js'

export default function ChatLogs() {

  const { chatInfo } = useChatViewContext();
  const chatLogs = chatInfo?.chatLogs.map((item, index) => ({ ...item, id: index })) || [];
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

  return (
    <>
      {clientWidth >= 600 ? (
        <div style={{ display: 'flex', justifyContent: 'start', gap: '15px', borderBottom: '1px solid #e5e5e5', paddingBottom: '15px' }}>

          <div style={{ display: 'flex', width: '50%', alignItems: 'center', paddingRight: '10px', borderRight: '1px solid #e5e5e5' }}>
            <span style={{ fontSize: '16px', marginRight: '10px' }}> Filtering: </span>
            <Input
              placeholder="Enter date or action"
              onKeyDown={handleKeyDown}
              prefix={<SearchOutlined />}


              onInput={(e) => {
                setSearchText(e.target.value)

              }}
              style={{ width: '100%' }}
            />
          </div>

          <div style={{ display: 'flex', flexDirection: 'row', alignItems: 'center', gap: '30px' }}>
            {layout === 'vertical' && (
              <div style={{ borderRight: '1px solid #e5e5e5', height: '100%', display: 'flex', alignItems: 'center', gap: '10px' }}>

                <div style={{ display: 'flex', gap: '5px', fontSize: '16px', alignItems: 'center', paddingRight: '10px' }}>
                  <div >Sort by action</div>
                  <Button
                    icon={filterType === 'AZ' ? <SortAscendingOutlined /> : <SortDescendingOutlined />}
                    onClick={() => { toggleFilterType('action', setFilterType); setSortType('action') }}
                  >
                    {''}
                  </Button>
                </div>
                <div style={{ display: 'flex', gap: '5px', fontSize: '16px', alignItems: 'center', paddingRight: '10px', borderRight: '1px solid #e5e5e5' }}>
                  <div>Sort by date</div>
                  <Button
                    icon={filterType === 'newerDate' ? <ArrowUpOutlined /> : <ArrowDownOutlined />}
                    onClick={() => { toggleFilterType('date', setFilterType); setSortType('date') }}
                  >
                    {''}
                  </Button>
                </div>
              </div>
            )}

            <div style={{ paddingRight: '10px', height: '100%', display: 'flex', alignItems: 'center' }}>
              <span style={{ fontSize: '16px', marginRight: '10px' }}>View: </span>
              <Button
                icon={layout === 'horizontal' ? <UnorderedListOutlined /> : <TableOutlined />}
                onClick={toggleView}
              >
                {''}
              </Button>
            </div>


          </div>
        </div>
      ) : (
        <div style={{ display: 'flex', justifyContent: 'end' }}>
          <Button icon={<MenuOutlined />} onClick={showModal}   >
            {''}
          </Button>
        </div>
      )
      }
      <div>
        {/* Отобразить лейблы только один раз в начале */}
        {layout === 'horizontal' && (
          <div style={{
            display: 'flex', justifyContent: 'space-between', background: '#f0f0f0', borderBottom: '1px solid #ccc', fontWeight: 'bold', borderLeft: '1px solid #ccc',
            borderRight: '1px solid #ccc', lineHeight: '35px'
          }}>
            <div style={{ width: '30px', textAlign: 'center', borderRight: '1px solid #ccc', boxSizing: 'border-box', height: '100%' }}>№</div>
            <div style={{ flex: 1, textAlign: 'center', position: 'relative' }}><span>Action</span>
              {/* <span style={{ fontSize: '16px', marginRight: '10px', fontWeight:'normal' }}>Sort: </span> */}
              <Button
                icon={filterType === 'AZ' ? <SortAscendingOutlined /> : <SortDescendingOutlined />}
                onClick={() => { toggleFilterType('action', setFilterType); setSortType('action') }}
                style={{ position: 'absolute', right: '10px', top: '1px' }}
              >
                {''}
              </Button>
            </div>
            <div style={{ width: '200px', textAlign: 'center', borderLeft: '1px solid #ccc', boxSizing: 'border-box', height: '100%', position: 'relative' }}><span>Created at</span>
              <Button
                icon={filterType === 'newerDate' ? <ArrowUpOutlined /> : <ArrowDownOutlined />}
                onClick={() => { toggleFilterType('date', setFilterType); setSortType('date') }}
                style={{ position: 'absolute', right: '10px', top: '1px' }}
              >
                {''}
              </Button>
            </div>
          </div>
        )}
        {chatLogsResult.map((item) => (
          layout === 'vertical' ? (
            <Comment
              key={item.index}
              author={<b>
                <Highlighter
                  searchWords={[searchText]}
                  textToHighlight={date(item.created_at).full}
                  highlightStyle={{ color: 'red', fontWeight: 'bold', padding: '0' }}
                /></b>}
              avatar={
                <Avatar
                  style={{
                    marginTop: '6px',
                    fontSize: '16px',
                    fontWeight: 'bold',
                  }}
                >
                  {item.id + 1}
                </Avatar>
              }
              content={<p>
                <Highlighter
                  searchWords={[searchText]}
                  textToHighlight={item.action}
                  highlightStyle={{ color: 'red', fontWeight: 'bold', padding: '0' }}
                /></p>}
            />
          ) : (
            <div style={{ display: 'flex', justifyContent: 'space-between', borderBottom: '1px solid #ccc', borderLeft: '1px solid #ccc', borderRight: '1px solid #ccc', lineHeight: '35px' }} key={item.id}>
              <div style={{ width: '30px', textAlign: 'center', borderRight: '1px solid #ccc', boxSizing: 'border-box', height: '100%' }}>{item.id + 1}</div>
              <div style={{ flex: 1, textAlign: 'center' }}>
                <Highlighter
                  searchWords={[searchText]}
                  textToHighlight={item.action}
                  highlightStyle={{ color: 'red', fontWeight: 'bold', padding: '0' }}
                />
              </div>
              <div style={{ width: '200px', textAlign: 'center', borderLeft: '1px solid #ccc', boxSizing: 'border-box', height: '100%' }}>
                <Highlighter
                  searchWords={[searchText]}
                  textToHighlight={date(item.created_at).full}
                  highlightStyle={{ color: 'red', fontWeight: 'bold', padding: '0' }}
                />
              </div>
            </div>
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

      {/* Modal */}
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
                icon={layout === 'horizontal' ? <TableOutlined /> : <UnorderedListOutlined />}
                onClick={toggleView}
              >
                {''}
              </Button>
            </div>
          </div>

          <div style={{ height: '100%', display: 'flex', alignItems: 'center', gap: '10px', marginTop: '15px' }}>
            <span style={{ fontSize: '16px' }}>Sort: </span>
            <div style={{ display: 'flex', gap: '5px', fontSize: '16px', alignItems: 'center', paddingRight: '10px', borderRight: '1px solid #e5e5e5' }}>
              <div >Action</div>
              <Button
                icon={filterType === 'AZ' ? <ArrowDownOutlined /> : <ArrowUpOutlined />}
                onClick={() => { toggleFilterType('action'); setSortType('action') }}
              >
                {''}
              </Button>
            </div>
            <div style={{ display: 'flex', gap: '5px', fontSize: '16px', alignItems: 'center' }}>
              <div>Date</div>
              <Button
                icon={filterType === 'newerDate' ? <ArrowUpOutlined /> : <ArrowDownOutlined />}
                onClick={() => { toggleFilterType('date'); setSortType('date') }}
              >
                {''}
              </Button>
            </div>
          </div>
        </div>
      </Modal>


    </>

  )

}
