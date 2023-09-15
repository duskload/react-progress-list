import React, { useState } from "react";
import { SectionHeader } from "../components/SectionHeader";
import { SectionsMap, STORAGE_KEYS } from "../constants/constants";
import { UselessFact } from "../components/UselessFact";
import { StorageUtil } from "../utils/storage";

import "./ProgressMain.scss";

const { completedPhasesKey, activePhaseKey } = STORAGE_KEYS;

function ProgressMain() {
  const storageCompletedPhases = StorageUtil.get(completedPhasesKey) || [];
  const storageActivePhase =
    StorageUtil.get(activePhaseKey) || SectionsMap.foundation;

  const [completedPhases, setCompletedPhases] = useState<number[]>(
    storageCompletedPhases
  );
  const [activePhase, setActivePhase] = useState<number>(storageActivePhase);
  const onSetCompletedPhase = (id: number) => {
    const phases = [...completedPhases];
    phases.push(id);

    setCompletedPhases(phases);
    StorageUtil.set(completedPhasesKey, phases);
  };

  const onUndoPhaseCompletion = (id: number) => {
    const phases = completedPhases.filter(phase => phase !== id)
    setCompletedPhases(phases)
    StorageUtil.set(completedPhasesKey, phases);
  }

  const onSetActivePhase = (id: number) => {
    setActivePhase(id);
    StorageUtil.set(activePhaseKey, id);
  };

  const commonProps = {
    completedPhases,
    onSetCompletedPhase,
    activePhase,
    onSetActivePhase,
    onUndoPhaseCompletion,
  };

  return (
    <div className="progress-main">
      <div className="progress-main--title">My startup progress</div>

      <div className="progress-main--content">
        <SectionHeader
          id={SectionsMap.foundation}
          text="Foundation"
          {...commonProps}
        />

        <SectionHeader
          id={SectionsMap.discovery}
          text="Discovery"
          {...commonProps}
        />
        <SectionHeader
          id={SectionsMap.delivery}
          text="Delivery"
          {...commonProps}
        />
      </div>

      <UselessFact shouldGetQuote={completedPhases.length === 3} />
    </div>
  );
}

export default ProgressMain;
