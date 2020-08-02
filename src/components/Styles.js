import styled from 'styled-components'

const Styles = styled.div`
padding: 3rem;
table {
  box-shadow: 0 8px 6px -6px #888888;
  border-radius: 10px;
  overflow : hidden;
  position : absolute;
  left : 50%;
  top : 50%;
  transform : translate(-50%, -50%);
  border-spacing: 0;
  border: 2px solid #404340;
  tr {
    :last-child {
      td {
        border-bottom: 0;
      }
    }
  }
  th,
  td {
    min-width: 100px;
    margin: 0;
    padding: 0.7rem;
    border-bottom: 1px solid #404340;
    border-right: 1px solid #404340;
    :last-child {
      border-right: 0;
      text-align: center;
    }
  }
}
`
export default Styles