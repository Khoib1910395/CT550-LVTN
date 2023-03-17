import React, { useState } from "react";
import { Tab, Tabs, TabList, TabPanel } from "react-tabs";
import "./AdminScreen.css";
import "react-tabs/style/react-tabs.css";
import ProductList from "../../../components/Admin/AllProduct/AllProduct";
import AddProduct from "../../../components/Admin/AddProduct/AddProduct";
import AllUser from "../../../components/Admin/AllUser/AllUsers";
import AllOrders from "../../../components/Admin/AllOrders/AllOrders.js";
import Analytics from "../../../components/Admin/Analytics/Analytics";

function AdminScreen() {
  const [activeTab, setActiveTab] = useState(0);

  const handleTabSelect = (index) => {
    setActiveTab(index);
  };

  return (
    <>
      <h1 className="admin-panel__title">Admin Panel</h1>
      <div className="admin-panel">
        <TabList className="tab-list">
          <Tab className="tab button" onClick={() => setActiveTab(0)}>List Products</Tab>
          <Tab className="tab button" onClick={() => setActiveTab(1)}>Add Product</Tab>
          <Tab className="tab button" onClick={() => setActiveTab(2)}>All Users</Tab>
          <Tab className="tab button" onClick={() => setActiveTab(3)}>All Orders</Tab>
          <Tab className="tab button" onClick={() => setActiveTab(4)}>Analytics</Tab>
        </TabList>

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
        </Tabs>
      </div>
    </>
  );
}

export default AdminScreen;
