import React, { useState, useEffect } from 'react'
import Form from 'react-bootstrap/Form';
import { useNavigate, useParams } from 'react-router-dom'
import Button from 'react-bootstrap/Button';
import {findIndexById} from './Delete'

function EditUser({data, setData}) {
    let {id} = useParams();
    let [name, setName] = useState("");
    let [des, setDes] = useState("");
    let [status, setStatus] = useState("");
    let navigate = useNavigate();
    const handleSubmit = ()=>{
        let index = findIndexById(data, Number(id));
        let datas = {id:Number(id),name, des, status};
        data.splice(index, 1, datas);
        setData([...data]);
        navigate('/')
      }
    
      const getData = ()=>{
        let index = findIndexById(data, Number(id));
        if(index !== -1){
          setName(data[index].name)
          setDes(data[index].des)
          setStatus(data[index].status)
        }
        else{
          alert('Invalid User Id')
        }
      }
      useEffect(()=>{
        if(id){
          getData();
        }
      }, [])
  return <>
    <div id="content-wrapper" className="d-flex flex-column">
        <div id="content">
            <div className="container-fluid">
                <div className="d-sm-flex align-items-center justify-content-between mb-4">
                    <h1 className="h3 mb-0 text-gray-800">Edit User</h1>
                </div>
                <div className="row">
                    <Form>
                        <Form.Group className='mb-3'>
                            <Form.Label>Name</Form.Label>
                            <Form.Control type='text' placeholder='Enter ToDo Name' value={name} onChange={(e)=>setName(e.target.value)}/>
                        </Form.Group>
                        <Form.Group className='mb-3'>
                            <Form.Label>Description</Form.Label>
                            <Form.Control type='text' placeholder='Enter ToDo Description' value={des} onChange={(e)=>setDes(e.target.value)}/>
                        </Form.Group>
                        <Form.Group className='mb-3'>
                            <Form.Label>Status</Form.Label>
                            <Form.Select value={status} onChange={(e)=>setStatus(e.target.value)}>
                            <option value="Completed">Completed</option>
                            <option value="Not Completed">Not Completed</option>
                            </Form.Select>
                        </Form.Group>
                        <Button variant="primary" onClick={()=>handleSubmit()}>
                            Submit
                        </Button>
                    </Form>
                </div>
            </div>
        </div>
    </div>
  </>
}

export default EditUser