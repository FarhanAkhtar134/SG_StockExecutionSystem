import React, { FunctionComponent, ChangeEvent, useEffect } from "react";
import { Record } from "react-admin";
import TextField from "@mui/material/TextField";
import InputAdornment from "@mui/material/InputAdornment";
import { updateSelected } from "../store/stockOrderSlice";
import { useAppDispatch, useAppSelector } from "../hook/hooks";
import { head } from "lodash";

interface OrderPriceProps {
  record?: Record;
}
const OrderPrice: FunctionComponent<OrderPriceProps> = (props) => {
  const stockOrder: StockOrder = props?.record as StockOrder;
  const [orderPrice, setOrderPrice] = React.useState<number | string>(
    stockOrder.orderPrice ?? ""
  );
  const dispatch = useAppDispatch();

  const updateSelectedList: UpdatePayload[] = useAppSelector(
    (state) => state.stockOrder.updateSelected
  );
  const executionMode = head(
    updateSelectedList
      .filter((s) => s.id === stockOrder.id)
      .map((s) => s.executionMode)
  );

  const status = head(
    updateSelectedList
      .filter((s) => s.id === stockOrder.id)
      .map((s) => s.status)
  );

  const isPositiveDecimal = (x) => {
    return (Number.isInteger(x) || !(Math.floor(x) === x)) && x > 0;
  };

  const handleChange = (event: ChangeEvent<{ value: unknown }>) => {
    setOrderPrice(Number(event.target.value) as number);
    dispatch(
      updateSelected({
        id: stockOrder.id,
        orderPrice: Number(event.target.value) as number,
        orderPriceValid:
          (executionMode ?? stockOrder.executionMode) === "Limit"
            ? isPositiveDecimal(Number(event.target.value))
            : true,
      })
    );
  };

  useEffect(() => {
    if (
      (executionMode) === "Market" ||
      stockOrder.status === "Rejected"
    ) {
      setOrderPrice("");
    }
  }, [executionMode]);

  return (
    <TextField
      // inputProps={{ inputMode: "numeric", pattern: "[0-9]*" }}
      type="number"
      disabled={
        (executionMode ?? stockOrder.executionMode) === "Market" ||
        (status ?? stockOrder.status) === "In Progress" ||
        stockOrder.status === "Rejected" ||
        stockOrder.status === "Booked"
      }
      value={orderPrice}
      onChange={handleChange}
      InputLabelProps={{
        shrink: true,
      }}
      InputProps={{
        endAdornment: <InputAdornment position="start">HKD</InputAdornment>,
      }}
    />
  );
};

export default OrderPrice;
