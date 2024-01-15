import React from 'react';
import { Input, Button } from 'antd';
import { FilterOutlined, UnorderedListOutlined, TableOutlined, QuestionCircleOutlined,DeleteOutlined } from '@ant-design/icons';
import PropTypes from 'prop-types';
import 'react-tooltip/dist/react-tooltip.css';
import { Tooltip } from 'react-tooltip';


const TabControls = ({
    renderFilterButtons,
    setSearchText,
    layout,
    toggleView,
    filterButtons,
    toggleFilterType,
    setSortType,
    setFilterType,
    handleKeyDown,
    searchText,
    prop
}) => {

    return (
        <div style={{ display: 'flex', justifyContent: 'start', gap: '15px', borderBottom: '1px solid #e5e5e5', paddingBottom: '15px' }}>
            <div style={{ display: 'flex', width: '50%', alignItems: 'center', paddingRight: '10px', borderRight: '1px solid #e5e5e5' }}>
                <div style={{ display: 'flex', gap: '5px', alignItems: 'center', marginRight:'10px' }}>
                    <div style={{ fontSize: '16px'}}> Filter: </div>
                    <div style={{ display: 'flex', alignItems: 'center', cursor: 'pointer' }} data-tooltip-id="my-tooltip" data-tooltip-content={`Filter by ${prop}`}><QuestionCircleOutlined /></div>

                </div>

                <Input
                    placeholder=""
                    value={searchText}
                    onKeyDown={handleKeyDown}
                    prefix={<FilterOutlined />}
                    onInput={(e) => {
                        setSearchText(e.target.value);
                    }}
                    suffix={
                        <Button
                          style={{ width: '24px', height: '24px' }}
                          onClick={() => { setSearchText(''); }}
                          icon={<DeleteOutlined />}
                        >{''}
                        </Button>
                      }
                    style={{ width: '100%' }}
                />
            </div>
            <div style={{ display: 'flex', flexDirection: 'row', alignItems: 'center', gap: '15px' }}>
                {layout === 'vertical' && (
                    renderFilterButtons(filterButtons, toggleFilterType, setFilterType, setSortType)
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
            <Tooltip
                id="my-tooltip"
                style={{ backgroundColor: "#e0dede", color: 'black' }}
                place={'top-end'}
            />
        </div>
    );
};

TabControls.propTypes = {
    renderFilterButtons: PropTypes.func.isRequired,
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
    searchText:PropTypes.string.isRequired,
    prop: PropTypes.string.isRequired
};

export default TabControls;
