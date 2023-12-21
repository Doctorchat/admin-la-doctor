import { useState, useEffect } from "react";


export const useFunctions = () => {
    const [searching, setSearching] = useState(false);
    const [searchText, setSearchText] = useState("");
    const [currentPage, setCurrentPage] = useState(1);
    const [inputValue, setInputValue] = useState("");
    const [isModalVisible, setIsModalVisible] = useState(false);
    


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

    return {
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
        handleKeyDown
    }

}






