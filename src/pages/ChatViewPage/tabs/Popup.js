import React from 'react';
import { Modal, Input, Button } from 'antd';
import { SearchOutlined, UnorderedListOutlined, TableOutlined } from '@ant-design/icons';
import PropTypes from 'prop-types';

const Popup = ({
    renderFilterButtons,
    isModalVisible,
    handleKeyDown,
    inputValue,
    layout,
    toggleView,
    setFilterType,
    setIsModalVisible,
    handleSearch,
    setInputValue,
    filterButtons,
    toggleFilterType,
    setSortType
}) => {
    return (
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
                        <Button icon={<SearchOutlined />} onClick={() => { handleSearch(); setIsModalVisible(false) }}>
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
                    {renderFilterButtons(filterButtons, toggleFilterType, setFilterType, setSortType)}
                </div>
            </div>
        </Modal>
    );
};

Popup.propTypes = {
    renderFilterButtons: PropTypes.func.isRequired,
    isModalVisible: PropTypes.func.isRequired,
    setIsModalVisible: PropTypes.func.isRequired,
    handleSearch: PropTypes.func.isRequired,
    handleKeyDown: PropTypes.func.isRequired,
    inputValue: PropTypes.string.isRequired,
    setInputValue: PropTypes.func.isRequired,
    layout: PropTypes.string.isRequired,
    filterButtons: PropTypes.arrayOf(PropTypes.shape({
        title: PropTypes.string.isRequired,
        type: PropTypes.string.isRequired,
        icon: PropTypes.node.isRequired,
    })).isRequired,
    toggleView: PropTypes.func.isRequired,
    toggleFilterType: PropTypes.func.isRequired,
    setSortType: PropTypes.func.isRequired,
    setFilterType: PropTypes.func.isRequired,
};
export default Popup;
