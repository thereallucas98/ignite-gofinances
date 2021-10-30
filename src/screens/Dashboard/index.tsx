import React from "react";
import { getBottomSpace } from "react-native-iphone-x-helper";
import { HighlightCard } from "../../components/HighlightCard";
import { TransactionCard } from "../../components/TransactionCard";

import {
  Container,
  Header,
  UserWrapper,
  UserInfo,
  Photo,
  User,
  UserGreeeting,
  UserName,
  Icon,
  HighlightCards,
  Transactions,
  Title,
  TransactionList,
} from "./styles";

export function Dashboard() {
  const data = [
    {
      title: "Desenvolvimento de Site",
      amount: "R$ 12.000,00",
      category: {
        icon: "dollar-sign",
        name: "Vendas",
      },
      date: "23/10/2020",
    },
    {
      title: "Desenvolvimento de Site 2",
      amount: "R$ 2.000,00",
      category: {
        icon: "dollar-sign",
        name: "Vendas",
      },
      date: "23/10/2020",
    },
    {
      title: "Desenvolvimento de Site 3",
      amount: "R$ 6.000,00",
      category: {
        icon: "dollar-sign",
        name: "Vendas",
      },
      date: "23/10/2020",
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
          <Icon name="power" />
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
          renderItem={({ item }) => <TransactionCard data={item} />}
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={{
            paddingBottom: getBottomSpace()
          }}
        />
      </Transactions>
    </Container>
  );
}
