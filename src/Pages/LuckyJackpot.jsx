// LuckyJackpot.js
import React, { useEffect, useState } from "react";
import {
  Box,
  Button,
  Heading,
  Container,
  HStack,
  VStack,
  Flex,
  Table,
  Thead,
  Tbody,
  Tfoot,
  Tr,
  Th,
  Td,
  TableContainer,
} from "@chakra-ui/react";
import io from "socket.io-client";
import TodaysWinnersComponent from "../Components/TodaysWinnersComponent";
import { Link } from "react-router-dom";

const LuckyJackpot = () => {
  const url = 'http://13.200.44.146/api/v1/user';

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
        console.log({ data });
        setWinners(data.result);
        socket.emit("get-all-winners", selectedBetType.toString());
      }
      catch (error) {
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
      <VStack w="full" padding="2px" height='70vh' textAlign="center" marginTop="auto">
        <Box padding={2} bg='white' w='85%'>
          <TableContainer w='full'>
            <Table variant='simple'>
              <Tbody>
                <Tr>
                  <Th>11</Th>
                  <Th>10</Th>
                  <Th>0</Th>
                  <Th>5</Th>
                  <Th>3</Th>
                  <Th>9</Th>
                  <Th>12</Th>
                  <Th>1</Th>
                  <Th>2</Th>
                  <Th>4</Th>
                  <Th>7</Th>
                  <Th>6</Th>
                </Tr>
                <Tr>
                  <Th>into</Th>
                  <Th>into</Th>
                  <Th>into</Th>
                  <Th>into</Th>
                  <Th>into</Th>
                  <Th>into</Th>
                  <Th>into</Th>
                  <Th>into</Th>
                  <Th>into</Th>
                  <Th>into</Th>
                  <Th>into</Th>
                  <Th>into</Th>
                </Tr>
              </Tbody>
            </Table>
          </TableContainer>
        </Box>
        <Box
          w='full'
          display='flex'
          flexDir='column'
          justifyContent='center'
          alignItems='center'
          mb={5}>
          <Heading w='fit-content' m='auto' fontSize="36px" p="3" fontWeight="bold" color="yellow.700" marginTop="20px" display={'block'} backgroundColor="yellow.100">
            Lucky Jackpot
          </Heading>
          
          <TodaysWinnersComponent todayWinners={winners} />
          <Box w='90%' display='flex' justifyContent={'flex-end'} m={'auto'}>
            <Link to='/login'><Button>Login</Button></Link>
          </Box>
        </Box>
      </VStack>
    </Box>
  );
};

export default LuckyJackpot;
