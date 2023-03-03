import { PropsWithChildren } from "react";
import styled from "styled-components";
import { Navigation } from "../../components/Home/components/Navigation";

const Root = styled.div`
  `;
export const Chrome: React.FC<PropsWithChildren> = ({ children }) => {
  return <Root>
    <Navigation />
    {children}
  </Root>
}
