import React, { useState } from "react";
import { Tab, Tabs, TabList, TabPanel } from "react-tabs";
import "./AdminScreen.css";
import "react-tabs/style/react-tabs.css";
import ProductList from "../../../components/Admin/AllProduct/AllProduct";
import AddProduct from "../../../components/Admin/AddProduct/AddProduct";
import AllUser from "../../../components/Admin/AllUser/AllUsers";
import AllOrders from "../../../components/Admin/AllOrders/AllOrders.js";
import Analytics from "../../../components/Admin/Analytics/Analytics";
import AllRequests from "../../../components/Admin/AllRequest/AllRequest";

function AdminScreen() {
  const [activeTab, setActiveTab] = useState(0);
  const [title, setTitle] = useState("List Products");

  const handleTabSelect = (index) => {
    setActiveTab(index);
    switch (index) {
      case 0:
        setTitle("List Products");
        break;
      case 1:
        setTitle("Add Product");
        break;
      case 2:
        setTitle("All Users");
        break;
      case 3:
        setTitle("All Orders");
        break;
      case 4:
        setTitle("Analytics");
        break;
      case 5:
        setTitle("All Requests");
        break;
      default:
        setTitle("Admin Panel");
        break;
    }
  };

  return (
    <div className="admin-container">
      <div className="sidebar">
        <h3>Admin Panel</h3>
        <Tab
          className={`tab ${activeTab === 0 ? "tab--selected" : ""}`}
          onClick={() => handleTabSelect(0)}
        >
          List Products
        </Tab>
        <Tab
          className={`tab ${activeTab === 1 ? "tab--selected" : ""}`}
          onClick={() => handleTabSelect(1)}
        >
          Add Product
        </Tab>
        <Tab
          className={`tab ${activeTab === 2 ? "tab--selected" : ""}`}
          onClick={() => handleTabSelect(2)}
        >
          All Users
        </Tab>
        <Tab
          className={`tab ${activeTab === 3 ? "tab--selected" : ""}`}
          onClick={() => handleTabSelect(3)}
        >
          All Orders
        </Tab>
        <Tab
          className={`tab ${activeTab === 4 ? "tab--selected" : ""}`}
          onClick={() => handleTabSelect(4)}
        >
          Analytics
        </Tab>
        <Tab
          className={`tab ${activeTab === 5 ? "tab--selected" : ""}`}
          onClick={() => handleTabSelect(5)}
        >
          All Request
        </Tab>
      </div>
      <div className="main-content">
        <h1 className="admin-panel__title">{title}</h1>
        <Tabs selectedIndex={activeTab} onSelect={handleTabSelect}>
          <TabPanel id={0} className="tab-panel" hidden={activeTab !== 0}>
            <ProductList />
          </TabPanel>

          <TabPanel id={1} className="tab-panel" hidden={activeTab !== 1}>
            <AddProduct />
          </TabPanel>

          <TabPanel id={2} className="tab-panel" hidden={activeTab !== 2}>
            <AllUser />
          </TabPanel>

          <TabPanel id={3} className="tab-panel" hidden={activeTab !== 3}>
            <AllOrders />
          </TabPanel>

          <TabPanel id={4} className="tab-panel" hidden={activeTab !== 4}>
            <Analytics />
          </TabPanel>

          <TabPanel id={5} className="tab-panel" hidden={activeTab !== 5}>
            <AllRequests />
          </TabPanel>
        </Tabs>
      </div>
    </div>
  );
}

export default AdminScreen;
