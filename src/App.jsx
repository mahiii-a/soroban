import {Routes, Route} from 'react-router-dom'
import {useEffect, useState} from 'react';
// import Abacus from './components/Abacus.jsx';
import GameScreen from './components/GameScreen.jsx'
import HomeScreen from './components/HomeScreen.jsx'
import OnBoarding from './components/OnBoarding.jsx'
import FreeModeScreen from './components/FreeMode.jsx'
import Layout from './Layout.jsx';
import './App.css';
import { supabase } from './supabaseClient.js';

function App(){
  // App.jsx
  const[lessonProgress, setLessonProgress]=useState({
    beginner: 0,
    intermediate: 0,
    advanced: 0
  })
  const [hasLoaded, setHasLoaded] = useState(false)
  const [unlockedLevels, setUnlockedLevels] = useState(['beginner'])
  const[user, setUser]=useState(null);
  useEffect(() => {
    supabase.auth.getSession().then(({data: {session}}) => {
      setUser(session?.user ?? null)
      //accesses user only if session is not null
      //?? says if value on left is null or undefined, use value on right otherwise prefer left
    })

    const {data: listener}=supabase.auth.onAuthStateChange((_event, session) =>{
      setUser(session?.user ?? null)
    })
    //event is either signed in or signed out

    //cleanup
    return() => listener.subscription.unsubscribe()

  } , [])

  useEffect(() => {
    async function saveProgress(){
      console.log('saveProgress called, user is:', user)
      if(user && hasLoaded){
        console.log('Current user:', user)
        const{data, error}=await supabase
        .from('soroban')
        .upsert({
          user_id: user.id,
          unlocked_levels: unlockedLevels,
          lesson_progress: lessonProgress},
        {onConflict: 'user_id'}
      )
        if (error) console.error('Error saving progress:', error)
        if(data) console.log(data)
        
      }
      
    }
    saveProgress()
    
  }, [unlockedLevels, lessonProgress, user])

  useEffect(() => {
  async function loadProgress(){
    if(user){
      const { data, error } = await supabase
        .from('soroban')
        .select()
        .eq("user_id", user.id)
      if(error) console.error('Error loading progress:', error)
      if(data && data.length > 0) {
        setHasLoaded(true)
        setUnlockedLevels(data[0].unlocked_levels)
        setLessonProgress(data[0].lesson_progress)
        
      }
    }
  }
  loadProgress()
}, [user])
  return(
    <Routes>
      <Route path='/' element={<HomeScreen unlockedLevels={unlockedLevels}/>} />
      <Route element={<Layout />}>
        <Route path='/game' element={<GameScreen unlockedLevels={unlockedLevels} setUnlockedLevels={setUnlockedLevels} lessonProgress={lessonProgress} setLessonProgress={setLessonProgress}/>} />
        <Route path='/free' element={<FreeModeScreen />} />
        <Route path='/onboarding' element={<OnBoarding />} />
      </Route>
    </Routes>
  )


}

export default App;