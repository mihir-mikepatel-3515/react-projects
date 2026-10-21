import React from 'react';
import {useState} from 'react';
import rawData from './data';

function App() {

  const[people,setPeople] = useState(rawData);



const removePerson = (id) => {
  const remainingPeople = people.filter((person)=>person.id!==id);
  setPeople(remainingPeople);
}


const clearAll = () => {
    setPeople([]);
  };



  



  return (
    <main>
      <section className="container">
    <h3>{people.length} Birthday Today </h3>

        {people.map((person)=>{
          const {id,name,age,image} = person;
          return(
            <article key={id} className="person">
          <img
            src={image}
            alt={name}
          />
          <div>
            <h4>{name}</h4>
            <p>{age} years</p>
          </div>
          <button className="delet-btn" onClick={()=>removePerson(id)}>Remove</button>
        </article>

          );
        })}
        

        
  

        {/* Clear Button */}
        <button className="btn" onClick={clearAll}>Clear All</button>
      </section>
    </main>
  );
}

export default App;