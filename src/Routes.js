import React, { useEffect, useState, useRef } from 'react';
import { Routes, Route, useNavigate } from 'react-router-dom';

import Priority from './Display/Priority';
import Status from './Display/Status';
import User from './Display/User';
import './style.css'; 

import display from "./Icons/Display.svg"

export default function Routing() {

    const [tickets, setTickets] = useState([]);
    const [displayDropdown, setDisplayDropdown] = useState(false);

    const [grouping, setGrouping] = useState('Status');
    const [ordering, setOrdering] = useState('Priority');

    const dropdownRef = useRef(null);

    const navigate = useNavigate();

    const handleGroupingChange = (e) => {
        const selectedValue = e.target.value;
        setGrouping(selectedValue);

        if (selectedValue === 'User') {
            navigate('/user');
        } else if (selectedValue === "Status") {
            navigate("/status");
        } else {
            navigate("/");
        }
        setDisplayDropdown(false); 
    };

    const handleOrderingChange = (e) => {
        setOrdering(e.target.value);
        setDisplayDropdown(false); 
    };

    const toggleDisplayDropdown = () => {
        setDisplayDropdown(!displayDropdown);
    };

    const handleClickOutside = (event) => {
        if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
            setDisplayDropdown(false);
        }
    };

    useEffect(() => {
        document.addEventListener("mousedown", handleClickOutside);
        return () => {
            document.removeEventListener("mousedown", handleClickOutside);
        };
    }, []);

    useEffect(() => {
        const loadTickets = async () => {
            try {
                const data = await fetch("https://api.quicksell.co/v1/internal/frontend-assignment", {
                    method: "GET",
                    headers: {
                        'Content-Type': 'application/json'
                    }
                });

                const response = await data.json();
                setTickets(response.tickets);

            } catch (error) {
                console.log("Error fetching Data", error);
                setTickets(false);
            }
        };

        loadTickets();
    }, []);

    return (
        <div>
            <div className='header-web'>
                <div className='display-dropdown' ref={dropdownRef}>
                    <button onClick={toggleDisplayDropdown} className='display-button'>
                        <div className="display-style" style={{display: "flex", alignItems: "center"}}>
                            <img src={display} alt='.' style={{marginRight: "8px"}}/> Display ▼
                        </div>
                    </button>
                    {displayDropdown && (
                        <div className='dropdown-menu'>
                            <div className='dropdown-item'>
                                <label>Grouping</label>
                                <select className='dropdown' value={grouping} onChange={handleGroupingChange}>
                                    <option value="Status">Status</option>
                                    <option value="User">User</option>
                                    <option value="Priority">Priority</option>
                                </select>
                            </div>
                            <div className='dropdown-item'>
                                <label>Ordering</label>
                                <select className='dropdown' value={ordering} onChange={handleOrderingChange}>
                                    <option value="Priority">Priority</option>
                                    <option value="Title">Title</option>
                                </select>
                            </div>
                        </div>
                    )}
                </div>
            </div>
            <div className='board'>
                <Routes>
                    <Route path="/" element={<Priority tickets={tickets} ordering={ordering} />} />
                    <Route path="/user" element={<User tickets={tickets} ordering={ordering} />} />
                    <Route path="/status" element={<Status tickets={tickets} ordering={ordering} />} />
                </Routes>
            </div>
        </div>
    );
}
