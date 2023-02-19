import React from 'react';
import './SynonymsList.css';

function SynonymsList({synonyms}) {
    if (synonyms.length === 0) {
        return null;
    }

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

export default SynonymsList;