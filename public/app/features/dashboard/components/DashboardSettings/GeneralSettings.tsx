/* eslint-disable prettier/prettier */
import React, { useState } from 'react';
import { connect, ConnectedProps } from 'react-redux';
import { TimeZone } from '@grafana/data';
import { CollapsableSection, Field, Input, RadioButtonGroup, TagsInput } from '@grafana/ui';
import { selectors } from '@grafana/e2e-selectors';
import { FolderPicker } from 'app/core/components/Select/FolderPicker';
import { DashboardModel } from '../../state/DashboardModel';
import { DeleteDashboardButton } from '../DeleteDashboard/DeleteDashboardButton';
import { TimePickerSettings } from './TimePickerSettings';

import { updateTimeZoneDashboard } from 'app/features/dashboard/state/actions';

interface OwnProps {
  dashboard: DashboardModel;
}

export type Props = OwnProps & ConnectedProps<typeof connector>;

const GRAPH_TOOLTIP_OPTIONS = [
  { value: 0, label: '默认' }, //'Default' },
  { value: 1, label: '共享十字线' }, //'Shared crosshair' },
  { value: 2, label: '共享提示' }, //'Shared Tooltip' },
];

export function GeneralSettingsUnconnected({ dashboard, updateTimeZone }: Props): JSX.Element {
  const [renderCounter, setRenderCounter] = useState(0);

  const onFolderChange = (folder: { id: number; title: string }) => {
    dashboard.meta.folderId = folder.id;
    dashboard.meta.folderTitle = folder.title;
    dashboard.meta.hasUnsavedFolderChange = true;
  };

  const onBlur = (event: React.FocusEvent<HTMLInputElement>) => {
    dashboard[event.currentTarget.name as 'title' | 'description'] = event.currentTarget.value;
  };

  const onTooltipChange = (graphTooltip: number) => {
    dashboard.graphTooltip = graphTooltip;
    setRenderCounter(renderCounter + 1);
  };

  const onRefreshIntervalChange = (intervals: string[]) => {
    dashboard.timepicker.refresh_intervals = intervals.filter((i) => i.trim() !== '');
  };

  const onNowDelayChange = (nowDelay: string) => {
    dashboard.timepicker.nowDelay = nowDelay;
  };

  const onHideTimePickerChange = (hide: boolean) => {
    dashboard.timepicker.hidden = hide;
    setRenderCounter(renderCounter + 1);
  };

  const onLiveNowChange = (v: boolean) => {
    dashboard.liveNow = v;
    setRenderCounter(renderCounter + 1);
  };

  const onTimeZoneChange = (timeZone: TimeZone) => {
    dashboard.timezone = timeZone;
    setRenderCounter(renderCounter + 1);
    updateTimeZone(timeZone);
  };

  const onTagsChange = (tags: string[]) => {
    dashboard.tags = tags;
    setRenderCounter(renderCounter + 1);
  };

  const onEditableChange = (value: boolean) => {
    dashboard.editable = value;
    setRenderCounter(renderCounter + 1);
  };

  const editableOptions = [
    //{ label: 'Editable', value: true },
    //{ label: 'Read-only', value: false },
    { label: '可编辑', value: true },
    { label: '只读', value: false },
  ];

  return (
    <div style={{ maxWidth: '600px' }}>
      <h3 className="dashboard-settings__header" aria-label={selectors.pages.Dashboard.Settings.General.title}>
        常规
      </h3>
      <div className="gf-form-group">
        <Field label="名称">
          <Input name="title" onBlur={onBlur} defaultValue={dashboard.title} />
        </Field>
        <Field label="描述信息">
          <Input name="description" onBlur={onBlur} defaultValue={dashboard.description} />
        </Field>
        <Field label="标签">
          <TagsInput tags={dashboard.tags} onChange={onTagsChange} />
        </Field>
        <Field label="文件夹">
          <FolderPicker
            initialTitle={dashboard.meta.folderTitle}
            initialFolderId={dashboard.meta.folderId}
            onChange={onFolderChange}
            enableCreateNew={true}
            dashboardId={dashboard.id}
            skipInitialLoad={true}
          />
        </Field>

        <Field
          //label="Editable"
          //description="Set to read-only to disable all editing. Reload the dashboard for changes to take effect"
          label="是否可编辑"
          description="设置为只读以禁用所有编辑。重新加载仪表板以使更改生效。"
        >
          <RadioButtonGroup value={dashboard.editable} options={editableOptions} onChange={onEditableChange} />
        </Field>
      </div>

      <TimePickerSettings
        onTimeZoneChange={onTimeZoneChange}
        onRefreshIntervalChange={onRefreshIntervalChange}
        onNowDelayChange={onNowDelayChange}
        onHideTimePickerChange={onHideTimePickerChange}
        onLiveNowChange={onLiveNowChange}
        refreshIntervals={dashboard.timepicker.refresh_intervals}
        timePickerHidden={dashboard.timepicker.hidden}
        nowDelay={dashboard.timepicker.nowDelay}
        timezone={dashboard.timezone}
        liveNow={dashboard.liveNow}
      />

      <CollapsableSection 
        //label="Panel options" 
        label="面板选项" 
      isOpen={true}>
        <Field
          //label="Graph tooltip"
          //description="Controls tooltip and hover highlight behavior across different panels"
          label="图形提示"
          description="控制不同面板上的提示工具和悬停高亮显示行为"
        >
          <RadioButtonGroup onChange={onTooltipChange} options={GRAPH_TOOLTIP_OPTIONS} value={dashboard.graphTooltip} />
        </Field>
      </CollapsableSection>

      <div className="gf-form-button-row">
        {dashboard.meta.canSave && <DeleteDashboardButton dashboard={dashboard} />}
      </div>
    </div>
  );
}

const mapDispatchToProps = {
  updateTimeZone: updateTimeZoneDashboard,
};

const connector = connect(null, mapDispatchToProps);

export const GeneralSettings = connector(GeneralSettingsUnconnected);
