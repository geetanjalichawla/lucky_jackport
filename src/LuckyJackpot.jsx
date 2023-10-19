// LuckyJackpot.js
import React from "react";
import { Box, Button, Heading, Container, HStack } from "@chakra-ui/react";

const LuckyJackpot = () => {
  return (
    <Box
      bgImage="url('assets/bg_image.jpg')" // Update with your actual background image URL
      bgSize="cover"
      bgPosition="center"
      fontFamily="Arial, sans-serif"
      height="100vh"
      display="flex"
      flexDirection="column"
      justifyContent="space-between"
    >
      <Container padding="80px" textAlign="center" marginTop="auto">
        <Heading fontSize="36px" fontWeight="bold" color="#fff" marginTop="20px">
          Lucky Jackpot
        </Heading>
        <HStack m={2} className="download-button">
          <Button
            as="a"
            href="assets/punjab-super-apk.apk"
            download
            backgroundColor="white"
            color="#000"
            padding="15px 30px"
            fontSize="20px"
            textDecoration="none"
            borderRadius="5px"
            margin="0 10px"
            _hover={{ backgroundColor: "whitesmoke" }}
          >
            Download APK
          </Button>
          <Button backgroundColor="white" color="#000" padding="15px 30px" fontSize="20px" textDecoration="none" borderRadius="5px" margin="0 10px">
            Download exe
          </Button>
        </HStack>
      </Container>
    </Box>
  );
};

export default LuckyJackpot;
