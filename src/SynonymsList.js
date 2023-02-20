import React from 'react';
// Import the SynonymsList.css file for styling
import './SynonymsList.css';

// Define the SynonymsList component, which displays a list of synonyms
function SynonymsList({synonyms}) {
    // If no synonyms were passed as props, return null
    if (synonyms.length === 0) {
        return null;
    }

    // Render the list of synonyms using JSX
    return (
        <div className="synonyms-list">
            <h2 className="subheading">Synonyms:</h2>
            <ul className="synonyms">
                {synonyms.map((synonym) => (
                    <li key={synonym} className="synonym">{synonym}</li>
                ))}
            </ul>
        </div>
    );
}

// Export the SynonymsList component as the default export for this module
export default SynonymsList;