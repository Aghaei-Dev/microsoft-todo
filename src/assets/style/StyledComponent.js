import styled, { css } from 'styled-components'

export const Wrapper = styled.div`
  width: 100%;
`
export const PadWrapper = styled(Wrapper)`
  padding: 0 2rem;
`

export const GridWrapper = styled.section`
  min-height: 100vh;
  display: grid;
  place-items: center;
`

export const Button = styled.button`
  margin: 1rem;
  background: none;
  border: none;
  outline: none;
  text-transform: capitalize;
  cursor: pointer;
  font-family: inherit;
  padding: 0.5rem 2rem;
  background: ${(props) =>
    props.$primary ? 'var(--bg-brand)' : ' var( --bg-brand-secondary-hover)'};
  color: ${(props) =>
    props.$primary ? 'var(--bg-primary)' : '--font-color-primary'};

  font-size: 1rem;
  &:hover {
    background: var(--bg-brand-hover-secondary);
    text-decoration: underline;
  }
  &:active {
    transform: scale(0.96);
  }

  ${(props) =>
    props.$primary &&
    css`
      &:hover {
        background: var(--bg-brand-hover);
      }
    `}
`

export const NavWrapper = styled.div`
  position: relative;
  .icon-btn {
    border-radius: 0px;
    &:hover {
      background: var(--list-theme-skyblue-top);
    }
    &:active {
      background: var(--bg-brand-hover);
    }
  }
  .active {
    background: var(--bg-active);
    color: var(--font-color-secondary);
  }
  .login-btn {
    background: none;
    border: none;
    outline: none;
    padding: 0.5rem;
    margin-top: 0.5rem;
    margin-left: 0.5rem;
    color: var(--bg-primary);
    border: 1px solid var(--bg-primary);
    cursor: pointer;
  }
  .loader {
    width: 100%;
    position: absolute;
    top: 100%;
    left: 50%;
    transform: translate(-50%, -20%);
  }
`
