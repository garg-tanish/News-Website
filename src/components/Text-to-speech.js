import React from 'react'
import '../styles/TtsButton.css'
import tts_icon_dark from '../images/text-to-speech-dark.png'
import tts_icon_light from '../images/text-to-speech-light.png'

const TtsButton = (props) => {

  const i = React.useRef(0);
  const speaking = React.useRef(false);
  const synth = window.speechSynthesis;

  const sleep = (ms) => {
    return new Promise(resolve => setTimeout(resolve, ms * 1000));
  }

  const startSpeaking = () => {
    const { news } = props;
    const text = news[i.current].title;
    const utterance = new SpeechSynthesisUtterance(text);
    utterance.rate = 0.8;

    if (i.current > news.length) {
      i.current = 0;
      speaking.current = false
    }

    if (speaking.current) {
      synth.cancel();
      speaking.current = false;
      return;
    }
    utterance.onend = async () => {
      speaking.current = false;
      i.current = i.current + 1;
      await sleep(1)
      startSpeaking();
    }
    synth.speak(utterance);
    speaking.current = true
  }

  return (
    <div onClick={startSpeaking}>
      <img id='tts-icon' src={props.mode === 'dark' ? tts_icon_dark : tts_icon_light} alt='tts-icon' width={"35px"} height={"35px"} style={{ cursor: "pointer" }} />
    </div>
  )
}

export default TtsButton
