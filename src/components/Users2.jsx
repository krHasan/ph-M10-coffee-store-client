import { useQuery } from "@tanstack/react-query";
import { useEffect, useState } from "react";

const User2 = () => {

    // const [users, setUsers] = useState([]);
    
    // useEffect(() => {
    //     fetch('http://localhost:5000/user')
    //     .then(res => res.json())
    //     .then(data => {
    //         setUsers(data);
    //     })
    // }, [])


    const {isPending, isError, error, data: users} = useQuery({
        queryKey: ['users'],
        queryFn: async () => {
            const res = await fetch('http://localhost:5000/user');
            return res.json();
        }
    })

    const handleDelete = (id) => {
        //make sure user is confirm to delete
        fetch(`http://localhost:5000/user/${id}`, {
            method: 'DELETE'
        })
            .then(res => res.json())
            .then(data => {
                if (data.deletedCount > 0) {
                    alert('deleted successfully');
                    //remove the user from the UI
                    // const remainingUsers = users.filter(user => user._id !== id);
                    // setUsers(remainingUsers);
                }
            })
    }

    if (isPending) {
        return <span className="loading loading-spinner text-primary"></span>
    }

    if (isError) {
        return <p>{error.message}</p>
    }

    return (
        <div>
            {/* <h2>Users {loadedUsers.length}</h2> */}
            <div className="overflow-x-auto">
                <table className="table">
                    {/* head */}
                    <thead>
                        <tr>
                            <th></th>
                            <th>Email</th>
                            <th>Created At</th>
                            <th>Last Logged At</th>
                            <th>Action</th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            users?.map(user => <tr key={user._id}>
                                <th>1</th>
                                <td>{user.email}</td>
                                <td>{user.createdAt}</td>
                                <td>{user.lastLoggedAt}</td>
                                <td className="btn btn-secondary" onClick={() => handleDelete(user._id)}>X</td>
                            </tr>)
                        }
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default User2;