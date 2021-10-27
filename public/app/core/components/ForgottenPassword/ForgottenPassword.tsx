import React, { FC, useState } from 'react';
import { Form, Field, Input, Button, Legend, Container, useStyles, HorizontalGroup, LinkButton } from '@grafana/ui';
import { getBackendSrv } from '@grafana/runtime';
import { css } from '@emotion/css';
import { GrafanaTheme } from '@grafana/data';
import config from 'app/core/config';

interface EmailDTO {
  userOrEmail: string;
}

const paragraphStyles = (theme: GrafanaTheme) => css`
  color: ${theme.colors.formDescription};
  font-size: ${theme.typography.size.sm};
  font-weight: ${theme.typography.weight.regular};
  margin-top: ${theme.spacing.sm};
  display: block;
`;

export const ForgottenPassword: FC = () => {
  const [emailSent, setEmailSent] = useState(false);
  const styles = useStyles(paragraphStyles);
  const loginHref = `${config.appSubUrl}/login`;

  const sendEmail = async (formModel: EmailDTO) => {
    const res = await getBackendSrv().post('/api/user/password/send-reset-email', formModel);
    if (res) {
      setEmailSent(true);
    }
  };

  if (emailSent) {
    return (
      <div>
        <p>带有重置链接的电子邮件已发送到该电子邮件地址。你很快就会收到的.</p>
        <Container margin="md" />
        <LinkButton variant="primary" href={loginHref}>
          返回登录
        </LinkButton>
      </div>
    );
  }
  return (
    <Form onSubmit={sendEmail}>
      {({ register, errors }) => (
        <>
          <Legend>重置密码</Legend>
          <Field
            //label="User"
            //description="Enter your information to get a reset link sent to you"
            label="用户"
            description="输入您的信息以获得发送给您的重置链接"
            invalid={!!errors.userOrEmail}
            error={errors?.userOrEmail?.message}
          >
            <Input
              id="user-input"
              placeholder="Email or username"
              {...register('userOrEmail', { required: 'Email 或用户名是必填项' })}
            />
          </Field>
          <HorizontalGroup>
            <Button>发送重置Email</Button>
            <LinkButton fill="text" href={loginHref}>
              返回登录
            </LinkButton>
          </HorizontalGroup>

          <p className={styles}>忘记了你的用户名或者Email? 请联系你的管理员。</p>
        </>
      )}
    </Form>
  );
};
