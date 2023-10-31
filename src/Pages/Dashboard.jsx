import {
     Avatar,
     Box,
     Button,
     Text,
     Menu,
     MenuButton,
     MenuList,
     MenuItem,
} from "@chakra-ui/react";
import { useEffect, useState } from "react";
import { ManageMyPoints } from "../Components/DashboardComponents/ManageMyPoints";
import { ChangePassword } from "../Components/DashboardComponents/ChangePassword";
import { ChangePin } from "../Components/DashboardComponents/ChangePin";
import { useDispatch } from "react-redux";
import { logOutFunction } from "../ReduxToolkit/Authentication/authenticationActions";
import { Link, useNavigate } from "react-router-dom";
import { getUserProfileFunc } from "../ReduxToolkit/UserManagement/usersActions";
import { ChevronDownIcon, HamburgerIcon } from "@chakra-ui/icons";

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

     useEffect(() => {
          dispatch(getUserProfileFunc());
     }, []);

     return (
          <>
               <Box display='flex' flexDir='column'>
                    <Box w='full' display={{ base: 'none', md: 'flex' }} flexDir={{ base: 'column', md: 'row' }} justifyContent='space-around' bg={'yellow.500'}>
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
                         <Box position={'absolute'} right={2}>
                              <Menu>
                                   <MenuButton as={Box} rightIcon={<ChevronDownIcon />}>
                                        <Avatar />
                                   </MenuButton>
                                   <MenuList>
                                        <Link to='/'><MenuItem>Home</MenuItem></Link>
                                   </MenuList>
                              </Menu>
                         </Box>
                    </Box>
                    <Box w='100%' display={{ base: 'flex', md: 'none' }} justifyContent={'space-between'} alignItems='center' bg={'yellow.500'}>
                         <Box p={2}>
                              <Menu>
                                   <MenuButton as={Box} >
                                        <HamburgerIcon fontSize={'200%'} />
                                   </MenuButton>
                                   <MenuList>
                                        <MenuItem onClick={() => handleToggle('transferPoints')}>Manage My Point</MenuItem>
                                        <MenuItem onClick={() => handleToggle('changePass')}>Change Password</MenuItem>
                                        <MenuItem onClick={() => handleToggle('changePin')}>Change Pin</MenuItem>
                                   </MenuList>
                              </Menu>
                         </Box>
                         <Box>
                              <Menu>
                                   <MenuButton as={Box} rightIcon={<ChevronDownIcon />}>
                                        <Avatar />
                                   </MenuButton>
                                   <MenuList>
                                        <Link to='/'><MenuItem>Home</MenuItem></Link>
                                   </MenuList>
                              </Menu>
                         </Box>
                    </Box>
                    <Link to='/'>
                         <Button
                              position={'absolute'}
                              top={12}
                              display={{ base: 'none', md: 'flex' }}
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
          </>
     );
};

export { Dashboard };