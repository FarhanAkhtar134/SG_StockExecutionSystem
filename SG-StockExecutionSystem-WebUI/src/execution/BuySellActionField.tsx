import React, { FunctionComponent, MouseEvent } from "react";
import Stack from "@mui/material/Stack";
import Button from "@mui/material/Button";
import Divider from "@mui/material/Divider";
import { useMutation, Record } from "react-admin";
import { omit } from 'lodash';

interface BuySellActionFieldProps {
  record?: Record;
}
const BuySellActionField: FunctionComponent<BuySellActionFieldProps> = (
  props
) => {
  const stock: Stock = props?.record as Stock;
  const [mutate, { loading }] = useMutation();

  const sideSubmitHandler = (event: MouseEvent, side: "Buy" | "Sell") =>
    mutate({
      type: "create",
      resource: "stocks",
      payload: {
        data: { ...(omit(stock, ['id'])), side: side, status: "Not Ready" },
      },
    });
  return (
    <Stack
      direction="row"
      spacing={2}
      divider={<Divider orientation="vertical" flexItem />}
    >
      <Button
        variant="contained"
        size="small"
        onClick={(event) => sideSubmitHandler(event, "Buy")}
      >
        Buy
      </Button>
      <Button
        variant="contained"
        size="small"
        onClick={(event) => sideSubmitHandler(event, "Sell")}
      >
        Sell
      </Button>
    </Stack>
  );
};

export default BuySellActionField;
