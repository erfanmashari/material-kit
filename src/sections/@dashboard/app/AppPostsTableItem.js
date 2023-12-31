import { useState, useEffect } from 'react';
import TextField from '@mui/material/TextField';
import TableCell from '@mui/material/TableCell';
import TableRow from '@mui/material/TableRow';
import AlertDialog from '../../../components/dialog';

export default function AppPostsTableItem({ postItem, index, deletePost }) {
    const [isEditing, setIsEditing] = useState(false);
    const [post, setPost] = useState({
        "userId": 0,
        "id": 0,
        "title": "",
        "body": ""
    });

    useEffect(() => {
        setPost(postItem);
    }, [])

    const editPost = () => {
        if (isEditing) {
            fetch('https://jsonplaceholder.typicode.com/posts/1', {
                method: 'PATCH',
                body: JSON.stringify(post),
                headers: {
                    'Content-type': 'application/json; charset=UTF-8',
                },
            })
                .then((response) => response.json())
                .then((json) => setPost(json));

            setIsEditing(false);
        } else {
            setIsEditing(true);
        }
    }

    const changeFormFields = (parameter, value) => {
        const items = { ...post };
        items[parameter] = value;
        setPost(items)
    }

    return (
        <>
            <TableRow
                sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
            >
                <TableCell align="center" component="th" scope="row">
                    {index}
                </TableCell>
                <TableCell align="center">{isEditing ? <TextField value={post.title} onChange={e => changeFormFields("title", e.target.value)} /> : post.title}</TableCell>
                <TableCell align="center">{isEditing ? <TextField value={post.body} onChange={e => changeFormFields("body", e.target.value)} /> : post.body}</TableCell>
                {!isEditing ? <TableCell align="right">
                    <span role="presentation" onClick={editPost} className="material-symbols-outlined" style={{ cursor: "pointer" }}>
                        edit
                    </span>
                </TableCell> :
                    <TableCell align="right">
                        <AlertDialog icon={<span className="material-symbols-outlined" style={{ cursor: "pointer" }}>
                            done
                        </span>} title={"Are you sure about editing this post?"} doneFunc={editPost} />
                    </TableCell>}
                <TableCell align="right">
                    <AlertDialog icon={<span className="material-symbols-outlined" style={{ cursor: "pointer" }}>
                        info
                    </span>} title={post.title} description={post.body} cancelOnly />
                </TableCell>
                <TableCell align="right">
                    <AlertDialog icon={<span className="material-symbols-outlined" style={{ cursor: "pointer" }}>
                        delete
                    </span>} title={"Are you sure about deleting this post?"} doneFunc={() => deletePost(post.id)} />
                </TableCell>
            </TableRow>

        </>
    );
}