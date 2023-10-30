import React from "react";
import { Box, Table, Thead, Tbody, Tr, Th, Td, Text } from "@chakra-ui/react";

const WinnersList = ({ winners, betType, selectedDate }) => (
  <Box maxWidth={'100%'} overflow={'auto'}>
    <Table variant="simple">
          <Thead>
            <Tr>
              <Th>Winning Number</Th>
              <Th>Winner Card</Th>
              <Th>Bet ID</Th>
              <Th>Bet Type</Th>
              <Th>Won At</Th>
            </Tr>
          </Thead>
          <Tbody>
    {winners
      .filter(
        (winner) =>
          winner.betType === betType &&
          (!selectedDate || new Date(winner.createdAt).toDateString() === selectedDate.toDateString())
      )
      .map((winner) => (
        
            <Tr  key={winner._id}>
              <Td>
                <Text color="green.600">{winner.winningNumber}</Text>
              </Td>
              <Td>{winner.winnerCard}</Td>
              <Td>{winner.betId}</Td>
              <Td>{winner.betType === 0 ? 'Lucky 100 ' : 'Lucky Patta'}</Td>
              <Td>{new Date(winner.createdAt).toLocaleString()}</Td>
            </Tr>

      ))}
                </Tbody>
        </Table>
  </Box>
);

export default WinnersList;
