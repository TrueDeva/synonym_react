import React, {useState} from 'react'; // Import the React library and the useState hook
import axios from 'axios'; // Import the axios library for making HTTP requests
import SynonymsList from './SynonymsList'; // Import the SynonymsList component from the SynonymsList.js file
import './App.css'; // Import the App.css file for styling

function App() {
    // Define a piece of state called "word" using the useState hook, with an initial value of an empty string
    const [word, setWord] = useState('');

    // Define a piece of state called "synonyms" using the useState hook, with an initial value of an empty array
    const [synonyms, setSynonyms] = useState([]);

    // Define a piece of state called "errorMessage" using the useState hook, with an initial value of an empty string
    const [errorMessage, setErrorMessage] = useState('');

    // Define a function called "handleInputChange" that takes an event object as its argument
    const handleInputChange = (e) => {
        // Update the value of the "word" state to be the current value of the input field
        setWord(e.target.value);
    };
    // Define a function called "handleFormSubmit" that takes an event object as its argument
    const handleFormSubmit = async (e) => {
        e.preventDefault(); // Prevent the default form submission behavior
        if (word.trim() === '') {
            setErrorMessage('Please enter a word.');
            setSynonyms([]);
            return;
        }

        // If the user did not enter a word, update the error message and reset the synonyms state
        if (word.trim().split(' ').length > 1) {
            setErrorMessage('Please enter only one word at a time.');
            setSynonyms([]);
            return;
        }
        // Define an options object for making an HTTP GET request using axios
        const options = {
            method: 'GET',
            url: `https://wordsapiv1.p.rapidapi.com/words/${word}/synonyms`,
            headers: {
                'X-RapidAPI-Key': process.env.REACT_APP_API_KEY,
                'X-RapidAPI-Host': 'wordsapiv1.p.rapidapi.com'
            }
        };
        try {
            // Make the HTTP GET request using axios and the options object
            const response = await axios.request(options);
            // If no synonyms were found, update the error message and reset the synonyms state
            if (response.data.synonyms.length === 0) {
                setErrorMessage('No synonyms found, try again with another word.');
                setSynonyms([]);
                // If fewer than three synonyms were found, update the error message and reset the synonyms state
            } else if (response.data.synonyms.length < 3) {
                const foundSynonyms = response.data.synonyms.slice(0, 10).join(', ');
                setErrorMessage(
                    `"Application Requirements" 1st specification states the list must be at least 3. We have found ${response.data.synonyms.length} synonyms: ${foundSynonyms}! Tough luck :)`
                );

                setSynonyms([]);
            }
            // If three or more synonyms were found, update the synonyms state and reset the error message
            else {
                setSynonyms(response.data.synonyms.slice(0, 10));
                setErrorMessage('');
            }
        } catch (error) {
            console.error(error);
            // If an error occurred, update the error message and reset the synonyms state
            setSynonyms([]);
            setErrorMessage('No synonyms found, try again with another word.');
        }
    };
    // Define the App component, which returns the UI for the app
    return (
        // Add a container div with a class of "container"
        <div className="container">
            <h1>Synonym App</h1>
            {/* If an error message exists and the user has entered a word, display the error message */}
            {errorMessage && word.trim() !== '' && (
                <p className="text-danger">{errorMessage}</p>
            )}
            {/* Add a form with an onSubmit handler that calls handleFormSubmit */}
            <form onSubmit={handleFormSubmit}>
                {/* Add a form group with an input field for entering a word */}
                <div className="form-group">
                    <input
                        type="text"
                        className="form-control"
                        placeholder="Enter a word"
                        value={word}
                        onChange={handleInputChange}
                    />
                </div>
                {/* Add a button to submit the form and generate synonyms */}
                <button type="submit" className="btn btn-primary mb-3">
                    Generate Synonyms
                </button>
            </form>
            {/* Render the SynonymsList component with the synonyms state as its prop */}
            <SynonymsList synonyms={synonyms}/>
        </div>
    );
}

export default App;