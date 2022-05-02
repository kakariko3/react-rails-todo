import { Checkbox, Flex, Text } from '@chakra-ui/react';
import { CloseIcon } from '@chakra-ui/icons';

import { TaskType } from '../App';

// スネークケースからキャメルケースに変換
type SnakeToCamelCase<T extends string> = T extends `${infer R}_${infer U}`
  ? `${R}${Capitalize<SnakeToCamelCase<U>>}`
  : T;
type SnakeToCamel<T extends object> = {
  [K in keyof T as `${SnakeToCamelCase<string & K>}`]: T[K] extends object
    ? SnakeToCamel<T[K]>
    : T[K];
};

interface Props extends SnakeToCamel<TaskType> {
  index: number;
  toggleIsDone: (index: number, id: number) => void;
  destroyTask: (id: number) => void;
}

export const Task = ({ name, isDone, index, toggleIsDone, id, destroyTask }: Props) => {
  return (
    <Flex mb="16px" justifyContent="space-between" alignItems="center">
      <Checkbox
        isChecked={isDone}
        colorScheme="blue"
        size="lg"
        onChange={() => toggleIsDone(index, id)}
      >
        <Text>{name}</Text>
      </Checkbox>
      <CloseIcon onClick={() => destroyTask(id)} />
    </Flex>
  );
};
