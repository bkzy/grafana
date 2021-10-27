import React, { useState } from 'react';
import { DeleteButton, Icon, IconButton, VerticalGroup } from '@grafana/ui';
import EmptyListCTA from 'app/core/components/EmptyListCTA/EmptyListCTA';
import { DashboardModel } from '../../state/DashboardModel';
import { ListNewButton } from '../DashboardSettings/ListNewButton';
import { arrayUtils } from '@grafana/data';

type Props = {
  dashboard: DashboardModel;
  onNew: () => void;
  onEdit: (idx: number) => void;
};

export const AnnotationSettingsList: React.FC<Props> = ({ dashboard, onNew, onEdit }) => {
  const [annotations, updateAnnotations] = useState(dashboard.annotations.list);

  const onMove = (idx: number, direction: number) => {
    dashboard.annotations.list = arrayUtils.moveItemImmutably(annotations, idx, idx + direction);
    updateAnnotations(dashboard.annotations.list);
  };

  const onDelete = (idx: number) => {
    dashboard.annotations.list = [...annotations.slice(0, idx), ...annotations.slice(idx + 1)];
    updateAnnotations(dashboard.annotations.list);
  };

  const showEmptyListCTA = annotations.length === 0 || (annotations.length === 1 && annotations[0].builtIn);

  return (
    <VerticalGroup>
      {annotations.length > 0 && (
        <table className="filter-table filter-table--hover">
          <thead>
            <tr>
              <th>Query name</th>
              <th>Data source</th>
              <th colSpan={3}></th>
            </tr>
          </thead>
          <tbody>
            {dashboard.annotations.list.map((annotation, idx) => (
              <tr key={`${annotation.name}-${idx}`}>
                {!annotation.builtIn && (
                  <td className="pointer" onClick={() => onEdit(idx)}>
                    <Icon name="comment-alt" /> &nbsp; {annotation.name}
                  </td>
                )}
                {annotation.builtIn && (
                  <td style={{ width: '90%' }} className="pointer" onClick={() => onEdit(idx)}>
                    <Icon name="comment-alt" /> &nbsp; <em className="muted">{annotation.name} (Built-in)</em>
                  </td>
                )}
                <td className="pointer" onClick={() => onEdit(idx)}>
                  {annotation.datasource || 'Default'}
                </td>
                <td style={{ width: '1%' }}>
                  {idx !== 0 && (
                    <IconButton
                      surface="header"
                      name="arrow-up"
                      aria-label="arrow-up"
                      onClick={() => onMove(idx, -1)}
                    />
                  )}
                </td>
                <td style={{ width: '1%' }}>
                  {dashboard.annotations.list.length > 1 && idx !== dashboard.annotations.list.length - 1 ? (
                    <IconButton
                      surface="header"
                      name="arrow-down"
                      aria-label="arrow-down"
                      onClick={() => onMove(idx, 1)}
                    />
                  ) : null}
                </td>
                <td style={{ width: '1%' }}>
                  <DeleteButton size="sm" onConfirm={() => onDelete(idx)} />
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
      {showEmptyListCTA && (
        <EmptyListCTA
          onClick={onNew}
          //title="There are no custom annotation queries added yet"
          title="尚未添加自定义注释查询"
          buttonIcon="comment-alt"
          buttonTitle="Add annotation query"
          //infoBoxTitle="What are annotation queries?"
          infoBoxTitle="什么是注释查询?"
          /*
          infoBox={{
            __html: `<p>Annotations provide a way to integrate event data into your graphs. They are visualized as vertical lines
          and icons on all graph panels. When you hover over an annotation icon you can get event text &amp; tags for
          the event. You can add annotation events directly from grafana by holding CTRL or CMD + click on graph (or
          drag region). These will be stored in Grafana's annotation database.
        </p>
        Checkout the
        <a class='external-link' target='_blank' href='http://docs.grafana.org/reference/annotations/'
          >Annotations documentation</a
        >
        for more information.`,
          }}
          */
          infoBox={{
            __html: `<p>注释提供了一种将事件数据集成到图形中的方法。它们在所有图形面板上显示为垂直线和图标。
            当您将鼠标悬停在注释图标上时，可以获得事件文本 &amp; 事件的标记。
            您可以通过按住CTRL或CMD并单击图形（或拖动区域），直接从grafana添加注释事件。
            这些将存储在Grafana的注释数据库中.
        </p>
        更多信息请查看
        <a class='external-link' target='_blank' href='http://docs.grafana.org/reference/annotations/'
          >注释文档</a
        >`,
          }}
        />
      )}
      {!showEmptyListCTA && <ListNewButton onClick={onNew}>New query</ListNewButton>}
    </VerticalGroup>
  );
};
