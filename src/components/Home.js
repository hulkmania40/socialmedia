import React, {useState, useEffect} from 'react'
import axios from 'axios'
import { useAuthState } from "react-firebase-hooks/auth";
import { auth, db } from "./firebase";
import { query, collection, getDocs, where } from "firebase/firestore";

import '../css/Home.css'
import Card from './Card'
import Loader from './Loader'

export default function Home() {
  const [call, setCall] = useState([])
  const [user, loading, error] = useAuthState(auth);
  const [name, setName] = useState("");
  const [isLoading, setLoading] = useState(true)

  const fetchUserName = async () => {
    try {
      const q = query(collection(db, "users"), where("uid", "==", user?.uid));
      const doc = await getDocs(q);
      const data = doc.docs[0].data();

      setName(data.name);
    } catch (err) {
      console.error(err);
      setName("Guest")
    }
  };
  

  useEffect (() => {
    fetchUserName();
    const getItems =  async () =>{
      const result = await axios (
        `https://jsonplaceholder.typicode.com/todos/` //Endpoint and parameter or base Url
        )
      console.log(result.data)

      setCall(result.data)//sets the data to appear 
      setLoading(false) //stop loading when data is fetched
    }
    getItems()

  }, [])

  return (isLoading? (<Loader />):(
    <div className='container'>
     Hello {name}
     
     <table className='container table table-bordered table-hover'>
        <thead className='thead-dark'>
          <tr className='text-center'>
            <th>ID</th>
            <th>Title</th>
            <th>Completed</th>
          </tr>
        </thead>
        <tbody>
      {
          call.map(item => <Card isLoading ={isLoading} data={item} key={item.id}/>)
      }
        </tbody>
      </table>
    </div>
  ));
}
