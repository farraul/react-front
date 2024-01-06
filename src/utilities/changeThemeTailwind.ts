export const changeThemeTailwind = (theme: string) => {
  const root = document.querySelector(':root') as HTMLElement;
  if (theme === 'dark') {
    root.style.setProperty('--primary', '#464646');
    //pillar los de appdark y appblue para que sea todos del mismo
    root.style.setProperty('--secondary', '#343434');
    root.style.setProperty('--footer', '#ffffffac');
    root.style.setProperty('--text-primary', '#ffffff');
    root.style.setProperty('--text-footer', '#000000');
  } else {
    root.style.removeProperty('--primary');
    root.style.removeProperty('--secondary');
    root.style.removeProperty('--footer');
    root.style.removeProperty('--text-primary');
    root.style.removeProperty('--text-footer');
  }
};