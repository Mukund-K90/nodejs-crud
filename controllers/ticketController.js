
const Ticket = require('../models/ticket');
const moment = require('moment');


//Create Ticket Controller
async function handleCreateTicket(req, res) {
    try {
        const ticketData = req.body;
        const ticket = new Ticket(ticketData);
        const savedTicket = await ticket.save();
        res.status(201).json(savedTicket);
    } catch (error) {
        res.status(400).json({ message: 'Error creating ticket', error });
    }
}

//List Tickets Controller
async function updateTicketAge(ticket) {
    const now = moment();
    const createdDate = moment(ticket.createdAt);
    const age = now.diff(createdDate, 'days');
    ticket.age = age;
    await ticket.save();

    return ticket;
}

async function handleTicketList(req, res) {
    try {
        const tickets = await Ticket.find();
        const updatedTickets = await Promise.all(tickets.map(updateTicketAge));
        res.json(updatedTickets);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
}

//Update Ticket by TicketId Controller
async function handleUpdateTicketByTicketId(req, res) {
    try {
        const ticket = await Ticket.findOneAndUpdate({ ticketId: req.params.ticketId }, req.body, { new: true });
        if (!ticket) return res.status(404).json({ message: 'ticket not found' });
        res.json(ticket);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
}

//Delete Ticket by TicketId Controller
async function handleDeleteTicketByTicketId(req, res) {
    try {
        const ticket = await Ticket.findOneAndDelete({ ticketId: req.params.ticketId });
        if (!ticket) return res.status(404).json({ message: 'Ticket not found' });
        res.json({ message: 'Ticket deleted' });
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
}

//View Ticket by TicketId Controller
async function handleViewTicketByTicketId(req, res) {
    try {
        const ticket = await Ticket.findOne({ ticketId: req.params.ticketId });
        if (!ticket) return res.status(404).json({ message: 'Ticket not found' });
        res.json(ticket);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
}

//Get Tickets by Status Controller
async function handleGetTicketByStatus(req, res) {
    try {
        const ticket = await Ticket.find({ status: req.body.status });
        if (!ticket) return res.status(404).json({ message: 'ticket not found' });
        res.json(ticket);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
}

//Get Tickets by Location Controller
async function handleViewTicketByLocation(req,res) {
    try {
        const ticket = await Ticket.find({ location: req.body.location });
        if (!ticket) return res.status(404).json({ message: 'ticket not found' });
        res.json(ticket);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
}



module.exports = {
    handleCreateTicket,
    handleTicketList,
    handleUpdateTicketByTicketId,
    handleDeleteTicketByTicketId,
    handleViewTicketByTicketId,
    handleGetTicketByStatus,
    handleViewTicketByLocation
}