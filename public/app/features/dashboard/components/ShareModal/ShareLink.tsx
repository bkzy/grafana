import React, { PureComponent } from 'react';
import { selectors as e2eSelectors } from '@grafana/e2e-selectors';
import { Field, RadioButtonGroup, Switch, ClipboardButton, Icon, Input, FieldSet, Alert } from '@grafana/ui';
import { SelectableValue, PanelModel, AppEvents } from '@grafana/data';
import { DashboardModel } from 'app/features/dashboard/state';
import { buildImageUrl, buildShareUrl } from './utils';
import { appEvents } from 'app/core/core';
import config from 'app/core/config';

const themeOptions: Array<SelectableValue<string>> = [
  { label: 'Current(当前)', value: 'current' },
  { label: 'Dark(暗色)', value: 'dark' },
  { label: 'Light(亮色)', value: 'light' },
];

export interface Props {
  dashboard: DashboardModel;
  panel?: PanelModel;
}

export interface State {
  useCurrentTimeRange: boolean;
  useShortUrl: boolean;
  selectedTheme: string;
  shareUrl: string;
  imageUrl: string;
}

export class ShareLink extends PureComponent<Props, State> {
  constructor(props: Props) {
    super(props);
    this.state = {
      useCurrentTimeRange: true,
      useShortUrl: false,
      selectedTheme: 'current',
      shareUrl: '',
      imageUrl: '',
    };
  }

  componentDidMount() {
    this.buildUrl();
  }

  componentDidUpdate(prevProps: Props, prevState: State) {
    const { useCurrentTimeRange, useShortUrl, selectedTheme } = this.state;
    if (
      prevState.useCurrentTimeRange !== useCurrentTimeRange ||
      prevState.selectedTheme !== selectedTheme ||
      prevState.useShortUrl !== useShortUrl
    ) {
      this.buildUrl();
    }
  }

  buildUrl = async () => {
    const { panel } = this.props;
    const { useCurrentTimeRange, useShortUrl, selectedTheme } = this.state;

    const shareUrl = await buildShareUrl(useCurrentTimeRange, selectedTheme, panel, useShortUrl);
    const imageUrl = buildImageUrl(useCurrentTimeRange, selectedTheme, panel);

    this.setState({ shareUrl, imageUrl });
  };

  onUseCurrentTimeRangeChange = () => {
    this.setState({ useCurrentTimeRange: !this.state.useCurrentTimeRange });
  };

  onUrlShorten = () => {
    this.setState({ useShortUrl: !this.state.useShortUrl });
  };

  onThemeChange = (value: string) => {
    this.setState({ selectedTheme: value });
  };

  onShareUrlCopy = () => {
    appEvents.emit(AppEvents.alertSuccess, ['已复制到剪贴板']);
  };

  getShareUrl = () => {
    return this.state.shareUrl;
  };

  render() {
    const { panel } = this.props;
    const isRelativeTime = this.props.dashboard ? this.props.dashboard.time.to === 'now' : false;
    const { useCurrentTimeRange, useShortUrl, selectedTheme, shareUrl, imageUrl } = this.state;
    const selectors = e2eSelectors.pages.SharePanelModal;

    return (
      <>
        <p className="share-modal-info-text">
          <>创建指向此仪表板或面板的直接链接，使用以下选项进行自定义。</>
          <>在连接后添加&quot;&amp;kiosk=tv&quot;可以去除仪表盘左侧的菜单栏；</>
          <>在连接后添加&quot;&amp;kiosk&quot;可以去除仪表盘左侧的菜单栏和上部的菜单栏。</>
        </p>
        <FieldSet>
          <Field
            label="Lock time range(锁定时间范围)"
            //description={isRelativeTime ? 'Transforms the current relative time range to an absolute time range' : ''}
            description={isRelativeTime ? '将当前相对时间范围转换为绝对时间范围' : ''}
          >
            <Switch
              id="share-current-time-range"
              value={useCurrentTimeRange}
              onChange={this.onUseCurrentTimeRangeChange}
            />
          </Field>
          <Field label="Theme(主题)">
            <RadioButtonGroup options={themeOptions} value={selectedTheme} onChange={this.onThemeChange} />
          </Field>
          <Field label="Shorten URL(短URL)">
            <Switch id="share-shorten-url" value={useShortUrl} onChange={this.onUrlShorten} />
          </Field>

          <Field label="Link URL(连接URL)">
            <Input
              value={shareUrl}
              readOnly
              addonAfter={
                <ClipboardButton variant="primary" getText={this.getShareUrl} onClipboardCopy={this.onShareUrlCopy}>
                  <Icon name="copy" /> Copy
                </ClipboardButton>
              }
            />
          </Field>
        </FieldSet>
        {panel && config.rendererAvailable && (
          <div className="gf-form">
            <a href={imageUrl} target="_blank" rel="noreferrer" aria-label={selectors.linkToRenderedImage}>
              <Icon name="camera" /> Direct link rendered image(直接连接渲染图像)
            </a>
          </div>
        )}
        {panel && !config.rendererAvailable && (
          <Alert severity="info" title="Image renderer plugin not installed(未安装图像渲染器插件)" bottomSpacing={0}>
            <>To render a panel image, you must install the(为了渲染面板图形，您必须安装渲染插件) </>
            <a
              href="https://grafana.com/grafana/plugins/grafana-image-renderer"
              target="_blank"
              rel="noopener noreferrer"
              className="external-link"
            >
              Grafana image renderer plugin
            </a>
            . Please contact your Grafana administrator to install the plugin(请联系您的管理员安装插件).
          </Alert>
        )}
      </>
    );
  }
}
