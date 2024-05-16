'use client'

// pages/Home.js
import React, { useEffect, useState } from 'react';
import MyTable from '@components/MyTable';
import Modal from "@components/MyModal";
import {Button} from '@chakra-ui/react';
import {Flex, Box } from '@chakra-ui/react';
import axios from "axios";

const API_URL = "http://localhost:8000/api";

const Home = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [selectedData, setSelectedData] = useState([]);
  const [currData, setCurrData] = useState(null);
  const [isUpdate, setIsUpdate] = useState(false);

  const [loading, setLoading] = useState(false);
  const [sendLoading, setSendLoading] = useState(false);
  const [sendAllLoading, setSendAllLoading] = useState(false);


  const [tableData, setTableData] = useState([]);

  const handleOpenModal = () => setIsOpen(true);
  const handleCloseModal = () => setIsOpen(false);

  const handleCheckboxChange = (id) => {
    setSelectedData((prevData) => {
      const newData = [...prevData]; 
      const dataIndex = newData.indexOf(id); 
  
      if (dataIndex === -1) {
        newData.push(id);
      } else {
        newData.splice(dataIndex, 1);
      }
  
      return newData; 
    });
  };
  

  const handleUpdateClick = (index) => {
    handleOpenModal();
    setIsUpdate(true);
    setCurrData({...tableData[index], index});
  };

  useEffect(()=>{
    console.log(currData);
  },[currData])

  const handleDeleteClick = async (id,index) => {
    const cnf = confirm("Are You Sure you want to delete this.");
    console.log(cnf);
    if(cnf){
      const response = await axios.delete(`${API_URL}/users/${id}`)

      if(response){
        alert("Successfully Deleted the Data")
        setTableData((prevData)=>{
          const currData = [...prevData];
          currData.splice(index,1);
  
          return currData;
        })
      }
      console.log('Successfully Deleted');
    }else{
      console.log('Sure, your data is not deleted')
    }
  };

  const handleSendData = async (sendAll)=>{
    sendAll? setSendAllLoading(true) : setSendLoading(true);
    try{
      const response = await axios.post(`${API_URL}/users/send-email`, {
        selectedUsers: selectedData,
        sendAll: sendAll
      })

      if(response){
        alert("Successfully Sended the Data")
      }
    }
    catch(error){
      console.log(error.message);
    }
    finally{
      sendAll? setSendAllLoading(false) : setSendLoading(false);
    }
  }

  useEffect(()=>{
    console.log(selectedData);
  },[selectedData]);

  useEffect(()=>{
    setLoading(true);
    const fetchData = async () => {
      try {
        const response = await axios.get(`${API_URL}/users/`);
        if(response){
          console.log("data is here")
          console.log(response.data);
          setTableData(response.data);
        }
        console.log(response.data); // Handle the data as needed
      } catch (e) {
        console.log(e.message); // Handle error
      }finally{
        setLoading(false);
      }
    };

    fetchData();
  },[])

  return loading? 
    <Box>
      Loading....
    </Box>
    :
    <Box>
      <Flex
        justifyContent="space-around"
        direction={{ base: "column", sm: "row" }}
        flexWrap="wrap"
        // border={"1px solid black"}
        p={1}
      >
        <Box width={{ base: "100%", sm: "50%", md: "33%" }} p={1} disabled={true}>
          <Button onClick={()=> {
            handleOpenModal();
            setIsUpdate(false);
            // setCurrData(null);
          }} width="100%">
            Add New Data
          </Button>
        </Box>
        <Box width={{ base: "100%", sm: "50%", md: "33%" }} p={1} >
          <Button onClick={()=>handleSendData(false)} width="100%" disabled={true}>
            {sendLoading? "Sending...": "Send Selected Data"}
          </Button>
        </Box>
        <Box width={{ base: "100%", sm: "100%", md: "33%" }} p={1} >
          <Button onClick={()=>handleSendData(true)} width="100%">
            {sendAllLoading? "Sending...": "Send All Data"}
          </Button>
        </Box>
      </Flex>

      <MyTable 
        data={tableData} 
        onCheckboxChange={handleCheckboxChange} 
        onUpdateClick={handleUpdateClick} 
        onDeleteClick={handleDeleteClick} 
      />

      <Modal isOpen={isOpen} handleCloseModal={handleCloseModal} setTableData={setTableData} setIsOpen={setIsOpen} isUpdate={isUpdate} currData={currData} />
    </Box>
};

export default Home;
