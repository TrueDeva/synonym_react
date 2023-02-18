import React, {useState} from 'react';
import axios from 'axios';
import './App.css';

function App() {
    const [word, setWord] = useState('');
    const [synonyms, setSynonyms] = useState([]);

    const handleInputChange = (e) => {
        setWord(e.target.value);
    };

    const handleFormSubmit = async (e) => {
        e.preventDefault();
        const options = {
            method: 'GET',
            url: `https://wordsapiv1.p.rapidapi.com/words/${word}/synonyms`,
            headers: {
                'X-RapidAPI-Key': 'bb565e34a7msh628bbdf2ad52d40p1f9e08jsn3bc9545b5091',
                'X-RapidAPI-Host': 'wordsapiv1.p.rapidapi.com'
            }
        };
        try {
            const response = await axios.request(options);
            setSynonyms(response.data.synonyms.slice(0, 10));
        } catch (error) {
            console.error(error);
        }
    };

    return (
        <div className="container">
            <h1>Synonym App</h1>
            <form onSubmit={handleFormSubmit}>
                <div className="form-group">
                    <input
                        type="text"
                        className="form-control"
                        placeholder="Enter a word"
                        value={word}
                        onChange={handleInputChange}
                    />
                </div>
                <button type="submit" className="btn btn-primary mb-3">
                    Generate Synonyms
                </button>
            </form>
            {synonyms.length > 0 && (
                <ul>
                    {synonyms.map((synonym) => (
                        <li key={synonym}>{synonym}</li>
                    ))}
                </ul>
            )}
        </div>
    );
}

export default App;