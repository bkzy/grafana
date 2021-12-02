import React, { FC } from 'react';
import { Form, Field, Input, Button, HorizontalGroup, LinkButton, FormAPI } from '@grafana/ui';
import { getConfig } from 'app/core/config';
import { getBackendSrv } from '@grafana/runtime';
import appEvents from 'app/core/app_events';
import { AppEvents } from '@grafana/data';
import { GrafanaRouteComponentProps } from 'app/core/navigation/types';
import { InnerBox, LoginLayout } from '../Login/LoginLayout';
import { PasswordField } from '../PasswordField/PasswordField';

interface SignupDTO {
  name?: string;
  email: string;
  username: string;
  orgName?: string;
  password: string;
  code: string;
  confirm?: string;
}

interface QueryParams {
  email?: string;
  code?: string;
}

interface Props extends GrafanaRouteComponentProps<{}, QueryParams> {}

export const SignupPage: FC<Props> = (props) => {
  const onSubmit = async (formData: SignupDTO) => {
    if (formData.name === '') {
      delete formData.name;
    }
    delete formData.confirm;

    const response = await getBackendSrv()
      .post('/api/user/signup/step2', {
        email: formData.email,
        code: formData.code,
        username: formData.email,
        orgName: formData.orgName,
        password: formData.password,
        name: formData.name,
      })
      .catch((err) => {
        const msg = err.data?.message || err;
        appEvents.emit(AppEvents.alertWarning, [msg]);
      });

    if (response.code === 'redirect-to-select-org') {
      window.location.assign(getConfig().appSubUrl + '/profile/select-org?signup=1');
    }
    window.location.assign(getConfig().appSubUrl + '/');
  };

  const defaultValues = {
    email: props.queryParams.email,
    code: props.queryParams.code,
  };

  return (
    <LoginLayout>
      <InnerBox>
        <Form defaultValues={defaultValues} onSubmit={onSubmit}>
          {({ errors, register, getValues }: FormAPI<SignupDTO>) => (
            <>
              <Field label="您的名字">
                <Input id="user-name" {...register('name')} placeholder="(optional)" />
              </Field>
              <Field label="Email" invalid={!!errors.email} error={errors.email?.message}>
                <Input
                  id="email"
                  {...register('email', {
                    required: 'Email 是必填项',
                    pattern: {
                      value: /^\S+@\S+$/,
                      message: 'Email 无效',
                    },
                  })}
                  type="email"
                  placeholder="Email"
                />
              </Field>
              {!getConfig().autoAssignOrg && (
                <Field label="组织名称">
                  <Input id="org-name" {...register('orgName')} placeholder="组织名称" />
                </Field>
              )}
              {getConfig().verifyEmailEnabled && (
                <Field label="Email 验证码 (已发送到您的Email)">
                  <Input id="verification-code" {...register('code')} placeholder="Code" />
                </Field>
              )}
              <Field label="密码" invalid={!!errors.password} error={errors?.password?.message}>
                <PasswordField
                  id="new-password"
                  autoFocus
                  autoComplete="new-password"
                  {...register('password', { required: '密码是必填项' })}
                />
              </Field>
              <Field label="确认密码" invalid={!!errors.confirm} error={errors?.confirm?.message}>
                <PasswordField
                  id="confirm-new-password"
                  autoComplete="new-password"
                  {...register('confirm', {
                    required: '确认密码是必填项',
                    validate: (v) => v === getValues().password || '密码不匹配!',
                  })}
                />
              </Field>

              <HorizontalGroup>
                <Button type="submit">Submit</Button>
                <LinkButton fill="text" href={getConfig().appSubUrl + '/login'}>
                  返回登录页面
                </LinkButton>
              </HorizontalGroup>
            </>
          )}
        </Form>
      </InnerBox>
    </LoginLayout>
  );
};

export default SignupPage;
