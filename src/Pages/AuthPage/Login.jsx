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
    const token = localStorage.getItem("bet_token");

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

    useEffect(() => {
        if (!token) {
            navigate('/login');
        }
        else {
            navigate('/dashboard');
        }
    }, [token]);

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
                        <Stack align={'center'} mb={5}>
                            <Heading fontSize={'2xl'} fontWeight={'bold'} color='pink.500'>Login</Heading>
                        </Stack>
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
                                    backgroundColor="yellow.700"
                                    color="yellow.100"
                                    _hover={{
                                        bg: 'yellow.100',
                                        color: 'black'
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