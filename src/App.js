import React, {useState} from 'react';
import axios from 'axios';
import SynonymsList from './SynonymsList';
import './App.css';

function App() {
    const [word, setWord] = useState('');
    const [synonyms, setSynonyms] = useState([]);
    const [errorMessage, setErrorMessage] = useState('');

    const handleInputChange = (e) => {
        setWord(e.target.value);
    };

    const handleFormSubmit = async (e) => {
        e.preventDefault();
        if (word.trim() === '') {
            setErrorMessage('Please enter a word.');
            setSynonyms([]);
            return;
        }
        if (word.trim().split(' ').length > 1) {
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
                setErrorMessage('No synonyms found, try again with another word.');
                setSynonyms([]);
            } else if (response.data.synonyms.length < 3) {
                const foundSynonyms = response.data.synonyms.slice(0, 10).join(', ');
                setErrorMessage(
                    `"Application Requirements" 1st specification states the list must be at least 3. We have found ${response.data.synonyms.length} synonyms: ${foundSynonyms}! Tough luck :)`
                );

                setSynonyms([]);
            } else {
                setSynonyms(response.data.synonyms.slice(0, 10));
                setErrorMessage('');
            }
        } catch (error) {
            console.error(error);
            setSynonyms([]);
            setErrorMessage('No synonyms found, try again with another word.');
        }
    };

    return (
        <div className="container">
            <h1>Synonym App</h1>
            {errorMessage && word.trim() !== '' && (
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
            <SynonymsList synonyms={synonyms}/>
        </div>
    );
}

export default App;