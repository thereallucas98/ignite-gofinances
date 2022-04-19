import React, { useState, useEffect } from "react";
import {
  Alert,
  Keyboard,
  Modal,
  TouchableWithoutFeedback
} from "react-native";

import * as Yup from "yup";

import uuid from "react-native-uuid";

import AsyncStorage from "@react-native-async-storage/async-storage";

import { useNavigation } from "@react-navigation/native";

import { yupResolver } from "@hookform/resolvers/yup";

import { useForm } from "react-hook-form";

import { Button } from "../../components/Form/Button";
import { CategorySelect } from "../CategorySelect";
import { CategorySelectButton } from "../../components/Form/CategorySelectButton";
import { InputForm } from "../../components/Form/InputForm";
import { TransactionTypeButton } from "../../components/TransactionTypeButton";

import {
  Container,
  Header,
  Title,
  Form,
  Fields,
  TransactionTypes,
} from "./styles";

interface FormData {
  name: string;
  amount: string;
}

const schema = Yup.object().shape({
  name: Yup
    .string()
    .required("Nome é obrigatório"),
  amount: Yup
    .number()
    .typeError("Informe um valor númerico")
    .positive("O valor não pode ser negativo")
    .required("O valor é obrigatório")
});

export function Register() {
  const collectionKey = "@gofinances:transactions";

  const [transactionType, setTransactionType] = useState('');
  const [categoryModalOpen, setCategoryModalOpen] = useState(false);
  const [category, setCategory] = useState({
    key: "category",
    name: "Categoria",
  });

  const navigation = useNavigation();

  const {
    control,
    handleSubmit,
    reset,
    formState: { errors }
  } = useForm({
    resolver: yupResolver(schema)
  });

  function handleTransactionTypeSelect(type: string) {
    setTransactionType(type);
  }

  function handleOpenSelectCategoryModal() {
    setCategoryModalOpen(true);
  }

  function handleCloseSelectCategoryModal() {
    setCategoryModalOpen(false);
  }

  async function handleRegister(form: Partial<FormData>) {
    if (!transactionType) {
      return Alert.alert("Selecione o tipo da transação.");
    }

    if (category.key === "category") {
      return Alert.alert("Selecione a categoria.");
    }

    const newTransaction = {
      id: String(uuid.v4()),
      name: form.name,
      amount: form.amount,
      type: transactionType,
      category: category.key,
      date: new Date(),
    }

    try {
      const data = await AsyncStorage.getItem(collectionKey);

      const currentData = data ? JSON.parse(data) : [];

      const dataFormatted = [
        ...currentData,
        newTransaction
      ]

      await AsyncStorage.setItem(collectionKey, JSON.stringify(dataFormatted));

      setTransactionType('');
      setCategory({
        key: "category",
        name: "Categoria"
      });

      reset();

      navigation.navigate("Listagem" as never);

    } catch (error) {
      console.log(error);

      Alert.alert("Opa! Não foi possível salvar.");
    }
  }

  useEffect(() => {
    async function loadData() {

      const results = await AsyncStorage.getItem(collectionKey);

      console.log(JSON.parse(results!));

      // await AsyncStorage.removeItem(collectionKey);
    }

    loadData();
  }, [])

  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
      <Container>
        <Header>
          <Title>Cadastro</Title>
        </Header>

        <Form>
          <Fields>
            <InputForm
              name="name"
              control={control}
              placeholder="Nome"
              autoCapitalize="sentences"
              autoCorrect={false}
              error={errors.name && errors.name.message}
            />
            <InputForm
              name="amount"
              control={control}
              placeholder="Preço"
              keyboardType="numeric"
              error={errors.amount && errors.amount.message}
            />

            <TransactionTypes>
              <TransactionTypeButton
                title="Income"
                type="up"
                isActive={transactionType === 'positive'}
                onPress={() => handleTransactionTypeSelect('positive')}
              />
              <TransactionTypeButton
                title="Outcome"
                type="down"
                isActive={transactionType === 'negative'}
                onPress={() => handleTransactionTypeSelect('negative')}
              />
            </TransactionTypes>

            <CategorySelectButton
              title={category.name}
              onPress={handleOpenSelectCategoryModal}
            />
          </Fields>

          <Button
            title="Enviar"
            onPress={handleSubmit(handleRegister)}
          />
        </Form>

        <Modal visible={categoryModalOpen}>
          <CategorySelect
            category={category}
            setCategory={setCategory}
            closeSelectCategory={handleCloseSelectCategoryModal}
          />
        </Modal>
      </Container>
    </TouchableWithoutFeedback>
  );
}
