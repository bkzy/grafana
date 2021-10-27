import React, { useState } from 'react';
import { css } from '@emotion/css';
import AutoSizer from 'react-virtualized-auto-sizer';
import { Button, CodeEditor, HorizontalGroup, useStyles2 } from '@grafana/ui';
import { dashboardWatcher } from 'app/features/live/dashboard/dashboardWatcher';
import { getDashboardSrv } from '../../services/DashboardSrv';
import { DashboardModel } from '../../state/DashboardModel';
import { GrafanaTheme2 } from '@grafana/data';

interface Props {
  dashboard: DashboardModel;
}

export const JsonEditorSettings: React.FC<Props> = ({ dashboard }) => {
  const [dashboardJson, setDashboardJson] = useState<string>(JSON.stringify(dashboard.getSaveModelClone(), null, 2));
  const onBlur = (value: string) => {
    setDashboardJson(value);
  };
  const onClick = () => {
    getDashboardSrv()
      .saveJSONDashboard(dashboardJson)
      .then(() => {
        dashboardWatcher.reloadPage();
      });
  };
  const styles = useStyles2(getStyles);

  return (
    <div>
      <h3 className="dashboard-settings__header">JSON 模式</h3>
      <div className="dashboard-settings__subheader">
        下面的JSON模型是定义仪表板的数据结构。这包括仪表板设置、面板设置、布局、查询等。
      </div>

      <div className={styles.editWrapper}>
        <AutoSizer>
          {({ width, height }) => (
            <CodeEditor
              value={dashboardJson}
              language="json"
              width={width}
              height={height}
              showMiniMap={true}
              showLineNumbers={true}
              onBlur={onBlur}
            />
          )}
        </AutoSizer>
      </div>
      {dashboard.meta.canSave && (
        <HorizontalGroup>
          <Button onClick={onClick}>保存改变</Button>
        </HorizontalGroup>
      )}
    </div>
  );
};

const getStyles = (theme: GrafanaTheme2) => ({
  editWrapper: css`
    height: calc(100vh - 250px);
    margin-bottom: 10px;
  `,
});
