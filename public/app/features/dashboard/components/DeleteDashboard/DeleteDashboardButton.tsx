import React from 'react';
import { DeleteDashboardModal } from './DeleteDashboardModal';
import { Button, ModalsController } from '@grafana/ui';
import { DashboardModel } from '../../state';

type Props = {
  dashboard: DashboardModel;
};

export const DeleteDashboardButton = ({ dashboard }: Props) => (
  <ModalsController>
    {({ showModal, hideModal }) => (
      <Button
        variant="destructive"
        onClick={() => {
          showModal(DeleteDashboardModal, {
            dashboard,
            hideModal,
          });
        }}
        //aria-label="Dashboard settings page delete dashboard button"
        aria-label="仪表盘设置页面删除仪表盘按钮"
      >
        删除此仪表盘
      </Button>
    )}
  </ModalsController>
);
