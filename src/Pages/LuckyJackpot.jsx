// LuckyJackpot.js
import React, { useEffect, useState } from "react";
import {
  Box,
  Button,
  Heading,
  VStack,
  Table,
  Tbody,
  Tr,
  TableContainer,
  Avatar,
  Text,
  Image,
  Flex,
} from "@chakra-ui/react";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";
import io from "socket.io-client";

const api = process.env.REACT_APP_BASE_URL;

function extractTimeFromDateString(dateString) {
  const dateObject = new Date(dateString);
  if (isNaN(dateObject)) {
    return "";
  }
  const hours = dateObject.getUTCHours();
  const minutes = dateObject.getUTCMinutes();
  const seconds = dateObject.getUTCSeconds();
  const amOrPm = hours >= 12 ? 'PM' : 'AM';
  const formattedHours = hours % 12 || 12;
  const formattedTime = `${formattedHours}:${minutes}:${seconds} ${amOrPm}`;
  return formattedTime;
};


const LuckyJackpot = () => {

  const token = localStorage.getItem("bet_token");

  const [winners, setWinners] = useState([]);
  const [selectedBetType, setSelectedBetType] = useState(1);
  const [selectedDate, setSelectedDate] = useState(new Date()); // Set Boxe initial date to Boxe current date
  const socket = io(`${api}/get-all-winners`);

  useEffect(() => {
    const fetchWinners = async () => {
      try {
        const response = await fetch(
          `${api}/get-all-winners`
        );
        const data = await response.json();
        console.log({ data });
        setWinners(data?.result || []);
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

  const winnersFilteredByDate = winners?.filter(
    (winner) =>
      new Date(winner.createdAt).toDateString() === selectedDate.toDateString()
  );

  winnersFilteredByDate?.sort(
    (a, b) => new Date(b.createdAt) - new Date(a.createdAt)
  );

  console.log({ winners });
  const numWinner = winners?.filter((el) => el.betType === 0);
  const cardWinner = winners?.filter((el) => el.betType === 1);

  return (
    <Box
      bgImage="url('assets/bg_image.jpg')" // Update wiBox your actual background image URL
      bgSize="cover"
      bgPosition="center"
      fontFamily="Arial, sans-serif"
      minH="100vh"
      display="flex"
      flexDirection="column"
      justifyContent="space-between"
      alignItems={'center'}
    >
      <VStack w="full" height='auto' textAlign="center" p="auto" m={'auto'}>
        <Flex flexDir={['column', 'row']} m='auto' gap={2} className="download-button" mt={10} mb={3} w='fit-content'>
          <Button
            as="a"
            href="assets/punjab-super-apk.apk"
            download
            backgroundColor="yellow.700"
            color="yellow.100"
            padding="20px 30px"
            fontSize="30px"
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
            padding="20px 30px"
            fontSize="30px"
            textDecoration="none"
            borderRadius="5px"
            margin="0 10px"
            _hover={{ backgroundColor: "yellow.800" }}
          >
            Download exe
          </Button>
        </Flex>
        <Box padding={2} w='85%' m={'auto'} >
          <Box display={'flex'} justifyContent='space-around' p={2} mb={5} flexWrap={'wrap'}>
            <Box w='70px' h='70px' flexDir={'column'} boxShadow='rgba(60, 64, 67, 0.3) 0px 1px 2px 0px, rgba(60, 64, 67, 0.15) 0px 1px 3px 1px' border='1px solid gray' bg='white' borderRadius={'5px'} display={'flex'} justifyContent={'center'} alignItems='center'>
              <Text>{numWinner[0]?.winningNumber}</Text>
              <Text fontSize={'50%'}>{extractTimeFromDateString(numWinner[0]?.createdAt)}</Text>
            </Box>
            <Box w='70px' h='70px' flexDir={'column'} boxShadow='rgba(60, 64, 67, 0.3) 0px 1px 2px 0px, rgba(60, 64, 67, 0.15) 0px 1px 3px 1px' border='1px solid gray' bg='white' borderRadius={'5px'} display={'flex'} justifyContent={'center'} alignItems='center'>
              <Text>{numWinner[1]?.winningNumber}</Text>
              <Text fontSize={'50%'}>{extractTimeFromDateString(numWinner[1]?.createdAt)}</Text>
            </Box>
            <Box w='70px' h='70px' flexDir={'column'} boxShadow='rgba(60, 64, 67, 0.3) 0px 1px 2px 0px, rgba(60, 64, 67, 0.15) 0px 1px 3px 1px' border='1px solid gray' bg='white' borderRadius={'5px'} display={'flex'} justifyContent={'center'} alignItems='center'>
              <Text>{numWinner[2]?.winningNumber}</Text>
              <Text fontSize={'50%'}>{extractTimeFromDateString(numWinner[2]?.createdAt)}</Text>
            </Box>
            <Box w='70px' h='70px' flexDir={'column'} boxShadow='rgba(60, 64, 67, 0.3) 0px 1px 2px 0px, rgba(60, 64, 67, 0.15) 0px 1px 3px 1px' border='1px solid gray' bg='white' borderRadius={'5px'} display={'flex'} justifyContent={'center'} alignItems='center'>
              <Text>{numWinner[3]?.winningNumber}</Text>
              <Text fontSize={'50%'}>{extractTimeFromDateString(numWinner[3]?.createdAt)}</Text>
            </Box>
            <Box w='70px' h='70px' flexDir={'column'} boxShadow='rgba(60, 64, 67, 0.3) 0px 1px 2px 0px, rgba(60, 64, 67, 0.15) 0px 1px 3px 1px' border='1px solid gray' bg='white' borderRadius={'5px'} display={'flex'} justifyContent={'center'} alignItems='center'>
              <Text>{numWinner[4]?.winningNumber}</Text>
              <Text fontSize={'50%'}>{extractTimeFromDateString(numWinner[4]?.createdAt)}</Text>
            </Box>
            <Box w='70px' h='70px' flexDir={'column'} boxShadow='rgba(60, 64, 67, 0.3) 0px 1px 2px 0px, rgba(60, 64, 67, 0.15) 0px 1px 3px 1px' border='1px solid gray' bg='white' borderRadius={'5px'} display={'flex'} justifyContent={'center'} alignItems='center'>
              <Text>{numWinner[5]?.winningNumber}</Text>
              <Text fontSize={'50%'}>{extractTimeFromDateString(numWinner[5]?.createdAt)}</Text>
            </Box>
            <Box w='70px' h='70px' flexDir={'column'} boxShadow='rgba(60, 64, 67, 0.3) 0px 1px 2px 0px, rgba(60, 64, 67, 0.15) 0px 1px 3px 1px' border='1px solid gray' bg='white' borderRadius={'5px'} display={'flex'} justifyContent={'center'} alignItems='center'>
              <Text>{numWinner[6]?.winningNumber}</Text>
              <Text fontSize={'50%'}>{extractTimeFromDateString(numWinner[6]?.createdAt)}</Text>
            </Box>
            <Box w='70px' h='70px' flexDir={'column'} boxShadow='rgba(60, 64, 67, 0.3) 0px 1px 2px 0px, rgba(60, 64, 67, 0.15) 0px 1px 3px 1px' border='1px solid gray' bg='white' borderRadius={'5px'} display={'flex'} justifyContent={'center'} alignItems='center'>
              <Text>{numWinner[7]?.winningNumber}</Text>
              <Text fontSize={'50%'}>{extractTimeFromDateString(numWinner[7]?.createdAt)}</Text>
            </Box>
            <Box w='70px' h='70px' flexDir={'column'} boxShadow='rgba(60, 64, 67, 0.3) 0px 1px 2px 0px, rgba(60, 64, 67, 0.15) 0px 1px 3px 1px' border='1px solid gray' bg='white' borderRadius={'5px'} display={'flex'} justifyContent={'center'} alignItems='center'>
              <Text>{numWinner[8]?.winningNumber}</Text>
              <Text fontSize={'50%'}>{extractTimeFromDateString(numWinner[8]?.createdAt)}</Text>
            </Box>
            <Box w='70px' h='70px' flexDir={'column'} boxShadow='rgba(60, 64, 67, 0.3) 0px 1px 2px 0px, rgba(60, 64, 67, 0.15) 0px 1px 3px 1px' border='1px solid gray' bg='white' borderRadius={'5px'} display={'flex'} justifyContent={'center'} alignItems='center'>
              <Text>{numWinner[9]?.winningNumber}</Text>
              <Text fontSize={'50%'}>{extractTimeFromDateString(numWinner[9]?.createdAt)}</Text>
            </Box>
            <Box w='70px' h='70px' flexDir={'column'} boxShadow='rgba(60, 64, 67, 0.3) 0px 1px 2px 0px, rgba(60, 64, 67, 0.15) 0px 1px 3px 1px' border='1px solid gray' bg='white' borderRadius={'5px'} display={'flex'} justifyContent={'center'} alignItems='center'>
              <Text>{numWinner[10]?.winningNumber}</Text>
              <Text fontSize={'50%'}>{extractTimeFromDateString(numWinner[10]?.createdAt)}</Text>
            </Box>
            <Box w='70px' h='70px' flexDir={'column'} boxShadow='rgba(60, 64, 67, 0.3) 0px 1px 2px 0px, rgba(60, 64, 67, 0.15) 0px 1px 3px 1px' border='1px solid gray' bg='white' borderRadius={'5px'} display={'flex'} justifyContent={'center'} alignItems='center'>
              <Text> {numWinner[11]?.winningNumber}</Text>
              <Text fontSize={'50%'}>{extractTimeFromDateString(numWinner[11]?.createdAt)}</Text>
            </Box>
          </Box>
          <Box display={'flex'} justifyContent='space-around' p={2} flexWrap={'wrap'}>
            <Box bg='white' boxShadow='rgba(60, 64, 67, 0.3) 0px 1px 2px 0px, rgba(60, 64, 67, 0.15) 0px 1px 3px 1px' borderRadius='5px'><Avatar w='70px' h='100px' borderRadius={0} src={cardWinner[0]?.winningNumber?.length === 1 ? `Taash/0${cardWinner[0]?.winningNumber}.png` : `Taash/${cardWinner[0]?.winningNumber}.png`} /></Box>
            <Box bg='white' boxShadow='rgba(60, 64, 67, 0.3) 0px 1px 2px 0px, rgba(60, 64, 67, 0.15) 0px 1px 3px 1px' borderRadius='5px'><Avatar w='70px' h='100px' borderRadius={0} src={cardWinner[1]?.winningNumber?.length === 1 ? `Taash/0${cardWinner[1]?.winningNumber}.png` : `Taash/${cardWinner[1]?.winningNumber}.png`} /></Box>
            <Box bg='white' boxShadow='rgba(60, 64, 67, 0.3) 0px 1px 2px 0px, rgba(60, 64, 67, 0.15) 0px 1px 3px 1px' borderRadius='5px'><Avatar w='70px' h='100px' borderRadius={0} src={cardWinner[2]?.winningNumber?.length === 1 ? `Taash/0${cardWinner[2]?.winningNumber}.png` : `Taash/${cardWinner[2]?.winningNumber}.png`} /></Box>
            <Box bg='white' boxShadow='rgba(60, 64, 67, 0.3) 0px 1px 2px 0px, rgba(60, 64, 67, 0.15) 0px 1px 3px 1px' borderRadius='5px'><Avatar w='70px' h='100px' borderRadius={0} src={cardWinner[3]?.winningNumber?.length === 1 ? `Taash/0${cardWinner[3]?.winningNumber}.png` : `Taash/${cardWinner[3]?.winningNumber}.png`} /></Box>
            <Box bg='white' boxShadow='rgba(60, 64, 67, 0.3) 0px 1px 2px 0px, rgba(60, 64, 67, 0.15) 0px 1px 3px 1px' borderRadius='5px'><Avatar w='70px' h='100px' borderRadius={0} src={cardWinner[4]?.winningNumber?.length === 1 ? `Taash/0${cardWinner[4]?.winningNumber}.png` : `Taash/${cardWinner[4]?.winningNumber}.png`} /></Box>
            <Box bg='white' boxShadow='rgba(60, 64, 67, 0.3) 0px 1px 2px 0px, rgba(60, 64, 67, 0.15) 0px 1px 3px 1px' borderRadius='5px'><Avatar w='70px' h='100px' borderRadius={0} src={cardWinner[5]?.winningNumber?.length === 1 ? `Taash/0${cardWinner[5]?.winningNumber}.png` : `Taash/${cardWinner[5]?.winningNumber}.png`} /></Box>
            <Box bg='white' boxShadow='rgba(60, 64, 67, 0.3) 0px 1px 2px 0px, rgba(60, 64, 67, 0.15) 0px 1px 3px 1px' borderRadius='5px'><Avatar w='70px' h='100px' borderRadius={0} src={cardWinner[6]?.winningNumber?.length === 1 ? `Taash/0${cardWinner[6]?.winningNumber}.png` : `Taash/${cardWinner[6]?.winningNumber}.png`} /></Box>
            <Box bg='white' boxShadow='rgba(60, 64, 67, 0.3) 0px 1px 2px 0px, rgba(60, 64, 67, 0.15) 0px 1px 3px 1px' borderRadius='5px'><Avatar w='70px' h='100px' borderRadius={0} src={cardWinner[7]?.winningNumber?.length === 1 ? `Taash/0${cardWinner[7]?.winningNumber}.png` : `Taash/${cardWinner[7]?.winningNumber}.png`} /></Box>
            <Box bg='white' boxShadow='rgba(60, 64, 67, 0.3) 0px 1px 2px 0px, rgba(60, 64, 67, 0.15) 0px 1px 3px 1px' borderRadius='5px'><Avatar w='70px' h='100px' borderRadius={0} src={cardWinner[8]?.winningNumber?.length === 1 ? `Taash/0${cardWinner[8]?.winningNumber}.png` : `Taash/${cardWinner[8]?.winningNumber}.png`} /></Box>
            <Box bg='white' boxShadow='rgba(60, 64, 67, 0.3) 0px 1px 2px 0px, rgba(60, 64, 67, 0.15) 0px 1px 3px 1px' borderRadius='5px'><Avatar w='70px' h='100px' borderRadius={0} src={cardWinner[9]?.winningNumber?.length === 1 ? `Taash/0${cardWinner[9]?.winningNumber}.png` : `Taash/${cardWinner[9]?.winningNumber}.png`} /></Box>
            <Box bg='white' boxShadow='rgba(60, 64, 67, 0.3) 0px 1px 2px 0px, rgba(60, 64, 67, 0.15) 0px 1px 3px 1px' borderRadius='5px'><Avatar w='70px' h='100px' borderRadius={0} src={cardWinner[10]?.winningNumber?.length === 1 ? `Taash/0${cardWinner[10]?.winningNumber}.png` : `Taash/${cardWinner[10]?.winningNumber}.png`} /></Box>
            <Box bg='white' boxShadow='rgba(60, 64, 67, 0.3) 0px 1px 2px 0px, rgba(60, 64, 67, 0.15) 0px 1px 3px 1px' borderRadius='5px'><Avatar w='70px' h='100px' borderRadius={0} src={cardWinner[11]?.winningNumber?.length === 1 ? `Taash/0${cardWinner[11]?.winningNumber}.png` : `Taash/${cardWinner[11]?.winningNumber}.png`} /></Box>
          </Box>
          <Box height={'full'} display={'flex'} justifyContent={'center'}>
            <Image w={'300px'} height={'300px'} src='assets/Lucky_Jackpot11_page-000111.png' />
          </Box>
          <Box w='90%' display='flex' justifyContent={'center'} m={'auto'}>
            {
              token && token !== 'undefined' ? (
                <Link to='/dashboard'>
                  <Button
                    backgroundColor="yellow.500"
                    boxShadow='rgba(0, 0, 0, 0.25) 0px 54px 55px, rgba(0, 0, 0, 0.12) 0px -12px 30px, rgba(0, 0, 0, 0.12) 0px 4px 6px, rgba(0, 0, 0, 0.17) 0px 12px 13px, rgba(0, 0, 0, 0.09) 0px -3px 5px'
                    color="white"
                    _hover={{
                      bg: 'yellow.100',
                      color: 'black'
                    }}>Dashboard</Button>
                </Link>
              ) : (
                <Link to='/login'>
                  <Button
                    backgroundColor="yellow.500"
                    boxShadow='rgba(0, 0, 0, 0.25) 0px 54px 55px, rgba(0, 0, 0, 0.12) 0px -12px 30px, rgba(0, 0, 0, 0.12) 0px 4px 6px, rgba(0, 0, 0, 0.17) 0px 12px 13px, rgba(0, 0, 0, 0.09) 0px -3px 5px'
                    color="white"
                    _hover={{
                      bg: 'yellow.100',
                      color: 'black'
                    }}>Login</Button>
                </Link>
              )
            }
          </Box>
        </Box>
        <Box
          w='full'
          display='flex'
          flexDir='column'
          justifyContent='center'
          alignItems='center'
          mb={5}>
          {/* <Heading
            w='fit-content'
            m='auto'
            fontSize={{ base: '200%', md: '300%' }}
            p={3}
            pl={5}
            pr={5}
            fontWeight="bold"
            color="yellow.500"
            marginTop="20px"
            display={'block'}
            borderRadius={'10px'}
            mb={5}
            boxShadow='0 0 70px rgba(255, 255, 0, 0.5)'
            _hover={{ boxShadow: '0 0 60px rgba(255, 255, 0, 0.5)' }}
          >
            Lucky Jackpot
          </Heading> */}

        </Box>
      </VStack>
    </Box>
  );
};

export default LuckyJackpot;
