"use client";

import { useEffect, useState } from "react";
import classes from "./page.module.css";
import AddIcon from "@mui/icons-material/Add";
import AggregatorApiServices from "@/services/api/Aggregator.api.services";
import AggregatorCard from "@/components/card/AggregatorCard";
import CreateAggregatorModal from "@/components/modals/CreateAggregatorModal";

function Page() {
  const [loading, setLoading] = useState(true);
  const [modal, setModal] = useState(null);
  const [aggregators, setAggregators] = useState([]);

  const fetchAllAggregators = async () => {
    try {
      setLoading(true);

      const data = await AggregatorApiServices.getAllAggregators();

      setAggregators(data.aggregators);
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  const onClose = () => {
    setModal(null);
  };

  useEffect(() => {
    fetchAllAggregators();
  }, []);

  return (
    <div className={classes.container}>
      {modal === "create_aggregator" && (
        <CreateAggregatorModal
          fetchAllAggregators={fetchAllAggregators}
          onClose={onClose}
        />
      )}
      <div className={classes.pageHeader}>
        <div>
          <h1 className={classes.title}>Aggregators</h1>
        </div>

        <button
          onClick={() => setModal("create_aggregator")}
          className={classes.newBookingBtn}
        >
          <AddIcon />
          <span>New Aggregator</span>
        </button>
      </div>

      {loading ? (
        <div className={classes.loading}>Loading...</div>
      ) : aggregators.length === 0 ? (
        <div className={classes.emptyState}>No aggregators found.</div>
      ) : (
        <div className={classes.cardsContainer}>
          {aggregators.map((aggregator) => (
            <AggregatorCard
              setModal={setModal}
              key={aggregator._id}
              aggregator={aggregator}
            />
          ))}
        </div>
      )}
    </div>
  );
}

export default Page;
