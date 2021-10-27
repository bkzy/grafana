import React from 'react';
import { css } from '@emotion/css';
import { sumBy } from 'lodash';
import { Modal, ConfirmModal, Button } from '@grafana/ui';
import { DashboardModel, PanelModel } from '../../state';
import { useDashboardDelete } from './useDashboardDelete';
import useAsyncFn from 'react-use/lib/useAsyncFn';
import { config } from 'app/core/config';

type DeleteDashboardModalProps = {
  hideModal(): void;
  dashboard: DashboardModel;
};

export const DeleteDashboardModal: React.FC<DeleteDashboardModalProps> = ({ hideModal, dashboard }) => {
  const isProvisioned = dashboard.meta.provisioned;
  const { onDeleteDashboard } = useDashboardDelete(dashboard.uid);

  const [, onConfirm] = useAsyncFn(async () => {
    await onDeleteDashboard();
    hideModal();
  }, [hideModal]);

  const modalBody = getModalBody(dashboard.panels, dashboard.title);

  if (isProvisioned) {
    return <ProvisionedDeleteModal hideModal={hideModal} provisionedId={dashboard.meta.provisionedExternalId!} />;
  }

  return (
    <ConfirmModal
      isOpen={true}
      body={modalBody}
      onConfirm={onConfirm}
      onDismiss={hideModal}
      //title="Delete"
      title="删除"
      icon="trash-alt"
      //confirmText="Delete"
      confirmText="删除"
    />
  );
};

const getModalBody = (panels: PanelModel[], title: string) => {
  const totalAlerts = sumBy(panels, (panel) => (panel.alert ? 1 : 0));
  return totalAlerts > 0 && !config.unifiedAlertingEnabled ? (
    <>
      <p>您确认要删除此仪表盘吗?</p>
      <p>
        此仪表盘包含 {totalAlerts} 报警{totalAlerts > 1 ? 's' : ''}. 删除此仪表盘也会删除这些报警。
      </p>
    </>
  ) : (
    <>
      <p>您确认要删除此仪表盘吗?</p>
      <p>{title}</p>
    </>
  );
};

const ProvisionedDeleteModal = ({ hideModal, provisionedId }: { hideModal(): void; provisionedId: string }) => (
  <Modal
    isOpen={true}
    //title="Cannot delete provisioned dashboard"
    title="不能删除供应的(provisioned)仪表盘"
    icon="trash-alt"
    onDismiss={hideModal}
    className={css`
      width: 500px;
    `}
  >
    <p>
      <>此仪表板由Grafana provisioning管理，无法删除。请从配置文件中移除该仪表板以将其删除。</>
    </p>
    <p>
      <i>
        更多关于 provisioning 的信息请查看{' '}
        <a
          className="external-link"
          href="https://grafana.com/docs/grafana/latest/administration/provisioning/#dashboards"
          target="_blank"
          rel="noreferrer"
        >
          文档
        </a>
      </i>
      <br />
      文件路径: {provisionedId}
    </p>
    <Modal.ButtonRow>
      <Button variant="primary" onClick={hideModal}>
        OK
      </Button>
    </Modal.ButtonRow>
  </Modal>
);
