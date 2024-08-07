import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';
import Loader from './Loader';
import NODE_APP_API_URL from '../utils/apiUrl';

const LeadForm = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [number, setNumber] = useState('');
  const [products, setProducts] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  useEffect(() => {
    if (id) {
      const fetchLead = async () => {
        setLoading(true);
        try {
          const response = await axios.get(`${NODE_APP_API_URL}/leads/${id}`);
          const lead = response.data;
          setName(lead.name);
          setEmail(lead.email);
          setNumber(lead.number);
          setProducts(lead.products.join(', '));
          setLoading(false);
        } catch (error) {
          setLoading(false);
          setError(error.response?.data?.message || 'Something went wrong');
        }
      };
      fetchLead();
    }
  }, [id]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    try {
      const leadData = { name, email, number, products: products.split(',').map(p => p.trim()) };
      if (id) {
        await axios.put(`${NODE_APP_API_URL}/leads/${id}`, leadData);
      } else {
        console.log('leadData: ', leadData);
        await axios.post(`${NODE_APP_API_URL}/leads`, leadData);
      }
      setLoading(false);
      navigate('/');
    } catch (error) {
      setLoading(false);
      setError(error.response?.data?.message || 'Something went wrong');
    }
  };

  return (
    <form onSubmit={handleSubmit} className="lead-form">
      <h2>{id ? 'Edit Lead' : 'Add Lead'}</h2>
      <input
        type="text"
        placeholder="Name"
        value={name}
        onChange={(e) => setName(e.target.value)}
        required
      />
      <input
        type="email"
        placeholder="Email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        required
      />
      <input
        type="text"
        placeholder="Number"
        value={number}
        onChange={(e) => setNumber(e.target.value)}
        required
      />
      <input
        type="text"
        placeholder="Products (comma-separated)"
        value={products}
        onChange={(e) => setProducts(e.target.value)}
        required
      />
      <button type="submit" disabled={loading}>Save</button>
      {loading && <Loader />}
      {error && <p style={{ color: 'red' }}>{error}</p>}
    </form>
  );
};

export default LeadForm;
