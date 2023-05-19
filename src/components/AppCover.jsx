import axios from "axios";
import { useEffect, useState } from "react";
import { TableArticles } from "./TableArticles";
import ModalAddArt from "../modal/ModalAddArt";
import dataCrud from "./api/crud";




export const AppCover = () => {

    const [data, setData] = useState([]);
    const [getOne, setGetone ] = useState([])
   
    
   const getData = async () => {
        try {
          const response = await axios.get(`${dataCrud}/api`)
          setData(response.data.articles);
    
    
        } catch (error) {
            console.log(error);
        }
    
      }

    
      useEffect(() => {
        getData()
        
      }, []);




  return (
    <>
   
   
     {
        getOne !== undefined &&  <ModalAddArt  getOne={getOne} getData={getData} />
      }

      <div>



<table className="table table-striped">
<thead>
    <tr>
      <th scope="col">Name</th>
      <th scope="col">Reference</th>
      <th scope="col">Price</th>
    </tr>
  </thead>
<tbody>
    {
      data.length === 0 && (<div className="container-fluid m-auto">
          <h2 className="text-center m-4">There no articles</h2>
      </div>)
    }
    {    
       data.map((art ) => (
           <TableArticles art={art} key={art._id}
           getData={getData}
           />
        ))
     }
   </tbody>
  </table>
</div>
</>
  )
}
