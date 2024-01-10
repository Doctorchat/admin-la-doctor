import { useState, useEffect } from "react";
import date from "../../../utils/date";
import { Button } from "antd";

export const useFunctions = () => {
    const pageSize = 5;
    const [clientWidth, setClientWidth] = useState(window.innerWidth);
    const [layout, setLayout] = useState("vertical");
    const [searching, setSearching] = useState(false);
    const [searchText, setSearchText] = useState("");
    const [currentPage, setCurrentPage] = useState(1);
    const [inputValue, setInputValue] = useState("");
    const [isModalVisible, setIsModalVisible] = useState(false);
    const [filterType, setFilterType] = useState('olderDate');
    const [sortType, setSortType] = useState('date')


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

            setLayout('horizontal');
        } else {
            setLayout('vertical');
        }
    }, [clientWidth]);


    const toggleView = () => {
        setLayout((prevView) => (prevView === 'horizontal' ? 'vertical' : 'horizontal'));
    }


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

    const getVisibleItems = (items, searchText, currentPage, pageSize, filterFunction) => {
        const startIndex = (currentPage - 1) * pageSize;
        const endIndex = startIndex + pageSize;
      
        const filteredItems = items.filter(filterFunction);
      
        return filteredItems.slice(startIndex, endIndex);
    };

    const toggleFilterType = (type, setFilterType) => {
        const filterTypes = {
            'action': ['AZ', 'ZA'],
            'date': ['newerDate', 'olderDate'],
            'amount': ['big', 'small']

        };

        setFilterType((prevFilterType) => {
            const [firstValue, secondValue] = filterTypes[type];
            return prevFilterType === firstValue ? secondValue : firstValue;
        });
    };

    const handleFilter = (data, filterConditions) => {
        let sortedLogs;

        sortedLogs = getVisibleItems(
            data,
            searchText,
            currentPage,
            pageSize,
            filterConditions
        );

        if (sortType === 'id') {
            sortedLogs.sort((a, b) => a.id - b.id);
        } else if (sortType === 'action') {
            sortedLogs.sort((a, b) => a.action.localeCompare(b.action));
            if (filterType === 'ZA') {
                sortedLogs.reverse();
            }
        } else if (sortType === 'date') {
            sortedLogs.sort((a, b) => date(a.created_at).full - date(b.created_at).full);
            if (filterType === 'newerDate') {
                sortedLogs.reverse();
            }
        } else if (sortType === 'amount') {
            sortedLogs.sort((a, b) => Number(a.amount) - Number(b.amount));
            if (filterType === 'small') {
                sortedLogs.reverse();
            }
        }
        console.log('Sorted Logs:', sortedLogs);
        return sortedLogs;
    };

    const showModal = () => {
        setIsModalVisible(true);
    }

    const renderFilterButtons = (filterButtons, toggleFilterType, setFilterType, setSortType) => {
        return filterButtons.map((button, index) => (
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
        ));
    };

    return {
        renderFilterButtons,
        toggleView,
        pageSize,
        clientWidth,
        setClientWidth,
        layout,
        setLayout,
        searching,
        setSearching,
        searchText,
        setSearchText,
        currentPage,
        setCurrentPage,
        inputValue,
        setInputValue,
        isModalVisible,
        setIsModalVisible,
        handleChangePage,
        handleSearch,
        handleKeyDown,
        getVisibleItems,
        filterType,
        setFilterType,
        sortType,
        setSortType,
        toggleFilterType,
        handleFilter,
        showModal
    }

}






