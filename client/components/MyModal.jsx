"use client"

import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalCloseButton,
} from '@chakra-ui/modal';

import MyForm from "./MyForm"

const MyModal = ({isOpen, handleCloseModal, setTableData, setIsOpen, isUpdate, currData}) => {
    return (
        <Modal isOpen={isOpen} onClose={handleCloseModal} isCentered>
          <ModalOverlay />
          <ModalContent>
            <ModalHeader>
              {isUpdate? "Update Data" : "Add New Data"}
              <ModalCloseButton />
            </ModalHeader>
            <ModalBody>
              <MyForm setTableData={setTableData} setIsOpen={setIsOpen} isUpdate={isUpdate} currData={currData} />
            </ModalBody>
          </ModalContent>
        </Modal>
    );
}

export default MyModal
