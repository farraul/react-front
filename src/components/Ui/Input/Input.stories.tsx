import React from 'react';
import Input from './Input';

export default {
  tittle: 'components/Button',
  component: Input,
  args: {
    type: 'text',
    className: '',
    name: '',
    value: '',
    placeholder: '',
    isFocused: false,
    props: '',
  },
};

const Template = (args: any) => <Input {...args} />;

export const Primary = Template.bind({});
