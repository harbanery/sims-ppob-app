import { redirect } from "react-router-dom";
import { getTokenfromSessionStorage } from "./storage";
import store from "../config/store";
import { defaultTransaction, getBalance } from "../features/transactionSlice";
import { getBanners, getServices } from "../features/informationSlice";
import { getProfile } from "../features/membershipSlice";

export const authLoader = ({ request }) => {
  const url = new URL(request.url);
  const pathname = url.pathname;
  const token = getTokenfromSessionStorage();

  if (token) {
    return redirect("/");
  }

  if (pathname == "/auth") {
    return redirect("/auth/login");
  }

  return null;
};

export const mainLoader = async ({}) => {
  const token = getTokenfromSessionStorage();

  if (token) {
    try {
      await Promise.all([
        store.dispatch(getProfile()).unwrap(),
        store.dispatch(getBalance()).unwrap(),
      ]);

      return null;
    } catch (error) {
      return redirect("/auth/login");
    }
  } else {
    return redirect("/auth/login");
  }
};

export const homepageLoader = async ({}) => {
  const token = getTokenfromSessionStorage();

  if (token) {
    await Promise.all([
      store.dispatch(getBanners()).unwrap(),
      store.dispatch(getServices()).unwrap(),
    ]);
  }

  return null;
};

export const serviceLoader = async ({}) => {
  const token = getTokenfromSessionStorage();

  if (token) {
    await store.dispatch(getServices()).unwrap();
  }

  return null;
};

export const transactionLoader = async ({}) => {
  store.dispatch(defaultTransaction());

  return null;
};
