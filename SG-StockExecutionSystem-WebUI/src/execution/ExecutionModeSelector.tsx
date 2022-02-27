import React, { FunctionComponent } from "react";
import { Record } from "react-admin";
import Select, {SelectChangeEvent} from "@mui/material/Select";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import { useAppDispatch, useAppSelector } from "../hook/hooks";
import { updateSelected } from "../store/stockOrderSlice";
import { head } from 'lodash';

interface ExecutionModeSelectorProps {
  record?: Record;
}
const ExecutionModeSelector: FunctionComponent<ExecutionModeSelectorProps> = (
  props
) => {
  const stockOrder: StockOrder = props?.record as StockOrder;
  const [executionMode, setExecutionMode] = React.useState<"Market" | "Limit">(
    stockOrder.executionMode ?? ''
  );
  const dispatch = useAppDispatch();
  const updateSelectedList: UpdatePayload[] = useAppSelector(
    (state) => state.stockOrder.updateSelected
  );
  const orderPrice: number | undefined = head(updateSelectedList.filter(us => us.id === stockOrder.id).map(us => us.orderPrice));

  const status = head(
    updateSelectedList
      .filter((s) => s.id === stockOrder.id)
      .map((s) => s.status)
  );
  const isPositiveDecimal = (x) => {
    return (Number.isInteger(x) || !(Math.floor(x) === x)) && x > 0;
  };

  const handleChange = (event: SelectChangeEvent<"Market" | "Limit">) => {
    setExecutionMode(event.target.value as ("Market" | "Limit"));
    dispatch(
      updateSelected({
        id: stockOrder.id,
        executionMode: event.target.value as ("Market" | "Limit"),
        orderPriceValid: event.target.value === 'Limit' ? isPositiveDecimal(Number(orderPrice || stockOrder.orderPrice)) : true,
      })
    );
  };
  return (
    <FormControl fullWidth>
      <Select value={executionMode} onChange={handleChange} disabled={stockOrder.status === "Rejected" || (status ?? stockOrder.status) === "In Progress"}>
        <MenuItem value={'Market'}>Market</MenuItem>
        <MenuItem value={'Limit'}>Limit</MenuItem>
      </Select>
    </FormControl>
  );
};

export default ExecutionModeSelector;
