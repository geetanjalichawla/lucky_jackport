import React, { useState, useEffect } from "react";
import {
  Box,
  Heading,
  Tab,
  TabList,
  TabPanel,
  TabPanels,
  Tabs,
  Text,
  HStack,
} from "@chakra-ui/react";
import io from "socket.io-client";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import WinnersList from "./WinnersList";

const WinnersComponent = () => {
  const url = 'http://13.200.44.146/api/v1/user';

  const [winners, setWinners] = useState([]);
  const [selectedBetType, setSelectedBetType] = useState(1);
  const [selectedDate, setSelectedDate] = useState(new Date());
  const socket = io(`${url}/get-all-winners`);

  useEffect(() => {
    const fetchWinners = async () => {
      try {
        const response = await fetch(`${url}/get-all-winners`);
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
    <Box p={4} minHeight="100vh" display="flex" flexDir="column"       backgroundColor="yellow.100" color={'yellow.800'}>
      <Tabs variant="solid-rounded" colorScheme="yellow">
        <TabList
          gridGap={4}
        >
          <Tab borderColor={'yellow.700'} borderWidth={'1'}  onClick={() => setSelectedBetType(1)}>Bet Type 1</Tab>
          <Tab borderColor={'yellow.700'} borderWidth={'1'}     onClick={() => setSelectedBetType(0)}>Bet Type 0</Tab>
        </TabList>

        <TabPanels>
          <TabPanel>
            <HStack gap="4">
              <Heading as="h1" size="xl" mb={4}>
                Winners List
              </Heading>
              <Box mb={4}>
                <DatePicker
                  selected={selectedDate}
                  onChange={(date) => setSelectedDate(date)}
                  placeholderText="Select a date"
                  dateFormat="MM/dd/yyyy"
                  maxDate={new Date()}
                />
              </Box>
            </HStack>
            <WinnersList winners={winners} betType={1} selectedDate={selectedDate} />
          </TabPanel>

          <TabPanel>
            <HStack gap="4">
              <Heading as="h1" size="xl" mb={4}>
                Winners List
              </Heading>
              <Box mb={4}>
                <DatePicker
                  selected={selectedDate}
                  onChange={(date) => setSelectedDate(date)}
                  placeholderText="Select a date"
                  dateFormat="MM/dd/yyyy"
                  maxDate={new Date()}
                />
              </Box>
            </HStack>
            <WinnersList winners={winners} betType={0} selectedDate={selectedDate} />
          </TabPanel>
        </TabPanels>
      </Tabs>
    </Box>
  );
};

export default WinnersComponent;
