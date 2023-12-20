import { React, useState, useEffect } from "react";
import { Button, Space, Comment, Avatar, Input, Pagination, Modal } from "antd";
import Highlighter from 'react-highlight-words';
import { UnorderedListOutlined, TableOutlined, SearchOutlined, ArrowDownOutlined, ArrowUpOutlined, MenuOutlined,SortDescendingOutlined, SortAscendingOutlined,} from '@ant-design/icons';
import { useChatViewContext } from "../ChatViewContext";
import date from "../../../utils/date";
import { keyboard } from "@testing-library/user-event/dist/keyboard";


export default function TransactionTab() {
  const { chatInfo } = useChatViewContext();
  const [clientWidth, setClientWidth] = useState(window.innerWidth);
  const [layoutTransaction, setLayoutTransaction] = useState("horizontal");
  const [searchText, setSearchText] = useState("");
  const [searching, setSearching] = useState(false);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [inputValue, setInputValue] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [filterType, setFilterType] = useState('olderDate');
  const [sortType, setSortType] = useState('date');

  const transactions = chatInfo?.transactions.map((item, index) => ({ ...item, id: index })) || [];


  useEffect(() => {
    const handleResize = () => {
      setClientWidth(window.innerWidth);
    };
    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  useEffect(() => {

    if (clientWidth > 600) {

      setLayoutTransaction('horizontal');
    } else {
      setLayoutTransaction('vertical');
    }
  }, [clientWidth]);

  const toggleView = () => {
    setLayoutTransaction((prevView) => (prevView === 'horizontal' ? 'vertical' : 'horizontal'));
  }

  const pageSize = 5;
  const totalFilteredTransactions = transactions.filter(item => date(item.created_at).full.toLowerCase().includes(searchText.toLowerCase())).length || 0;

  const toggleFilterType = (type) => {
    if (type === 'amount') {
      setFilterType((prevFilterType) => (prevFilterType === 'big' ? 'small' : 'big'));
    } else if (type === 'date') {
      setFilterType((prevFilterType) => (prevFilterType === 'newerDate' ? 'olderDate' : 'newerDate'));
    }

  };

  const handleChangePage = (page) => {
    setCurrentPage(page);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };
  const handleSearch = () => {
    setCurrentPage(1);
    setSearching(true);
    setSearchText(inputValue);
  };

  useEffect(() => {
    if (searching) {
      setSearching(false);
    }
  }, [searchText, searching]);

  const handleKeyDown = (e) => {
    if (e.key === 'Enter') {
      handleSearch();
      setIsModalVisible(false);
    } else if (e.key === 'Escape') {
      setSearchText('');
      setInputValue('');
      setSearching(false);
      handleChangePage(1);
      e.preventDefault();
    }
  };


  const handleFilter = () => {
    let sortedLogs;

    if (sortType === 'amount') {
      sortedLogs = getVisibleLogs().slice().sort((a, b) => Number(a.amount) - Number(b.amount));
      if (filterType === 'small') {

        sortedLogs.reverse();
        return sortedLogs;
      } else if (filterType === 'big') {
        return sortedLogs;
      }
      setCurrentPage(1);
    } else if (sortType === 'date') {
      sortedLogs = getVisibleLogs().slice().sort((a, b) => date(a.created_at).full - date(b.created_at).full);
      if (filterType === 'newerDate') {

        return sortedLogs;
      } else if (filterType === 'olderDate') {

        sortedLogs.reverse();
        return sortedLogs;
      }
      setCurrentPage(1);
    }


    return sortedLogs;

  };
  useEffect(() => {
    handleFilter();
  }, [filterType]);


  const getVisibleLogs = () => {
    const startIndex = (currentPage - 1) * pageSize;
    const endIndex = startIndex + pageSize;
    const filteredTransactions = transactions.filter(item => (
      date(item.created_at).full.toLowerCase().includes(searchText.toLowerCase()) ||
      String(item.user_id).toLowerCase().includes(searchText.toLowerCase()) ||
      item.amount.toLowerCase().includes(searchText.toLowerCase())
    )) || [];
    return filteredTransactions.slice(startIndex, endIndex) || [];

  };

  // Open modal
  const showModal = () => {
    setIsModalVisible(true);
  }

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
          <div style={{ display: 'flex', flexDirection: 'row', alignItems: 'center', gap: '15px' }}>
            {layoutTransaction === 'vertical' && (
              <div style={{ borderRight: '1px solid #e5e5e5', height: '100%', display: 'flex', alignItems: 'center', gap: '10px' }}>
                
                <div style={{ display: 'flex', gap: '5px', fontSize: '16px', alignItems: 'center', paddingRight: '10px' }}>
                  <div >Sort by amount</div>
                  <Button
                    icon={filterType === 'big' ? <ArrowUpOutlined /> : <ArrowDownOutlined />}
                    onClick={() => { toggleFilterType('amount'), setSortType('amount') }}
                  >
                    {''}
                  </Button>
                </div>
                <div style={{ display: 'none', gap: '5px', fontSize: '16px', alignItems: 'center', paddingRight: '10px', borderRight: '1px solid #e5e5e5' }}>
                  <div>Sort by date</div>
                  <Button
                    icon={filterType === 'olderDate' ? <ArrowDownOutlined /> : <ArrowUpOutlined />}
                    onClick={() => { toggleFilterType('date'), setSortType('date') }}
                  >
                    {''}
                  </Button>
                </div>
              </div>
            )}

            <div style={{ paddingRight: '10px', height: '100%', display: 'flex', alignItems: 'center' }}>
              <span style={{ fontSize: '16px', marginRight: '10px' }}>View: </span>
              <Button
                icon={layoutTransaction === 'horizontal' ? <UnorderedListOutlined /> : <TableOutlined />}
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
      )}

      {layoutTransaction === 'horizontal' && (
        <div style={{
          display: 'flex', justifyContent: 'space-between', background: '#f0f0f0', borderBottom: '1px solid #ccc', fontWeight: 'bold', borderLeft: '1px solid #ccc',
          borderRight: '1px solid #ccc', lineHeight: '35px'
        }}>
          <div style={{ width: '80px', textAlign: 'center' }}> <span>ID</span></div>
          <div style={{ width: '300px', textAlign: 'center', position: 'relative', borderLeft: '1px solid #ccc' }}>
            <div>Amount</div>
            <Button
              icon={filterType === 'big' ? <ArrowUpOutlined /> : <ArrowDownOutlined />}
              onClick={() => { toggleFilterType('amount'), setSortType('amount') }}
              style={{ position: 'absolute', top: '1px', right: '10px' }}
            >
              {''}
            </Button>
          </div>
          <div style={{ width: '70px', textAlign: 'center', borderLeft: '1px solid #ccc', boxSizing: 'border-box', height: '100%', position: 'relative' }}><span>Currency </span>
          </div>
          <div style={{ width: '200px', flex: 1, textAlign: 'center', borderLeft: '1px solid #ccc', boxSizing: 'border-box', height: '100%', position: 'relative' }}><span>Promocode </span>
          </div>
          <div style={{ width: '70px', textAlign: 'center', borderLeft: '1px solid #ccc', boxSizing: 'border-box', height: '100%', position: 'relative' }}><span>Status </span>
          </div>
          <div style={{ width: '300px', textAlign: 'center', borderLeft: '1px solid #ccc', boxSizing: 'border-box', height: '100%', position: 'relative' }}>
            <span>Created at</span>
            <Button
              icon={filterType === 'olderDate' ?   <ArrowDownOutlined /> : <ArrowUpOutlined />}
              onClick={() => { toggleFilterType('date'), setSortType('date') }}
              style={{ position: 'absolute', top: '1px', right: '10px', display:'none' }}
            >
              {''}
            </Button>
          </div>
        </div>
      )}
      {
        handleFilter().map((item, index) => (
          layoutTransaction === "horizontal" ? (
            <div style={{ display: 'flex', justifyContent: 'space-between', borderBottom: '1px solid #ccc', borderLeft: '1px solid #ccc', borderRight: '1px solid #ccc', lineHeight: '35px' }} key={index}>
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
            <Comment
              key={index}
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
                  textToHighlight={`${item.amount} ${item.currency}, ${item.status}, ${item.promocode || '----'}`}
                  highlightStyle={{ color: 'red', fontWeight: 'bold', padding: '0' }}
                />
              </p>}
              author={<b>
                <Highlighter
                  searchWords={[searchText]}
                  textToHighlight={date(item.created_at).full}
                  highlightStyle={{ color: 'red', fontWeight: 'bold', padding: '0' }}
                />
              </b>}
            />
          )
        ))}
      {chatInfo?.transactions.length > pageSize && (
        <Pagination
          current={currentPage}
          pageSize={pageSize}
          total={totalFilteredTransactions}
          onChange={handleChangePage}
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
                icon={layoutTransaction === 'horizontal' ? <UnorderedListOutlined /> : <TableOutlined />}
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
                onClick={() => { toggleFilterType('amount'), setSortType('amount') }}
              >
                {''}
              </Button>
            </div>
            <div style={{ display: 'flex', gap: '5px', fontSize: '16px', alignItems: 'center' }}>
              <div>Date</div>
              <Button
                icon={filterType === 'olderDate' ?  <ArrowDownOutlined /> : <ArrowUpOutlined /> }
                onClick={() => { toggleFilterType('date'), setSortType('date') }}
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