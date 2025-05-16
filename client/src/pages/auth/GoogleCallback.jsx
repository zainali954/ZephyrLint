import axios from 'axios';
import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { googleLogin } from '../../redux/Slices/authSlice';
import Loader from '../../components/Loader';

const GoogleCallback = () => {
    const navigate = useNavigate();
    const dispatch = useDispatch();

    useEffect(() => {
        const code = new URLSearchParams(window.location.search).get("code");

        const login = async () => {
            try {
                const response = await dispatch(googleLogin({ code })).unwrap();
                if (response.accessToken) {
                    navigate('/home');
                }
            } catch (error) {
                console.error("Google login failed:", error);
                navigate('/login'); // fallback to login
            }
        };

        if (code) {
            login();
        } else {
            navigate('/login');
        }

    }, [dispatch, navigate]);

    return <p className='text-black dark:text-white'>Logging in...</p>;
};

export default GoogleCallback;
