import { useState } from "react";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import { CheckCircle, XCircle, Clock, Truck, Package } from "lucide-react";
import "./Donations.css";

function Donations() {
  const [filterStatus, setFilterStatus] = useState("all");

  const donations = [
    {
      id: 1,
      campaignName: "Food Donation Drive",
      donationType: "Food",
      itemName: "Rice & Pulses",
      quantity: "50 kg",
      date: "2024-01-15",
      status: "Accepted",
      pickupStatus: "Completed"
    },
    {
      id: 2,
      campaignName: "Stationary Donation Campaign",
      donationType: "Education",
      itemName: "Books & Notebooks",
      quantity: "100 items",
      date: "2024-01-20",
      status: "Pending",
      pickupStatus: "Scheduled"
    },
    {
      id: 3,
      campaignName: "Clothes Donation Drive",
      donationType: "Clothing",
      itemName: "Winter Clothes",
      quantity: "30 pieces",
      date: "2024-01-25",
      status: "Accepted",
      pickupStatus: "In Transit"
    },
    {
      id: 4,
      campaignName: "Financial Support Fund",
      donationType: "Financial",
      itemName: "Monetary Donation",
      quantity: "₹5,000",
      date: "2024-02-01",
      status: "Accepted",
      pickupStatus: "N/A"
    },
    {
      id: 5,
      campaignName: "Toiletries Collection",
      donationType: "Hygiene",
      itemName: "Soap & Sanitary Items",
      quantity: "25 packs",
      date: "2024-02-05",
      status: "Rejected",
      pickupStatus: "N/A"
    }
  ];

  const getStatusIcon = (status) => {
    switch (status) {
      case "Accepted":
        return <CheckCircle className="status-icon accepted" />;
      case "Rejected":
        return <XCircle className="status-icon rejected" />;
      case "Pending":
        return <Clock className="status-icon pending" />;
      default:
        return null;
    }
  };

  const getPickupIcon = (pickupStatus) => {
    if (pickupStatus === "Completed") {
      return <CheckCircle className="pickup-icon completed" />;
    } else if (pickupStatus === "In Transit") {
      return <Truck className="pickup-icon in-transit" />;
    } else if (pickupStatus === "Scheduled") {
      return <Clock className="pickup-icon scheduled" />;
    } else {
      return <Package className="pickup-icon na" />;
    }
  };

  const filteredDonations = filterStatus === "all" 
    ? donations 
    : donations.filter(d => d.status.toLowerCase() === filterStatus.toLowerCase());

  return (
    <div className="donations-page">
      <Navbar />
      
      <div className="donations-header">
        <h1 className="page-title">My Donations</h1>
        <p className="page-subtitle">Track all your donation requests and their status</p>
      </div>

      <div className="donations-filters">
        <select
          value={filterStatus}
          onChange={(e) => setFilterStatus(e.target.value)}
          className="status-filter"
        >
          <option value="all">All Status</option>
          <option value="pending">Pending</option>
          <option value="accepted">Accepted</option>
          <option value="rejected">Rejected</option>
        </select>
      </div>

      <div className="donations-container">
        {filteredDonations.length > 0 ? (
          <div className="donations-table">
            <div className="table-header">
              <div className="table-cell">Campaign</div>
              <div className="table-cell">Donation Details</div>
              <div className="table-cell">Date</div>
              <div className="table-cell">Status</div>
              <div className="table-cell">Pickup Status</div>
            </div>
            
            {filteredDonations.map(donation => (
              <div key={donation.id} className="table-row">
                <div className="table-cell">
                  <strong>{donation.campaignName}</strong>
                  <span className="donation-type">{donation.donationType}</span>
                </div>
                <div className="table-cell">
                  <div className="donation-details">
                    <span className="item-name">{donation.itemName}</span>
                    <span className="item-quantity">{donation.quantity}</span>
                  </div>
                </div>
                <div className="table-cell">
                  <span className="donation-date">{new Date(donation.date).toLocaleDateString()}</span>
                </div>
                <div className="table-cell">
                  <div className="status-badge">
                    {getStatusIcon(donation.status)}
                    <span className={`status-text ${donation.status.toLowerCase()}`}>
                      {donation.status}
                    </span>
                  </div>
                </div>
                <div className="table-cell">
                  <div className="pickup-badge">
                    {getPickupIcon(donation.pickupStatus)}
                    <span className={`pickup-text ${donation.pickupStatus.toLowerCase().replace(" ", "-")}`}>
                      {donation.pickupStatus}
                    </span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="no-donations">
            <Package className="no-donations-icon" />
            <p>No donations found</p>
          </div>
        )}
      </div>

      <Footer />
    </div>
  );
}

export default Donations;