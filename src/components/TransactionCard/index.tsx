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

interface Category {
  name: string;
  icon: string;
}

interface Data {
  title: string;
  amount: string;
  category: Category;
  date: string;
}

interface Props {
  data: Data;
}

export function TransactionCard({ data }: Props) {
  return (
    <Container>
      <Title>{data.title}</Title>
      <Amount>{data.amount}</Amount>

      <Footer>
        <Category>
          <Icon name={data.category.icon} />
          <CategoryName>{data.category.name}</CategoryName>
        </Category>

        <DateInformation>{data.date}</DateInformation>
      </Footer>
    </Container>
  );
}
