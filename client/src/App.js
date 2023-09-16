import { useState } from 'react';
import {Container} from '@material-ui/core';
import {BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';

import Navbar from './components/Navbar/Navbar';
import Home from './components/Home/Home';
import Auth from './components/Auth/Auth';
import PostDetails from './components/PostDetails/PostDetails';

// console.log("App Component Rendered");

export default function App() {
    const user = useState(JSON.parse(localStorage.getItem('profile')));
    // console.log("user in App.js component",user)

    return(
        <BrowserRouter>
            <Container maxWidth="xl">
                <Navbar />
                <Routes>
                    <Route exact path="/" element = {<Navigate to='/posts' replace={true}/>} />
                    <Route exact path="/posts" element={<Home/>} />
                    <Route exact path="/posts/search" element={<Home/>} />
                    <Route exact path="/posts/:id" element={<PostDetails/>} />
                    <Route exact path="/auth" element={user==null ? <Navigate to='/posts' replace={true} /> : <Auth/> } />
                </Routes>
            </Container>
        </BrowserRouter>
    )
};