import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { fetchUsers } from '../../../actions/Admin';
import './AllUsers.css';

const UserList = () => {
    const dispatch = useDispatch();
    const users = useSelector((state) => state.allUsers.users);
    const { userInfo } = useSelector((state) => state.userSignin);

    useEffect(() => {
        dispatch(fetchUsers());
    }, [dispatch]);

    const [searchTerm, setSearchTerm] = useState('');
    const [selectedType, setSelectedType] = useState('');
    const [updatedType, setUpdatedType] = useState('');

    const handleSearchTermChange = (event) => {
        setSearchTerm(event.target.value);
    };


    const handleTypeChange = (event) => {
        setSelectedType(event.target.value);
    };

    const handleUpdatedTypeChange = (event) => {
        setUpdatedType(event.target.value);
    };

    const handleUpdateUserType = (userId) => {
        fetch(`/api/users/${userId}/type`, {
            method: 'PATCH',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                type: updatedType
            })
        })
            .then((res) => res.json())
            .then((data) => {
                // Cập nhật danh sách người dùng
                dispatch(fetchUsers());
                // Đặt lại giá trị của updatedType state
                setUpdatedType('');
            })
            .catch((error) => {
                console.error(error);
            });
    };


    const filteredUsers = users.filter((user) => {
        return (
            user._id?.toLowerCase().includes(searchTerm.toLowerCase()) ||
            user.name?.toLowerCase().includes(searchTerm.toLowerCase()) ||
            user.email?.toLowerCase().includes(searchTerm.toLowerCase()) ||
            user.phone?.toLowerCase().includes(searchTerm.toLowerCase())
        ) && (!selectedType || user.type === selectedType);
    });

    return (
        <div className="user-list">
            <div className="user-list__search">
                <input
                    type="text"
                    className="user-list__search-input"
                    placeholder="Search by Id, Name, Email or Phone"
                    value={searchTerm}
                    onChange={handleSearchTermChange}
                />
                <select
                    className="user-list__search-select"
                    value={selectedType}
                    onChange={handleTypeChange}
                >
                    <option value="">All Types</option>
                    <option value="admin">Admin</option>
                    <option value="seller">Seller</option>
                    <option value="user">User</option>
                </select>
            </div>
            <table className="user-list__table">
                <thead className="user-list__table-head">
                    <tr>
                        <th className="user-list__table-head-cell">id</th>
                        <th className="user-list__table-head-cell">Name</th>
                        <th className="user-list__table-head-cell">Email</th>
                        <th className="user-list__table-head-cell">Address</th>
                        <th className="user-list__table-head-cell">Phone</th>
                        <th className="user-list__table-head-cell">Type</th>
                        <th className="user-list__table-head-cell">Change type</th>
                    </tr>
                </thead>
                <tbody className="user-list__table-body">
                    {filteredUsers.map((user) => (
                        <tr className="user-list__table-row" key={user._id}>
                            <td className="user-list__table-cell">{user._id}</td>
                            <td className="user-list__table-cell">{user.name}</td>
                            <td className="user-list__table-cell">{user.email}</td>
                            <td className="user-list__table-cell">{user.address}</td>
                            <td className="user-list__table-cell">{user.phone}</td>
                            <td className="user-list__table-cell">{user.type}</td>
                            <td className="user-list__table-cell">
                                {user.type}
                                <div>
                                    <select
                                        className="user-list__table-select"
                                        value={updatedType}
                                        onChange={handleUpdatedTypeChange}
                                        // disabled={user._id === currentUser._id}
                                    >
                                        <option value="">Select Type</option>
                                        <option value="admin">Admin</option>
                                        <option value="seller">Seller</option>
                                        <option value="user">User</option>
                                    </select>
                                    <button
                                        className="user-list__table-button"
                                        disabled={!updatedType}
                                        onClick={() => handleUpdateUserType(user._id)}
                                    >
                                        Update
                                    </button>
                                </div>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};

export default UserList;
