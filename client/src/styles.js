import styled from "styled-components";

export const Card = styled.div`
  display: flex;
  flex-wrap: wrap;
  flex-direction: row;
  margin: 8px 0px;
  border-radius: 8px;
  transition: 0.3s;
`;

export const Chip = styled.span`
  border-radius: 16px;
  background: ${(props) => props.background};
  padding: 4px 16px;
  font-size: 14px;
  color: white;
`;

export const ContainerRow = styled.div`
  display: flex;
  flex-direction: row;
`;

export const Button = styled.button`
  padding: 8px;
  min-height: 48px;
  max-width: 400px;
  border-radius: 8px;
  background: ${(props) => props.background};
  color: ${(props) => props.color};
  border: none;
  font: inherit;
`;

Button.defaultProps = {
  background: "transparent",
  color: "black",
};

export const H4 = styled.h4`
  margin: 8px;
  color: black;
`;

export const H2 = styled.h2`
  margin-bottom: 16px;
  margin-top: 64px;
  color: black;
`;

export const HR = styled.hr`
  border: 0.5px solid lightgray;
`;

export const TextInput = styled.input`
  -webkit-appearance: none;
  -moz-appearance: none;
  appearance: none;

  height: 50px;
  font-size: 1rem;
  border: 1px solid #ccc;
  padding: 0.4rem;
  margin-bottom: 1rem;
  background: white;
  border-radius: 4px;
`;
