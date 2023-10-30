import { Box, Button, Flex, FormControl, FormLabel, Heading, Input, Stack } from "@chakra-ui/react";
import { useState } from "react";

const Dashboard = () => {

     const [loading, setLoading] = useState(false);

     const [formData, setFormData] = useState({
          userName: '',
          password: '',
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
               password: '',
          });
     };

     const handleSendCoins = () => {

     };


     return (
          <Box w='full' display='flex' flexDir='column'>
               <Box display='flex' justifyContent='space-around' w='full' bg={'yellow.500'}>
                    <Box w={{ base: '90%', sm: '33%' }} display='flex' justifyContent='center' alignItems='center' pt={3} pb={3} color={'gray.600'} cursor={'pointer'} _hover={{ color: 'blue' }} fontWeight={'bold'}>Manage My Point</Box>
                    <Box w={{ base: '90%', sm: '33%' }} display='flex' justifyContent='center' alignItems='center' pt={3} pb={3} color={'gray.600'} cursor={'pointer'} _hover={{ color: 'blue' }} fontWeight={'bold'}>Change Password</Box>
                    <Box w={{ base: '90%', sm: '33%' }} display='flex' justifyContent='center' alignItems='center' pt={3} pb={3} color={'gray.600'} cursor={'pointer'} _hover={{ color: 'blue' }} fontWeight={'bold'}>Logout</Box>
               </Box>
               <Box fontSize={'150%'} m={3} w='full' p={3} fontWeight={500} color={'yellow.700'}>{`Welcome, Hey your current bonus is: xxxxx`}</Box>
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
                              <Stack spacing={8} mx={'auto'} maxW={'lg'} py={12} px={6}>
                                   <Box
                                        rounded={'lg'}
                                        bg='white'
                                        boxShadow="#e0d2ab 0px 13px 27px -5px, #e0d2ab 0px 8px 16px -8px"
                                        p={8}>
                                        <Heading mb={5} fontSize={'2xl'} fontWeight={'bold'} color='pink.500'>Point Transfer</Heading>
                                        <Stack spacing={4}>
                                             <FormControl display={'flex'}>
                                                  <FormLabel w={'120px'}>To Acc No.</FormLabel>
                                                  <Input
                                                       type="text"
                                                       value={formData?.userName}
                                                       name='userName'
                                                       placeholder='Account no.'
                                                       onChange={handleInputChange}
                                                  />
                                             </FormControl>
                                             <FormControl display={'flex'}>
                                                  <FormLabel w={'120px'}>Your Pin</FormLabel>
                                                  <Input
                                                       type="number"
                                                       value={formData?.password}
                                                       name='password'
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
                                                       placeholder='Amount'
                                                       onChange={handleInputChange}
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
                         </Box>
                    </Box>
                    <Box w={'50%'}></Box>
               </Box>
          </Box>
     );
};

export { Dashboard };