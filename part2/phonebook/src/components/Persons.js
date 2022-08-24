const Persons = ({ persons, searchFilter, onClick} ) => {
    return (
        <ul>
            {(persons.filter((person) => person.name.toLowerCase().includes(searchFilter.toLowerCase()))).map((person) => 
            <li key={person.name}>{person.name} {person.number} <button id={person.id} onClick={onClick}>delete</button></li>
            )}
        </ul>
    )
}

export default Persons