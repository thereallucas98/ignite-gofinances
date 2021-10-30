import React from "react";

import { 
  Container,
  Title,
  Amount,
  Footer,
  Category,
  Icon,
  CategoryName,
  DateInformation, 
} from "./styles";

export function TransactionCard() {
  return (
    <Container>
      <Title>Desenvolvimento de Site</Title>
      <Amount>R$ 12.000,00</Amount>

      <Footer>
        <Category>
          <Icon name="dollar-sign" />
          <CategoryName>Vendas</CategoryName>
        </Category>
        <DateInformation>
          13/04/2020
        </DateInformation>
      </Footer>
    </Container>
  );
}