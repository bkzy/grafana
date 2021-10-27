import React, { useState } from 'react';
import { CollapsableSection, TagsInput, Select, Field, Input, Checkbox } from '@grafana/ui';
import { SelectableValue } from '@grafana/data';
import { DashboardLink, DashboardModel } from '../../state/DashboardModel';

export const newLink = {
  icon: 'external link',
  title: 'New link',
  tooltip: '',
  type: 'dashboards',
  url: '',
  asDropdown: false,
  tags: [],
  targetBlank: false,
  keepTime: false,
  includeVars: false,
} as DashboardLink;

const linkTypeOptions = [
  { value: 'dashboards', label: 'Dashboards(仪表盘)' },
  { value: 'link', label: 'Link(链接)' },
];

export const linkIconMap: { [key: string]: string } = {
  'external link': 'external-link-alt',
  dashboard: 'apps',
  question: 'question-circle',
  info: 'info-circle',
  bolt: 'bolt',
  doc: 'file-alt',
  cloud: 'cloud',
};

const linkIconOptions = Object.keys(linkIconMap).map((key) => ({ label: key, value: key }));

type LinkSettingsEditProps = {
  editLinkIdx: number;
  dashboard: DashboardModel;
  onGoBack: () => void;
};

export const LinkSettingsEdit: React.FC<LinkSettingsEditProps> = ({ editLinkIdx, dashboard }) => {
  const [linkSettings, setLinkSettings] = useState(editLinkIdx !== null ? dashboard.links[editLinkIdx] : newLink);

  const onUpdate = (link: DashboardLink) => {
    const links = [...dashboard.links];
    links.splice(editLinkIdx, 1, link);
    dashboard.links = links;
    setLinkSettings(link);
  };

  const onTagsChange = (tags: any[]) => {
    onUpdate({ ...linkSettings, tags: tags });
  };

  const onTypeChange = (selectedItem: SelectableValue) => {
    const update = { ...linkSettings, type: selectedItem.value };

    // clear props that are no longe revant for this type
    if (update.type === 'dashboards') {
      update.url = '';
      update.tooltip = '';
    } else {
      update.tags = [];
    }

    onUpdate(update);
  };

  const onIconChange = (selectedItem: SelectableValue) => {
    onUpdate({ ...linkSettings, icon: selectedItem.value });
  };

  const onChange = (ev: React.FocusEvent<HTMLInputElement>) => {
    const target = ev.currentTarget;
    onUpdate({
      ...linkSettings,
      [target.name]: target.type === 'checkbox' ? target.checked : target.value,
    });
  };

  const isNew = linkSettings.title === newLink.title;

  return (
    <div style={{ maxWidth: '600px' }}>
      <Field label="标题">
        <Input name="title" id="title" value={linkSettings.title} onChange={onChange} autoFocus={isNew} />
      </Field>
      <Field label="类型">
        <Select menuShouldPortal value={linkSettings.type} options={linkTypeOptions} onChange={onTypeChange} />
      </Field>
      {linkSettings.type === 'dashboards' && (
        <>
          <Field label="带标签(tags)">
            <TagsInput tags={linkSettings.tags} placeholder="添加标签(add tags)" onChange={onTagsChange} />
          </Field>
        </>
      )}
      {linkSettings.type === 'link' && (
        <>
          <Field label="URL">
            <Input name="url" value={linkSettings.url} onChange={onChange} />
          </Field>
          <Field label="提示信息">
            <Input name="tooltip" value={linkSettings.tooltip} onChange={onChange} placeholder="打开仪表盘" />
          </Field>
          <Field label="Icon">
            <Select menuShouldPortal value={linkSettings.icon} options={linkIconOptions} onChange={onIconChange} />
          </Field>
        </>
      )}
      <CollapsableSection label="选项" isOpen={true}>
        {linkSettings.type === 'dashboards' && (
          <Field>
            <Checkbox label="显示为下拉菜单" name="asDropdown" value={linkSettings.asDropdown} onChange={onChange} />
          </Field>
        )}
        <Field>
          <Checkbox
            label="Include current time range(包含当前时间)"
            name="keepTime"
            value={linkSettings.keepTime}
            onChange={onChange}
          />
        </Field>
        <Field>
          <Checkbox
            label="Include current template variable values(包含当前临时变量值)"
            name="includeVars"
            value={linkSettings.includeVars}
            onChange={onChange}
          />
        </Field>
        <Field>
          <Checkbox
            label="Open link in new tab(在新标签中打开)"
            name="targetBlank"
            value={linkSettings.targetBlank}
            onChange={onChange}
          />
        </Field>
      </CollapsableSection>
    </div>
  );
};
