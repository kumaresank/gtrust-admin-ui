import { useState, useEffect } from 'react';
import './App.css';
import Pagination from './components/Pagination';
import Table from './components/Table/Table';

function App() {
    const [members, setMembers] = useState([]);
    const [currentItems, setCurrentItems] = useState([]);
    const [page, setPage] = useState(1);
    const [pageCount, setPageCount] = useState(0);
    const [isCheckAll, setIsCheckAll] = useState(false);
    const [isCheck, setIsCheck] = useState([]);
    const [editItem, setEditItem] = useState(-1);
    const [activeItem, setActiveItem] = useState({});
    const pageSize = 10;

    const fetchMembers = () => {
        fetch(
            'https://geektrust.s3-ap-southeast-1.amazonaws.com/adminui-problem/members.json'
        )
            .then((response) => response.json())
            .then((data) => {
                setMembers(data);
                calculatePageCount(data);
            });
    };

    const calculatePageCount = (data) => {
        const count = Math.ceil(data.length / pageSize);
        setPageCount(count);
    };

    const onPageChange = () => {
        const items = [...members].splice((page - 1) * pageSize, pageSize);
        setCurrentItems(items);
    };

    const onSearch = (search) => {
        const items = [...members];
        const res = items.filter((obj) =>
            Object.values(obj).some((val) =>
                val.toLowerCase().includes(search.toLowerCase())
            )
        );
        calculatePageCount(res);
        setPage(1);
        const filter = [...res].splice(0, pageSize);
        setCurrentItems(filter);
    };

    const onEdit = (id) => {
        setEditItem(id);
    };

    const onDelete = (member) => {
        const items = [...currentItems];
        const index = items.indexOf(member);
        items.splice(index, 1);
        setCurrentItems(items);
    };

    const onSelectAll = (e) => {
        setIsCheckAll(!isCheckAll);
        setIsCheck(currentItems.map((item) => item.id));
        if (isCheckAll) {
            setIsCheck([]);
        }
    };

    const handleClick = (e) => {
        const { id, checked } = e.target;
        setIsCheck([...isCheck, id]);
        if (!checked) {
            setIsCheck(isCheck.filter((item) => item !== id));
        }
    };

    const onDeleteSelected = () => {
        const items = [...currentItems];
        isCheck.forEach((check) => {
            const index = items
                .map(function (e) {
                    return e.id;
                })
                .indexOf(check);
            items.splice(index, 1);
        });
        setCurrentItems(items);
    };

    const onItemEdit = (field, id, value) => {
        const items = [...currentItems];
        const index = items
            .map(function (e) {
                return e.id;
            })
            .indexOf(id);
        let item = items[index];
        item[field] = value;
        setActiveItem(item);
    };

    const onSave = (id) => {
        const items = [...currentItems];
        const index = items
            .map(function (e) {
                return e.id;
            })
            .indexOf(id);
        items[index] = activeItem;
        setCurrentItems(items);
        setEditItem(-1);
    };

    useEffect(() => {
        fetchMembers();
    }, []);

    useEffect(() => {
        onPageChange();
    }, [page, members]);

    return (
        <div className='App'>
            <div className='table-container'>
                <div className='search-container'>
                    <input
                        type='text'
                        onChange={(e) => onSearch(e.target.value)}
                        placeholder='Search by name,email or role'
                    />
                </div>
                <Table
                    onSelectAll={onSelectAll}
                    isCheckAll={isCheckAll}
                    currentItems={currentItems}
                    handleClick={handleClick}
                    isCheck={isCheck}
                    onEdit={onEdit}
                    onDelete={onDelete}
                    editItem={editItem}
                    onItemEdit={onItemEdit}
                    onSave={onSave}
                />
            </div>
            {pageCount > 0 && (
                <Pagination
                    setPage={setPage}
                    onDeleteSelected={onDeleteSelected}
                    page={page}
                    pageCount={pageCount}
                />
            )}
        </div>
    );
}

export default App;
