import React from 'react'
import { render } from 'react-dom'
import App from './pages'
import store from './store'
import { Provider } from 'react-redux'
import { createGlobalStyle } from 'styled-components'

const GlobalStyle = createGlobalStyle`
  html {
    height: 100%;
    width: 100%;
    overflow: hidden;
    background: #53555d;
  }

  @font-face {
    font-family:'Montserrat';
    font-style: normal;
    font-weight: 400;
    src: url('https://fonts.googleapis.com/css2?family=Montserrat&display=swap');
  }
  body{
    height:99%;
    width:100%
  }
`

// Since we are using HtmlWebpackPlugin WITHOUT a template, we should create our own root node in the body element before rendering into it
let root = document.createElement('div')

root.id = 'root'
document.body.appendChild(root)
root.style.height = '100%'
// Now we can render our application into it
render(
  <Provider store={store}>
    <GlobalStyle />
    <App />
  </Provider>,

  document.getElementById('root'))
