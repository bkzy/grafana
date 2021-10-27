import React, { useEffect } from 'react';
import { ConfirmModal } from '@grafana/ui';
import { useDashboardRestore } from './useDashboardRestore';
export interface RevertDashboardModalProps {
  hideModal: () => void;
  version: number;
}

export const RevertDashboardModal: React.FC<RevertDashboardModalProps> = ({ hideModal, version }) => {
  // TODO: how should state.error be handled?
  const { state, onRestoreDashboard } = useDashboardRestore(version);

  useEffect(() => {
    if (state.loading === false && state.value) {
      hideModal();
    }
  }, [state, hideModal]);

  return (
    <ConfirmModal
      isOpen={true}
      title="Restore Version(还原版本)"
      icon="history"
      onDismiss={hideModal}
      onConfirm={onRestoreDashboard}
      body={
        //<p>Are you sure you want to restore the dashboard to version {version}? All unsaved changes will be lost.</p>
        <p>您确认要还原仪表盘到版本 {version} 吗? 所有未保存的修改都会丢失。</p>
      }
      //confirmText={`Yes, restore to version ${version}`}
      confirmText={`是的, 还原到版本 ${version}`}
    />
  );
};
