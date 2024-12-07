import { Frontpage } from './pages/Frontpage'
import { BrowserRouter , Routes , Route} from 'react-router-dom'
import './App.css'
import { Card } from './components/Card'
import { Movies } from './pages/Movies'
import { Playing } from './pages/Playing'
import { Collection } from './pages/Collection'
import { Landing } from './pages/Landing'
import { Episodes } from './pages/Episodes'
import VideoPlayer from './components/VideoPlayer'



function App() {
  const page = [{
  id: "Movies Anime",
  name : 1
},{
  id : "Tv Series",
  name : 2
},{
  id : "Most Popular",
  name : 3
},{
  id : "Top Airing",
  name : 4
}]

  return (
    <div>
      <BrowserRouter>
      <Routes>
          <Route path='/' element={<Frontpage />} />
          <Route path='/home' element={<Card  />} />
          <Route path='/movies' element={<Movies key={page[0].name} id= {page[0].id} />} />
          <Route path='/tv-series' element={<Movies key={page[1].name} id= {page[1].id} />} />
          <Route path='/most-popular' element={<Movies key={page[2].name} id= {page[2].id} />} />
          <Route path='/top-airing' element={<Movies key={page[3].name} id= {page[3].id} />} />
          <Route path='/watch/anime' element={<Playing />} />
          <Route path='/admin-login' element={<Landing />} />
          <Route path='/play' element={<VideoPlayer fileId={"1zDjk2zYU_8h9ToOcR5JoYM4JpXrIdsVG"} />} />
          <Route path='/admin/collection' element={<Collection />} />
          <Route path='admin/add-episodes' element={<Episodes />} />
      </Routes>
      </BrowserRouter>
      
    </div>
  )
}

export default App
