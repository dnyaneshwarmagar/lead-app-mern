const express = require('express');
const {
    getLeadById,
    getLeads,
    createLead,
    updateLead,
    deleteLead,
} = require('../controllers/leadController');

const router = express.Router();

router.get('/leads/:id', getLeadById);
router.get('/leads', getLeads);
router.post('/leads', createLead);
router.put('/leads/:id', updateLead);
router.delete('/leads/:id', deleteLead);

module.exports = router;
