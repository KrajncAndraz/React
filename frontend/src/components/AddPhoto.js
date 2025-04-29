import { useContext, useState } from 'react';
import { Navigate } from 'react-router';
import { UserContext } from '../userContext';

function AddPhoto(props) {
    const userContext = useContext(UserContext);
    const [name, setName] = useState('');
    const [file, setFile] = useState('');
    const [uploaded, setUploaded] = useState(false);
    const [error, setError] = useState(''); // State for error messages

    async function onSubmit(e) {
        e.preventDefault();

        if (!name) {
            setError("Please enter a name for the photo!");
            return;
        }

        const formData = new FormData();
        formData.append('name', name);
        formData.append('image', file);

        try {
            const res = await fetch('http://localhost:3001/photos', {
                method: 'POST',
                credentials: 'include',
                body: formData
            });

            if (!res.ok) {
                const errorData = await res.json();
                setError(errorData.message || "An error occurred during upload.");
                return;
            }

            //const data = await res.json();
            setUploaded(true);
        } catch (err) {
            setError("An unexpected error occurred. Please try again.");
        }
    }

    return (
        <form className="form-group" onSubmit={onSubmit}>
            {!userContext.user ? <Navigate replace to="/login" /> : ""}
            {uploaded ? <Navigate replace to="/" /> : ""}
            <input
                type="text"
                className="form-control"
                name="ime"
                placeholder="Ime slike"
                value={name}
                onChange={(e) => { setName(e.target.value); setError(''); }}
            />
            <label>Izberi sliko</label>
            <input
                type="file"
                id="file"
                onChange={(e) => { setFile(e.target.files[0]); setError(''); }}
            />
            <input className="btn btn-primary" type="submit" name="submit" value="Naloži" />
            {error && <div className="alert alert-danger mt-2">{error}</div>}
        </form>
    );
}

export default AddPhoto;
