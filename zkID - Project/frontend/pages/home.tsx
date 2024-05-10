import React, { useEffect, useState } from 'react'
import * as styles from "../styles/home"
import { HOME_PAGE_TEXT, URL } from '@components/constant'
import "@lottiefiles/lottie-player";

function Home() {

  const [text, setText] = useState<string>("")
  const [index, setIndex] = useState<number>(0)

  useEffect(() => {

    setTimeout(() => {
      const currentCharacter = HOME_PAGE_TEXT.charAt(index), nextCharacter = HOME_PAGE_TEXT.charAt(index + 1)
      if(currentCharacter === '<' && nextCharacter !== '/') {
        let i = index, count = 0, htmlText = "";
        while( i < HOME_PAGE_TEXT.length){
          htmlText += HOME_PAGE_TEXT[i];

          if(HOME_PAGE_TEXT[i] == ">") {
            count++;
          }

          if(count === 2) {
            setText(text + htmlText);
            setIndex(i);
            return;
          }

          i++;
        }

      } else{
        const newText = HOME_PAGE_TEXT.slice(0, index)
        setText(newText)
      }


      if(index + 1 === HOME_PAGE_TEXT.length){
        setIndex(0)
      }else{
        setIndex(index + 1)
      }

    }, 50)
  }, [index])

  return (
    <div className="grid grid-cols-12 h-full">
      <div className='bg-blue col-span-5' style={styles.left}>
        <lottie-player
          autoplay
          loop
          mode="normal"
          src={URL.HOME_PAGE_LOTTIE}
          style={styles.lottie}
        >
        </lottie-player>
      </div>
      <div className='px-8 py-24 col-span-7' style={styles.right}>
        <p className='' style={styles.title}>zk<span style={styles.titleSecond}>ID</span></p>
        <p className='text-2xl py-1' style={styles.subtitle}>A <span className='font-semibold'>Zero Knowledge Proof </span> - based <br/> Identity Management System</p>
        <p className='text-sm py-4 h-3/5' dangerouslySetInnerHTML={{__html: text}} style={styles.text}></p>
        {/* <button className='py-2 px-4 uppercase text-sm font-semibold rounded-md' style={styles.button}>Register</button> */}
      </div>
    </div>
  )
}

export default Home