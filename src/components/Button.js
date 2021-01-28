import React from 'react';
import styled from 'styled-components';

const Button = ({
  active,
  children,
  setButtonHover,
  id,
  onMouseLeave,
  disabled,
  onPress
}) => (
  <ButtonContainer active={active}
    disabled={disabled ? true : false}
    onMouseEnter={() => setButtonHover ? setButtonHover(id) : () => { }}
    onMouseLeave={() => onMouseLeave ? onMouseLeave() : () => { }}
    onClick={() => onPress ? onPress() : () => { }}
  >
    {children}
  </ButtonContainer>
);

const ButtonContainer = styled.div`
background-color: ${props => {
    if (props.disabled === false) {
      return props.active ? '#039be5' : ''
    } else {
      return '#313233'
    }
  }};
  
width: 200px;
height: 49px;
display: inline-flex;
align-items: center;
justify-content: center;
border-top-left-radius: 30px;
border-top-right-radius: 30px;
border-bottom-right-radius: 30px;
border-bottom-left-radius: 30px;
color: ${props => props.disabled ? '#9e9e9e' : '#e0e0e0'};
flex-direction:row;
font-size:13px;
font-family:'Montserrat';
margin-bottom: 10px;
&:hover {
  cursor:${props => props.disabled ? 'not-allowed' : 'pointer'}
}

`

export default Button;
