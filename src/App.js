import React, {useEffect, useState} from 'react'
import data from './data'
import {FaQuoteRight, FaChevronLeft, FaChevronRight} from 'react-icons/fa'
import './App.css';

function App() {
  const [people, setPeople] = useState(data)
  const [index, setIndex] = useState(0)

  useEffect(()=>{
    const lastIndex = people.length -1
    if(index < 0){
      setIndex(lastIndex)
    }
    if(index > lastIndex) {
      setIndex(0)
    }
  }, [index, people])


  useEffect(()=>{
    let slider = setInterval(()=>{
      setIndex((index)=>{
        return index + 1
      })
    }, 3000)
    return ()=> clearInterval(slider)
  }, [index])


  return (
    <div className="App">
      <div className="title">
        <h2>
          <span>/</span> Reviews
        </h2>
      </div>
      <div className="container">
      {people.map((people, personIndex) =>{
        const {image, name, id, title, quote} = people

        let position = "nextSlide"
        if(personIndex === index){
          position = "active-slide"
        }
        if(personIndex === index -1 || (index === 0 && personIndex === people.length - 1)){
          position = "prevSlide"
        }
        return (
        <article key={id} className={position}>
          <img src={image} alt={name}/>
          <h4>{name}</h4>
          <p className="article-title">{title}</p>
          <p className="quote">{quote}</p>
          <FaQuoteRight className="right-quote" />
        </article>
        )
        
      })}
      </div>

      <button className="prev" onClick={()=> setIndex(index -1)}>
        <FaChevronLeft />
      </button>
      <button className="next" onClick={()=> setIndex(index + 1)}>
        <FaChevronRight />
      </button>
    </div>
  );
}

export default App;
