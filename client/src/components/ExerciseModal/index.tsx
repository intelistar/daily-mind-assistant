'use client';

import { X } from 'lucide-react';
import { ChangeEvent, useEffect, useState } from 'react';

import {
  Button,
  createOverlay,
  Dialog,
  Input,
  Portal,
  Stack,
} from '@chakra-ui/react';

interface ExerciseModalProps {
  onSubmit: (text: string) => void;
  initialText?: string;
}

const createExerciseModal = createOverlay<ExerciseModalProps>((props) => {
  const { onOpenChange, onSubmit, initialText = '', ...rest } = props;
  const [text, setText] = useState(initialText);

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    onOpenChange?.({ open: false });
    setText('');
    onSubmit(text);
  };

  const handleClose = () => onOpenChange?.({ open: false });

  useEffect(() => {
    setText(initialText);
  }, [initialText]);

  const handleChangeText = (e: ChangeEvent<HTMLInputElement>) => {
    setText(e.target.value);
  };

  return (
    <Dialog.Root {...rest}>
      <Portal>
        <Dialog.Backdrop />
        <Dialog.Positioner>
          <Dialog.Content>
            <Dialog.Header>
              <Dialog.Title>
                {initialText
                  ? 'Редактировать упражнение'
                  : 'Добавить упражнение'}
              </Dialog.Title>
              <Dialog.CloseTrigger onClick={handleClose}>
                <X />
              </Dialog.CloseTrigger>
            </Dialog.Header>
            <Dialog.Body>
              <form onSubmit={handleSubmit}>
                <Stack gap="4">
                  <Input
                    value={text}
                    onChange={handleChangeText}
                    placeholder="Enter your name"
                  />
                  <Button type="submit">Сохранить</Button>
                </Stack>
              </form>
            </Dialog.Body>
          </Dialog.Content>
        </Dialog.Positioner>
      </Portal>
    </Dialog.Root>
  );
});

export default createExerciseModal;
