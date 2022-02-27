import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import produce from "immer";
import { findIndex, get, isNil } from "lodash";

const initialState: StockOrderState = {
  selected: [],
  updateSelected: [],
};

const stockOrderSlice = createSlice({
  name: "stockOrder",
  initialState,
  reducers: {
    incrementSelected: (
      state: StockOrderState,
      action: PayloadAction<StockOrder>
    ) =>
      produce(state, (draftState: StockOrderState) => {
        draftState.selected.push(action.payload);
      }),
    decrementSelected: (
      state: StockOrderState,
      action: PayloadAction<StockOrder>
    ) =>
      produce(state, (draftState: StockOrderState) => {
        draftState.selected = draftState.selected.filter(
          (so) => so.id !== action.payload.id
        );
      }),
    updateSelected: (
      state: StockOrderState,
      action: PayloadAction<UpdatePayload>
    ) =>
      produce(state, (draftState: StockOrderState) => {
        const index: number = findIndex(
            draftState.selected,
          (so) => so.id === action.payload.id
        );
        if(index >= 0){
            draftState.selected[index].amount = !isNil(get(action.payload, ['amount'], undefined)) ? get(action.payload, ['amount'], undefined) : draftState.selected[index].amount;
            draftState.selected[index].orderPrice = !isNil(get(action.payload, ['orderPrice'], undefined)) ? get(action.payload, ['orderPrice'], undefined) : draftState.selected[index].orderPrice;
            draftState.selected[index].executionMode = !isNil(get(action.payload, ['executionMode'], undefined)) ? get(action.payload, ['executionMode'], undefined) : draftState.selected[index].executionMode;
            draftState.selected[index].status = !isNil(get(action.payload, ['status'], undefined)) ? get(action.payload, ['status'], undefined) : draftState.selected[index].status;
        }

        const indexUpdate: number = findIndex(
            draftState.updateSelected,
            (so) => so.id === action.payload.id
          );
          if(indexUpdate >= 0){
              draftState.updateSelected[indexUpdate].amount = !isNil(get(action.payload, ['amount'], undefined)) ? get(action.payload, ['amount'], undefined) : draftState.updateSelected[indexUpdate].amount;
              draftState.updateSelected[indexUpdate].amountValid = !isNil(get(action.payload, ['amountValid'], undefined)) ? get(action.payload, ['amountValid'], undefined) : draftState.updateSelected[indexUpdate].amountValid;
              draftState.updateSelected[indexUpdate].executionMode = !isNil(get(action.payload, ['executionMode'], undefined)) ? get(action.payload, ['executionMode'], undefined) : draftState.updateSelected[indexUpdate].executionMode;
              draftState.updateSelected[indexUpdate].orderPrice = !isNil(get(action.payload, ['orderPrice'], undefined)) ? get(action.payload, ['orderPrice'], undefined) : draftState.updateSelected[indexUpdate].orderPrice;
              draftState.updateSelected[indexUpdate].orderPriceValid = !isNil(get(action.payload, ['orderPriceValid'], undefined)) ? get(action.payload, ['orderPriceValid'], undefined) : draftState.updateSelected[indexUpdate].orderPriceValid;
              draftState.updateSelected[indexUpdate].status = !isNil(get(action.payload, ['status'], undefined)) ? get(action.payload, ['status'], undefined) : draftState.updateSelected[indexUpdate].status;
            }else{
            draftState.updateSelected.push(action.payload);
          }
      }),
    resetSelected: (
      state: StockOrderState,
    ) =>
      produce(state, (draftState: StockOrderState) => {
        draftState.selected = [];
        draftState.updateSelected = [];
      }),
  },
});

export const {
  incrementSelected,
  decrementSelected,
  updateSelected,
  resetSelected,
} = stockOrderSlice.actions;
export default stockOrderSlice.reducer;
