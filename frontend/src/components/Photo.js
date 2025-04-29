import { Link } from 'react-router-dom';
import './Photo.css';

function Photo(props) {
    return (
        <div class = "img_card">
            <Link to={`/${props.photo._id}`}>
                <img src={"http://localhost:3001/" + props.photo.path} alt={props.photo.name} />
            </Link>
            <h5>{props.photo.name}</h5>
            <div class="container">
                <p>By: {props.photo.postedBy?.username || "Unknown"}</p>
                <p>|</p>
                <p>Likes: {props.photo.likes}</p>
                <p>|</p>
                <p>Uploaded: {new Date(props.photo.createdAt).toLocaleDateString()}</p>
            </div>
        </div>
    );
}

export default Photo;