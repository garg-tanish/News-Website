import React from 'react'
import axios from 'axios';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faVolumeHigh, faVolumeXmark } from '@fortawesome/free-solid-svg-icons';
import { library } from '@fortawesome/fontawesome-svg-core';
import Spinner from './Spinner';

library.add(faVolumeHigh, faVolumeXmark);

const NewsItems = (props) => {

  let { srcUrl, title, description, url, author, date, source } = props;
  const [speaking, setSpeaking] = React.useState(false)
  const [icon, setIcon] = React.useState("fa-solid fa-volume-xmark");
  const [links, setLinks] = React.useState([])
  const [imgHeight, setImgHeight] = React.useState([]);
  const ref = React.useRef(null);
  const synth = window.speechSynthesis;
  const [loading, setLoading] = React.useState(false)

  React.useLayoutEffect(() => {
    const { height } = ref.current.getBoundingClientRect();
    setImgHeight(height);
  }, []);

  const speak = (title) => {
    const text = title;
    const utterance = new SpeechSynthesisUtterance(text);
    utterance.rate = 0.8;
    setIcon('fa-solid fa-volume-high')
    if (speaking) {
      synth.cancel();
      setSpeaking(false)
      setIcon('fa-solid fa-volume-xmark')
      return;
    }
    utterance.onend = () => {
      setIcon('fa-solid fa-volume-xmark')
    }
    synth.speak(utterance);
    setSpeaking(true)
  }

  const searchArticles = async () => {
    if (!links.length) {
      try {
        setLoading(true)
        const response = await axios.get(`http://localhost:3001/search?query=${props.title}`);
        setLinks(response.data.slice(1))
        setLoading(false)
      } catch (error) {
        console.error('Error searching articles:', error);
      }
    }
  }

  return (
    <>
      <div ref={ref} className={`card text-${(props.mode === "light") ? "dark" : "light"} bg-${(props.mode === "light") ? "light" : "dark"}`} style={{ width: "100%", height: "auto" }}>
        <div className="row align-items-start justify-content-start">
          <img src={srcUrl} className='col-12 col-md-3' alt={source} height={imgHeight > 400 ? "auto" : imgHeight} />
          <div className='col-12 col-md-9'>
            <div className="card-body" style={{ marginTop: "7px" }}>
              <h5 className="card-title">{title}</h5>
              <p className="card-text">{description}</p>
              <p className="card-text"><small className={`text-${(props.mode === "light") ? "dark" : "light"}`}>By {!author ? "Unknown" : author} on {new Date(date).toGMTString()}</small>
              </p>
              <span className='m-0 p-0 d-flex justify-content-flex-end'>
                <a href={url} target='_blank' role="button" rel="noreferrer" className={` btn btn-sm btn-${(props.mode === "light") ? "dark" : "primary"}`}>Continue Reading...</a>
              </span>
            </div>
          </div>
        </div>
        <div style={{ display: "flex", justifyContent: "flex-end", position: "absolute", right: "0" }}>
          <button type="button" className="badge rounded-pill bg-primary" data-bs-toggle="collapse" data-bs-target={'#links' + props.index} aria-expanded="false" aria-controls={'links' + props.index} onClick={searchArticles} style={{ cursor: "pointer", border: 'none' }}>{source}</button>
        </div>
        <div style={{ display: "flex", justifyContent: "flex-end", position: "absolute", bottom: "10px", right: "20px" }}>
          <FontAwesomeIcon icon={`${icon}`} onClick={() => { speak(title) }} style={{ cursor: "pointer" }} />
        </div>
      </div>
      <div className="collapse" id={'links' + props.index}>
        <div className={`card card-body my-2 bg-${(props.mode === "dark") ? "dark" : "light"}`} style={{ height: '200px', overflowY: 'auto' }}>
          {
            loading && <Spinner />
          }
          <ul>
            {
              links.map((l, k) => (
                <li key={k}><a className='text-break' target='_blank' rel="noreferrer" href={l} style={{ textDecoration: 'none' }}>{l}</a>
                  <br /><hr />
                </li>
              ))
            }
          </ul>
        </div>
      </div>
    </>
  )
}

export default NewsItems