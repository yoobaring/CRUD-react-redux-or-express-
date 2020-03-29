import React from 'react'
import axios from 'axios'
import { useSelector, useDispatch } from 'react-redux';
import ListStudent from './ListStudent'
import './Style.css'


const Student =()=>{
const dispatch = useDispatch();
const form = useSelector(state => state.form)
const students = useSelector(state => state.student)  
const addStudent = async () => {
        await axios.post(`http://localhost/api/students`, form)
        dispatch({
            type: 'ADD_STUDENT', student: {
                no: students.length > 0 ? students[students.length-1].no+1 : 0,
                ...form
            }
        })
    }

    return (
        <div >
            
            <ListStudent/>
            <br/>
            <h2>GET STUDENTS</h2>
            {form.name}  {form.surname} {form.id} {form.Major} {form.GPA} 
            <br/>
            <input
            type="text"
            placeholder="Enter name"
            onChange={(e) => dispatch({ type: 'CHANGE_NAME', name: e.target.value })}
            /><br/>
             <input
            type="text"
            placeholder="Enter surname"
            onChange={(e) => dispatch({ type: 'CHANGE_SURNAME', surname: e.target.value })}
            /><br/>
             <input
            type="text"
            placeholder="Enter id"
            onChange={(e) => dispatch({ type: 'CHANGE_ID', id: e.target.value })}
            /><br/>
             <input
            type="text"
            placeholder="Enter major"
            onChange={(e) => dispatch({ type: 'CHANGE_MAJOR', Major: e.target.value })}
            /><br/>
             <input
            type="number"
            placeholder="Enter GPA"
            onChange={(e) => dispatch({ type: 'CHANGE_GPA', GPA: e.target.value })}
            /><br/>
            <button className="button button1" onClick ={addStudent}>ADD STUDENTS</button>
        </div>
        
    )
}
export default Student