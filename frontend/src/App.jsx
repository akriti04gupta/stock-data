import React, { useState } from "react";
import "./App.css";
import { Table, Input, Button, Select, message } from "antd";
const { Option } = Select;
import "antd/dist/reset.css";

function App() {
  const [query, setQuery] = useState("");
  const [dataSource, setDataSource] = useState([]);
  const [day, setDay] = useState("");
  const [month, setMonth] = useState("");
  const [year, setYear] = useState("");

  const loadDataForDate = async () => {
  if (!day || !month || !year) {
    message.error("Please select day, month and year");
    return;
  }

  const dateStr = `${day}${month}${year}`;

  const response = await fetch(
    `http://127.0.0.1:8000/fetch_data/?date=${dateStr}`
  );

  const data = await response.json();
  message.success(data.message || "Data loaded");
};


  const fetchData = async () => {
    if (!query.trim()) {
      message.error("Enter company name");
      return;
    }
    if (!day || !month || !year) {
      message.error("Please select day, month and year");
      return;
    }

  const dateStr = `${day}${month}${year}`;

    const response = await fetch(
      `http://127.0.0.1:8000/stocks/?date=${dateStr}&search=${encodeURIComponent(query.trim())}`
    );
    const data = await response.json();

    setDataSource(Array.isArray(data) ? data : [data]);
  };

  const columns = [
    { title: "Code", dataIndex: "code", key: "code" },
    { title: "Name", dataIndex: "name", key: "name" },
    { title: "Open", dataIndex: "open", key: "open" },
    { title: "High", dataIndex: "high", key: "high" },
    { title: "Low", dataIndex: "low", key: "low" },
    { title: "Close", dataIndex: "close", key: "close" },
  ];

  return (
    <div className="App">
      <div className="app-container">
        <div className="app-card">

          <div className="controls-row">
            <Select
              placeholder="DD"
              style={{ width: 80 }}
              onChange={(value) => setDay(value)}
            >
              {[...Array(31)].map((_, i) => {
                const val = String(i + 1).padStart(2, "0");
                return <Option key={val} value={val}>{val}</Option>;
              })}
            </Select>

            <Select
              placeholder="MM"
              style={{ width: 80 }}
              onChange={(value) => setMonth(value)}
            >
              {[...Array(12)].map((_, i) => {
                const val = String(i + 1).padStart(2, "0");
                return <Option key={val} value={val}>{val}</Option>;
              })}
            </Select>

            <Select
              placeholder="YY"
              style={{ width: 80 }}
              onChange={(value) => setYear(value)}
            >
              {["09","10","11","12","13","14","15","16","17","18","19","20","21","22","23"].map(
                (val) => (
                  <Option key={val} value={val}>{val}</Option>
                )
              )}
            </Select>
          </div>

          </div>
          <div className="controls-row" style={{ marginTop: 12 }}>
            <Button onClick={loadDataForDate}>Load Data</Button>
            <Input
              className="search-input"
              placeholder="Type the name of the stock"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
            />
            <Button type="primary" onClick={fetchData}>
              Search
            </Button>
          </div>

          <h2 style={{ color: "#ffff", marginTop: 16 }}>
            Stock Data
          </h2>

          <Table
            dataSource={dataSource}
            columns={columns}
            rowKey="id"
            pagination={false}
          />

        </div>
      </div>
  );
}

export default App;
