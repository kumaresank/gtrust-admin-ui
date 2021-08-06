import React from 'react';
import Checkbox from '../Checkbox';
import del from './../../images/delete.png';
import edit from './../../images/edit.png';
import save from './../../images/diskette.png';

const Table = ({
    onSelectAll,
    isCheckAll,
    currentItems,
    handleClick,
    isCheck,
    onEdit,
    onDelete,
    editItem,
    onSave,
    onItemEdit,
}) => {
    return (
        <table>
            <thead>
                <tr>
                    <th>
                        <Checkbox
                            type='checkbox'
                            name='selectAll'
                            id='selectAll'
                            handleClick={onSelectAll}
                            isChecked={isCheckAll}
                        />
                    </th>
                    <th>Name</th>
                    <th>Email</th>
                    <th>Role</th>
                    <th>Actions</th>
                </tr>
            </thead>
            <tbody>
                {currentItems.map((member) => (
                    <tr key={member.id}>
                        <td>
                            <Checkbox
                                key={member.id}
                                type='checkbox'
                                name={member.name}
                                id={member.id}
                                handleClick={handleClick}
                                isChecked={isCheck.includes(member.id)}
                            />
                        </td>
                        <td>
                            {editItem === member.id ? (
                                <input
                                    type='text'
                                    onChange={(e) =>
                                        onItemEdit(
                                            'name',
                                            member.id,
                                            e.target.value
                                        )
                                    }
                                    defaultValue={member.name}
                                />
                            ) : (
                                member.name
                            )}
                        </td>
                        <td>
                            {editItem === member.id ? (
                                <input
                                    type='text'
                                    onChange={(e) =>
                                        onItemEdit(
                                            'email',
                                            member.id,
                                            e.target.value
                                        )
                                    }
                                    defaultValue={member.email}
                                />
                            ) : (
                                member.email
                            )}
                        </td>
                        <td className='captitalize'>
                            {editItem === member.id ? (
                                <input
                                    type='text'
                                    onChange={(e) =>
                                        onItemEdit(
                                            'role',
                                            member.id,
                                            e.target.value
                                        )
                                    }
                                    defaultValue={member.role}
                                />
                            ) : (
                                member.role
                            )}
                        </td>
                        <td>
                            {editItem === member.id ? (
                                <img
                                    src={save}
                                    className='action-icon'
                                    alt='save'
                                    onClick={() => onSave(member.id)}
                                />
                            ) : (
                                <img
                                    src={edit}
                                    className='action-icon'
                                    alt='edit'
                                    onClick={() => onEdit(member.id)}
                                />
                            )}
                            <img
                                src={del}
                                className='action-icon'
                                alt='delete'
                                onClick={() => onDelete(member)}
                            />
                        </td>
                    </tr>
                ))}
            </tbody>
        </table>
    );
};

export default Table;
