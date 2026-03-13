function CampaignCard({ campaign }) {
  return (
    <div className="card shadow">
      <div className="card-body">
        <h5>{campaign.title}</h5>
        <p>{campaign.description}</p>
        <button className="btn btn-success">Donate</button>
      </div>
    </div>
  );
}

export default CampaignCard;