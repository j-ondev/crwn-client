import styled from 'styled-components'

export const ProductCardContainer = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  position: relative;

  img {
    width: 100%;
    height: 95%;
    object-fit: cover;
    margin-bottom: 5px;
  }

  button {
    width: 80%;
    opacity: 0.7;
    position: absolute;
    bottom: 15%;
    display: none;
    min-width: unset;
    padding: unset;
  }

  &:hover {
    img {
      opacity: 0.8;
    }

    button {
      opacity: 0.85;
      display: flex;
    }
  }

  @media screen and (max-width: 800px) {
    img {
      margin-bottom: 0;
    }
  }
`

export const CardName = styled.span`
  width: 90%;
  margin-bottom: 15px;

  @media screen and (max-width: 800px) {
    margin-bottom: 10px;
  }
`

export const CardPrice = styled.span`
  width: 10%;
  text-align: right;
`

export const CardFooter = styled.div`
  width: 100%;
  height: 5%;
  display: flex;
  justify-content: space-between;
  font-size: 22px;

  @media screen and (max-width: 800px) {
    height: auto;
  }
`
