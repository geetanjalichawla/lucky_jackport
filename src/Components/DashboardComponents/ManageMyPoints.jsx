import { Box, Button, Checkbox, Flex, FormControl, FormLabel, Heading, Input, Stack } from "@chakra-ui/react";
import { useEffect, useState } from "react";
import io from "socket.io-client";
import TodaysWinnersComponent from "../TodaysWinnersComponent";
import { useDispatch, useSelector } from "react-redux";
import { pointTransferFunction } from "../../ReduxToolkit/UserManagement/usersActions";
const api = process.env.REACT_APP_BASE_URL;


const ManageMyPoints = () => {

     const { coinBalance } = useSelector((state) => state?.authenticationReducer);
     // const api = 'http://13.200.44.146/api/v1/user';

     const [winners, setWinners] = useState([]);
     const [selectedBetType, setSelectedBetType] = useState(1);
     const [selectedDate, setSelectedDate] = useState(new Date()); // Set the initial date to the current date
     const socket = io(`${api}/get-all-winners`);

     useEffect(() => {
          const fetchWinners = async () => {
               try {
                    const response = await fetch(
                         `${api}/get-all-winners`
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
          <Box w='full' display='flex' flexDir='column' bgImage="url('assets/bg_image.jpg')" backgroundRepeat='no-repeat' backgroundSize={'cover'}>
               <Box
                    fontSize={'150%'}
                    m={3}
                    w='50%'
                    p={3}
                    pl={5}
                    pr={5}
                    fontWeight="bold"
                    marginTop="20px"
                    display={'block'}
                    borderRadius={'10px'}
                    mb={5}
                    color='white'
                    bg={'red.800'}
                    boxShadow='0 0 70px rgba(255, 255, 0, 0.5)'
                    _hover={{ boxShadow: '0 0 60px rgba(255, 255, 0, 0.5)' }}
                    mt={10}
               >{`Welcome, Hey your current bonus is: ${coinBalance || 0}`}</Box>
               <Box display='flex'>
                    <Box display='flex' flexDir={'column'} width={'50%'}>
                         <Flex flexDir={['column', 'row']} m='auto' gap={2} className="download-button" mt={3} mb={3} w='fit-content'>
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
                         </Flex>
                         <Box>
                              <TransferCoin />
                         </Box>
                    </Box>
                    <Box w={'50%'}></Box>
               </Box>
               <Box w='full' pb={12} display='flex' justifyContent='center' alignItems={'center'}>
                    <TodaysWinnersComponent todayWinners={winners} />
               </Box>
          </Box>
     );
};

export { ManageMyPoints };


const TransferCoin = () => {

     const [loading, setLoading] = useState(false);
     const dispatch = useDispatch();

     const [formData, setFormData] = useState({
          userName: '',
          amount: '',
          isAgent: false,
          pin: ""
     });

     const handleInputChange = (event) => {
          const { name, value } = event.target;
          setFormData((prevData) => ({
               ...prevData,
               [name]: value,
          }));
     };

     const resetFormData = () => {
          setFormData({
               userName: '',
               amount: '',
               isAgent: false,
               pin: ""
          });
     };

     const handleChecked = (value) => {
          setFormData((prevData) => ({
               ...prevData,
               isAgent: !value,
          }));
     }

     const handleSendCoins = () => {
          console.log({ formData });
          dispatch(pointTransferFunction(formData, setLoading, resetFormData));
     };

     console.log({ formData });

     return (
          <Stack spacing={8} mx={'auto'} maxW={'lg'} py={12} px={6}>
               <Box
                    rounded={'lg'}
                    bg='white'
                    boxShadow="#e0d2ab 0px 13px 27px -5px, #e0d2ab 0px 8px 16px -8px"
                    p={8}>
                    <Heading mb={5} fontSize={'2xl'} fontWeight={'bold'} color='pink.500'>Point Transfer</Heading>
                    <Stack spacing={4}>
                         <FormControl display={'flex'}>
                              <FormLabel w={'120px'}>Username</FormLabel>
                              <Input
                                   type="text"
                                   value={formData?.userName}
                                   name='userName'
                                   placeholder='Username'
                                   required
                                   onChange={handleInputChange}
                              />
                         </FormControl>
                         <FormControl display={'flex'}>
                              <FormLabel w={'120px'}>Your Pin</FormLabel>
                              <Input
                                   type="number"
                                   value={formData?.pin}
                                   name='pin'
                                   required
                                   placeholder='Your pin'
                                   onChange={handleInputChange}
                              />
                         </FormControl>
                         <FormControl display={'flex'}>
                              <FormLabel w={'120px'}>Amount</FormLabel>
                              <Input
                                   type="number"
                                   value={formData?.amount}
                                   name='amount'
                                   required
                                   placeholder='Amount'
                                   onChange={handleInputChange}
                              />
                         </FormControl>
                         <FormControl display={'flex'}>
                              <FormLabel w={'120px'}>Manager/Admin</FormLabel>
                              <Checkbox
                                   isChecked={formData?.isAgent}
                                   onChange={() => handleChecked(formData?.isAgent)}
                              />
                         </FormControl>
                         <Stack spacing={10}>
                              <Button
                                   w={'fit-content'}
                                   onClick={() => handleSendCoins()}
                                   backgroundColor="yellow.700"
                                   color="yellow.100"
                                   _hover={{
                                        bg: 'yellow.100',
                                        color: 'black'
                                   }}
                                   isLoading={loading}>
                                   Transfer
                              </Button>
                         </Stack>
                    </Stack>
               </Box>
          </Stack>
     );
};