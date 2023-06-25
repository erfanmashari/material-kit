import { useState, useEffect } from 'react';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';

import AppPostsTableItem from "./AppPostsTableItem"

export default function AppPostsTable() {
    const [posts, setPosts] = useState([]);
    const [deletedList, setDeletedList] = useState([]);

    useEffect(() => {
        fetch("https://jsonplaceholder.typicode.com/posts").then(response => {
            return response.json();
        }).then(res => {
            setPosts(res.splice(0, 20));
        })
    }, []);

    const deletePost = async (id) => {
        await fetch(`https://jsonplaceholder.typicode.com/posts/${id}`, {
            method: 'DELETE',
        });

        const newDeletedList = [...deletedList];
        newDeletedList.push(id);
        setDeletedList(newDeletedList);
    }

    let postIndex = 0;

    return (
        <TableContainer component={Paper}>
            <Table sx={{ minWidth: 650 }} aria-label="simple table">
                <TableHead>
                    <TableRow>
                        <TableCell>Row</TableCell>
                        <TableCell align="center">Title</TableCell>
                        <TableCell align="center">Body</TableCell>
                        <TableCell align="right">Edit</TableCell>
                        <TableCell align="right">Delete</TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {posts.map((post, index) => {
                        if (!deletedList.includes(post.id)) {
                            postIndex += 1;
                        }
                        return !deletedList.includes(post.id) ? <AppPostsTableItem key={index} index={postIndex} postItem={post} deletePost={deletePost} /> : ""
                    })}
                </TableBody>
            </Table>
        </TableContainer>
    );
}