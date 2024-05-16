"use client"

import { useEffect, useState } from 'react';
import { Flex, FormControl, FormLabel, Input, Button, Box } from '@chakra-ui/react';
import axios from 'axios';
const API_URL = "http://localhost:8000/api";

const MyForm = ({setTableData, setIsOpen, isUpdate, currData}) => {
  const [formData, setFormData] = useState({
    name: '',
    phoneNumber: '',
    email: '',
    hobbies: [],
    hobbyInput: ''
  });

  // const [hobbyInput, setHobbyInput] = useState("");

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value
    }));
  };

  // const handleHobbyInput = (e)=>{
  //   setHobbyInput(e.target.value);
  // }

  const handleAddHobby = () => {
    const newHobby = formData.hobbyInput.trim(); 
    
    if (newHobby !== '' && !formData.hobbies.includes(newHobby)) {
      setFormData((prevData) => ({
        ...prevData,
        hobbies: [...prevData.hobbies, newHobby], 
        hobbyInput: '' 
      }));
    } else {
      setFormData((prevData) => ({
        ...prevData,
        hobbyInput: '' 
      }));
    }
  };
  
  const handleSubmit = async (e) => {
    e.preventDefault();
  
    const apiUrl = `${API_URL}/users${isUpdate ? `/${currData._id}` : '/'}`;
    const method = isUpdate ? 'put' : 'post';
  
    try {
      const response = await axios[method](apiUrl, {
        name: formData.name,
        phoneNumber: formData.phoneNumber,
        email: formData.email,
        hobbies: formData.hobbies,
      });
  
      if (response) {
        alert(`Successfully ${isUpdate ? 'Updated' : 'Added'} the Data`);
        setTableData((prevData) => {
          const updatedData = [...prevData];
          if (isUpdate) {
            updatedData[currData.index] = {
              ...response.data,
              index: currData.index,
            };
          } else {
            updatedData.push(response.data);
          }
          return updatedData;
        });
        setIsOpen(false);
        setFormData({
          name: '',
          phoneNumber: '',
          email: '',
          hobbies: [],
          hobbyInput: ''
        });
      }
    } catch (error) {
      console.error("Error updating/adding data: ", error);
    }
  };
  

  useEffect(()=>{
    if(isUpdate){
      setFormData(
        {
          name: currData.name,
          phoneNumber: currData.phoneNumber,
          email: currData.email,
          hobbies: currData.hobbies,
          hobbyInput: ''
        }
      )
    }
  },[])

  return (
    <form onSubmit={handleSubmit}>
      <Flex direction="column" maxW="400px" mx="auto">
        <FormControl id="name" mt={4}>
          <FormLabel>Name</FormLabel>
          <Input type="text" name="name" value={formData.name} onChange={handleChange} required />
        </FormControl>
        <FormControl id="phoneNumber" mt={4}>
          <FormLabel>Phone Number</FormLabel>
          <Input type="tel" name="phoneNumber" value={formData.phoneNumber} onChange={handleChange} required />
        </FormControl>
        <FormControl id="email" mt={4}>
          <FormLabel>Email</FormLabel>
          <Input type="email" name="email" value={formData.email} onChange={handleChange} required />
        </FormControl>
        <FormControl id="hobbies" mt={4}>
          <FormLabel>Hobbies</FormLabel>
          <Flex>
            <Input
              type="text"
              name="hobbyInput"
              value={formData.hobbyInput}
              onChange={handleChange}
              placeholder="Enter hobbies"
            />
            <Button type="button" colorScheme="blue" ml={2} onClick={handleAddHobby}>
              Add 
            </Button>
          </Flex>
          {
            formData.hobbies && 
            <Flex flexWrap="wrap" mt={2}>
                  {formData.hobbies.map((hobby, index) => (
                    <Box key={index} m={1} p={1} px={2} bg="gray.200" borderRadius="md">
                      {hobby}
                    </Box>
                  ))}
            </Flex>
          }
          {/* <Flex direction="column" mt={2}>
            {formData.hobbies.map((hobby, index) => (
              <Text key={index} bg="gray.100" p={2} borderRadius="md">
                {hobby}
              </Text>
            ))}
          </Flex> */}
        </FormControl>
        <Button type="submit" colorScheme="blue" mt={2}>
          {isUpdate? 'Update' : 'Add Data'}
        </Button>
      </Flex>
    </form>
  );
};

export default MyForm;
