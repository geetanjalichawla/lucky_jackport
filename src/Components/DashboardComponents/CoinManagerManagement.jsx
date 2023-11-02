import React, { useEffect, useState } from 'react';
import {
  Box,
  Heading,
  FormControl,
  FormLabel,
  Input,
  Checkbox,
  Button,
  Text,
  Center,
  Container,
  SimpleGrid,
  Table,
  Th,
  Tr,
  Td,
  Thead,
  IconButton,
  HStack, // Added Center component for loading indicator
} from '@chakra-ui/react';
import { useToast } from '@chakra-ui/react'; // Added useToast
import { useDispatch, useSelector } from 'react-redux';
import { AiOutlineCheck } from "react-icons/ai";
import { RxCross2 } from "react-icons/rx";
import { Link } from 'react-router-dom';
import {  acceptTransaction, getReceivableAction, getTransferableAction, rejectTransaction } from '../../ReduxToolkit/coinManagerment/coinTransferAction';
import toast, { Toaster } from "react-hot-toast";
import { clearError, clearMessage } from '../../ReduxToolkit/coinManagerment/coinTransferReducer';

const CoinTransferPage = () => {  
  const dispatch  = useDispatch();

  useEffect(() => {
    dispatch(getReceivableAction());
    dispatch(getTransferableAction());
  }, [dispatch])

  const { receivables,
    transferable,} =useSelector((state)=>state.coinTransfer)


    
  const { message, error } = useSelector((state) => state.coinTransfer);
  useEffect(() => {
    if (error) {
      toast.error(error);
      dispatch(clearError());
    } else if (message) {
      toast.success(message);
      dispatch(clearMessage());
    }
  }, [dispatch, error, message]);

  return (
    <SimpleGrid  minH="80vh"  columns={2} maxW={'container.xl'} mx="auto" px="4" gap={2} mt={2}>

      <Box w="full" overflowY={'auto'} p="2" border={'1px solid black'} bg={'wheat'}>
        <Heading mb={8} >Receivables Table</Heading>
       <TransactionTable data= {receivables} />
      </Box>
      <Box w="full"  overflowY={'auto'} p="2" border={'1px solid black'} bg={'wheat'}>
      <Heading mb={8}>Transferable Table</Heading>
      <TransactionTable data= {transferable} />

</Box>
<Toaster/>
    </SimpleGrid>
  );
};

export default CoinTransferPage;




const TransactionTable = ({ data }) => {
  const dispatch= useDispatch();
  return (
    <Table size={'sm'}>
      <Thead>
        <Tr p="2px">
          <Th p="2px">ID</Th>
          <Th p="2px">Transferred To</Th>
          <Th p="2px">Transferred From</Th>

          <Th p="2px">Amount</Th>
          <Th p="2px">Status</Th>
        
        </Tr>
      </Thead>
      <tbody>
        {data.map((transaction) => (
          <Tr key={transaction._id}>
            <Td p="2px">{transaction._id}</Td>
            <Td p="2px">{transaction.transferredTo.userName} <br/>({transaction.transferredTo.role})</Td>
            <Td p="2px">{transaction.transferredFrom.userName} <br/> ({transaction.transferredFrom.role})</Td>
            <Td p="2px">{transaction.amount}</Td>
            <Td p="2px"><IconButton colorScheme='green' rounded={'full'} size={'sm'} onClick={()=>dispatch(acceptTransaction(transaction._id))}>
              <AiOutlineCheck/>
              </IconButton>
              <IconButton colorScheme='red' rounded={'full'} size={'sm'}  onClick={()=>dispatch(rejectTransaction(transaction._id))}>
              <RxCross2/>
              </IconButton>
              </Td>
          </Tr>
        ))}
      </tbody>
    </Table>
  );
};



