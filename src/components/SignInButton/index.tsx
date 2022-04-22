import React from 'react';
import { RectButtonProps } from 'react-native-gesture-handler';

import { Container, ImageContainer, Text } from './styles';
import { SvgProps } from 'react-native-svg';

interface SignInButtonProps extends RectButtonProps {
  title: string;
  svg: React.FC<SvgProps>;
}

export function SignInButton({ title, svg: Svg, ...rest }: SignInButtonProps) {
  return (
    <Container {...rest}>
      <ImageContainer>
        <Svg />
      </ImageContainer>

      <Text>
        {title}
      </Text>
    </Container>
  );
};
