import React, { useEffect, useState } from "react";
import SearchBar from "../components/SearchBar";
import UserTable from "../components/UserTable";

const Dashboard = () => {
  const [users, setUsers] = useState([]);
  const [filteredUsers, setFilteredUsers] = useState([]);
  const [query, setQuery] = useState("");

  useEffect(() => {
    fetch("https://jsonplaceholder.typicode.com/users")
      .then(res => res.json())
      .then(data => {
        setUsers(data);
        setFilteredUsers(data);
      });
  }, []);

  useEffect(() => {
    const filtered = users.filter(user =>
      user.name.toLowerCase().includes(query.toLowerCase()) ||
      user.email.toLowerCase().includes(query.toLowerCase())
    );
    setFilteredUsers(filtered);
  }, [query, users]);

  const handleSort = (key) => {
    const sorted = [...filteredUsers].sort((a, b) => {
      const valA = key === "company" ? a.company.name : a[key];
      const valB = key === "company" ? b.company.name : b[key];
      return valA.localeCompare(valB);
    });
    setFilteredUsers(sorted);
  };

  return (
    <div style={{ padding: "20px" }}>
      <h2>User Directory</h2>
      <SearchBar setQuery={setQuery} />
      <UserTable users={filteredUsers} onSort={handleSort} />
    </div>
  );
};

export default Dashboard;