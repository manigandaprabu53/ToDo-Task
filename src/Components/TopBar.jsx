import React, { useState } from 'react'
import {Form } from 'react-bootstrap';
import Stack from 'react-bootstrap/Stack';
import {Button} from 'react-bootstrap';
import Card from 'react-bootstrap/Card';
import {findIndexById} from './Delete';
import { useNavigate } from 'react-router-dom';



function TopBar({data, setData}) {
    console.log(data)
    let navigate = useNavigate();
    const [id,setId]=useState(0)
    // const [data, setData] = useState([]);
    const [name, setName] = useState("");
    const [des, setDes] = useState("");
    const [status, setStatus] = useState("Not Completed");
    const [cat, setCat] = useState("all");
    let handleFilter = (userData)=>{
      if(cat === "Completed")
      {
        return userData.filter((e)=>e.status === cat)
      }
      else if(cat === "Not Completed")
      {
        return userData.filter((e)=>e.status === cat)
      }
      else{
        return userData
      }
    }

    const handleClick = ()=>{
        setId(Number(id)+1);
        let task = {id:id+1 , name: name, des: des, status: status};
        // console.log(task)
        data.push(task);
        setData([...data]);
        // console.log(data);
    }
  const handleDelete = (i)=>{
    // console.log(i);
    let index = findIndexById(data, i);
    // console.log(index)
    if(index !== -1){
        data.splice(index, 1);
        setData([...data]);
    }
    else{
        alert('Invalid Id')
    }
  }
  return <>
    <div className="container">
        <div className="row">
            <h1 className='text-center text-success'>My ToDo</h1>
            <Form>
                <Stack direction="horizontal" className= 'mt-4 gap-3'>
                    <Form.Control className=' custom-size border border-success' type="text" placeholder="ToDo Name" onChange={(e)=>setName(e.target.value)}/>
                    <Form.Control className=' custom-size border border-success' type="text" placeholder="ToDo Description" onChange={(e)=>setDes(e.target.value)}/>
                    <Button variant="success" onClick={()=>handleClick()}>Add Task</Button>
                </Stack>
                <Form.Group className='d-flex justify-content-end mt-3 gap-2'>
                  <Form.Label>Status:</Form.Label>
                  <Form.Select style={{width: "30px", backgroundColor: "pink", height: "30px",}} defaultValue="All" onChange={(e)=>setCat(e.target.value)}>
                    <option value="All">All</option>
                    <option value="Completed">Completed</option>
                    <option value="Not Completed">Not Completed</option>
                  </Form.Select>
                </Form.Group>
            </Form>
        </div>
        <div className="Container mt-5 d-flex flex-wrap gap-3">
            {data.length?handleFilter(data).map((e)=>{
                return <Card key={e.id} bg= "success" style={{minWidth: "300px", maxWidth: "500px"}}>
                <Card.Body>
                  <Card.Text>
                    Name: {e.name}
                  </Card.Text>
                  <Card.Text>
                    Description: {e.des}
                  </Card.Text>
                  <Card.Text>
                    <Form.Group className='d-flex gap-1'>
                      <Form.Label>Status:</Form.Label>
                      <Form.Select defaultValue={e.status}>
                        <option value="Completed">Completed</option>
                        <option value="Not Completed">Not Completed</option>
                      </Form.Select>
                    </Form.Group>
                  </Card.Text>
                  <div className="d-flex justify-content-end gap-2">
                    <Button variant='primary' onClick={()=>navigate(`/edit-user/${e.id}`)}>Edit</Button>
                    <Button variant='danger' onClick={()=>handleDelete(e.id)}>Delete</Button>
                  </div>
                </Card.Body>
              </Card>
            }):<>No Data</>}
        </div>
    </div>
  </>
}

export default TopBar