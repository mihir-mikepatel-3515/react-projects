import React, { useState, useEffect } from 'react';



const url = 'https://www.image2url.com/r2/default/files/1792576463474-e45be9f0-8095-4dbc-b15a-1df38b15e57d.txt';
  const Tour=({id,image,info,name,price,removeTour})=>{
    const [readMore, setReadMore] = useState(false);
    return(
      <article className="single-tour">
      <img src={image} alt={name} />
      <footer>
        <div className="tour-info">
          <h4>{name}</h4>
          <h4 className="tour-price">${price}</h4>
        </div>
        <p>
          {readMore ? info : `${info.substring(0, 200)}...`}
          <button
            className="read-more-btn"
            onClick={() => setReadMore(!readMore)}
          >
            {readMore ? 'show less' : 'read more'}
          </button>
        </p>
        <button className="delete-btn" onClick={() => removeTour(id)}>
          not interested
        </button>
      </footer>
    </article>
    )
  }

function App() {

  const[loading, setLoading] = useState(true);
  const[tours, setTours] = useState([]);



  const fetchTours = async () => {
    setLoading(true);
    try {
      const response = await fetch(url);
      const data = await response.json();
      setLoading(false);
      setTours(data);
    } catch (error) {
      setLoading(false);
      console.log(error);
    }
  };

  useEffect(() => {
    fetchTours();
  }, []);


  const removeTour=(id)=>{
    const newTours= tours.filter((tour)=>tour.id!==id);
    setTours(newTours);
  };


// 1. Loading UI check
  if (loading) {
    return (
      <main>
        <div className="loading">
          <h2>Loading...</h2>
        </div>
      </main>
    );
  }

  // 2. Empty tours UI check (All tours removed)
  if (tours.length === 0) {
    return (
      <main>
        <div className="title">
          <h2>No tours left</h2>
          <button className="refresh-btn" onClick={fetchTours}>
            Refresh
          </button>
        </div>
      </main>
    );
  }

  // 3. Main Tour List UI
  return (
    <main>
      <section>
        <div className="title">
          <h2>Our Tours</h2>
          <div className="underline"></div>
        </div>
        <div className="tours-container">
          {tours.map((tour) => {
            return (
              <Tour
                key={tour.id}
                {...tour}
                removeTour={removeTour}
              />
            );
          })}
        </div>
      </section>
    </main>
  );
}

export default App;