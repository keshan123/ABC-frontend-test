import styled from 'styled-components';

export const Input = styled.input`
  border-top-left-radius: 4px;
  border-bottom-left-radius: 4px;
  border: 1px solid hsl(0, 0%, 80%);
  display: block;
  font-size: 1rem;
  margin: 0;
  padding: 0.75rem 1.5rem 0.6rem 1rem;
  transition: box-shadow 0.2s ease-out, border-width 0.2s ease-out;
  width: 100%;

  &:focus {
    border-color: #fdc605;
    border-left-width: 0.5rem;
    outline: thin dotted;
  }

  &:placeholder {
    color: #646464;
    opacity: 1;
  }
`;
