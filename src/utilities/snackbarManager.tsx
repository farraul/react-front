import { useSnackbar, VariantType, ProviderContext } from 'notistack';

let useSnackbarRef: ProviderContext;
export function SnackbarUtilitiesConfigurator() {
  useSnackbarRef = useSnackbar();
  return null;
}

export const SnackbarUtilities = {
  toast(msg: string, variant: VariantType = 'default') {
    useSnackbarRef.enqueueSnackbar(msg, { variant });
  },
  error(msg: string) {
    this.toast(msg, 'error');
  },
  warning(msg: string) {
    this.toast(msg, 'warning');
  },
  success(msg: string) {
    this.toast(msg, 'success');
  },
};
