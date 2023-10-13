import { Text } from "react-native";

interface Props {
  exampleProp: number;
}

const ExampleComponent = ({ exampleProp }: Props) => {
  return <Text>{exampleProp}</Text>;
};

export default ExampleComponent;
