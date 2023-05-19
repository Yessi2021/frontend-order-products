import axios from "axios";
import { useEffect, useState } from "react";

import ModalAddAOrder  from "../modal/ModalAddOrder"
import { TableOrder } from "../components/TableOrder";
import dataCrud from "../components/api/crud";


export const Order = () => {

    const [data, setdata] = useState([])
    const [openAddModal, setOpenAddModal] = useState(false)
    const [getValue, setGetValue] = useState([])
    const [show, setShow] = useState(false);
    const [order, setOrder] = useState([])
    const [formData, setFormData] = useState({
        articles:  []
    })

    

    const getData = async () => {
        try {
          const response = await axios.get(`${dataCrud}/api`)
          const getOrder = await axios.get(`${dataCrud}/api-order`)
        //  console.log(getOrder.data.order[0].order);
         setOrder(getOrder.data.order)
          
            setdata(response.data.articles)

    
        } catch (error) {
            console.log(error);
        }
    
    }

      useEffect(()=>{
        getData()
      },[])


      const handleSelect = async (event) => {
        let newData = []
        newData.push(data)

        newData.forEach( i => {
            i.forEach( j => {
              
                 if ( j._id === event.target.value ) {
                    setGetValue( [j,...getValue] )
                  
                 }  
               
            })

        })

      
      
      }


      let orderNotRepeat = [...new Set( getValue)];

     

     const handleInfoOrder = () => {
      setOpenAddModal(true)
      setShow(true)
     }

  
  return (

<>

    {
        openAddModal &&  <ModalAddAOrder setShow={ setShow } show={show}
        orderNotRepeat={ orderNotRepeat } data={data} setdata={setdata}
          getData={getData}
         
        />
      }

      

    <div className="row justify-content-center align-items-center">
        <h1 className='text-center mt-4'>Select your Article</h1>    
    </div>

  <select name='articles'
         className='form-control'
            required
            onChange={ handleSelect } 
            
         >
           <option disabled selected> Articles </option>
          
            { 
                data.map( (art) => (
                <option value={ art._id } key={art._id}
               
                >
                { art.name }
                </option> ))
                
             }
         </select>

  <button 
  className="btn btn-info mt-4" 
  onClick={ handleInfoOrder  }
  >
    Add your order
  </button>

  <h1> Orders </h1>

   {
    order.length === 0 && ( <h2> There are not orders </h2> )
   }

<div className="row">
{
  order.map( orders => (
    <div className="col-md-4" key={orders._id} >
    <TableOrder className="col-md-4" key={orders._id} orderId={orders._id} orders={orders} />
    </div>
  
  ))
}
   
</div>

    </>
  )
}
