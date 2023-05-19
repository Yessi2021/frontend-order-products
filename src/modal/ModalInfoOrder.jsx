import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import moment from 'moment';
import { useState } from 'react';
import Swal from 'sweetalert2';


import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';



function ModalInfoOrder( {setShow, show, oneOrder  }) {
console.log( oneOrder );
  
   const dateCreate = moment();
   const dateFormat = dateCreate.format('dddd, D MMMM YYYY');



    // personas[1].edad = 35;

  const navigate = useNavigate();

    const [formData, setFormData] = useState({
      description: ''
    });

// eliminar artuclos seleccionados en el backend


 const handleClose = () => setShow(false);
        

  return (
    <>  
      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>
            Information about your order
          </Modal.Title>
        </Modal.Header> 
        <Modal.Body>
        <div className="container">
      <div className="content m-4">
      {
        oneOrder.map( order => (
        <div className="card m-4" style={{width:"20rem"}} key={order._id} >
          <ul className="list-group list-group-flush">
            <li className="list-group-item">
              <strong>Name :</strong> {order.name}
            </li>
            <li className="list-group-item">
              <strong>Description :</strong> {order.descripcion}
            </li>
            <li className="list-group-item">
              <strong> Price :</strong> {order.price }
            </li>
            <li className="list-group-item">
              <strong>Tax :</strong> {order.tax}
            </li>
            <li className="list-group-item">
              <strong>Total price :</strong> {order.total}
            </li>

            <li className="list-group-item">
              <strong>Date :</strong> {order.date}
            </li>
           
          </ul>
        </div>
        ))
      }

      </div>

     </div>
        </Modal.Body>
        <Modal.Footer>
        <Button 
        variant="success"
        
         >
            Confirm your order
          </Button>
          <Button variant="secondary" onClick={ handleClose }>
            Cancelar
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
}

export default ModalInfoOrder;