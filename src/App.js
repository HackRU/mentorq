import React from "react";
import { CoreProvider } from "@hackru/frontend-core";
import LINKER from "./Linker";
import CONFIG from "./Config";
import { CoreModule } from "@hackru/frontend-core";

export default () => {

  return (
    <CoreProvider Linker={LINKER} Store={{ test: 10 }}>
      {CONFIG}
    </ CoreProvider>
  );
}
