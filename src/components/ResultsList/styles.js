import styled from 'styled-components';

export const ResultsListContainer = styled.div`
  background: white;
  border: 1px solid hsl(0, 0%, 80%);
  box-shadow: 0.5rem 0.5rem 1rem hsl(0, 0%, 90%);
  list-style: none;
  margin: 0;
  padding: 0;
`;

export const ListItem = styled.div`
  line-height: 1.5rem;
  margin: 0;
  padding: 0.5rem 1rem;

  &:hover {
    background: #0058cc;
  }
`;
