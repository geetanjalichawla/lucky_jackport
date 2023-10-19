// App.js
import React from "react";
import { ChakraProvider, CSSReset, extendTheme } from "@chakra-ui/react";
import LuckyJackpot from "./LuckyJackpot";
import WinnersComponent from "./winnnerList";


const theme = extendTheme({
  colors: {
    primary: {
      50: "#F4F9FF",
      100: "#D6E7FF",
      200: "#AEC6FF",
      300: "#7DA2FF",
      400: "#4C7DFF",
      500: "#2553E6",
      600: "#0A32B2",
      700: "#001C81",
      800: "#00105B",
      900: "#000633",
    },
    secondary: {
      50: "#FAF9F7",
      100: "#F2EDE5",
      200: "#E0D9C3",
      300: "#C6B89A",
      400: "#A3916D",
      500: "#7A6D45",
      600: "#5A5227",
      700: "#3E3C11",
      800: "#252600",
      900: "#121100",
    },
  },
});


function App() {
  return (
    <ChakraProvider theme={theme}>
      <CSSReset />
      <LuckyJackpot />
      <WinnersComponent/>
    </ChakraProvider>
  );
}

export default App;
