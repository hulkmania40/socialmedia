import React, {useState, useEffect} from 'react'
import Axios from 'axios';
import { useAuthState } from "react-firebase-hooks/auth";
import { useNavigate } from "react-router-dom";
import { auth, db, logout } from "./firebase";
import { query, collection, getDocs, where } from "firebase/firestore";
import Pagination from '@material-ui/lab/Pagination';

import '../css/Home.css'
import Card from './Card'

export default function Home() {
  const [call, setCall] = useState([])
  const [user, loading, error] = useAuthState(auth);
  const [name, setName] = useState("");

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
  
  useEffect(() => {
    if (loading) return;
    fetchUserName();
    getJoke();
  }, [user, loading]);

  const getJoke = () => {
    Axios.get(`https://jsonplaceholder.typicode.com/todos/`).then((response)=>{
      setCall(response.data)
    })
  }
  
  return (
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
          call.map(item => <Card data={item} key={item.id}/>)
      }
        </tbody>
      </table>
    </div>
  );
}
