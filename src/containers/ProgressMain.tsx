import React, { useState } from "react";
import { SectionHeader } from "../components/SectionHeader";
import { SectionsMap } from "../constants/constants";

import "./ProgressMain.scss";

function ProgressMain() {
  const [completedPhases, setCompletedPhases] = useState<number[]>([]);
  const [activePhase, setActivePhase] = useState<number>(
    SectionsMap.foundation
  );
  const onSetCompletedPhase = (id: number) => {
    const phases = [...completedPhases];
    phases.push(id);

    setCompletedPhases(phases);
  };

  const onSetActivePhase = (id: number) => {
    setActivePhase(id);
  };

  const commonProps = {
    completedPhases,
    onSetCompletedPhase,
    activePhase,
    onSetActivePhase,
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
    </div>
  );
}

export default ProgressMain;
