import { useState, useEffect, useContext } from 'react';
import { useParams } from 'react-router-dom';
import { UserContext } from '../userContext';
import './Photo.css';

function PhotoDetails() {
    const { id } = useParams();
    const [photo, setPhoto] = useState(null);
    const userContext = useContext(UserContext);

    useEffect(() => {
        const fetchPhoto = async () => {
            const res = await fetch(`http://localhost:3001/photos/${id}`);
            const data = await res.json();
            setPhoto(data);
        };
        fetchPhoto();
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

    if (!photo) {
        return <div>Loading...</div>;
    }

    return (
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
    );
}

export default PhotoDetails;
