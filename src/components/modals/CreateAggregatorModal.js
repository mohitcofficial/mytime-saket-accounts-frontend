"use client";

import { useState } from "react";
import { toast } from "react-toastify";
import styles from "./CreateAggregatorModal.module.css";
import AggregatorApiServices from "@/services/api/Aggregator.api.services";

export default function CreateAggregatorModal({
  onClose,
  fetchAllAggregators,
}) {
  const [loading, setLoading] = useState(false);
  const [serviceRows, setServiceRows] = useState([
    {
      service: "",
      price: "",
    },
  ]);
  const [name, setName] = useState("");

  const convertServicesToObject = (servicesArray) => {
    return servicesArray.reduce((acc, item) => {
      if (item.service.trim()) {
        acc[item.service] = Number(item.price) || 0;
      }
      return acc;
    }, {});
  };

  const addServiceRow = () => {
    setServiceRows((prev) => [
      ...prev,
      {
        service: "",
        price: "",
      },
    ]);
  };

  const removeServiceRow = (index) => {
    setServiceRows((prev) => prev.filter((_, i) => i !== index));
  };

  const handleServiceChange = (index, field, value) => {
    setServiceRows((prev) =>
      prev.map((row, i) =>
        i === index
          ? {
              ...row,
              [field]: value,
            }
          : row,
      ),
    );
  };

  const submitHandler = async () => {
    const convertedService = convertServicesToObject(serviceRows);
    try {
      const data = await AggregatorApiServices.createAggregators({
        name,
        services: convertedService,
      });
      toast.success(data?.message);
    } catch (error) {
      toast.error(error.response?.data?.message);
    } finally {
      onClose();
      fetchAllAggregators();
      setLoading(false);
    }
  };

  return (
    <div className={styles.overlay} onClick={onClose}>
      <div className={styles.modal} onClick={(e) => e.stopPropagation()}>
        {/* Header */}
        <div className={styles.header}>
          <div className={styles.headingContainer}>
            <h2 className={styles.heading}>Add New Aggregator</h2>

            {/* <p className={styles.subHeading}>Update booking information</p> */}
          </div>

          <button className={styles.closeBtn} onClick={onClose}>
            ✕
          </button>
        </div>

        {/* Body */}

        <div className={styles.body}>
          <div className={styles.field}>
            <label className={styles.label}>Aggregator Name</label>

            <input
              type="text"
              placeholder="Enter aggregator name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className={styles.input}
            />
          </div>

          <div className={styles.servicesSection}>
            <div className={styles.servicesHeader}>
              <h3 className={styles.heading2}>Services</h3>

              <button
                type="button"
                className={styles.addServiceBtn}
                onClick={addServiceRow}
              >
                + Add Service
              </button>
            </div>

            {serviceRows.map((row, index) => (
              <div key={index} className={styles.serviceRow}>
                <input
                  type="text"
                  placeholder="Service Name"
                  value={row.service}
                  onChange={(e) =>
                    handleServiceChange(index, "service", e.target.value)
                  }
                  className={styles.input}
                />

                <input
                  type="number"
                  placeholder="Price"
                  value={row.price}
                  onChange={(e) =>
                    handleServiceChange(index, "price", e.target.value)
                  }
                  className={styles.input}
                />

                {serviceRows.length > 1 && (
                  <button
                    type="button"
                    className={styles.removeBtn}
                    onClick={() => removeServiceRow(index)}
                  >
                    Remove
                  </button>
                )}
              </div>
            ))}
          </div>
        </div>

        {/* Footer */}
        <div className={styles.footer}>
          <button className={styles.cancelBtn} onClick={onClose}>
            Cancel
          </button>

          <button
            disabled={loading}
            className={styles.saveBtn}
            onClick={submitHandler}
          >
            {loading ? "Adding..." : "Add Aggregator"}
          </button>
        </div>
      </div>
    </div>
  );
}
