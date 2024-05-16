import React from "react";
import { Spinner, Box, Heading } from "@chakra-ui/react";

const Loader = () => {
  return (
    <Box
      display="flex"
      justifyContent="center"
      alignItems="center"
      minHeight="100vh"
      minWidth="100vw"
      bgGradient="linear(to-r, blue.200, blue.400)"
    >
      <Box textAlign="center">
        <Spinner
          thickness="5px"
          speed="0.65s"
          emptyColor="gray.200"
          color="red"
          size="xl"
          mb={4} // Adds margin bottom for spacing
        />
        <Heading as="h2" size="lg" color="white">
          Loading Content, Please Wait
        </Heading>
      </Box>
    </Box>
  );
};

export default Loader;
