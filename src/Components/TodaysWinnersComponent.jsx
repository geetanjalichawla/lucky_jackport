import React from "react";
import {
  Box,
  Text,
  Table,
  Thead,
  Tbody,
  Tr,
  Th,
  Td,
  Button,
} from "@chakra-ui/react";
import { Link } from "react-router-dom";

const TodaysWinnersComponent = ({ todayWinners }) => {
  return (
    <Box
      p={2} // Reduced padding
      maxWidth="700px" // Adjusted width
      maxHeight="300px"
      borderWidth="1px"
      overflow="auto"
      borderRadius="md"
      backgroundColor="yellow.100"
      w="full"
    >
      <Text fontSize="xs" fontWeight="bold" color="yellow.700" mb={2} >
        Today's Winners
      </Text>
      <Link to={'/winner-list'}>
        <Button colorScheme="yellow" float={'right'}>
          View All
        </Button>
        </Link>
      {todayWinners.length > 0 ? (
        <Table variant="simple">
          <Thead>
            <Tr>
              <Th fontSize="xs" color="yellow.700">
                lucky no.
              </Th>
              <Th fontSize="xs" color="yellow.700">
                winner Card
              </Th>
              <Th fontSize="xs" color="yellow.700">
                Bet ID
              </Th>
              <Th fontSize="xs" color="yellow.700">
                Bet Type
              </Th>
              <Th fontSize="xs" color="yellow.700">
                Won At
              </Th>
            </Tr>
          </Thead>
          <Tbody>
            {todayWinners.map((winner) => (
              <Tr key={winner._id}>
                <Td fontSize="xs" p={1}> {/* Reduced padding in cells */}
                  <Text color="green.600">{winner.winningNumber}</Text>
                </Td>
                <Td fontSize="xs" p={1}> {/* Reduced padding in cells */}
                  {winner.winnerCard}
                </Td>
                <Td fontSize="xs" p={1}> {/* Reduced padding in cells */}
                  {winner.betId}
                </Td>
                <Td fontSize="xs" p={1}> {/* Reduced padding in cells */}
                {winner.betType === 0 ? 'Lucky 100 ' : 'Lucky Patta'}
                </Td>
                <Td fontSize="xs" p={1}> {/* Reduced padding in cells */}
                  {new Date(winner.createdAt).toLocaleString()}
                </Td>
              </Tr>
            ))}
          </Tbody>
        </Table>
      ) : (
        <Text fontSize="xs">No winners today.</Text>
      )}
    </Box>
  );
};

export default TodaysWinnersComponent;