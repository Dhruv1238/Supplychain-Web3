// app/providers.tsx
"use client";
// import { NextUIProvider } from '@nextui-org/react'
import { AuthProvider } from "@arcana/auth";
import { ProvideAuth } from "@arcana/auth-react";
import { TransactionsProvider } from './_components/Transactions';

export const ArcanaProvider = new AuthProvider(
  "xar_test_b4e8ce56861ba32cbdf6402c772d3d8d2451d0a1"
);

export function Providers({ children }) {


  return (
    <ProvideAuth provider={ArcanaProvider}>
      <TransactionsProvider>
        {/* <NextUIProvider> */}
          {children}
        {/* </NextUIProvider> */}
      </TransactionsProvider>
    </ProvideAuth>
  )
}