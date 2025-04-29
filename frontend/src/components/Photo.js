function Photo(props) {
    return (
        <div className="card bg-dark text-dark mb-2">
            <img className="card-img" src={"http://localhost:3001/" + props.photo.path} alt={props.photo.name} />
            <div className="card-img-overlay">
                <h5 className="card-title">{props.photo.name}</h5>
                <p className="card-text">By: {props.photo.postedBy?.username || "Unknown"}</p>
                <p className="card-text">Likes: {props.photo.likes}</p>
                <p className="card-text">Uploaded: {new Date(props.photo.createdAt).toLocaleDateString()}</p>
            </div>
        </div>
    );
}

export default Photo;
