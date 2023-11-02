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
import CoinTransferPage from "../Components/DashboardComponents/CoinManagerManagement";

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
          <Box width={'100%'} display='flex' flexDir='column'>
               <Box display={'flex'} justifyContent={'space-between'} w='full' bg={'yellow.200'}>
                    <Box w={'90%'} display={{ base: 'none', md: 'flex' }} justifyContent={'space-around'} alignItems={'center'}>
                         <Text fontWeight={'bold'} mt={5} mb={5} onClick={() => handleToggle('transferPoints')} color={value === 'transferPoints' ? 'blue' : 'gray.600'} cursor={'pointer'} _hover={{ color: 'blue' }} w='fit-content'>Manage My Point</Text>
                         <Text fontWeight={'bold'} mt={5} mb={5} onClick={() => handleToggle('Transferable')} color={value === 'Transferable' ? 'blue' : 'gray.600'} cursor={'pointer'} _hover={{ color: 'blue' }} w='fit-content'>Transferable and Receivable</Text>
                         <Text fontWeight={'bold'} mt={5} mb={5} onClick={() => handleToggle('changePass')} color={value === 'changePass' ? 'blue' : 'gray.600'} cursor={'pointer'} _hover={{ color: 'blue' }} w='fit-content'>Change Password</Text>
                         <Text fontWeight={'bold'} mt={5} mb={5} onClick={() => handleToggle('changePin')} color={value === 'changePin' ? 'blue' : 'gray.600'} cursor={'pointer'} _hover={{ color: 'blue' }} w='fit-content'>Change Pin</Text>
                         <Text fontWeight={'bold'} mt={5} mb={5} onClick={() => handleLogout()} color={value === '' ? 'blue' : 'gray.600'} cursor={'pointer'} _hover={{ color: 'blue' }} w='fit-content'>Logout</Text>
                    </Box>
                    <Box p={2}>
                         {/* <Menu>
                              <MenuButton as={Box} rightIcon={<ChevronDownIcon />}>
                                   <Avatar />
                              </MenuButton>
                              <MenuList>
                                   <Link to='/'><MenuItem>Home</MenuItem></Link>
                              </MenuList>
                         </Menu> */}
                         <Link to='/'>
                              <Button
                                   display={{ base: 'none', md: 'flex' }}
                                   backgroundColor="yellow.700"
                                   color="yellow.100"
                                   _hover={{
                                        bg: 'yellow.100',
                                        color: 'black'
                                   }}>Home</Button>
                         </Link>
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
                                   <MenuItem onClick={() => handleToggle('Transferable')}>Transferable and Receivable</MenuItem>
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

               {
                    value === 'transferPoints' && <ManageMyPoints />
               }
               {
                    value === 'Transferable' && <CoinTransferPage />
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