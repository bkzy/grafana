/* eslint-disable prettier/prettier */
import { DataFrame, FieldConfigSource, PanelData, PanelPlugin } from '@grafana/data';
import { DashboardModel, PanelModel } from '../../state';

export interface PanelEditorTab {
  id: string;
  text: string;
  active: boolean;
  icon: string;
}

export enum PanelEditorTabId {
  Query = 'query',
  Transform = 'transform',
  Visualize = 'visualize',
  Alert = 'alert',
}

export enum DisplayMode {
  Fill = 0,
  Fit = 1,
  Exact = 2,
}

export enum PanelEditTableToggle {
  Off = 0,
  Table = 1,
}

export const displayModes = [
  { value: 
    DisplayMode.Fill, 
    label: 'Fill(充满)',
    //description: 'Use all available space' 
    description: '使用所有可用空间'
  },
  { value: DisplayMode.Exact, 
    label: 'Actual(实际)', 
    //description: 'Make same size as on the dashboard' 
    description: '与仪表盘上的尺寸相同'
  },
];

export const panelEditTableModes = [
  {
    value: PanelEditTableToggle.Off,
    label: 'Visualization(具体化)',
    //description: 'Show using selected visualization',
    description: '使用选定的可视化显示',
  },
  { value: PanelEditTableToggle.Table, label: 'Table', description: 'Show raw data in table form' },
];

/** @internal */
export interface Props {
  plugin: PanelPlugin;
  config: FieldConfigSource;
  onChange: (config: FieldConfigSource) => void;
  /* Helpful for IntelliSense */
  data: DataFrame[];
}

export interface OptionPaneRenderProps {
  panel: PanelModel;
  plugin: PanelPlugin;
  data?: PanelData;
  dashboard: DashboardModel;
  onPanelConfigChange: (configKey: keyof PanelModel, value: any) => void;
  onPanelOptionsChanged: (options: any) => void;
  onFieldConfigsChange: (config: FieldConfigSource) => void;
}
