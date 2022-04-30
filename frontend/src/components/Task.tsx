import { Box, Checkbox, Text } from '@chakra-ui/react';

import { TaskType } from '../App';

interface Props extends TaskType {
  index: number;
  toggleIsDone: (index: number) => void;
}

export const Task = ({ name, isDone, index, toggleIsDone }: Props) => {
  return (
    <Box mb="16px">
      <Checkbox
        isChecked={isDone}
        colorScheme="blue"
        size="lg"
        onChange={() => toggleIsDone(index)}
      >
        <Text>{name}</Text>
      </Checkbox>
    </Box>
  );
};
