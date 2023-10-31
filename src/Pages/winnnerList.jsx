import React, { useState, useEffect } from "react";
import {
  Box,
  Heading,
  Tab,
  TabList,
  TabPanel,
  TabPanels,
  Tabs,
  Flex,
  Button,
} from "@chakra-ui/react";
import io from "socket.io-client";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import WinnersList from "../Components/WinnersList";
const api = process.env.REACT_APP_BASE_URL;


const WinnersComponent = () => {

  // const api = 'http://13.200.44.146/api/v1/user';

  const [winners, setWinners] = useState([]);
  const [selectedBetType, setSelectedBetType] = useState(1);
  const [selectedDate, setSelectedDate] = useState(new Date());
  const socket = io(`${api}/get-all-winners`);

  useEffect(() => {
    const fetchWinners = async () => {
      try {
        const response = await fetch(`${api}/get-all-winners`);
        const data = await response.json();
        setWinners(data.result);
        socket.emit("get-all-winners", selectedBetType.toString());
      } catch (error) {
        console.error("Error fetching winners:", error);
      }
    };

    const onConnect = () => {
      socket.on("got-new-winner", (newWinner) => {
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
  }, [selectedBetType]);

  return (
    <Box p={4} minHeight="100vh" display="flex" flexDir="column" overflow={'hidden'} backgroundColor="yellow.100" color={'yellow.800'} w="100%" >
      <Box display={'flex'} justifyContent='flex-end'>
        <Button w='fit-content' right={2} onClick={() => window.history.back()}>Back</Button>
      </Box>
      <Tabs variant="solid-rounded" colorScheme="yellow" w="full">
        <TabList gridGap={4} >
          <Tab borderColor={'yellow.700'} borderWidth={'1'} onClick={() => setSelectedBetType(1)}>Bet Type 1</Tab>
          <Tab borderColor={'yellow.700'} borderWidth={'1'} onClick={() => setSelectedBetType(0)}>Bet Type 0</Tab>
        </TabList>
        <TabPanels bg='white' mt={3} boxShadow="rgba(9, 30, 66, 0.25) 0px 4px 8px -2px, rgba(9, 30, 66, 0.08) 0px 0px 0px 1px">
          <TabPanel w="full">
            <Flex flexDir={['column', 'row']} gap="4">
              <Heading as="h1" size="xl" mb={4}>
                Winners List
              </Heading>
              <Box mb={4} >
                <DatePicker
                  selected={selectedDate}
                  onChange={(date) => setSelectedDate(date)}
                  placeholderText="Select a date"
                  dateFormat="MM/dd/yyyy"
                  maxDate={new Date()}
                />
              </Box>
            </Flex>
            <WinnersList winners={winners} betType={1} selectedDate={selectedDate} />
          </TabPanel>
          <TabPanel w="full">
            <Flex flexDir={['column', 'row']} gap="4">
              <Heading as="h1" size="xl" mb={4}>
                Winners List
              </Heading>
              <Box mb={4}>
                <DatePicker
                  selected={selectedDate}
                  onChange={(date) => setSelectedDate(date)}
                  placeholderText="Select a date"
                  dateFormat="MM/dd/yyyy"
                  maxDate={new Date()} />
              </Box>
            </Flex>
            <WinnersList winners={winners} betType={0} selectedDate={selectedDate} />
          </TabPanel>
        </TabPanels>
      </Tabs>
    </Box>
  );
};

export default WinnersComponent;
