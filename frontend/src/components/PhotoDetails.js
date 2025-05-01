import { useState, useEffect, useContext } from 'react';
import { useParams } from 'react-router-dom';
import { UserContext } from '../userContext';
import './Photo.css';
import './Comment.css';
import './Button.css';

function PhotoDetails() {
    const { id } = useParams();
    const [photo, setPhoto] = useState(null);
    const [comments, setComments] = useState([]);
    const [newComment, setNewComment] = useState('');
    const userContext = useContext(UserContext);

    useEffect(() => {
        const fetchPhoto = async () => {
            const res = await fetch(`http://localhost:3001/photos/${id}`);
            const data = await res.json();
            setPhoto(data);
        };

        const fetchComments = async () => {
            const res = await fetch(`http://localhost:3001/comments/${id}`);
            const data = await res.json();
            setComments(data);
        };

        fetchPhoto();
        fetchComments();
    }, [id]);

    const handleLike = async () => {
        const res = await fetch(`http://localhost:3001/photos/${id}/like`, {
            method: 'PUT',
            credentials: 'include',
            headers: { 'Content-Type': 'application/json' }
        });

        if (res.ok) {
            const updatedPhoto = await res.json();
            setPhoto(updatedPhoto);
        } else {
            const errorData = await res.json();
            alert(errorData.message || 'An error occurred while liking the photo.');
        }
    };

    const handleAddComment = async (e) => {
        e.preventDefault();
        if (!newComment.trim()) return;

        const res = await fetch(`http://localhost:3001/comments`, {
            method: 'POST',
            credentials: 'include',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ text: newComment, photoId: id })
        });

        if (res.ok) {
            const newCommentData = await res.json();
            setComments([newCommentData, ...comments]);
            setNewComment('');
        } else {
            const errorData = await res.json();
            alert(errorData.message || 'An error occurred while adding the comment.');
        }
    };

    if (!photo) {
        return <div>Loading...</div>;
    }

    return (
        <div>
            <div class="img_card">
                <img src={`http://localhost:3001/${photo.path}`} alt={photo.name} />
                <h5>{photo.name}</h5>
                <div class="container">
                    <p>By: {photo.postedBy?.username || "Unknown"}</p>
                    <p>|</p>
                    <p>Likes: {photo.likes}</p>
                    <p>|</p>
                    <p>Uploaded: {new Date(photo.createdAt).toLocaleDateString()}</p>
                    {userContext.user && <p>|</p>}
                    {userContext.user && <button onClick={handleLike}>Like</button>}
                </div>
            </div>

            <div class="comments-section">
                {userContext.user && (
                    <div class="new">
                        <h6>Add a Comment:</h6>
                        <form onSubmit={handleAddComment}>
                            <textarea
                                value={newComment}
                                onChange={(e) => setNewComment(e.target.value)}
                                placeholder="Add a comment..."
                            ></textarea>
                            <button type="submit">Post Comment</button>
                        </form>
                    </div>
                )}

                <h5>Comments:</h5>
                <ul>
                    {comments.map((comment, index) => (
                        <li key={index} class="comment">
                            <p><strong>{comment.author?.username || "Anonymous"}:</strong> {comment.text}</p>
                            <p class="comment-date">{new Date(comment.createdAt).toLocaleDateString()}</p>
                        </li>
                    ))}
                </ul>
            </div>
        </div>
    );
}

export default PhotoDetails;