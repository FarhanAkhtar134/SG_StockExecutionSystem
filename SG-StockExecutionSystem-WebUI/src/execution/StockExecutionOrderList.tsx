import React, { FunctionComponent, MouseEvent, useEffect } from "react";
import {
  List,
  Datagrid,
  TextField,
  FunctionField,
  NumberField,
  Record,
  useMutation,
  Identifier,
  Pagination,
} from "react-admin";
import BuySellActionField from "./BuySellActionField";
import OrderStatusAction from "./OrderStatusAction";
import ExecutionModeSelector from "./ExecutionModeSelector";
import CheckboxAction from "./CheckboxAction";
import OrderPrice from "./OrderPrice";
import AmountShares from "./AmountShares";
import Grid from "@mui/material/Grid";
import Button from "@mui/material/Button";
import Divider from "@mui/material/Divider";
import { useAppSelector, useAppDispatch } from "../hook/hooks";
import { intersection, omit, head } from "lodash";
import { useRefresh, useNotify, useRedirect } from "react-admin";
import { resetSelected } from "../store/stockOrderSlice";

interface StockExecutionOrderListProps {}
const PostPagination = (props) => (
  <Pagination
    rowsPerPageOptions={[10, 25, 50, 100, 500, 1000, 2000]}
    {...props}
  />
);
const StockExecutionOrderList: FunctionComponent<
  StockExecutionOrderListProps
> = (props) => {
  const selected: StockOrder[] = useAppSelector(
    (state) => state.stockOrder.selected
  );
  const updateSelected: UpdatePayload[] = useAppSelector(
    (state) => state.stockOrder.updateSelected
  );
  const [mutateRemove, removeState] = useMutation();
  const [mutateBook, bookState] = useMutation();
  const refresh = useRefresh();
  const notify = useNotify();
  const redirect = useRedirect();
  const dispatch = useAppDispatch();

  const bookSubmitHandler = (event: MouseEvent, payload: StockOrder[]) => {
    mutateBook(
      {
        type: "updateMany",
        resource: "orders",
        payload: {
          data: payload,
        },
      },
      {
        onSuccess: ({ data }) => {
          dispatch(resetSelected());
          notify(`Orders: ${data.map(o => o.bloombergTickerLocal)} are Booked`, {
            type: "success",
          });
          refresh()
        },
        onFailure: (error) => {
          dispatch(resetSelected());
          notify(`Order is Rejected with error: ${error}`, {
            type: "error",
          });
          refresh();
        },
      }
    );
  };

  const removeSubmitHandler = (event: MouseEvent, payload: Identifier[]) => {
    mutateRemove(
      {
        type: "deleteMany",
        resource: "orders",
        payload: {
          ids: payload,
        },
      },
      {
        onSuccess: ({ data }) => {
          dispatch(resetSelected());
          refresh();
        },
        onFailure: (error) => {
          dispatch(resetSelected());
          notify(`Orders can't be removed due to error: ${error}`, {
            type: "error",
          });
          refresh();
        },
      }
    );
  };

  const getSubmitSelected = (
    selected: StockOrder[],
    updateSelected: UpdatePayload[]
  ) => {
    return selected.map((s) => ({
      ...s,
      ...omit(head(updateSelected.filter((up) => up.id === s.id)), [
        "orderPriceValid",
        "amountValid",
      ]),
    }));
  };

  const containStatus = (selected: StockOrder[], statuses: string[]) => {
    const statusesSelected: string[] = selected.map((s) => s.status);
    return intersection(statuses, statusesSelected).length > 0;
  };

  return (
    <>
      <Grid container justifyContent="flex-end">
        <Button
          variant="contained"
          disabled={selected.length === 0}
          onClick={(event) =>
            removeSubmitHandler(
              event,
              getSubmitSelected(selected, updateSelected).map((s) => s.id)
            )
          }
        >
          Remove
        </Button>
        <Divider
          orientation="vertical"
          flexItem
          style={{ marginLeft: "10px", marginRight: "10px" }}
        />
        <Button
          variant="contained"
          onClick={(event) =>
            bookSubmitHandler(
              event,
              getSubmitSelected(selected, updateSelected)
            )
          }
          disabled={
            selected.length === 0 ||
            containStatus(getSubmitSelected(selected, updateSelected), [
              "Not Ready",
              "Booked",
            ])
          }
        >
          Book
        </Button>
      </Grid>
      <List
        {...props}
        bulkActionButtons={false}
        exporter={false}
        perPage={25}
        pagination={<PostPagination />}
      >
        <Datagrid>
          <FunctionField
            textAlign="left"
            render={(record?: Record, source?: string) => (
              <CheckboxAction record={record} />
            )}
          />
          <FunctionField
            label="Status"
            textAlign="left"
            render={(record?: Record, source?: string) => (
              <OrderStatusAction record={record} bookState={bookState} selected={selected}/>
            )}
          />
          <TextField textAlign="left" source="side" label="Side" />
          <TextField textAlign="left" source="ric" label="Stock Code" />
          <FunctionField
            label="Execution Mode"
            textAlign="left"
            render={(record?: Record, source?: string) => (
              <ExecutionModeSelector record={record} />
            )}
          />
          <FunctionField
            label="Order Price"
            textAlign="left"
            render={(record?: Record, source?: string) => (
              <OrderPrice record={record} />
            )}
          />
          <FunctionField
            label="Amount(Shares)"
            textAlign="left"
            render={(record?: Record, source?: string) => (
              <AmountShares record={record} />
            )}
          />
        </Datagrid>
      </List>
    </>
  );
};

export default StockExecutionOrderList;
