import React, { useEffect, useState } from "react";

import AsyncStorage from "@react-native-async-storage/async-storage";

import { HistoryCard } from "../../components/HistoryCard";
import { Container, Header, Title, Content } from './styles';

import { categories } from "../../utils/categories";

interface TransactionsData {
  type: 'positive' | 'negative';
  name: string;
  amount: string;
  category: "string";
  date: string;
}

interface CategoryData {
  name: string;
  color: string;
  total: string;
}

export function Resume() {
  const collectionKey = "@gofinances:transactions";

  const [totalByCategories, setTotalByCategories] = useState<CategoryData[]>([]);

  async function loadData() {
    const response = await AsyncStorage.getItem(collectionKey);
    const responseFormatted = response ? JSON.parse(response) : [];

    const expensives = responseFormatted
      .filter((expensive: TransactionsData) => expensive.type == "negative");

    const totalByCategory: CategoryData[] = [];

    categories.forEach(category => {
      let categorySum = 0;

      expensives.forEach((expensive: TransactionsData) => {
        if (expensive.category === category.key) {
          categorySum += +expensive.amount;
        }
      });

      if (categorySum > 0) {
        totalByCategory.push({
          name: category.name,
          color: category.color,
          total: categorySum.toLocaleString('pt-BR', {
            style: 'currency',
            currency: 'BRL',
          }),
        });
      }

    });

    setTotalByCategories(totalByCategory);
  }

  useEffect(() => {
    loadData();
  }, [])

  return (
    <Container>
      <Header>
        <Title>Resumo por categoria</Title>
      </Header>

      <Content>
        {
          totalByCategories && totalByCategories.map(item => (
            <HistoryCard
              key={item.name}
              title={item.name}
              amount={item.total}
              color={item.color}
            />
          ))
        }
      </Content>
    </Container>
  );
};
