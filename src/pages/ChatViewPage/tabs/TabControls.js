import React from 'react';
import { Input, Button } from 'antd';
import { SearchOutlined, UnorderedListOutlined, TableOutlined } from '@ant-design/icons';
import PropTypes from 'prop-types';



const TabControls = ({
    setSearchText,
    layout,
    toggleView,
    filterButtons,
    toggleFilterType,
    setSortType,
    setFilterType,
    handleKeyDown
}) => {

    return (
        <div style={{ display: 'flex', justifyContent: 'start', gap: '15px', borderBottom: '1px solid #e5e5e5', paddingBottom: '15px' }}>
            <div style={{ display: 'flex', width: '50%', alignItems: 'center', paddingRight: '10px', borderRight: '1px solid #e5e5e5' }}>
                <span style={{ fontSize: '16px', marginRight: '10px' }}> Filtering: </span>
                <Input
                    placeholder="Enter date or action"
                    onKeyDown={handleKeyDown}
                    prefix={<SearchOutlined />}
                    onInput={(e) => {
                        setSearchText(e.target.value);
                    }}
                    style={{ width: '100%' }}
                />
            </div>
            <div style={{ display: 'flex', flexDirection: 'row', alignItems: 'center', gap: '15px' }}>
                {layout === 'vertical' && (
                    filterButtons.map((button, index) => (
                        <div key={button.id} style={{ borderRight: index < filterButtons.length - 1 ? '1px solid #e5e5e5' : 'none', height: '100%', display: 'flex', alignItems: 'center', gap: '10px' }}>
                            <div style={{ display: 'flex', gap: '5px', fontSize: '16px', alignItems: 'center', paddingRight: '10px' }}>
                                <div>{button.title}</div>
                                <Button
                                    icon={button.icon}
                                    onClick={() => { toggleFilterType(button.type, setFilterType); setSortType(button.type) }}
                                >
                                    {''}
                                </Button>
                            </div>
                        </div>
                    )))}
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
    );
};

TabControls.propTypes = {
    setSearchText: PropTypes.func.isRequired,
    handleKeyDown: PropTypes.func.isRequired,
    layout: PropTypes.string.isRequired,
    toggleView: PropTypes.func.isRequired,
    filterButtons: PropTypes.arrayOf(PropTypes.shape({
        title: PropTypes.string.isRequired,
        type: PropTypes.string.isRequired,
        icon: PropTypes.node.isRequired,
    })).isRequired,
    toggleFilterType: PropTypes.func.isRequired,
    setSortType: PropTypes.func.isRequired,
    setFilterType: PropTypes.func.isRequired,
};

export default TabControls;
