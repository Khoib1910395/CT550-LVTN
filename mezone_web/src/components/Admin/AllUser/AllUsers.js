import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { fetchUsers, updateUser } from '../../../actions/Admin';
import './AllUsers.css';

const UserList = () => {
    const dispatch = useDispatch();
    const users = useSelector((state) => state.allUsers.users);

    useEffect(() => {
        dispatch(fetchUsers());
    }, [dispatch]);

    const [searchTerm, setSearchTerm] = useState('');
    const [selectedType, setSelectedType] = useState('');
    const [isUpdated, setIsUpdated] = useState(false); // thêm state mới

    const handleSearchTermChange = (event) => {
        setSearchTerm(event.target.value);
    };

    const handleTypeChange = async (event, user) => { // sử dụng async/await để đợi cập nhật xong trước khi load lại trang
        const newType = event.target.value;
        user.type = newType;
        await dispatch(updateUser(user._id, user)); // đợi cập nhật xong
        setIsUpdated(true); // đánh dấu đã cập nhật thành công
    };

    useEffect(() => {
        if (isUpdated) {
            setIsUpdated(false);
            dispatch(fetchUsers()); // load lại trang sau khi cập nhật xong
        }
    }, [isUpdated, dispatch]);

    const filteredUsers = users.filter((user) => {
        return (
            user._id?.toLowerCase().includes(searchTerm.toLowerCase()) ||
            user.name?.toLowerCase().includes(searchTerm.toLowerCase()) ||
            user.email?.toLowerCase().includes(searchTerm.toLowerCase()) ||
            user.type?.toLowerCase().includes(searchTerm.toLowerCase())
        );
    });

    const sortedUsers = filteredUsers.sort((a, b) => {
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
            <div className="user-list-search">
                <input
                    type="text"
                    placeholder="Search users by name, email or type"
                    value={searchTerm}
                    onChange={handleSearchTermChange}
                />
            </div>
            <table className="user-list-table">
                <thead>
                    <tr>
                        <th className='alluser-id-label'>ID</th>
                        <th className='alluser-name-label'>Name</th>
                        <th className='alluser-email-label'>Email</th>
                        <th className='alluser-address-label'>Address</th>
                        <th className='alluser-phone-label'>Phone</th>
                        <th className='alluser-type-label'>Type</th>
                        <th className='alluser-type-change-label'>Change Type</th>
                    </tr>
                </thead>
                <tbody>
                    {sortedUsers.map((user) => (
                        <tr key={user._id}>
                            <td className='alluser-id-body'>{user._id}</td>
                            <td className='alluser-name-body'>{user.name}</td>
                            <td className='alluser-email-body'>{user.email}</td>
                            <td className='alluser-address-body'>{user.address}</td>
                            <td className='alluser-phone-body'>{user.phone}</td>
                            <td className='alluser-type-body'>{user.type}</td>
                            <td className='alluser-type-change-body'>
                                <select value={user.type} onChange={(event) => handleTypeChange(event, user)}>
                                    <option value="admin">Admin</option>
                                    <option value="user">User</option>
                                </select>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};

export default UserList;
