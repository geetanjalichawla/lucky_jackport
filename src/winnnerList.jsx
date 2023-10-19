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
  Flex,
  HStack,
} from "@chakra-ui/react";
import io from "socket.io-client";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

const WinnersComponent = () => {
  const [winners, setWinners] = useState([]);
  const [selectedBetType, setSelectedBetType] = useState(1);
  const [selectedDate, setSelectedDate] = useState(new Date()); // Set the initial date to the current date
  const socket = io("http://127.0.0.1:8001/api/v1/user/get-all-winners");

  useEffect(() => {
    const fetchWinners = async () => {
      try {
        const response = await fetch(
          `http://localhost:8001/api/v1/user/get-all-winners`
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
  }, [selectedBetType]);

  const winnersFilteredByDate = winners.filter(
    (winner) =>
      new Date(winner.createdAt).toDateString() === selectedDate.toDateString()
  );

  winnersFilteredByDate.sort(
    (a, b) => new Date(b.createdAt) - new Date(a.createdAt)
  );

  return (
    <Box p={4} minHeight="80vh" display="flex" flexDir="column">
      <Tabs variant="enclosed-colored" colorScheme="teal">
        <TabList
          display="grid"
          gridTemplateColumns="repeat(auto-fill, minmax(300px, 1fr))"
          gridGap={4}
        >
          <Tab onClick={() => setSelectedBetType(1)}>Bet Type 1</Tab>
          <Tab onClick={() => setSelectedBetType(0)}>Bet Type 0</Tab>
        </TabList>

        <TabPanels>
          <TabPanel>
            <HStack gap="4">
              {" "}
              <Heading as="h1" size="xl" mb={4}>
                Winners List
              </Heading>
              <Box mb={4}>
                <DatePicker
                  selected={selectedDate}
                  onChange={(date) => setSelectedDate(date)}
                  placeholderText="Select a date"
                  dateFormat="MM/dd/yyyy" // Specify the date format
                  maxDate={new Date()} // Restrict date selection to previous dates only
                />
              </Box>
            </HStack>
            {winnersFilteredByDate.length > 0 ? (
              <Box
                display="grid"
                gridTemplateColumns="repeat(auto-fit, minmax(300px, 1fr))"
                gridGap={4}
              >
                {winnersFilteredByDate
                  .filter((winner) => winner.betType === 1)
                  .map((winner) => (
                    <Box
                      key={winner._id}
                      p={4}
                      borderWidth="1px"
                      borderRadius="md"
                    >
                      <Text fontSize="lg">
                        Winning Number: {winner.winningNumber}
                      </Text>
                      <Text fontSize="lg">
                        Winner Card: {winner.winnerCard}
                      </Text>
                      <Text fontSize="lg">Bet ID: {winner.betId}</Text>
                      <Text fontSize="lg">Bet Type: {winner.betType}</Text>
                      <Text fontSize="lg">Won At: {new Date(winner.createdAt).toLocaleString()}</Text>
                    </Box>
                  ))}
              </Box>
            ) : (
              <Text fontSize="lg">No winners for the selected date.</Text>
            )}
          </TabPanel>

          <TabPanel>
            <HStack gap="4">
              {" "}
              <Heading as="h1" size="xl" mb={4}>
                Winners List
              </Heading>
              <Box mb={4}>
                <DatePicker
                  selected={selectedDate}
                  onChange={(date) => setSelectedDate(date)}
                  placeholderText="Select a date"
                  dateFormat="MM/dd/yyyy" // Specify the date format
                  maxDate={new Date()} // Restrict date selection to previous dates only
                />
              </Box>
            </HStack>
            {winnersFilteredByDate.length > 0 ? (
              <Box
                display="grid"
                gridTemplateColumns="repeat(auto-fit, minmax(300px, 1fr))"
                gridGap={4}
              >
                {winnersFilteredByDate
                  .filter((winner) => winner.betType === 0)
                  .map((winner) => (
                    <Box
                      key={winner._id}
                      p={4}
                      borderWidth="1px"
                      borderRadius="md"
                    >
                      <Text fontSize="lg">
                        Winning Number: {winner.winningNumber}
                      </Text>
                      <Text fontSize="lg">
                        Winner Card: {winner.winnerCard}
                      </Text>
                      <Text fontSize="lg">Bet ID: {winner.betId}</Text>
                      <Text fontSize="lg">Bet Type: {winner.betType}</Text>
                      <Text fontSize="lg">Won At: {new Date(winner.createdAt).toLocaleString()}</Text>
                    </Box>
                  ))}
              </Box>
            ) : (
              <Text fontSize="lg">No winners for the selected date.</Text>
            )}
          </TabPanel>
        </TabPanels>
      </Tabs>
    </Box>
  );
};

export default WinnersComponent;
