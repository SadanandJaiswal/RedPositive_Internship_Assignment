// components/Table.js
import React from 'react';
import { Table, Thead, Tbody, Tr, Th, Td, Checkbox, IconButton, Flex, Box, Heading } from '@chakra-ui/react';
import { EditIcon, DeleteIcon } from "@chakra-ui/icons";

const MyTable = ({ data, onCheckboxChange, onUpdateClick, onDeleteClick }) => {
  if(data.length === 0){
    return (
      <Box
        display="flex"
        alignItems="center"
        justifyContent="center"
        border="1px solid"
        p={4}
      >
        <Heading as="h2" size="lg" fontWeight="bold">
          No Data To Show
        </Heading>
      </Box>
    )
  }else{
    return (
      <Table variant="simple">
        <Thead>
          <Tr>
            <Th>Select 
            </Th>
            <Th>ID</Th>
            <Th>Name</Th>
            <Th>Phone Number</Th>
            <Th>Email</Th>
            <Th>Hobbies</Th>
            <Th>Update/Delete</Th>
          </Tr>
        </Thead>
        <Tbody>
          {data.map((item, index) => (
            <Tr key={item.id}>
              <Td>
                <Checkbox onChange={() => onCheckboxChange(item._id)} />
              </Td>
              <Td>{index+1}</Td>
              <Td>{item.name}</Td>
              <Td>{item.phoneNumber}</Td>
              <Td>{item.email}</Td>
              <Td>
                <Flex wrap="wrap">
                  {item.hobbies.map((hobby, index) => (
                    <Box key={index} m={1} p={1} bg="gray.200" borderRadius="md">
                      {hobby}
                    </Box>
                  ))}
                </Flex>
              </Td>
              <Td>
                <IconButton
                  colorScheme="blue"
                  size="sm"
                  icon={<EditIcon />}
                  onClick={() => onUpdateClick(index)}
                />
                <IconButton
                  colorScheme="red"
                  size="sm"
                  ml={2}
                  icon={<DeleteIcon />}
                  onClick={() => onDeleteClick(item._id,index)}
                />
              </Td>
            </Tr>
          ))}
        </Tbody>
      </Table>
    );
  }
};

export default MyTable;
