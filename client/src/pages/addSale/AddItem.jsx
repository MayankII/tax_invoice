import React, { useEffect, useState } from "react";
import "./AddItem.css";
import toast from "react-hot-toast";
const AddItem = ({
  pushItemData,
  deleteItem,
  serial,
  removeTotalAmount,
  addTotalAmount,
}) => {
  const [itemData, setItemData] = useState({
    itemName: "",
    itemQuantity: "",
    itemUnit: "",
    itemPrice: "",
    itemDiscountPercent: "",
    itemTaxPercent: "",
  });
  const [calculationData, setCalculationData] = useState({
    discountAmount: "",
    taxAmount: "",
    totalAmount: "",
  });
  const handleCalculationChange = (e) => {
    const { name, value } = e.target;
    setCalculationData({ ...calculationData, [name]: value });
  };
  const [show, setShow] = useState(true);
  const handleChange = (e) => {
    setItemData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };
  const addItem = () => {
    if (
      itemData.itemName === "" ||
      itemData.itemQuantity === "" ||
      itemData.itemUnit === "" ||
      itemData.itemPrice === "" ||
      itemData.itemDiscountPercent === "" ||
      itemData.itemTaxPercent === ""
    ) {
      toast.error("All fields are required to save an item");
      return;
    }
    setShow(false);
    pushItemData(itemData);
    addTotalAmount(calculationData.totalAmount);
  };
  const removeItem = () => {
    deleteItem(itemData.itemName);
    setShow(true);
    removeTotalAmount(calculationData.totalAmount);
    setItemData({
      itemName: "",
      itemQuantity: "",
      itemUnit: "",
      itemPrice: "",
      itemDiscountPercent: "",
      itemTaxPercent: "",
    });
  };
  useEffect(() => {
    if (itemData.itemPrice !== "" && itemData.itemDiscountPercent !== "") {
      setCalculationData((prev) => ({
        ...prev,
        discountAmount:
          (itemData.itemDiscountPercent * itemData.itemPrice) / 100,
      }));
    } else {
      setCalculationData((prev) => ({ ...prev, discountAmount: "" }));
    }
  }, [itemData.itemDiscountPercent, itemData.itemPrice]);

  useEffect(() => {
    if (itemData.itemPrice !== "" && itemData.itemTaxPercent !== "") {
      setCalculationData((prev) => ({
        ...prev,
        taxAmount: (itemData.itemTaxPercent * itemData.itemPrice) / 100,
      }));
    } else {
      setCalculationData((prev) => ({ ...prev, taxAmount: "" }));
    }
  }, [itemData.itemTaxPercent, itemData.itemPrice]);

  useEffect(() => {
    if (
      itemData.itemPrice !== "" &&
      calculationData.taxAmount !== "" &&
      calculationData.discountAmount !== "" &&
      itemData.itemQuantity !== ""
    ) {
      setCalculationData((prev) => ({
        ...prev,
        totalAmount:
          itemData.itemPrice * itemData.itemQuantity +
          calculationData.taxAmount * itemData.itemQuantity -
          calculationData.discountAmount * itemData.itemQuantity,
      }));
    } else {
      setCalculationData((prev) => ({ ...prev, totalAmount: "" }));
    }
  }, [
    itemData.itemQuantity,
    calculationData.taxAmount,
    calculationData.discountAmount,
    itemData.itemPrice,
  ]);

  return (
    <>
      <tr className="add-items-row">
        <td>{serial}</td>
        <td>
          <span
            className={show ? "item-action-save" : "item-action-delete"}
            onClick={show ? addItem : removeItem}
          >
            {show ? "Save" : "delete"}
          </span>
        </td>
        <td>
          <input
            className="add-item-input-text"
            name="itemName"
            value={itemData.itemName}
            onChange={handleChange}
            type="text"
            disabled={!show}
          />
        </td>
        <td>
          <input
            className="add-item-input"
            name="itemQuantity"
            value={itemData.itemQuantity}
            onChange={handleChange}
            type="number"
            disabled={!show}
          />
        </td>
        <td>
          <select
            className="add-items-select"
            name="itemUnit"
            value={itemData.itemUnit}
            onChange={handleChange}
            disabled={!show}
          >
            <option>None</option>
            <option value="pac">Pac</option>
            <option value="bag">Bag</option>
          </select>
        </td>
        <td>
          <input
            className="add-item-input"
            name="itemPrice"
            value={itemData.itemPrice}
            onChange={handleChange}
            type="number"
            disabled={!show}
          />
        </td>

        <td>
          <input
            className="add-item-input"
            name="itemDiscountPercent"
            value={itemData.itemDiscountPercent}
            onChange={handleChange}
            type="number"
            disabled={!show}
          />
        </td>
        <td>
          <input
            className="add-item-input"
            value={calculationData.discountAmount}
            onChange={handleCalculationChange}
            name="discountAmount"
            type="number"
            disabled={!show}
          />
        </td>

        <td>
          <input
            className="add-item-input"
            name="itemTaxPercent"
            value={itemData.itemTaxPercent}
            onChange={handleChange}
            type="number"
            disabled={!show}
          />
        </td>
        <td>
          <input
            name="taxAmount"
            onChange={handleCalculationChange}
            value={calculationData.taxAmount}
            className="add-item-input"
            type="number"
            disabled={!show}
          />
        </td>

        <td>
          <input
            name="totalAmount"
            onChange={handleCalculationChange}
            value={calculationData.totalAmount}
            className="add-item-input"
            type="number"
            disabled={!show}
          />
        </td>
      </tr>
    </>
  );
};

export default AddItem;
