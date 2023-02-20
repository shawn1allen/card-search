import React, { useState, useEffect } from 'react';
import Card from './Card'
import '../styles/styles.css'

const CardSearch = () => {

  const [cardData, setCardData] = useState([])
  const [searchWord, setSearchWord] = useState('')
  const [activeCardIndex, setActiveCardIndex] = useState(0)
  const [page, setPage] = useState();
  const set = new Set()

  const handleKeyPress = (event) => {
    if (event.key === 'Enter') {
      search();
    }
  }

  const handleChange = (event) => {
    setSearchWord(event.target.value)
  }

  const search = () => {
    getCardData()
    setPage(2)
  }

  const getCardData = () => {
    fetch(`https://api.magicthegathering.io/v1/cards?name=${searchWord}&contains=imageUrl&orderBy=`)
      .then(r => r.json())
      .then(data => {
        const tempData = data.cards.filter((cards) => {
          if (set.has(cards.name)) {
            return false
          } else {

            set.add(cards.name)
            return true
          }
        })

        setCardData(tempData)
      })
  }

  const handleScroll = event => {
    const cardWidth = event.target.clientWidth / 1.38043; // Divide by the number of visible cards
    const scrollPosition = event.target.scrollLeft;
    const activeCardIndex = Math.round(scrollPosition / cardWidth);
    setActiveCardIndex(activeCardIndex);
    console.log(activeCardIndex)
  }

  const handleLoadMore = () => {
    loadMore()
  }

  const loadMore = () => {
    fetch(`https://api.magicthegathering.io/v1/cards?name=${searchWord}&contains=imageUrl&page=${page}`)
      .then(r => r.json())
      .then(data => {
        const tempData = data.cards.filter((cards) => {
          if (set.has(cards.name)) {
            return false
          } else {

            set.add(cards.name)
            return true
          }
        })

        setCardData([...cardData, ...tempData])
      })
      setPage(page + 1)
  }

  return (
    <div>
      <div className='search-container'>
        <input type="text" placeholder='Card Search' id="searchbar" onKeyDown={handleKeyPress} onChange={handleChange} ></input>
        <button className='search-btn' onClick={() => search()}></button>
      </div>
      <div><p>{cardData.length} search results</p></div>
      <div className='scroll-list' onScroll={handleScroll}>
        {cardData.map((card, index) => <Card key={card.id} card={card} isActive={index === activeCardIndex} />)}
      {cardData.length !== 0 && <button className='load-btn btn' onClick={handleLoadMore}>Load More</button>}
      </div>
      
    </div>
  );
}

export default CardSearch;