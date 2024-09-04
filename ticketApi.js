const express = require('express');
const mongoose = require('mongoose');
const Ticket = require('./models/ticket');
const bodyParser = require('body-parser');
const moment = require('moment');

const app = express();
const port = 3000;

app.use(bodyParser.json());

mongoose.connect('mongodb://localhost:27017/allTickets', {
    useNewUrlParser: true,
    useUnifiedTopology: true
}).then(() => {
    console.log('Connected to MongoDB');
}).catch(err => {
    console.error('Error connecting to MongoDB:', err);
});

app.get('/', (req, res) => {
    res.status(200).send("TICKET API")
});


// create a new ticket
app.post('/create', async (req, res) => {
    try {
        const ticketData = req.body;
        const ticket = new Ticket(ticketData);
        const savedTicket = await ticket.save();

        res.status(201).json(savedTicket);
    } catch (error) {
        res.status(400).json({ message: 'Error creating ticket', error });
    }
});

async function updateTicketAge(ticket) {
    const now = moment();
    const createdDate = moment(ticket.createdAt);
    ticket.age = now.diff(createdDate, 'days');
    return ticket;
}

// Endpoint to fetch list of tickets
app.get('/list', async (req, res) => {
    try {
        const tickets = await Ticket.find();
        const updatedTickets = await Promise.all(tickets.map(updateTicketAge));
        res.json(updatedTickets);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
});


// Update user by ticketId
app.put('/update/:ticketId', async (req, res) => {
    try {
        const ticket = await Ticket.findOneAndUpdate({ ticketId: req.params.ticketId }, req.body, { new: true });
        if (!ticket) return res.status(404).json({ message: 'ticket not found' });
        res.json(ticket);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
});

// Delete user by ticketId
app.delete('/delete/:ticketId', async (req, res) => {
    try {
        const ticket = await Ticket.findOneAndDelete({ ticketId: req.params.ticketId });
        if (!ticket) return res.status(404).json({ message: 'Ticket not found' });
        res.json({ message: 'Ticket deleted' });
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
});

// View user by ticketId
app.get('/ticketId/:ticketId', async (req, res) => {
    try {
        const ticket = await Ticket.findOne({ ticketId: req.params.ticketId });
        if (!ticket) return res.status(404).json({ message: 'Ticket not found' });
        res.json(ticket);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
});

// Get data by status
app.post('/status', async (req, res) => {
    try {
        const ticket = await Ticket.find({ status: req.body.status });
        if (!ticket) return res.status(404).json({ message: 'ticket not found' });
        res.json(ticket);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
});

// Get data by location
app.post('/location', async (req, res) => {
    try {
        const ticket = await Ticket.find({ location: req.body.location });
        if (!ticket) return res.status(404).json({ message: 'ticket not found' });
        res.json(ticket);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
});

app.listen(port, () => {
    console.log(`Server is running on port http://192.168.1.11:${port}`);
});
