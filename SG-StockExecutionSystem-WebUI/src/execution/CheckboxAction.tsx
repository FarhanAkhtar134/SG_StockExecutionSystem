import React, { FunctionComponent, ChangeEvent } from "react";
import { Record } from "react-admin";
import TextField from "@mui/material/TextField";
import Checkbox from "@mui/material/Checkbox";
import { incrementSelected, decrementSelected } from "../store/stockOrderSlice";
import { useAppDispatch } from "../hook/hooks";

interface CheckboxActionProps {
  record?: Record;
}
const CheckboxAction: FunctionComponent<CheckboxActionProps> = (props) => {
  const stockOrder: StockOrder = props?.record as StockOrder;
  const [checked, setChecked] = React.useState<boolean>(false);
  const dispatch = useAppDispatch();

  const handleChange = (event: ChangeEvent<{ checked: boolean }>) => {
    setChecked(event.target.checked);
    if (event.target.checked) {
      dispatch(incrementSelected(stockOrder));
    } else {
      dispatch(decrementSelected(stockOrder));
    }
  };
  return (
    <Checkbox
      checked={checked}
      disabled={stockOrder?.status === "In Progress"}
      onChange={handleChange}
    />
  );
};

export default CheckboxAction;
