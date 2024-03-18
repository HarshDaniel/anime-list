import { useState,useEffect } from 'react'
import './App.css'
import { AnimeInfo } from './components/AnimeInfo'
import { AnimeList } from './components/AnimeList'
import { AddToList } from './components/AddToList'
import {RemoveFromList} from './components/RemoveFromList'


function App() {

  

  const [animeData, setAnimeData] = useState()
  const [search, setSearch] = useState("naruto")
  const [animeInfo, setAnimeInfo] = useState()
  const [myAnimeList, setMyAnimeList] = useState([])

  const addTo = (anime) => {

    const index = myAnimeList.findIndex(myAnime => {
      return myAnime.mal_id === anime.mal_id
    })
    if (index < 0) {
      const newArray = [...myAnimeList,anime]
      setMyAnimeList(newArray)
    }
    
  }

  const removeFrom = (anime) => {
    const newArray = myAnimeList.filter((myAnime) => {
      return myAnime.mal_id !== anime.mal_id
    })
    setMyAnimeList(newArray)
  }

  const getData = async () => {
    const response = await fetch(`https://api.jikan.moe/v4/anime?q=${search}&limit=20`)
    const data = await response.json()
    setAnimeData(data.data)
  } 

  useEffect(() => {
    getData()
  }, [search])

  return (
    <>
      <div className="header">
        <h1>Anime List</h1>
        <div className="search-box">
          <input type="text" placeholder="Search for an anime" onChange={(e) => setSearch(e.target.value)} />
        </div>
      </div>

      <div className="container">
        <div className="animeInfo">
        {animeInfo && <AnimeInfo animeInfo={animeInfo}/> }
        </div>
        <div className="anime-row">
          <h2 className="text-heading">Anime</h2>
          <div className="row">
            <AnimeList 
            animelist={animeData} 
            setAnimeInfo={setAnimeInfo} 
            animeComponent={AddToList}
            handleList={(anime) => addTo(anime)}
            />
          </div>
          <h2 className="text-heading">My list</h2>
          <div className="row">
            <AnimeList 
            animelist={myAnimeList} 
            setAnimeInfo={setAnimeInfo} 
            animeComponent={RemoveFromList}
            handleList={(anime) => removeFrom(anime)}
            />
          </div>
        </div>
      </div>
    </>
  )
}

export default App
