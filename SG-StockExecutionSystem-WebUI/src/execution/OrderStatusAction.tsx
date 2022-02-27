import React, { FunctionComponent, useEffect } from "react";
import Stack from "@mui/material/Stack";
import Chip from "@mui/material/Chip";
import Divider from "@mui/material/Divider";
import { Record } from "react-admin";
import { useAppSelector, useAppDispatch } from "../hook/hooks";
import { head, includes } from "lodash";
import { updateSelected, resetSelected } from "../store/stockOrderSlice";
interface OrderStatusActionProps {
  record?: Record;
  bookState: {
    data?: any;
    error?: any;
    loading: boolean;
    loaded: boolean;
  };
  selected: StockOrder[];
}

const OrderStatusAction: FunctionComponent<OrderStatusActionProps> = (
  props
) => {
  const { data, error, loading, loaded } = props.bookState;
  const stockOrder: StockOrder = props?.record as StockOrder;
  const [isValid, setIsValid] = React.useState<boolean>(false);
  const [status, setStatus] = React.useState<string>(stockOrder.status);
  const updateSelectedList: UpdatePayload[] = useAppSelector(
    (state) => state.stockOrder.updateSelected
  );
  const orderPriceValid: boolean | undefined = head(
    updateSelectedList
      .filter((us) => us.id === stockOrder.id)
      .map((us) => us.orderPriceValid)
  );
  const amountValid: boolean | undefined = head(
    updateSelectedList
      .filter((us) => us.id === stockOrder.id)
      .map((us) => us.amountValid)
  );
  const executionMode: string | null = head(
    updateSelectedList
      .filter((us) => us.id === stockOrder.id)
      .map((us) => us.executionMode)
  );

  const dispatch = useAppDispatch();

  const getColour = (status: string) => {
    switch (status) {
      case "Not Ready":
        return "warning";
        break;
      case "Ready":
        return "primary";
        break;
      case "In Progress":
        return "info";
        break;
      case "Booked":
        return "success";
        break;
      case "Rejected":
        return "error";
        break;
      default:
        return "default";
        break;
    }
  };

  const validate = (
    side: string | null,
    bloombergTicker: string | null,
    executionMode: string | null,
    currency: string | null
  ) => {
    if (side === null || side === "") {
      return false;
    }
    if (bloombergTicker === null || bloombergTicker === "") {
      return false;
    }
    if (executionMode === null || executionMode === undefined) {
      return false;
    }
    if (currency === null || currency === "") {
      return false;
    }
    return true;
  };

  useEffect(() => {
    if (
      loading &&
      includes(
        props.selected.map((s) => s.id),
        stockOrder.id
      )
    ) {
      setStatus("In Progress");
      dispatch(
        updateSelected({
          id: stockOrder.id,
          status: "In Progress",
        })
      );
    } else if (!loading && loaded) {
      dispatch(resetSelected());
    }
  }, [loading, loaded]);

  useEffect(() => {
    const result: boolean | undefined | number | null =
      validate(
        stockOrder.side,
        stockOrder.bloombergTicker,
        executionMode,
        stockOrder.currency
      ) &&
      (orderPriceValid ?? stockOrder.orderPrice) &&
      (amountValid ?? stockOrder.amount);
    if (result && status === "Not Ready") {
      setStatus("Ready");
      dispatch(
        updateSelected({
          id: stockOrder.id,
          status: "Ready",
        })
      );
    } else if (!result && status === "Ready") {
      setStatus("Not Ready");
      dispatch(
        updateSelected({
          id: stockOrder.id,
          status: "Not Ready",
        })
      );
    }
  }, [
    stockOrder.side,
    stockOrder.bloombergTicker,
    stockOrder.currency,
    orderPriceValid,
    amountValid,
    executionMode,
  ]);

  return (
    <Chip
      label={status}
      variant="filled"
      size="small"
      color={getColour(status)}
    />
  );
};

export default OrderStatusAction;
