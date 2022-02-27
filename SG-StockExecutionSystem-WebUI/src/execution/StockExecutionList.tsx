import React, { FunctionComponent } from "react";
import {
  List,
  Datagrid,
  TextField,
  FunctionField,
  NumberField,
  Record,
  Pagination
} from "react-admin";
import Stack from "@mui/material/Stack";
import Button from "@mui/material/Button";
import Divider from '@mui/material/Divider';
import BuySellActionField from './BuySellActionField';

interface StockExecutionListProps {}
const PostPagination = props => <Pagination rowsPerPageOptions={[10, 25, 50, 100, 500, 1000, 2000]} {...props} />;
const StockExecutionList: FunctionComponent<StockExecutionListProps> = (
  props
) => (
  <List {...props} bulkActionButtons={false} exporter={false} perPage={25} pagination={<PostPagination />}>
    <Datagrid>
      <TextField textAlign='left' source="ric" label="Stock Code" />
      <NumberField textAlign='left' source="price" label="Market Price" options={{ maximumFractionDigits: 2 }}/>
      <TextField textAlign='left' source="currency" label="Currency" />
      <FunctionField
        label="Actions"
        textAlign='left'
        render={(record?: Record, source?: string) => (
         <BuySellActionField record={record}/>
        )}
      />
    </Datagrid>
  </List>
);

export default StockExecutionList;
