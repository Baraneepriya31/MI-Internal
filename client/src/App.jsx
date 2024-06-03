import './App.css'
import axios from "axios";
import { useEffect, useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEdit } from '@fortawesome/free-solid-svg-icons';
import { faTrash } from '@fortawesome/free-solid-svg-icons';


function App() {
    const [users, setUsers] = useState([]);
    const [filterusers, setFilteredUsers]=useState([]);
    const [isModelOpen, setIsModelOpen] =  useState(false);
    const [userData, setUserData] = useState({name:"",registerno:"",department:"", city: ""});

    const getAllUsers =async()=>{
      await axios.get("http://localhost:4000/users").then
      ((res)=>{
        setUsers(res.data);
        setFilteredUsers(res.data);
        
      });
    };
    useEffect(()=>{
      getAllUsers();
    }, []);
    //SearchFunction
    const handleSearchChange= (e)=>{
      const searchText = e.target.value.toLowerCase();
      const searchNumber = e.target.value;
      const filteredUsers = users.filter((user)=>user.name.toLowerCase().
      includes(searchText)|| user.city.toLowerCase().includes(searchText) || user.registerno.includes(searchNumber));
      
      setFilteredUsers(filteredUsers);
    };
       
  //Delete User Function
  const handleDelete= async(id)=>{
  const isConfirmed = window.confirm("Are you sure you want to delete this user?");
      if (isConfirmed){
        await axios.delete(`http://localhost:4000/users/${id}`).then((res)=>{
          setUsers(res.data);
          setFilteredUsers(res.data);
        });
      }

    };

  //Close Model
  const closeModel =() =>{
    setIsModelOpen(false);
    getAllUsers();
  };


  //Add User details
  const handleAddRecord=()=>{
    setUserData({name:"",registerno:"",department:"", city:""});
    setIsModelOpen(true);
  };

  const handlesubmit= async (e)=>{
    e.preventDefault();
    if (userData.id) {
      await axios.patch(`http://localhost:4000/users/${userData.id}`,userData).
    then((res)=>{
      console.log(res);
      
    });
    }else{
    await axios.post("http://localhost:4000/users",userData).
    then((res)=>{
      console.log(res);
      
    });

  }
     closeModel();
     setUserData({name:"",registerno:"",department:"", city:""});
  };
  const handleData=(e) =>{
 setUserData({...userData,[e.target.name]:e.target.value
  
    });
    
  
       
  };

    //update user 

    const handleUpdateRecord = (user) => {
        setUserData(user);
        setIsModelOpen(true);
    }

  return (
    <>
      <div className = "container">
      <h3>Student Lists CRUD(Create,Read,Update,Delete)</h3>
      <div className="input-search">
  <input type="search" placeholder='Search Text Here' onChange={handleSearchChange} />
 <button onClick={handleAddRecord}className='btn blue'>Add Record</button>
        </div>
      <table className="table">
        <thead>
          <tr>
            <th>id</th>
            <th>Name</th>
            <th>Register No</th>
            <th>Department</th>
            <th>City</th>
            <th>Edit</th>
            <th>Delete</th>
          </tr>
        </thead>
        <tbody>
          {filterusers 
          && filterusers.map((user,index) => {
              return (
            <tr key={user.id}>
              <td>{index+1}</td>
              <td>{user.name}</td>
              <td>{user.registerno}</td>
              <td>{user.department}</td>
              <td>{user.city}</td>
              <td>
                <button className="btn green" onClick={()=>handleUpdateRecord(user)} ><FontAwesomeIcon icon={faEdit} /></button>
              </td>
              <td>
                <button onClick={()=>handleDelete (user.id)} className='btn red' ><FontAwesomeIcon icon={faTrash} /></button>
              </td>
            </tr>
              );
            })}
        </tbody>
      </table>
      {isModelOpen &&(
        <div className='model'>
          <div className='model-content'>
            <span className='close' onClick={closeModel}>&times;</span>
            <h2>{userData.id  ? "Update Record" : "Add Record"}</h2>
            <div className="input-group">
              <label htmlFor="name">Full Name</label>
              <input type="text" value={userData.name} name="name" id="name" onChange={handleData} />
            </div>
            <div className="input-group">
              <label htmlFor="registerno">Register No</label>
              <input type="number" value={userData.registerno} name="registerno" id="registerno" onChange={handleData} />
            </div>
            <div className="input-group">
              <label htmlFor="department">Department</label>
              <input type="text" value={userData.department} name="department" id="department" onChange={handleData} />
            </div>
            <div className="input-group">
              <label htmlFor="city">City</label>
              <input type="text" value={userData.city} name="city" id="city" onChange={handleData} />
            </div>
           <button className="btn blue" onClick={handlesubmit}>{userData.id ? "Update User" : "Add User"}</button>
          </div>
        </div>
      )}
      </div>
    </>
  )
}

export default App

