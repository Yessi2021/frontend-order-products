import axios from "axios";
import { useState } from "react";
import ModalInfoOrder from "../modal/ModalInfoOrder";
import Swal from 'sweetalert2';
import { useNavigate } from 'react-router-dom';
import dataCrud from "./api/crud";

export const TableOrder = ({orderId, orders}) => {
     console.log( orders.order[0][0].about[0].description );
    const [oneOrder, setOneOrder] = useState([])
    const [show, setShow] = useState(false)
    const navigate = useNavigate();
  

    const getOrder = async () => {
        try {
             await axios.get(`${dataCrud}/api-order`)
        } catch (error) {
            console.log(error);
        }
    }

const handleView = async (id) => {
    console.log(id);
    try {
        const getOrderById = await axios.get(`${dataCrud}/api-order/${id}`)
         
        setShow(true)
        setOneOrder(getOrderById.data.order[0])
        
    } catch (error) {
        console.log(error);
    }
}



const handleDelete = async (id) =>{

    Swal.fire({
        title: 'Are you sure?',
        text: "You won't be able to revert this action. The order will be deleted",
        icon: 'warning',
        showCancelButton: true,
        confirmButtonText: 'Yes, delete it!',
        cancelButtonText: 'Cancel'
      }).then((result) => {

        if (result.value) {
           console.log(result.value)

            axios.delete(`${dataCrud}/api-order/${id}`).then((resp)=>{
                navigate('/')
                getOrder()
            }).catch((err)=> console.log(err))

          

          Swal.fire(
            'Deleted!',
            'Your file has been deleted.',
            'success'
          );
        
        } else if (result.dismiss === Swal.DismissReason.cancel) {
          Swal.fire(
            'Cancelled',
            'Your file is safe.',
            'error'
          );
        }
      });
}


  return (
 
 <div>

    {
        setShow &&  < ModalInfoOrder show={show}  setShow={setShow} 
            oneOrder={ oneOrder}
        />
    }



{/* <div className="row"> */}
    {
    orders.order.map( item => (
  
          
        <div className="card" style={{width:"20rem"}} key={item._id} >
         <div className="card-body">
            <h6 className="card-title">Id Order :
                 <span> { orderId } </span>
             </h6>
        <h6 className="card-subtitle mb-2 text-muted">
                  {
                      orders.order[0][0].about.map( des => (
                        <h6> { des.description } </h6>
                    ))
                } 

                {
                    orders.order[0].map( date => (
                        <p> {date.date} </p>
                    ))
                }
          
        </h6>
       
        <button className="btn btn-success m-2"
         onClick={ ()=> handleView(orderId) }
          >View Order
        </button>
        <button className="btn btn-danger"
            onClick={()=> handleDelete(orderId) }
        >
            Delete Order
        </button>
  </div>
</div>

            
        ))
     }
  

 </div>
      
  )
}
