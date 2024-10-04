import { configureStore } from "@reduxjs/toolkit";
import transactionSlice from "../features/transactionSlice";
import informationSlice from "../features/informationSlice";
import membershipSlice from "../features/membershipSlice";

const store = configureStore({
  reducer: {
    membership: membershipSlice,
    information: informationSlice,
    transaction: transactionSlice,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false,
    }),
});

export default store;
