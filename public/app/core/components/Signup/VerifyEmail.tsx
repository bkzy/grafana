import React, { FC, useState } from 'react';
import { Form, Field, Input, Button, Legend, Container, HorizontalGroup, LinkButton } from '@grafana/ui';
import { getConfig } from 'app/core/config';
import { getBackendSrv } from '@grafana/runtime';
import appEvents from 'app/core/app_events';
import { AppEvents } from '@grafana/data';

interface EmailDTO {
  email: string;
}

export const VerifyEmail: FC = () => {
  const [emailSent, setEmailSent] = useState(false);

  const onSubmit = (formModel: EmailDTO) => {
    getBackendSrv()
      .post('/api/user/signup', formModel)
      .then(() => {
        setEmailSent(true);
      })
      .catch((err) => {
        const msg = err.data?.message || err;
        appEvents.emit(AppEvents.alertWarning, [msg]);
      });
  };

  if (emailSent) {
    return (
      <div>
        <p>An email with a verification link has been sent to the email address. You should receive it shortly.</p>
        <Container margin="md" />
        <LinkButton variant="primary" href={getConfig().appSubUrl + '/signup'}>
          Complete Signup
        </LinkButton>
      </div>
    );
  }

  return (
    <Form onSubmit={onSubmit}>
      {({ register, errors }) => (
        <>
          <Legend>Verify Email</Legend>
          <Field
            label="Email"
            //description="Enter your email address to get a verification link sent to you"
            description="输入您的电子邮件地址以获取发送给您的验证链接"
            invalid={!!errors.email}
            error={errors.email?.message}
          >
            <Input
              id="email"
              {...register('email', {
                //required: 'Email is required',
                required: 'Email 是必填的',
                pattern: {
                  value: /^\S+@\S+$/,
                  //message: 'Email is invalid',
                  message: 'Email 地址无效',
                },
              })}
              placeholder="Email"
            />
          </Field>
          <HorizontalGroup>
            <Button>发送验证Email</Button>
            <LinkButton fill="text" href={getConfig().appSubUrl + '/login'}>
              返回登录页面
            </LinkButton>
          </HorizontalGroup>
        </>
      )}
    </Form>
  );
};
