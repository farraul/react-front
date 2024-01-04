import React from 'react';
import Button from './Button';

export default {
  tittle: 'components/Button',
  component: Button,
  args: {
    children: '',
    className: '',
    disabled: '',
    props: '',
  },
};

const Template = (args: any) => <Button {...args} />;

export const Primary = Template.bind({});

export const Secundary = Template.bind({});
Secundary.args = {
  children: 'secundary',
};
