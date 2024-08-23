import React, { useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import axios from "axios";
import Loader from "./Loader";
import NODE_APP_API_URL from "../utils/apiUrl";

const LeadTable = ({ onEdit, reload }) => {
  const [leads, setLeads] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const navigate = useNavigate();
  const location = useLocation();

  const queryParams = new URLSearchParams(location.search);
  const searchParam = queryParams.get("search") || "";
  const sortFieldParam = queryParams.get("sortField") || "name";
  const sortOrderParam = queryParams.get("sortOrder") || "asc";

  const [search, setSearch] = useState(searchParam);
  const [sortField, setSortField] = useState(sortFieldParam);
  const [sortOrder, setSortOrder] = useState(sortOrderParam);

  const fetchLeads = async () => {
    setLoading(true);
    try {
      const response = await axios.get(`${NODE_APP_API_URL}/leads`, {
        params: { search, sortField, sortOrder },
      });
      setLeads(response.data);
      setLoading(false);
    } catch (error) {
      setLoading(false);
      setError(error.response?.data?.message || "Something went wrong");
    }
  };

  useEffect(() => {
    fetchLeads();
  }, [search, sortField, sortOrder, reload]);

  const handleSearchChange = (e) => {
    const value = e.target.value;
    setSearch(value);
    queryParams.set("search", value);
    navigate({ search: queryParams.toString() });
  };

  const handleSortChange = (field) => {
    const newSortOrder = sortOrder === "asc" ? "desc" : "asc";
    setSortField(field);
    setSortOrder(newSortOrder);
    queryParams.set("sortField", field);
    queryParams.set("sortOrder", newSortOrder);
    navigate({ search: queryParams.toString() });
  };

  const handleDelete = async (id) => {
    setLoading(true);
    confirm("Are you sure , you want to delete this file",(ans)=>{
      if(ans === false){
        return
      }
    })
    try {
      await axios.delete(`${NODE_APP_API_URL}/leads/${id}`);
      fetchLeads();
    } catch (error) {
      setLoading(false);
      setError(error.response?.data?.message || "Something went wrong");
    }
  };

  return (
    <div className="lead-table">
      <h2>Leads</h2>
      <input
        type="text"
        placeholder="Search"
        value={search}
        onChange={handleSearchChange}
      />
      <button onClick={() => handleSortChange("name")}>
        Sort by Name{" "}
        {sortField === "name" ? (sortOrder === "asc" ? "▲" : "▼") : ""}
      </button>
      <button onClick={() => handleSortChange("createdAt")}>
        Sort by Date{" "}
        {sortField === "createdAt" ? (sortOrder === "asc" ? "▲" : "▼") : ""}
      </button>
      {loading && <Loader />}
      {error && <p style={{ color: "red" }}>{error}</p>}
      <br/><br/>
      <div className="table-container">
        <table>
          <thead>
            <tr>
              <th>Name</th>
              <th>Email</th>
              <th>Number</th>
              <th>Products</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {leads.map((lead) => (
              <tr key={lead._id}>
                <td>{lead.name}</td>
                <td>{lead.email}</td>
                <td>{lead.number}</td>
                <td>{lead.products.join(", ")}</td>
                <td>
                  <button onClick={() => navigate(`/edit/${lead._id}`)}>
                    Edit
                  </button>
                  <button onClick={() => handleDelete(lead._id)}>Delete</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default LeadTable;
