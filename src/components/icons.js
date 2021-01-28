import React from 'react';
import styled from 'styled-components';
import { AddBox, ImportantDevices, FlashOn } from '@material-ui/icons';
const Icons = ({
  children,
}) => (
  <Container >
    <IconContainer active={true}>
      <AddBox style={{ fontSize: 45 }} />
    </IconContainer>
    <Divider />
    <IconContainer>
      <ImportantDevices fontSize="large" style={{ fontSize: 45 }} />
    </IconContainer>
    <Divider />
    <IconContainer>
      <FlashOn fontSize="large" style={{ fontSize: 45 }} />
    </IconContainer>
  </Container>
);

const Container = styled.div`
  display:flex;
  height:20%;
  justify-content:center;
  align-items:center;
`

const Divider = styled.div`
  border-top: 2px solid #9e9e9e;
  width:18%;
  margin-left:40px;
  margin-right:40px;
`;


const IconContainer = styled.div`

  color: ${props => props.active ? 'white' : '#9e9e9e'};
`

export default Icons;
