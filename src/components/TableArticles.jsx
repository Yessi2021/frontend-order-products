import { useState } from "react"
import ModalEditArt from "../modal/ModalEditArt";
import axios from "axios";
import ModalAbout from "../modal/ModalAbout";
import dataCrud from "./api/crud";


export const TableArticles = ({art, getData}) => {
 const { _id, name,price } = art
 
 
  
 const [getOne, setGetone ] = useState([])
 const [show, setShow] = useState(false)
 const [showAbout, setShowAbout] = useState(false)
 const [activeModalEdit, setActiveModalEdit] = useState(false)

 const handleEdit = (product) => {
    //  console.log(product);
     setGetone(product)
      setShow(!show)
  }

  
  const handleDelete = async (id) => {
    try {
        axios.delete(`${dataCrud}/api/${id}`)
        getData()
    } catch (error) {
      console.log(error);
      
    }

  }


  const handleAbout = (art) => {
      console.log( art );
      setShowAbout(true)
      setActiveModalEdit(true)
      setGetone(art)
  }

  return (

 <>
  
    {
        getOne !== undefined &&  <ModalEditArt getOne={getOne} getData={getData} setShow={setShow} show={show}  />
      }

    {
        showAbout !== false &&  <ModalAbout 
        getOne={getOne} 
        setActiveModalEdit={setActiveModalEdit}
         activeModalEdit={activeModalEdit}  
          />
      }

<tr key={ _id } >
    <td> {name} </td>
    <td>{ _id }</td>
    <td> { price } </td>
    <td> <button
     className="btn btn-warning"
     onClick={ () => handleEdit(art) }
      > Edit 
      </button> 
    </td>
    <td> 
      <button 
    className="btn btn-danger"
    onClick={ ()=> handleDelete(_id) }
    >
       Delete 
       </button> 
     </td>
     <td>
      <button 
      className="btn btn-info"
      onClick={ ()=> handleAbout(art) }
       >
        about article
      </button>
     </td>
  </tr>

    </>
 
  )
}
