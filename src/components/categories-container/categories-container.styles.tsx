import styled from 'styled-components'
import { Link } from 'react-router-dom'

export const CategoryLink = styled(Link)``

export const CategoriesContainer = styled.div`
  width: 100%;
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;

  > ${CategoryLink} {
    min-width: 30%;
    height: 240px;
    flex: 1 1 auto;
    border: 1px solid black;
    margin: 0 7.5px 15px;
    overflow: hidden;
  }
`
