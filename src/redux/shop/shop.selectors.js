import { createSelector } from "reselect";

const selectShop = state => state.shop;

export const selectCollecions = createSelector(
  [selectShop],
  shop => shop.collections
);