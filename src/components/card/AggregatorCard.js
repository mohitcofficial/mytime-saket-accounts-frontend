import classes from "./AggregatorCard.module.css";
import EditIcon from "@mui/icons-material/Edit";

export default function AggregatorCard({
  aggregator,
  setModal,
  setCurrentAggregator,
}) {
  return (
    <div className={classes.card}>
      <div className={classes.header}>
        <div className={classes.headingContainer}>
          <h2 className={classes.heading}>{aggregator.name}</h2>
          <p style={{ margin: 0 }} className={classes.subHeading}>
            {aggregator.services.length} Services
          </p>
        </div>

        {/* <button
          onClick={() => {
            setModal("edit_aggregator");
            setCurrentAggregator(aggregator);
          }}
          className={classes.editBtn}
        >
          <EditIcon fontSize="small" />
          Edit
        </button> */}
      </div>

      <div className={classes.table}>
        <div className={classes.tableHeader}>
          <span>Service Name</span>
          <span className={classes.center}>Price</span>
        </div>

        {aggregator.services.map((service) => (
          <div key={service._id} className={classes.row}>
            <span>{service.name}</span>
            <span className={classes.center}>
              ₹{service.price.toLocaleString("en-IN")}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}
