import React, { useState } from 'react';
import { Modal } from '../../context/Modal';
import EditSpotForm from './createSpotForm';


function EditSpotFormModal(){
  const [showModal, setShowModal] = useState(false)
  console.log("something")


  return (
    <>
      <button className="edit-button" onClick={() => setShowModal(true)}>Edit</button>
      {showModal && (
        <Modal onClose={() => setShowModal(false)}>
          <EditSpotForm />
        </Modal>
      )}
    </>
  );
}

export default EditSpotFormModal
