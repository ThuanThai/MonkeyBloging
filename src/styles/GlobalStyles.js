import { createGlobalStyle } from "styled-components";
import { GlobalClasses } from "./GlobalClasses";
export const GlobalStyles = createGlobalStyle`
  ${GlobalClasses}
  @import url('https://fonts.googleapis.com/css2?family=Poppins:wght@400;500;600;700&display=swap');
  @import url('https://fonts.googleapis.com/css2?family=Montserrat:wght@300;400;500;600&family=Poppins:wght@400;500;600;700&display=swap');
  @import url('https://fonts.googleapis.com/css2?family=Epilogue:wght@200;300;400;500;600;700;800&display=swap');
`;
