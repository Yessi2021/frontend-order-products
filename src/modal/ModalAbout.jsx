import React, { useState } from 'react';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';


const  ModalAbout = ({activeModalEdit,setActiveModalEdit, getOne}) => {
    // console.log(getOne);

const { _id, name, descripcion, price, tax } = getOne



  return (
    <>
    

      <Modal
        show={activeModalEdit}
        onHide={() => setActiveModalEdit(false)}
        dialogClassName="modal-90w"
        aria-labelledby="example-custom-modal-styling-title"
      >
        <Modal.Header closeButton>
          <Modal.Title id="example-custom-modal-styling-title">
            <h2 className='text-center' >  About article</h2>
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
        <div className="card" style={{width:"25rem", margin:"auto"}} >
       
        <ul className="list-group list-group-flush p-4">
            <li className="list-group-item"> <strong>Name:</strong>  { name  } </li>
            <li className="list-group-item"> <strong>Description :</strong> { descripcion } </li>
            <li className="list-group-item"> <strong>Price :</strong> { price } </li>
            <li className="list-group-item"> <strong> Reference: </strong> { _id } </li>
            <li className="list-group-item"> <strong> { tax > 0 ? 'Tax :' : 'Not Tax :' } </strong> { tax } </li>
        </ul>
        </div>
        </Modal.Body>
      </Modal>
    </>
  );
}

export default ModalAbout;