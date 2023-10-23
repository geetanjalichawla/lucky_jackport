// LuckyJackpot.js
import React, { useEffect, useState } from "react";
import { Box, Button, Heading, Container, HStack, VStack } from "@chakra-ui/react";
import io from "socket.io-client";
import TodaysWinnersComponent from "./TodaysWinnersComponent";
import { Link } from "react-router-dom";

const LuckyJackpot = () => {
  const url = 'http://13.200.44.146/api/v1/user/';

  const [winners, setWinners] = useState([]);
  const [selectedBetType, setSelectedBetType] = useState(1);
  const [selectedDate, setSelectedDate] = useState(new Date()); // Set the initial date to the current date
  const socket = io(`${url}/get-all-winners`);

  useEffect(() => {
    const fetchWinners = async () => {
      try {
        const response = await fetch(
          `${url}/get-all-winners`
        );
        const data = await response.json();
        setWinners(data.result);
        socket.emit("get-all-winners", selectedBetType.toString());
      } catch (error) {
        console.error("Error fetching winners:", error);
      }
    };

    // Initial data fetch
    const onConnect = () => {
      // Listen for new winners
      console.log("user connected");
      socket.on("got-new-winner", (newWinner) => {
        console.log({ newWinner });
        if (newWinner.betType === selectedBetType) {
          setWinners((prevWinners) => [newWinner, ...prevWinners]);
        }
      });
      fetchWinners();
    };

    const onDisconnect = () => {
      setWinners([]);
    };

    socket.on("connect", onConnect);
    socket.on("disconnect", onDisconnect);

    return () => {
      socket.off("connect", onConnect);
      socket.off("disconnect", onDisconnect);
    };
  }, []);

  const winnersFilteredByDate = winners.filter(
    (winner) =>
      new Date(winner.createdAt).toDateString() === selectedDate.toDateString()
  );

  winnersFilteredByDate.sort(
    (a, b) => new Date(b.createdAt) - new Date(a.createdAt)
  );


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
      <VStack w="full" padding="2px" textAlign="center" marginTop="auto">
        <Heading fontSize="36px" p="3" fontWeight="bold" color="yellow.700" marginTop="20px" display={'block'}       backgroundColor="yellow.100"
>
          Lucky Jackpot
        </Heading>

        <HStack m={2} className="download-button">
          <Button
            as="a"
            href="assets/punjab-super-apk.apk"
            download
            backgroundColor="yellow.700"
            color="yellow.100"
            padding="15px 30px"
            fontSize="20px"
            textDecoration="none"
            borderRadius="5px"
            margin="0 10px"
            _hover={{ backgroundColor: "yellow.800" }}
          >
            Download APK
          </Button>
          <Button             
          backgroundColor="yellow.700"
            color="yellow.100"
            padding="15px 30px"
             fontSize="20px" 
             textDecoration="none"
              borderRadius="5px" 
              margin="0 10px"
              _hover={{ backgroundColor: "yellow.800" }}

              >
            Download exe
          </Button>
        </HStack>
        <TodaysWinnersComponent todayWinners={winners} />
      </VStack>
    </Box>
  );
};

export default LuckyJackpot;
