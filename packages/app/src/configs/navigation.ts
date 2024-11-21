type INavigation = {
  label: string;
  url: string;
  disabled: boolean;
};

export const NavigationData: INavigation[] = [
  {
    label: 'Home',
    url: '/',
    disabled: false,
  },
  {
    label: 'Mint',
    url: '/mint',
    disabled: false,
  },
];
