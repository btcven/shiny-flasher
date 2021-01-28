import React, { Component } from 'react'
import Button from '../components/Button'
import styled from 'styled-components';
import Icons from '../components/icons'
import { Save, Archive, FileCopy } from '@material-ui/icons';
import MyImage from '../assets/turpial.png';

export default class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      activeButton: 1,
      step: 1
    };

    this.setButtonHover = this.setButtonHover.bind(this);
    this.onMouseLeave = this.onMouseLeave.bind(this)
  }


  setButtonHover(num) {
    this.setState({
      activeButton: num
    })
  }


  onMouseLeave() {
    this.setState({
      activeButton: this.state.step
    })
  }
  render() {
    return (
      <MainWindow>
        <Head>
          <Title>
            <img src={MyImage} width='27' style={{
              borderRadius: 100,
              marginRight: 10
            }} />
            <text style={{ textAlign: 'center', fontSize: 25, color: '#e0e0e0' }}>Locha Mesh</text>
          </Title>
          <Icons />
        </Head>
        <BodyContainer>

          <Left>
            <Button
              active={this.state.activeButton === 1}
              id={1}
              setButtonHover={this.setButtonHover}
              onMouseLeave={this.onMouseLeave}
            >
              <Save fontSize='small' />
              <Text >Flash form file </Text>
            </Button>
            <Button
              active={this.state.activeButton === 2}
              id={2}
              onMouseLeave={this.onMouseLeave}
              setButtonHover={this.setButtonHover}
            >
              <Archive fontSize='small' />
              <Text>Flash from url </Text>
            </Button>
            <Button
              active={this.state.activeButton === 3}
              id={3}
              onMouseLeave={this.onMouseLeave}
              setButtonHover={this.setButtonHover}>
              <FileCopy fontSize='small' />
              <Text>Clone drive </Text>
            </Button>
          </Left>

          <Right>
            <Button
              disabled
            // active={this.state.activeButton === 1}
            // id={1}
            // setButtonHover={this.setButtonHover}
            // onMouseLeave={this.onMouseLeave}
            >
              <Text >Select target </Text>
            </Button>
            <Button
              // active={this.state.activeButton === 2}
              // id={2}
              // onMouseLeave={this.onMouseLeave}
              // setButtonHover={this.setButtonHover}
              disabled={true}
            >
              <Text>Flash!</Text>
            </Button>

          </Right>

        </BodyContainer>
      </MainWindow>
    )
  }
}

const MainWindow = styled.div`
    display: flex;
    flex: 1;
    flex-direction: column;
    height:100%;
`
const Left = styled.div`
  display: flex;
  flex-direction: column;
  width: 33%;
  align-items: center;
`
const Right = styled.div`
  flex: 1;
  flex-direction: row;
  display: flex;
  justify-content: space-around;

`

const Head = styled.div`
  flex:1;
  justify-content:center;
  display: inline-flex;
  justify-content: space-between;
  padding: 29px;
  flex-direction: column;
  padding-top: 10px;
  flex: 1.2;
`

const BodyContainer = styled.div`
  display:flex;
  flex-direction:row;
  flex:2;
  padding-top:10px;
  
`

const Title = styled.div`
    display: flex;
    align-items: center;
    justify-content: center;
`
const Text = styled.div`
  margin-left:7px;
`

