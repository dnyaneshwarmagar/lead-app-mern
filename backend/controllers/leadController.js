const Lead = require('../models/Lead');

exports.getLeadById = async (req, res) => {
    try {
      const lead = await Lead.findById(req.params.id);
      if (!lead) {
        return res.status(404).json({ message: 'Lead not found' });
      }
      res.json(lead);
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  };
  
  exports.getLeads = async (req, res) => {
    try {
      const { search, sortField, sortOrder } = req.query;
      const query = {};
  
      if (search) {
        query.$or = [
          { name: { $regex: search, $options: 'i' } },
          { email: { $regex: search, $options: 'i' } },
          { number: { $regex: search, $options: 'i' } },
        ];
      }
  
      const sortOptions = {};
      sortOptions[sortField || 'name'] = sortOrder === 'asc' ? 1 : -1;
  
      const leads = await Lead.find(query).sort(sortOptions);
      res.json(leads);
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  };
  

exports.createLead = async (req, res) => {
    console.log("create lead hit");
  try {
    const newLead = new Lead(req.body);
    const lead = await newLead.save();
    res.status(201).json(lead);
    console.log("create lead hit");

  } catch (error) {
    console.log('error: ', error);
    res.status(400).json({ message: error.message });
  }
};

exports.updateLead = async (req, res) => {
  try {
    const lead = await Lead.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!lead) {
      return res.status(404).json({ message: 'Lead not found' });
    }
    res.json(lead);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

exports.deleteLead = async (req, res) => {
  try {
    const lead = await Lead.findByIdAndDelete(req.params.id);
    if (!lead) {
      return res.status(404).json({ message: 'Lead not found' });
    }
    res.json({ message: 'Lead deleted' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
