import { useContext } from 'react';
import { Link } from 'react-router-dom';
import { UserContext } from '../userContext';
import './Photo.css';

function Photo(props) {
    const userContext = useContext(UserContext);

    const handleLike = async () => {
        const res = await fetch(`http://localhost:3001/photos/${props.photo._id}/like`, {
            method: 'PUT',
            credentials: 'include',
            headers: { 'Content-Type': 'application/json' }
        });

        if (res.ok) {
            window.location.reload();
        } else {
            const errorData = await res.json();
            alert(errorData.message || 'An error occurred while liking the photo.');
        }
    };

    return (
        <div class="img_card">
            <Link to={`/${props.photo._id}`}>
                <img src={"http://localhost:3001/" + props.photo.path} alt={props.photo.name} />
            </Link>
            <h5>{props.photo.name}</h5>
            <div className="container">
                <p>By: {props.photo.postedBy?.username || "Unknown"}</p>
                <p>|</p>
                <p>Likes: {props.photo.likes}</p>
                <p>|</p>
                <p>Uploaded: {new Date(props.photo.createdAt).toLocaleDateString()}</p>
                {userContext.user && <p>|</p>}
                {userContext.user && <button onClick={handleLike}>Like</button>}
            </div>
        </div>
    );
}

export default Photo;
