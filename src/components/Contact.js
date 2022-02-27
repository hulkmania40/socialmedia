import React, { useState, useEffect } from 'react'
import ContactForm from './ContactForm'
import {fireDb} from './firebase'
import { v4 as uuidv4 } from 'uuid';

import { ref, set, get, child, getDatabase } from "firebase/database";


export default function Contact() {

    const [contactObjects, setContactObjects] = useState({})
    const [currentId, setCurrentId] = useState('')

    const dbRef = ref(getDatabase());

    useEffect(()=>{
        get(child(dbRef, 'contacts/')).then((snapshot) => {
            if (snapshot.exists()) {
                const data=snapshot.val()
                setContactObjects({
                    ...data
                })
            } else {
              console.log("No data available");
            }
          }).catch((error) => {
            console.error(error);
          });

    },[])  //similar to componentDidMount

    const id = uuidv4();
    const addOrEdit = obj=>{
        set(ref(fireDb, 'contacts/'+id), obj);
    }

  return (
    <div className='container'>
        <div className="jumbotron jumbotron-fluid">
            <div className="container">
                <h1 className="display-4 text-center">Contact Register</h1>
            </div>
        </div>
        <div className='row'>
            <div className='col-md-5'>
                <ContactForm {...({ addOrEdit, currentId, contactObjects })} />
            </div>
            <div className='col-md-7'>
                <table className='table table-borderless table-stripped'>
                    <thead className='thead-light'>
                        <tr>
                            <th>Full Name</th>
                            <th>Mobile</th>
                            <th>Email</th>
                            <th>Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            Object.keys(contactObjects).map(id=>{
                                return (
                                <tr key={id}>
                                    <td>{contactObjects[id].fullName}</td>
                                    <td>{contactObjects[id].mobile}</td>
                                    <td>{contactObjects[id].email}</td>
                                    <td>
                                        <a className='btn text-primary' onClick={()=> {setCurrentId(id)}}>
                                            <i className='fas fa-pencil-alt'></i>
                                        </a>
                                        <a className='btn text-danger'>
                                            <i className='fas fa-trash-alt'></i>
                                        </a>
                                    </td>
                                </tr>
                            )})
                        }
                    </tbody>
                </table>
            </div>
        </div>
    </div>
  )
}
