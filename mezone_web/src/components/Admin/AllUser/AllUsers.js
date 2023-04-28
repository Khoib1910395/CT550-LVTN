import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { fetchUsers } from '../../../actions/Admin';
import './AllUsers.css';

const UserList = () => {
    const dispatch = useDispatch();
    const users = useSelector((state) => state.allUsers.users);
    const { userInfo } = useSelector((state) => state.userSignin);
    const [updatedUserType, setUpdatedUserType] = useState({});

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
            user.name?.toLowerCase().includes
                (searchTerm.toLowerCase()) ||
            user.email?.toLowerCase().includes(searchTerm.toLowerCase()) ||
            user.type?.toLowerCase().includes(searchTerm.toLowerCase())
        );
    }); const sortedUsers = filteredUsers.sort((a, b) => {
        if (selectedType === 'name') {
            return a.name.localeCompare(b.name);
        } else if (selectedType === 'email') {
            return a.email.localeCompare(b.email);
        } else if (selectedType === 'type') {
            return a.type.localeCompare(b.type);
        } else {
            return 0;
        }
    });

    return (
        <div className="user-list">
            <h1 className="user-list-title">All Users</h1>
            <div className="user-list-search">
                <input
                    type="text"
                    placeholder="Search users by name, email or type"
                    value={searchTerm}
                    onChange={handleSearchTermChange}
                />
                <select value={selectedType} onChange={handleTypeChange}>
                    <option value="">Sort by</option>
                    <option value="name">Name</option>
                    <option value="email">Email</option>
                    <option value="type">Type</option>
                </select>
            </div>
            <table className="user-list-table">
                <thead>
                    <tr>
                        <th>ID</th>
                        <th>Name</th>
                        <th>Email</th>
                        <th>Type</th>
                        <th>Action</th>
                    </tr>
                </thead>
                <tbody>
                    {sortedUsers.map((user) => (
                        <tr key={user._id}>
                            <td>{user._id}</td>
                            <td>{user.name}</td>
                            <td>{user.email}</td>
                            <td>
                            <select
    value={updatedUserType[user._id] || user.type}
    onChange={(event) => handleUpdatedTypeChange(event, user._id)}
>
                                    <option value="">Select Type</option>
                                    <option value="user">User</option>
                                    <option value="admin">Admin</option>
                                </select>
                            </td>
                            <td>
                                {userInfo.type === 'admin' && (
                                    <button
                                        onClick={() => handleUpdateUserType(user._id)}
                                    >
                                        Update
                                    </button>
                                )}
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};

export default UserList;