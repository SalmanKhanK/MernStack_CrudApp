import React,{useState,useEffect} from 'react';
import {TextField,Container,Button} from '@material-ui/core/';
import './App.css'
import axios from 'axios'

function App() {
  let ApiUrl="http://localhost:5000/api/todo";
  const [text, setText] = useState([]);
  const [isText,setisText]=useState(false);
  const [isUpdate,SetisUpdate]=useState(false)
  const [updateId,SetUpdateId]=useState();
  const [AddtextDisabledBtn,SetAddTextDisbaledbtn]=useState(false)
  const [addText,SetaddText]=useState("");
useEffect(() => {
       async function getTodo(){
          await axios.get(ApiUrl)
          .then((data)=>{
            setText(data.data)
            setisText(true)
          }).catch((e)=>{
            console.log("Error",e)
          })
       }
       getTodo()
}, [text])

 async function handleSubmit(e){
    console.log(addText)
       e.preventDefault()
      console.log(!isUpdate)
       if(!isUpdate){
        SetAddTextDisbaledbtn(true)
       await axios.post("http://localhost:5000/api/todo/",{text:addText}).then((res)=>{
 
           console.log(res);
          SetAddTextDisbaledbtn(false)
       }).catch((e)=>{
         console.log(e,"Error")
       })
       SetaddText("");
      }
      else{
        axios.put(`${ApiUrl}/${updateId._id}`,{text:addText}).then((res)=>{
          SetisUpdate(false)
          SetaddText("")
          console.log(res,"Respond success")
             }).catch((e)=>{
       console.log(e,"Error")
     })
        
  
      }
  }
  // Delete Todo
    function deleteTodo(id){
     console.log(id,"idss")
              axios.delete(`${ApiUrl}/${id}`).then((res)=>{
                  console.log(res,"ResponceSuccess Delet")
              }).catch((e)=>{
                console.log(e,"Errordelete")
              })
  }
  // Update Todo
      function updateTodo(id){
            console.log(id,"UpdateTodo")
            SetisUpdate(true)
            const updateText=text.find((data)=>data._id===id)
            SetUpdateId(updateText);
          }
  return (
    <Container className="container">
      <h2 className="heading">MERN STACK CRUD APP</h2>
       <form onSubmit={handleSubmit}>
         <div>
            <TextField id="outlined-basic" label="Add Todo" variant="outlined" className="textfield"
            onChange={(e)=>SetaddText(e.target.value)} 
              value={addText}
              // disabled={AddtextDisabledBtn}
            />
            </div>
            <br/>
            <div>
            <Button className="btnSubmit" variant="contained" color="primary" type="submit">
                  {!isUpdate ? "Add":"Edit"}
            </Button>
            </div>
       </form>
       <div>
             {isText ?
               text.map((todo,key)=>{
                 return(
                   <div key={key}>
                        <li className="list">{todo.text}</li>
                            <Button variant="contained" color="secondary" onClick={()=>{deleteTodo(todo._id)}}>
                              Delete
                            </Button>
                            <span className="btnmargin"/>
                            <Button variant="contained" color="primary" onClick={()=>{updateTodo(todo._id,addText)}}>
                              Update
                            </Button>
       
                   </div>
                 )
               })
            :null  }
       </div>
    </Container>
  );
}
export default App;
