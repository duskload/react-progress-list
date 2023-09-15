import React, { useState } from "react";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemText from "@mui/material/ListItemText";
import { DeleteForever } from "@mui/icons-material";
import { v4 as uuidv4 } from "uuid";

import { AddSection } from "../components/AddSection";
import BaseModal from "./BaseModal";
import { TTask } from "../constants/types";

import "./CreateTasksModal.scss";

type TCreateTasksModal = {
  visible: boolean;
  onClose: () => void;
  onAddTasks: (tasks: TTask[]) => void;
  edit: boolean;
  items: TTask[];
  sectionId: number;
  onUndoPhaseCompletion: (id: number) => void;
  isPhaseCompleted: boolean;
  onRemoveChecked: (id: string) => void;
};

export default function CreateTasksModal({
  visible,
  onClose,
  onAddTasks,
  edit,
  items = [],
  sectionId,
  isPhaseCompleted,
  onUndoPhaseCompletion,
                                           onRemoveChecked,
}: TCreateTasksModal) {
  const [tasks, setTasks] = useState<TTask[]>(items);

  const onSubmit = () => {
    onAddTasks(tasks);
    onClose();
  };

  const onAddTask = (text: string) => {
    const updatedTasks = [...tasks, { id: uuidv4(), text }];
    setTasks(updatedTasks);
  };

  const onRemoveTask = (id: string) => {
    const newTasks = [...tasks.filter((task) => task.id !== id)];
    setTasks(newTasks);
    onRemoveChecked(id)

    if (isPhaseCompleted) {
      onUndoPhaseCompletion(sectionId);
    }
  };

  const getListProps = (id: string) => {
    if (!edit) return {};

    return {
      secondaryAction: (
        <DeleteForever
          sx={{
            fontSize: 24,
            color: "red",
          }}
          onClick={() => onRemoveTask(id)}
        />
      ),
    };
  };

  return (
    <BaseModal
      visible={visible}
      onClose={onClose}
      title="Create tasks for section"
      onSubmit={onSubmit}
      submitDisabled={tasks.length === 0}
    >
      <AddSection placeholder="Add tasks one by one" onClick={onAddTask} />

      <List className="tasks-list">
        {tasks.map((item, index: number) => {
          const listProps = getListProps(item.id);
          return (
            <ListItem className="tasks-list--item" divider {...listProps}>
              <ListItemText primary={`${index + 1}. ${item.text}`} />
            </ListItem>
          );
        })}
      </List>
    </BaseModal>
  );
}
