import React from 'react';
import { Route, Routes } from 'react-router';
import CreateNote from './notes/CreateNote';
import EditNote from './notes/EditNote';
import Home from './notes/Home';
import Nav from './notes/Nav';

function Notes({ setIsLogin }) {
    return (
        <div className="notes-page">
            <Nav setIsLogin={setIsLogin} />
            <section>
                <Routes>
                    <Route path="/" element={<Home />} />
                    <Route path="/create" element={<CreateNote />} />
                    <Route path="/edit/:id" element={<EditNote />} />
                </Routes>
            </section>
        </div>
    )
}

export default Notes
