import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import {
     Flex,
     Box,
     FormControl,
     FormLabel,
     Input,
     Stack,
     Button,
     InputRightElement,
     InputGroup,
} from '@chakra-ui/react';
import { ViewIcon, ViewOffIcon } from "@chakra-ui/icons";
import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { resetPinFunction } from '../../ReduxToolkit/Authentication/authenticationActions';


const ChangePin = () => {

     const dispatch = useDispatch();
     const [val1, setVal1] = useState(false);
     const [val2, setVal2] = useState(false);

     const [loading, setLoading] = useState(false);

     const [formData, setFormData] = useState({
          oldPin: '',
          newPin: '',
     });

     const handleToggleVal1 = () => {
          setVal1(prev => !prev);
     };

     const handleToggleVal2 = () => {
          setVal2(prev => !prev);
     };

     const handleInputChange = (event) => {
          const { name, value } = event.target;
          setFormData((prevData) => ({
               ...prevData,
               [name]: value,
          }));
     };

     const resetFormData = () => {
          setFormData({
               oldPin: '',
               newPin: '',
          });
     };

     const handleSignIn = () => {
          if (formData?.oldPin && formData?.newPin) {
               console.log({ formData });
               dispatch(resetPinFunction(formData, setLoading, resetFormData));
          };
     };


     return (
          <Flex
               minH={'100vh'}
               align={'center'}
               justify={'center'}
               bgImage="url('assets/bg_image.jpg')"
               bgPosition="center">
               {
                    <Stack spacing={8} mx={'auto'} maxW={'lg'} py={12} px={6}>
                         <Box
                              rounded={'lg'}
                              bg='white'
                              boxShadow={'lg'}
                              p={8}>
                              <Stack spacing={4}>
                                   <FormControl>
                                        <FormLabel>Old Pin</FormLabel>
                                        <InputGroup>
                                             <Input
                                                  type={val1 ? 'text' : "password"}
                                                  value={formData?.oldPin}
                                                  name='oldPin'
                                                  placeholder='Old pin'
                                                  onChange={handleInputChange}
                                             />
                                             <InputRightElement onClick={handleToggleVal1} cursor={'pointer'}>
                                                  {!val1 ? <ViewIcon /> : <ViewOffIcon />}
                                             </InputRightElement>
                                        </InputGroup>
                                   </FormControl>
                                   <FormControl>
                                        <FormLabel>New Pin</FormLabel>
                                        <InputGroup>
                                             <Input
                                                  type={val2 ? 'text' : "password"}
                                                  value={formData?.newPin}
                                                  name='newPin'
                                                  placeholder='New pin'
                                                  onChange={handleInputChange}
                                             />
                                             <InputRightElement onClick={handleToggleVal2} cursor={'pointer'}>
                                                  {!val2 ? <ViewIcon /> : <ViewOffIcon />}
                                             </InputRightElement>
                                        </InputGroup>
                                   </FormControl>
                                   <Stack spacing={10}>
                                        <Button
                                             backgroundColor="yellow.700"
                                             color="yellow.100"
                                             _hover={{
                                                  bg: 'yellow.100',
                                                  color: 'black'
                                             }}
                                             onClick={() => handleSignIn()}
                                             isLoading={loading}>
                                             Change Pin
                                        </Button>
                                   </Stack>
                              </Stack>
                         </Box>
                    </Stack>
               }
          </Flex>
     );
};

export { ChangePin };