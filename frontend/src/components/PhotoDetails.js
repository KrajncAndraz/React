import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import './Photo.css';

function PhotoDetails() {
    const { id } = useParams(); // Get the photo ID from the URL
    const [photo, setPhoto] = useState(null);

    useEffect(() => {
        const fetchPhoto = async () => {
            const res = await fetch(`http://localhost:3001/photos/${id}`);
            const data = await res.json();
            setPhoto(data);
        };
        fetchPhoto();
    }, [id]);

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
            {/* Add comments display here if applicable */}
            </div>
        </div>
    );
}

export default PhotoDetails;