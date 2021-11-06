import React, {useState, useEffect} from "react"
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import { IconButton } from '@mui/material';
import db from "./firebase"
import {doc, collection, onSnapshot, addDoc, query, orderBy, deleteDoc, setDoc} from "firebase/firestore";

function App() {
  const [input, setInput] = useState("")

  //GETTINGS LISTS
  const [lists, setLists] = useState([])
  useEffect(()=> {
    const q = query(collection(db, "shopping-lists"),  orderBy("timestamp", "desc"));

    const unsubscribe = onSnapshot(q, (snapshot) => {
      setLists(snapshot.docs.map(doc => ({...doc.data(), id: doc.id})))
      setInput("")
    });
      return () => unsubscribe()
 }, [])   
//ENDS HERE


//ADDING LISTS
  const handleClick = (e) => {
    e.preventDefault()

    if(input) {
      addDoc(collection(db, "shopping-lists"), {
        name: input,
        timestamp: new Date()
      }).catch(err => console.error(err))
    }//end of If statement
  
  }//end of handleClick

  //DELETE A DOC
  async function deleteDocument(id) {
      let request = await deleteDoc(doc(db, "shopping-lists", id));
      console.log(request)
  }
  


  //UPDATE A DOC

async function updateDocument(id) {
  const itemRef = doc(db, "shopping-lists", id);
  let name =  prompt("What would you like to update it to?")
  setDoc(itemRef, {
    name: name,
    timestamp: new Date()
  })
  
}
  
  return (
    <div className="w-full h-screen bg-gray-100 flex items-center justify-center flex-col">
      <h2 className="text-2xl text-gray-800 font-bold mb-6">Shopping List</h2>

      <div className="w-2/3 border shadow-md p-7">
      
        <form className="flex items-center justify-between mb-7">
            <input 
              type="text" name="item" 
              className="w-2/3 h-10 p-3 outline-none border border-gray-500"
              value={input}
              onChange={e => setInput(e.target.value)}
              />
            <button className="bg-green-400 p-3 rounded text-white" onClick={handleClick}>Save</button>
        </form>
        <div className="w-full ">
            {lists.map(list => (
              <div className="border-b w-full h-16 flex items-center justify-between" key={list.id}>
                <p>{list.name}</p>
                <div>
                  <IconButton   onClick={() => updateDocument(list.id)}>
                    <EditIcon/>
                  </IconButton>
                  
                  <IconButton onClick={() => deleteDocument(list.id)}>
                  <DeleteIcon/>
                  </IconButton>
                
                </div>
           
          </div>
            ))}          


        </div>
      </div>
    </div>
  );
}

export default App;
