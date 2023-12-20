import { useState, useEffect } from "react";
import { Comment, Avatar, Button, Pagination, Input, Modal } from "antd";
import { UnorderedListOutlined, TableOutlined, SearchOutlined, SortDescendingOutlined, SortAscendingOutlined, MenuOutlined, ArrowUpOutlined, ArrowDownOutlined } from '@ant-design/icons';
import { useChatViewContext } from "../ChatViewContext";
import Highlighter from 'react-highlight-words';
import date from "../../../utils/date";
import 'antd/dist/antd.css';

export default function ChatLogs() {

  const { chatInfo } = useChatViewContext();
  const [layoutLog, setLayoutLog] = useState("vertical");
  const [currentPage, setCurrentPage] = useState(1);
  const [searchText, setSearchText] = useState("");
  const [searching, setSearching] = useState(false);
  const [inputValue, setInputValue] = useState("");
  const [filterType, setFilterType] = useState('AZ');
  const [clientWidth, setClientWidth] = useState(window.innerWidth);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [sortType, setSortType] = useState('id');

  const chatLogs = chatInfo?.chatLogs.map((item, index) => ({ ...item, id: index })) || [];

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

      setLayoutLog('horizontal');
    } else {
      setLayoutLog('vertical');
    }
  }, [clientWidth]);


  const pageSize = 5;
  // const startIndex = (currentPage - 1) * pageSize;
  // const totalFilteredLogs = chatInfo?.chatLogs.filter(item => date(item.created_at).full.toLowerCase().includes(searchText.toLowerCase())).length || 0;
  const totalFilteredLogs = chatLogs.filter(item => date(item.created_at).full.toLowerCase().includes(searchText.toLowerCase())).length || 0;

  // Change pagination page
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

  const toggleView = () => {
    setLayoutLog((prevView) => (prevView === 'horizontal' ? 'vertical' : 'horizontal'));
  }

  const toggleFilterType = (type) => {
    if (type === 'action') {
      setFilterType((prevFilterType) => (prevFilterType === 'AZ' ? 'ZA' : 'AZ'));
    } else if (type === 'date') {
      setFilterType((prevFilterType) => (prevFilterType === 'newerDate' ? 'olderDate' : 'newerDate'));
    }

  };

  // Sorting by alphabet
  const handleFilter = () => {
    let sortedLogs;
    if(sortType === 'id'){
      sortedLogs = getVisibleLogs().slice().sort((a,b)=> a.id - b.id);
    }

    if (sortType === 'action') {
      sortedLogs = getVisibleLogs().slice().sort((a, b) => a.action.localeCompare(b.action));
      if (filterType === 'AZ') {

        sortedLogs.reverse();
        return sortedLogs;
      } else if (filterType === 'ZA') {
        return sortedLogs;
      }
      setCurrentPage(1);
    } else if (sortType === 'date') {
      sortedLogs = getVisibleLogs().slice().sort((a, b) => date(a.created_at).full - date(b.created_at).full);
      if (filterType === 'olderDate') {

        return sortedLogs;
      } else if (filterType === 'newerDate') {

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


  // Display filtered logs on one page
  const getVisibleLogs = () => {
    const startIndex = (currentPage - 1) * pageSize;
    const endIndex = startIndex + pageSize;
    const filteredLogs = chatLogs.filter(item => (
      date(item.created_at).full.toLowerCase().includes(searchText.toLowerCase()) ||
      item.action.toLowerCase().includes(searchText.toLowerCase())
    )) || [];
    return filteredLogs.slice(startIndex, endIndex) || [];

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

          <div style={{ display: 'flex', flexDirection: 'row', alignItems: 'center', gap: '30px' }}>
            {layoutLog === 'vertical' && (
              <div style={{  borderRight: '1px solid #e5e5e5', height: '100%', display: 'flex', alignItems: 'center',gap:'10px' }}>
                
                <div style={{ display: 'flex', gap: '5px', fontSize: '16px', alignItems: 'center', paddingRight:'10px'  }}>
                  <div >Sort by action</div>
                  <Button
                    icon={filterType === 'AZ' ? <SortAscendingOutlined /> : <SortDescendingOutlined />}
                    onClick={() => { toggleFilterType('action'), setSortType('action') }}
                  >
                    {''}
                  </Button>
                </div>
                <div style={{ display: 'flex', gap: '5px', fontSize: '16px', alignItems: 'center',paddingRight:'10px',borderRight: '1px solid #e5e5e5' }}>
                  <div>Sort by date</div>
                  <Button
                    icon={filterType === 'newerDate' ? <ArrowUpOutlined /> : <ArrowDownOutlined />}
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
                icon={layoutLog === 'horizontal' ? <UnorderedListOutlined /> : <TableOutlined />}
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
        {layoutLog === 'horizontal' && (
          <div style={{
            display: 'flex', justifyContent: 'space-between', background: '#f0f0f0', borderBottom: '1px solid #ccc', fontWeight: 'bold', borderLeft: '1px solid #ccc',
            borderRight: '1px solid #ccc', lineHeight: '35px'
          }}>
            <div style={{ width: '30px', textAlign: 'center', borderRight: '1px solid #ccc', boxSizing: 'border-box', height: '100%' }}>№</div>
            <div style={{ flex: 1, textAlign: 'center', position: 'relative' }}><span>Action</span>
              {/* <span style={{ fontSize: '16px', marginRight: '10px', fontWeight:'normal' }}>Sort: </span> */}
              <Button
                icon={filterType === 'AZ' ? <SortAscendingOutlined /> : <SortDescendingOutlined />}
                onClick={() => { toggleFilterType('action'), setSortType('action') }}
                style={{ position: 'absolute', right: '10px', top: '1px' }}
              >
                {''}
              </Button>
            </div>
            <div style={{ width: '200px', textAlign: 'center', borderLeft: '1px solid #ccc', boxSizing: 'border-box', height: '100%', position: 'relative' }}><span>Created at</span>
              <Button
                icon={filterType === 'newerDate' ? <ArrowUpOutlined /> : <ArrowDownOutlined />}
                onClick={() => { toggleFilterType('date'), setSortType('date') }}
                style={{ position: 'absolute', right: '10px', top: '1px' }}
              >
                {''}
              </Button>
            </div>
          </div>
        )}

        {/* Отобразить элементы без лейблов */}
        {handleFilter().map((item, index) => (
          layoutLog === 'vertical' ? (
            <Comment
              key={index}
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
            <div style={{ display: 'flex', justifyContent: 'space-between', borderBottom: '1px solid #ccc', borderLeft: '1px solid #ccc', borderRight: '1px solid #ccc', lineHeight: '35px' }} key={index}>
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
        {chatInfo?.chatLogs.length > pageSize && (
          <Pagination
            current={currentPage}
            pageSize={pageSize}
            total={totalFilteredLogs}
            onChange={handleChangePage}
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
                icon={layoutLog === 'horizontal' ? <TableOutlined /> : <UnorderedListOutlined />}
                onClick={toggleView}
              >
                {''}
              </Button>
            </div>
          </div>

          <div style={{  height: '100%', display: 'flex', alignItems: 'center',gap:'10px', marginTop:'15px' }}>
                <span style={{ fontSize: '16px' }}>Sort: </span>
                <div style={{ display: 'flex', gap: '5px', fontSize: '16px', alignItems: 'center', paddingRight:'10px',borderRight: '1px solid #e5e5e5'  }}>
                  <div >Action</div>
                  <Button
                    icon={filterType === 'AZ' ? <ArrowDownOutlined /> : <ArrowUpOutlined />}
                    onClick={() => { toggleFilterType('action'), setSortType('action') }}
                  >
                    {''}
                  </Button>
                </div>
                <div style={{ display: 'flex', gap: '5px', fontSize: '16px', alignItems: 'center' }}>
                  <div>Date</div>
                  <Button
                    icon={filterType === 'newerDate' ? <ArrowUpOutlined /> : <ArrowDownOutlined />}
                    onClick={() => { toggleFilterType('date'), setSortType('date') }}
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






















// import 'antd/dist/antd.css';
// import { useState, useEffect } from "react";
// import { Descriptions, Comment, Avatar, Button, Pagination, Input, Modal } from "antd";

// export default function ChatLogs() {
//   const [currentPage, setCurrentPage] = useState(1);
//   const pageSize = 5;
//   const startIndex = (currentPage - 1) * pageSize;
//   const array = Array.from({ length: 100 }, (_, index) => index + 1);
//   const handleChangePage = (page) => {
//     setCurrentPage(page);
//     window.scrollTo({ top: 0, behavior: 'smooth' });
//   };

//   const getVisibleLogs = () => {
//     const startIndex = (currentPage - 1) * pageSize;
//     const endIndex = startIndex + pageSize;
//     return array.slice(startIndex, endIndex) || [];
//   };


//   return(

//     <>
//     {
//   getVisibleLogs().map((item, index) => (
//     <div style={{ marginBottom: '45px' }} key={index}>
//       <Descriptions key={index} bordered size="small" layout="horizontal" column={1} labelStyle={{ width: 180 }}>

//         <Descriptions.Item label="Action">{item}</Descriptions.Item>
//         <Descriptions.Item label="Created at">{`asdasdasd`}</Descriptions.Item>

//       </Descriptions>
//     </div>
//   ))
// }
// {array.length > pageSize && (
//   <Pagination
//     current={currentPage}
//     pageSize={pageSize}
//     total={array.length}
//     onChange={handleChangePage}
//     showSizeChanger={false}
//   />
// )}</>
//   )
// }

