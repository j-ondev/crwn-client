import { createGlobalStyle } from 'styled-components'

export const GlobalStyle = createGlobalStyle`
  @font-face {
    font-family: "Open Sans Condensed";
    src: url("/fonts/os_condensed/os_condensed-light.ttf") format("truetype");
    font-weight: 300;
  }

  @font-face {
    font-family: "Open Sans Condensed";
    src: url("/fonts/os_condensed/os_condensed-regular.ttf") format("truetype");
    font-weight: 400;
  }

  @font-face {
    font-family: "Open Sans Condensed";
    src: url("/fonts/os_condensed/os_condensed-bold.ttf") format("truetype");
    font-weight: 700;
  }

  @font-face {
    font-family: "Open Sans Condensed";
    src: url("/fonts/os_condensed/os_condensed-extrabold.ttf") format("truetype");
    font-weight: 900;
  }

  * {
    box-sizing: border-box;
  }

  body {
    margin: 0;
    padding: 20px 40px;
    font-family: 'Open Sans Condensed', sans-serif;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;

    #credential_picker_container {
      top: unset!important;
      bottom: 20px!important;
    }

    @media screen and (max-width: 800px) {
      padding: 10px;
    }
  }

  code {
    font-family: source-code-pro, Menlo, Monaco, Consolas, 'Courier New',
      monospace;
  }

  a {
    text-decoration: none;
    color: #000000;
  }
`
