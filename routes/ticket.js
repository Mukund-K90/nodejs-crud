const express = require('express');
const router = express.Router();
const {
    handleTicketList,
    handleCreateTicket,
    handleUpdateTicketByTicketId,
    handleDeleteTicketByTicketId,
    handleViewTicketByTicketId,
    handleGetTicketByStatus,
    handleViewTicketByLocation
} = require('../controllers/ticketController');

// create a new ticket
router.post('/create', handleCreateTicket);

//fetch list of tickets
router.get('/list', handleTicketList);

// Update Ticket By ticketId
router.put('/update/:ticketId', handleUpdateTicketByTicketId);

// Delete Ticket By ticketId
router.delete('/delete/:ticketId', handleDeleteTicketByTicketId);

// View Ticket by ticketId
router.get('/ticketId/:ticketId', handleViewTicketByTicketId);

// Get Tickets by status
router.post('/status',handleGetTicketByStatus);

// Get Tickets by Location
router.post('/location', handleViewTicketByLocation);


module.exports = router;