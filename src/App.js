import NavBar from './components/NavBar/nav';
import Footer from './components/footer';
import { useState, useEffect } from 'react';
import './App.css';
import Showcase from './components/events/showcase';
import axios from 'axios';
import {events} from './config/URL';

function App() {

  const [allTags, setAllTags] = useState([]);


  const makeReqTags=async()=>{
    await axios({
        url: events.getTags,
        method:'GET',
    }).then(res=>{
        console.log(res.data.data.tags);
        setAllTags(res.data.data.tags);
    }).catch(err=>{
        console.log(err.error);
    })
  }

  useEffect(()=>{
    makeReqTags();
  },[])


  return (
    <div className="App">
      <NavBar/>
      <Showcase allTags={allTags}/>
      <Footer/>
    </div>
  );
}

export default App;
