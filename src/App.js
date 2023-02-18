import React, {useState} from 'react';
import axios from 'axios';
import './App.css';

function App() {
    // Declare state variables
    const [word, setWord] = useState(''); // the input word from the form
    const [synonyms, setSynonyms] = useState([]); // the list of synonyms returned from the API
    const [errorMessage, setErrorMessage] = useState(''); // an error message to display if there is a problem with the input

    // Handle input change in the form
    const handleInputChange = (e) => {
        setWord(e.target.value);
    };

    // Handle form submission
    const handleFormSubmit = async (e) => {
        e.preventDefault();
        if (word.trim() === '') {
            // If the input is empty, set the error message and clear the list of synonyms
            setErrorMessage('Please enter a word.');
            setSynonyms([]);
            return;
        }
        if (word.trim().split(' ').length > 1) {
            // If the input contains multiple words, set the error message and clear the list of synonyms
            setErrorMessage('Please enter only one word at a time.');
            setSynonyms([]);
            return;
        }
        const options = {
            method: 'GET',
            url: `https://wordsapiv1.p.rapidapi.com/words/${word}/synonyms`,
            headers: {
                'X-RapidAPI-Key': process.env.REACT_APP_API_KEY,
                'X-RapidAPI-Host': 'wordsapiv1.p.rapidapi.com'
            }
        };
        try {
            const response = await axios.request(options);
            if (response.data.synonyms.length === 0) {
                // If no synonyms are found, set the error message and clear the list of synonyms
                setErrorMessage('No synonyms found, try again with another word.');
                setSynonyms([]);
                return;
            }
            setSynonyms(response.data.synonyms.slice(0, 10));
            setErrorMessage('');
        } catch (error) {
            console.error(error);
        }
    };

    return (
        <div className="container">
            <h1>Synonym App</h1>
            {errorMessage && word.trim() !== '' && (
                // If there is an error message and the input is not empty, display the error message in red text
                <p className="text-danger">{errorMessage}</p>
            )}
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
            {synonyms.length > 0 ? (
                // If there are synonyms, display the list of synonyms
                <ul>
                    {synonyms.map((synonym) => (
                        <li key={synonym}>{synonym}</li>
                    ))}
                </ul>
            ) : (
                // If there are no synonyms, display the error message in bold italics
                word.trim() !== '' && <p><em>No synonyms found, try again with another word.</em></p>
            )}
        </div>
    );
}

export default App;