import React from "react";

import { HighlightCard } from "../../components/HighlightCard";
import { TransactionCard } from "../../components/TransactionCard";
import { TransactionCardProps } from "../../components/TransactionCard"

import {
  Container,
  Header,
  UserWrapper,
  UserInfo,
  Photo,
  User,
  UserGreeeting,
  UserName,
  LogoutButton,
  Icon,
  HighlightCards,
  Transactions,
  Title,
  TransactionList,
} from "./styles";

export interface DataListProps extends TransactionCardProps {
  id: string;
}


export function Dashboard() {
  const data: DataListProps[] = [
    {
      id: '1',
      type: 'positive',
      title: "Desenvolvimento de Site",
      amount: "R$ 12.000,00",
      category: {
        icon: "dollar-sign",
        name: "Vendas",
      },
      date: "23/10/2020",
    },
    {
      id: '2',
      type: 'negative',
      title: "Hambugueria Pizzy",
      amount: "R$ 52,00",
      category: {
        icon: "coffee",
        name: "Alimentação",
      },
      date: "10/10/2020",
    },
    {
      id: '3',
      type: 'negative',
      title: "Aluguel de Apartamento",
      amount: "R$ 1.000,00",
      category: {
        icon: "shopping-bag",
        name: "Casa",
      },
      date: "10/10/2020",
    },
  ]

  return (
    <Container>
      <Header>
        <UserWrapper>
          <UserInfo>
            <Photo source={{ uri: "https://github.com/thereallucas98.png" }} />
            <User>
              <UserGreeeting>Olá, </UserGreeeting>
              <UserName>David Lucas</UserName>
            </User>
          </UserInfo>
          <LogoutButton onPress={() => { }}>
            <Icon name="power" />
          </LogoutButton>
        </UserWrapper>
      </Header>

      <HighlightCards>
        <HighlightCard
          title="Entrada"
          amount="R$ 17.400,00"
          lastTransaction="Última entrada dia 13 de abril"
          type="up"
        />
        <HighlightCard
          title="Saida"
          amount="R$ 1.400,00"
          lastTransaction="Última saída dia 14 de abril"
          type="down"
        />
        <HighlightCard
          title="Total"
          amount="R$ 16.400,00"
          lastTransaction="1 a 16 de abril"
          type="total"
        />
      </HighlightCards>

      <Transactions>
        <Title>Listagem</Title>

        <TransactionList
          data={data}
          keyExtractor={item => item.id}
          renderItem={({ item }) => <TransactionCard data={item} />}
        />
      </Transactions>
    </Container>
  );
}
