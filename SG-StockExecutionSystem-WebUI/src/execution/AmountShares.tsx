import React, { FunctionComponent, ChangeEvent } from "react";
import { Record } from "react-admin";
import TextField from "@mui/material/TextField";
import { updateSelected } from "../store/stockOrderSlice";
import { useAppDispatch, useAppSelector } from "../hook/hooks";
import { head } from 'lodash';

interface AmountSharesProps {
  record?: Record;
}
const AmountShares: FunctionComponent<AmountSharesProps> = (props) => {
  const stockOrder: StockOrder = props?.record as StockOrder;
  const [shares, setShares] = React.useState<number | string>(
    stockOrder.amount || ""
  );
  const dispatch = useAppDispatch();

  const isPositiveInteger = (x) => {
    return Number.isInteger(x) && x > 0;
  };

  const updateSelectedList: UpdatePayload[] = useAppSelector(
    (state) => state.stockOrder.updateSelected
  );

  const status = head(
    updateSelectedList
      .filter((s) => s.id === stockOrder.id)
      .map((s) => s.status)
  );

  const handleChange = (event: ChangeEvent<{ value: unknown }>) => {
    setShares(Number(event.target.value) as number);
    dispatch(
      updateSelected({
        id: stockOrder.id,
        amount: Number(event.target.value) as number,
        amountValid: isPositiveInteger(Number(event.target.value)),
      })
    );
  };
  return (
    <TextField
      // inputProps={{ inputMode: 'numeric', pattern: '[0-9]*' }}
      disabled={stockOrder.status === "Rejected" || (status ?? stockOrder.status) === "In Progress"}
      type="number"
      value={shares}
      onChange={handleChange}
      InputLabelProps={{
        shrink: true,
      }}
    />
  );
};

export default AmountShares;
