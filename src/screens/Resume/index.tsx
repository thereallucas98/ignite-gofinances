import React, { useCallback, useEffect, useState } from "react";

import { useTheme } from "styled-components";
import { useFocusEffect } from "@react-navigation/native";
import { RFValue } from "react-native-responsive-fontsize";
import { VictoryPie } from "victory-native";

import AsyncStorage from "@react-native-async-storage/async-storage";

import { HistoryCard } from "../../components/HistoryCard";
import { Container, Header, Title, Content, ChartContainer } from './styles';

import { categories } from "../../utils/categories";

interface TransactionsData {
  type: 'positive' | 'negative';
  name: string;
  amount: string;
  category: "string";
  date: string;
}

interface CategoryData {
  key: string;
  name: string;
  color: string;
  total: number;
  totalFormatted: string;
  percent: string;
}

export function Resume() {
  const collectionKey = "@gofinances:transactions";

  const theme = useTheme();

  const [totalByCategories, setTotalByCategories] = useState<CategoryData[]>([]);

  async function loadData() {
    const response = await AsyncStorage.getItem(collectionKey);
    const responseFormatted = response ? JSON.parse(response) : [];

    const expensives = responseFormatted
      .filter((expensive: TransactionsData) => expensive.type == "negative");

    const expensiveTotal = expensives
      .reduce((acumulator: number, expensive: TransactionsData) => {
        return acumulator += +expensive.amount;
      }, 0);

    const totalByCategory: CategoryData[] = [];

    categories.forEach(category => {
      let categorySum = 0;

      expensives.forEach((expensive: TransactionsData) => {
        if (expensive.category === category.key) {
          categorySum += +expensive.amount;
        }
      });

      if (categorySum > 0) {
        const percent = `${(categorySum / expensiveTotal * 100).toFixed(0)}%`;

        totalByCategory.push({
          key: category.key,
          name: category.name,
          color: category.color,
          total: categorySum,
          totalFormatted: categorySum.toLocaleString('pt-BR', {
            style: 'currency',
            currency: 'BRL',
          }),
          percent: percent,
        });
      }

    });

    setTotalByCategories(totalByCategory);
  }

  useEffect(() => {
    loadData();
  }, []);

  useFocusEffect(useCallback(() => {
    loadData();
  }, []));

  return (
    <Container>
      <Header>
        <Title>Resumo por categoria</Title>
      </Header>

      <Content>
        <ChartContainer>
          <VictoryPie
            data={totalByCategories}
            colorScale={totalByCategories.map(item => item.color)}
            style={{
              labels: {
                fontSize: RFValue(18),
                fontWeight: 'bold',
                fill: theme.colors.shape,
              }
            }}
            labelRadius={58}
            x="percent"
            y="total"
          />
        </ChartContainer>

        {
          totalByCategories && totalByCategories.map(item => (
            <HistoryCard
              key={item.key}
              title={item.name}
              amount={item.totalFormatted}
              color={item.color}
            />
          ))
        }
      </Content>
    </Container>
  );
};
