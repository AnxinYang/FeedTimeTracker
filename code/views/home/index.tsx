import type { NextPage } from 'next'
import { useState } from 'react'
import {FeedTime} from "@defines/global-types";
import {STORAGE_KEY,MAX_DISPLAY_RECORD, VOL_LIST} from '@defines/global-const'
import styles from "./index.module.css";


const Home: NextPage = () => {
  
  const [feedTimes, setFeedTimes] = useState<FeedTime[]>([]);
   
  const loadFeedTimes = ()=>{
    const json = localStorage.getItem(STORAGE_KEY) ?? "[]";
    const feedTimes = JSON.parse(json);
    localStorage.setItem(STORAGE_KEY, JSON.stringify(feedTimes));
    setFeedTimes(feedTimes);
  }
  
  const updateFeedTimes = (vol?:number)=>{
    const arr = [...feedTimes];
    if(vol){
      arr.unshift({
        date:Date.now(),
        volumn:vol
      })
    }
    const json = JSON.stringify(arr);
    localStorage.setItem(STORAGE_KEY, json);
    setFeedTimes(arr);
  }
  
  const formatTime = (date?:number)=>{
    if(!date)return '';
    const d = new Date(date);
    
    return `${d.getHours()}:${d.getMinutes()}`;
    
  }
  
  const formatDiff = (date?:number)=>{
    if(!date)return '';
    const diff = Date.now() - date;
    
    return `${(diff/1000/60).toFixed(0)} mins ago`
  }
  
  return (
    <div className={styles.container} onLoad={loadFeedTimes}>
      <div className={styles.timesContainer}>
          <section className={styles.timeList}>
          {feedTimes.filter((f,i)=>i<MAX_DISPLAY_RECORD).map((ft,idx)=>{
            return <div key={idx}><span style={{
              fontSize:`${2-(0.2*idx)}rem`,
              opacity:`${1 - ((1/MAX_DISPLAY_RECORD)* idx)}`
            }}>{formatTime(ft.date)} - {ft.volumn??''}oz</span>
            {idx ===0?<span>{formatDiff(ft.date)}</span>:null}
            </div>
          })}
            </section>
            </div>
            <section>
              {VOL_LIST.map((v,i)=>{
                return <button className={styles.volBtn} onClick={()=>updateFeedTimes(v)} key={i}>{v}oz</button>
              })}
              </section>
    </div>
  )
}

export default Home
