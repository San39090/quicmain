import React from 'react';
import Card from "../Card/card.js";
import './Priority.css';
import noPriorityImage from '../Icons/No-priority.svg';
import lowPriorityImage from '../Icons/Img - Low Priority.svg';
import mediumPriorityImage from '../Icons/Img - Medium Priority.svg';
import highPriorityImage from '../Icons/Img - High Priority.svg';
import urgentPriorityImage from '../Icons/SVG - Urgent Priority colour.svg';
import add from "../Icons/add.svg";
import dots from "../Icons/3 dot menu.svg"

export default function Priority({ tickets, ordering }) {

    const groupedTickets = {
        "No priority": tickets.filter(ticket => ticket.priority === 0),
        "Low": tickets.filter(ticket => ticket.priority === 1),
        "Medium": tickets.filter(ticket => ticket.priority === 2),
        "High": tickets.filter(ticket => ticket.priority === 3),
        "Urgent": tickets.filter(ticket => ticket.priority === 4)
    };

    const priorityImages = {
        "No priority": noPriorityImage,
        "Low": lowPriorityImage,
        "Medium": mediumPriorityImage,
        "High": highPriorityImage,
        "Urgent": urgentPriorityImage
    };

    Object.keys(groupedTickets).forEach(priority => {
        if (ordering === 'Priority') {
            groupedTickets[priority].sort((a, b) => b.priority - a.priority);
        } else if (ordering === 'Title') {
            groupedTickets[priority].sort((a, b) => a.title.localeCompare(b.title));
        }
    });

    return (
        <div>
            <div className='part1'>
                {Object.keys(groupedTickets).map(priority => (
                    <div key={priority} className='column'>
                        <div className='title'>
                            <img src={priorityImages[priority]} alt='.' className='image'/>
                            <h2 className='column-title'>{priority} {groupedTickets[priority].length}</h2>
                            <img src={add} alt='+' className='plus'/>
                            <img src={dots} alt='...'/>
                        </div>
                        {groupedTickets[priority].map(ticket => (
                            <Card key={ticket.id} ticket={ticket} display="Priority"/>
                        ))}
                    </div>
                ))}
            </div>
        </div>
    );
}
