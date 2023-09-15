import React, { useState } from "react";
import { Checkbox } from "@mui/material";
import { Check } from "@mui/icons-material";

import CreateTasksModal from "../modals/CreateTasksModal";
import { TTask } from "../constants/types";
import { TaskMenu } from "./TaskMenu";
import { Icon } from "./common/Icon";

import "./SectionHeader.scss";

type TSectionHeader = {
  id: number;
  text: string;
  completedPhases: number[];
  onSetCompletedPhase: (id: number) => void;
  onSetActivePhase: (id: number) => void;
  activePhase: number;
};

export function SectionHeader({
  id,
  text,
  completedPhases,
  onSetCompletedPhase,
  activePhase,
  onSetActivePhase,
}: TSectionHeader) {
  const [menuOpen, setMenuOpen] = useState(false);
  const [checked, setChecked] = useState<string[]>([]);

  const [isAddTasksModalVisible, setAddTasksModalVisible] = useState(false);
  const [tasks, setTasks] = useState<TTask[]>([]);

  const hasTasks = tasks.length > 0;
  const isActivePhase = activePhase === id;
  const isPhaseCompleted = completedPhases.includes(id);
  const hasCheckedTasks = checked.length > 0;

  const onAddTasks = (items: TTask[]) => {
    setTasks(items);
  };

  const onCheckTask = (item: TTask) => {
    if (isPhaseCompleted) return;

    let items: string[] = [...checked];
    const value: string = item.id;
    if (items.includes(value)) {
      items = items.filter((item) => item !== value);
    } else {
      items.push(value);
    }

    if (tasks.length === items.length && hasCheckedTasks && hasTasks) {
      onSetCompletedPhase(id);
      onSetActivePhase(id + 1);
    }

    setChecked(items);
  };

  const openAddTasksModal = (id: number) => {
    setAddTasksModalVisible(true);
    onSetActivePhase(id);
  };

  const isActiveOrCompletedPhase = isPhaseCompleted || isActivePhase;

  return (
    <div className="section-header">
      <div className="section-header-title">
        <div className="section-header-title--text-container">
          <div className="text-container-number">{id}</div>
          <div className="text-container-text">{text}</div>
        </div>

        {isActiveOrCompletedPhase && (
          <div className="section-header-title--icons">
            {isPhaseCompleted && <Icon Component={Check} />}
            <TaskMenu
              open={menuOpen}
              onToggle={setMenuOpen}
              openAddTasksModal={() => openAddTasksModal(id)}
              hasTasks={hasTasks}
            />
          </div>
        )}
      </div>

      <div className="section-header-content">
        <ul className="tasks-list">
          {tasks.map((item: TTask, index: number) => {
            return (
              <li className="tasks-list-item">
                <div className="tasks-list-item-checkbox">
                  <Checkbox
                    checked={checked.indexOf(item.id) !== -1}
                    onChange={() => onCheckTask(item)}
                    value={item.completed}
                  />
                </div>
                <div className="tasks-list-item-text">{item.text}</div>
              </li>
            );
          })}
        </ul>
      </div>

      <CreateTasksModal
        visible={isAddTasksModalVisible}
        onClose={() => setAddTasksModalVisible(false)}
        edit={hasTasks}
        onAddTasks={onAddTasks}
      />
    </div>
  );
}
