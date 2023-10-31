import { Box, Button, Text } from "@chakra-ui/react";
import { useState } from "react";
import { ManageMyPoints } from "../Components/DashboardComponents/ManageMyPoints";
import { ChangePassword } from "../Components/DashboardComponents/ChangePassword";
import { ChangePin } from "../Components/DashboardComponents/ChangePin";
import { useDispatch } from "react-redux";
import { logOutFunction } from "../ReduxToolkit/Authentication/authenticationActions";
import { Link, useNavigate } from "react-router-dom";

const Dashboard = () => {

     const [value, setValue] = useState('transferPoints');
     const dispatch = useDispatch();
     const navigate = useNavigate();

     const handleToggle = (val) => {
          setValue(val);
     };

     const handleLogout = () => {
          console.log('LOGOUT');
          dispatch(logOutFunction(navigate))
          localStorage.removeItem('bet_token');
     };

     return (
          <Box w='full' display='flex' flexDir='column'>
               <Box display='flex' justifyContent='space-around' w='full' bg={'yellow.500'}>
                    <Box w={{ base: '90%', sm: '23%' }} display='flex' justifyContent='center' alignItems='center' pt={3} pb={3} fontWeight={'bold'}>
                         <Text onClick={() => handleToggle('transferPoints')} color={value === 'transferPoints' ? 'blue' : 'gray.600'} cursor={'pointer'} _hover={{ color: 'blue' }} w='fit-content'>Manage My Point</Text>
                    </Box>
                    <Box w={{ base: '90%', sm: '23%' }} display='flex' justifyContent='center' alignItems='center' pt={3} pb={3} fontWeight={'bold'}>
                         <Text onClick={() => handleToggle('changePass')} color={value === 'changePass' ? 'blue' : 'gray.600'} cursor={'pointer'} _hover={{ color: 'blue' }} w='fit-content'>Change Password</Text>
                    </Box>
                    <Box w={{ base: '90%', sm: '23%' }} display='flex' justifyContent='center' alignItems='center' pt={3} pb={3} fontWeight={'bold'}>
                         <Text onClick={() => handleToggle('changePin')} color={value === 'changePin' ? 'blue' : 'gray.600'} cursor={'pointer'} _hover={{ color: 'blue' }} w='fit-content'>Change Pin</Text>
                    </Box>
                    <Box w={{ base: '90%', sm: '23%' }} display='flex' justifyContent='center' alignItems='center' pt={3} pb={3} fontWeight={'bold'}>
                         <Text onClick={() => handleLogout()} color={value === '' ? 'blue' : 'gray.600'} cursor={'pointer'} _hover={{ color: 'blue' }} w='fit-content'>Logout</Text>
                    </Box>
               </Box>
               <Link to='/'>
                    <Button
                         position={'absolute'}
                         top={12}
                         left={1}
                         backgroundColor="yellow.700"
                         color="yellow.100"
                         _hover={{
                              bg: 'yellow.100',
                              color: 'black'
                         }}>Home</Button>
               </Link>
               {
                    value === 'transferPoints' && <ManageMyPoints />
               }
               {
                    value === 'changePass' && <ChangePassword />
               }
               {
                    value === 'changePin' && <ChangePin />
               }
          </Box>
     );
};

export { Dashboard };