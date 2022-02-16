import { getTheme } from '@fluentui/react';
//import { Remote, remote as r } from 'electron';
const theme = getTheme();

//export const remote: Remote = r;

const Info = {
  duration: 3000,
  close: true,
  gravity: 'bottom', // `top` or `bottom`
  position: 'right', // `left`, `center` or `right`
  stopOnFocus: true, // Prevents dismissing of toast on hover
  backgroundColor: theme.palette.themePrimary,
};

const Warning = {
  duration: 3000,
  close: true,
  gravity: 'bottom', // `top` or `bottom`
  position: 'right', // `left`, `center` or `right'
  stopOnFocus: true, // Prevents dismissing of toast on hover
  backgroundColor: theme.palette.redDark,
  
};

const Success = {
  duration: 3000,
  close: true,
  gravity: 'bottom', // `top` or `bottom`
  position: 'right', // `left`, `center` or `right`
  stopOnFocus: true, // Prevents dismissing of toast on hover
  backgroundColor: theme.palette.greenDark,

  
};

export const _CONFIG_ = {
  version: '0.9.01',
  
  ToastInfo: Info,
  ToastWarning: Warning,
  ToastSuccess: Success,
  defaultSvg: './assets/img/blank.svg',
};

export const _GLOBAL_CONFIG_ = {
  config: {},
};
