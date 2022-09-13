import type { NextPage } from 'next'
import { useState } from 'react'
import {FeedTime} from "@defines/global-types";
import {styles} from "./index.module.css";

const STORAGE_KEY = 'feedTimes';

const Home: NextPage = () => {
  
  const [feedTimes, setFeedTimes] = useState<FeedTime[]>([]);
  const latestFeedTime = feedTimes[feedTimes.length-1] ?? {};
  const loadFeedTimes = ()=>{
    const json = localStorage.getItem(STORAGE_KEY) ?? "[]";
    const feedTimes = JSON.parse(json);
    localStorage.setItem(STORAGE_KEY, JSON.stringify(feedTimes));
    setFeedTimes(feedTimes);
  }
  
  const updateFeedTimes = ()=>{
    const json = JSON.stringify(feedTimes);
    localStorage.setItem(STORAGE_KEY, json);
  }
  
  return (
    <div onLoad={loadFeedTimes}>
      <section>
          <h1>Last Feed:</h1>
          </section>
          <section>
            <h1>{latestFeedTime.volumn?? "-"}oz at {latestFeedTime.date??"-"}</h1>
            </section>
    </div>
  )
}

export default Home
