import React, { useState } from 'react'
import Navbar from './components/Navbar';
import News from './components/News';
import LoadingBar from 'react-top-loading-bar';
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";

const App = () => {
  const pageSize = 7;
  const apiKey = "APP_NEWS_APIKEY"

  const [progress, setProgress] = useState(0)
  const [mode, setMode] = useState('light');
  const [icon, setIcon] = React.useState('fa-solid fa-moon');

  const toggleMode = () => {
    if (mode === "light") {
      setMode("dark");
      setIcon('fa-solid fa-sun')
      document.body.style.backgroundColor = "rgb(16 20 24)";
      document.body.style.color = "white";
    }
    else {
      setMode("light");
      setIcon('fa-solid fa-moon')
      document.body.style.backgroundColor = "white";
      document.body.style.color = "black";
    }
  }


  return (
    <>
      <Router>
        <Navbar mode={mode} toggleMode={toggleMode} icon={icon} />
        <LoadingBar color='#f11946' height={2} progress={progress} />
        <div className='container my-3'>
          <Routes>
            <Route exact path="/" element={<News
              {...{
                setProgress,
                mode,
                apiKey,
                pageSize
              }}
              key="general" country={"in"} category={"general"} />}></Route>
            <Route exact path="/business-in" element={<News setProgress={setProgress} mode={mode} apiKey={apiKey} key="business-in" pageSize={pageSize} country={"in"} category={"business"} />}></Route>
            <Route exact path="/entertainment-in" element={<News setProgress={setProgress} mode={mode} apiKey={apiKey} key="entertainment-in" pageSize={pageSize} country={"in"} category={"entertainment"} />}></Route>
            <Route exact path="/health-in" element={<News setProgress={setProgress} mode={mode} apiKey={apiKey} key="health-in" pageSize={pageSize} country={"in"} category={"health"} />}></Route>
            <Route exact path="/science-in" element={<News setProgress={setProgress} mode={mode} apiKey={apiKey} key="science-in" pageSize={pageSize} country={"in"} category={"science"} />}></Route>
            <Route exact path="/sports-in" element={<News setProgress={setProgress} mode={mode} apiKey={apiKey} key="sports-in" pageSize={pageSize} country={"in"} category={"sports"} />}></Route>
            <Route exact path="/technology-in" element={<News setProgress={setProgress} mode={mode} apiKey={apiKey} key="technology-in" pageSize={pageSize} country={"in"} category={"technology"} />}></Route>
            <Route exact path="/business-us" element={<News setProgress={setProgress} mode={mode} apiKey={apiKey} key="business-us" pageSize={pageSize} country={"us"} category={"business"} />}></Route>
            <Route exact path="/entertainment-us" element={<News setProgress={setProgress} mode={mode} apiKey={apiKey} key="entertainment-us" pageSize={pageSize} country={"us"} category={"entertainment"} />}></Route>
            <Route exact path="/health-us" element={<News setProgress={setProgress} mode={mode} apiKey={apiKey} key="health-us" pageSize={pageSize} country={"us"} category={"health"} />}></Route>
            <Route exact path="/general-us" element={<News setProgress={setProgress} mode={mode} apiKey={apiKey} key="general-us" pageSize={pageSize} country={"us"} category={"general"} />}></Route>
            <Route exact path="/science-us" element={<News setProgress={setProgress} mode={mode} apiKey={apiKey} key="science-us" pageSize={pageSize} country={"us"} category={"science"} />}></Route>
            <Route exact path="/sports-us" element={<News setProgress={setProgress} mode={mode} apiKey={apiKey} key="sports-us" pageSize={pageSize} country={"us"} category={"sports"} />}></Route>
            <Route exact path="/technology-us" element={<News setProgress={setProgress} mode={mode} apiKey={apiKey} key="technology-us" pageSize={pageSize} country={"us"} category={"technology"} />}></Route>
          </Routes>
        </div>
      </Router>
    </>
  )
}

export default App
