import { appDark } from 'src/colors';

export const changeThemeTailwind = (theme: string) => {
  const root = document.querySelector(':root') as HTMLElement;
  if (theme === 'dark') {
    root.style.setProperty('--text-primary', appDark[0]);
    root.style.setProperty('--text-secondary', appDark[1000]);

    root.style.setProperty('--bg-primary', appDark[400]);
    root.style.setProperty('--bg-secondary', appDark[600]);
    root.style.setProperty('--bg-thirdary', appDark[50]);

    root.style.setProperty('--btn-bg-primary', appDark[50]);
    root.style.setProperty('--btn-text-primary', appDark[1000]);
  } else {
    root.style.removeProperty('--text-primary');
    root.style.removeProperty('--text-secondary');

    root.style.removeProperty('--bg-primary');
    root.style.removeProperty('--bg-secondary');
    root.style.removeProperty('--bg-thirdary');

    root.style.removeProperty('--btn-bg-primary');
    root.style.removeProperty('--btn-text-primary');
  }
};
