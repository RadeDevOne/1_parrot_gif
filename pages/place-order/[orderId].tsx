/* eslint react/react-in-jsx-scope: 0 */
/* eslint jsx-a11y/anchor-is-valid: 1 */
import type { GetServerSideProps, NextPage as NP } from "next";

import type { Order } from "@prisma/client";

import prisma from "@/lib/prisma";

import { redirectToSigninIfNoAuth } from "@/lib/intent_nav";

// TODO (USE THIS)
import validateOrder from "@/lib/auth/validateOrder";

import Layout from "@/components/9_place_order_page/Layout";

interface PropsI {
  order: Order;
}

type paramsType = {
  orderId: string;
};

export const getServerSideProps: GetServerSideProps<
  PropsI | { nothing: true },
  paramsType
> = async (ctx) => {
  const { params } = ctx;

  const redirectOptions = await redirectToSigninIfNoAuth(ctx, "/signin");

  if (redirectOptions.status === "unauthenticated") {
    return {
      props: {
        nothing: true,
      },
      redirect: redirectOptions.redirect,
    };
  }

  // WE WILL CHECK IF ORDER EXISTS
  // IF NOT WE ARE GOING TO REDIRRECT TO THE MAIN PAGE

  const order = await prisma.order.findUnique({
    where: {
      id: params?.orderId,
    },
  });

  if (!order) {
    return {
      props: {
        nothing: true,
      },
      redirect: "/",
    };
  }

  return {
    props: {
      order,
    },
  };
};

const PlaceOrderPage: NP<PropsI> = (props) => {
  //

  console.log(props);

  return (
    <div>
      <Layout order={props.order} />
    </div>
  );
};

export default PlaceOrderPage;
