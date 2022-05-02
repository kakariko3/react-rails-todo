import { ChangeEvent, useEffect, useState } from 'react';
import axios from 'axios';

import { Box, Button, Center, CheckboxGroup, Flex, Input, Text } from '@chakra-ui/react';

import './App.css';
import { Task } from './components/Task';

export interface TaskType {
  id: number;
  name: string;
  is_done: boolean;
}

const App = () => {
  const [tasks, setTasks] = useState<TaskType[]>([]);
  const [name, setName] = useState('');

  // タスク一覧の取得
  const fetch = async () => {
    const res = await axios.get('http://localhost:8000/tasks');
    setTasks(res.data);
  };

  // タスクの作成
  const createTask = async () => {
    await axios.post('http://localhost:8000/tasks', {
      name,
      is_done: false,
    });
    setName('');
    fetch();
  };

  // タスクの削除
  const destroyTask = async (id: number) => {
    await axios.delete(`http://localhost:8000/tasks/${id}`);
    fetch();
  };

  // タスクの更新 (完了フラグ)
  const toggleIsDone = async (index: number, id: number) => {
    const isDone = tasks[index].is_done;
    console.log(isDone);
    await axios.put(`http://localhost:8000/tasks/${id}`, {
      is_done: !isDone,
    });
    fetch();
  };

  useEffect(() => {
    fetch();
  }, []);

  return (
    <Box mt="64px">
      <Center>
        <Box>
          <Box mb="24px">
            <Text fontSize="24px" fontWeight="bold">
              タスク一覧
            </Text>
          </Box>
          <Flex>
            <Input
              placeholder="タスク名を入力"
              value={name}
              onChange={(evt: ChangeEvent<HTMLInputElement>) => setName(evt.target.value)}
            />
            <Box ml="16px">
              <Button colorScheme="teal" onClick={createTask}>
                タスクを作成
              </Button>
            </Box>
          </Flex>
          <CheckboxGroup>
            {tasks.map((task, index) => (
              <Task
                key={index}
                index={index}
                name={task.name}
                isDone={task.is_done}
                toggleIsDone={toggleIsDone}
                id={task.id}
                destroyTask={destroyTask}
              />
            ))}
          </CheckboxGroup>
        </Box>
      </Center>
    </Box>
  );
};

export default App;
