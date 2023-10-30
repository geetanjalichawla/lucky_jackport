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
    Heading,
} from '@chakra-ui/react';
import { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { loginFunction } from '../../ReduxToolkit/Authentication/authenticationActions';


const LoginPage = () => {

    const navigate = useNavigate();
    const dispatch = useDispatch();
    const [loading, setLoading] = useState(false);
    const token = localStorage.getItem("bat_token");

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

    const handleSignIn = () => {
        if (formData?.userName && formData?.password) {
            console.log({ formData });
            dispatch(loginFunction(formData, navigate, setLoading, resetFormData));
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
                    <Stack align={'center'}>
                        <Heading fontSize={'2xl'} fontWeight={'bold'} color='pink.500'>Login</Heading>
                    </Stack>
                    <Box
                        rounded={'lg'}
                        bg='white'
                        boxShadow={'lg'}
                        p={8}>
                        <Stack spacing={4}>
                            <FormControl>
                                <FormLabel>User Name</FormLabel>
                                <Input
                                    type="text"
                                    value={formData?.userName}
                                    name='userName'
                                    placeholder='Username'
                                    onChange={handleInputChange}
                                />
                            </FormControl>
                            <FormControl>
                                <FormLabel>Password</FormLabel>
                                <Input
                                    type="password"
                                    value={formData?.password}
                                    name='password'
                                    placeholder='Password'
                                    onChange={handleInputChange}
                                />
                            </FormControl>
                            <Stack spacing={10}>
                                <Button
                                    bg={'blue.400'}
                                    color={'white'}
                                    _hover={{
                                        bg: 'blue.500',
                                    }}
                                    onClick={() => handleSignIn()}
                                    isLoading={loading}>
                                    Sign In
                                </Button>
                            </Stack>
                        </Stack>
                    </Box>
                </Stack>
            }
        </Flex>
    );
};

export { LoginPage };