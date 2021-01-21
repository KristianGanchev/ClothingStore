import { createSelector } from "reselect";

const selectShop = state => state.shop;

export const selectCollecions = createSelector(
  [selectShop],
  shop => shop.collections
);

export const selectCollectionForPreview = createSelector(
  [selectCollecions],
  collections => collections ? Object.keys(collections).map(key => collections[key]) : []
);

export const selectCollection = collectionUrlParam =>
  createSelector(
    [selectCollecions],
    collections => collections ? collections[collectionUrlParam] : null
  );

  export const selectIsCollectionFetching = createSelector(
    [selectShop],
    shop => shop.isFetching
  );

  export const selectIsCollectionLoaded = createSelector(
    [selectShop],
    shop => !!shop.collections
  );