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
    this.getFile = this.getFile.bind(this)
  }

  setButtonHover(num) {
    this.setState({
      activeButton: num
    })
  }

  getFile() {
    const { dialog, remote } = require('electron'),
      win = remote.getCurrentWindow();

    const options = {
      // See place holder 1 in above image
      title: "Custom title bar",

      // See place holder 2 in above image
      defaultPath: "D:\\electron-app",

      // See place holder 3 in above image
      buttonLabel: "select",

      // See place holder 4 in above image
      filters: [
        { name: 'Images', extensions: ['jpg', 'png', 'gif'] },
        { name: 'Movies', extensions: ['mkv', 'avi', 'mp4'] },
        { name: 'Custom File Type', extensions: ['as'] },
        { name: 'All Files', extensions: ['*'] }
      ],
      properties: ['openFile', 'multiSelections']
    }
    remote.dialog.showOpenDialog(win, options, (file) => {
      console.log(file);
    })
  }


  onMouseLeave() {
    this.setState({
      activeButton: this.state.step
    })
  }


  alert(){
    alert('no avaliable')
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
            <span style={{ textAlign: 'center', fontSize: 25, color: '#e0e0e0' }}>Locha Mesh</span>
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
              onPress={this.getFile}
            >
              <Save fontSize='small' />
              <Text >Flash form file </Text>
            </Button>
            <Button
              active={this.state.activeButton === 2}
              id={2}
              onMouseLeave={this.onMouseLeave}
              setButtonHover={this.setButtonHover}
              onPress={this.alert}
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

