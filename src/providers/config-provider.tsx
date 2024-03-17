import React, { createContext, ReactNode } from 'react';
import { IUIKitConfig, IUIKitConfigOptions } from '../types/config.interface';
import config from '../../uikit.config.json';

interface IConfigProviderProps {
  children: ReactNode;
}

export const ConfigContext = createContext<IUIKitConfig>({
  globalTheme: {},
  excludes: [],
  getConfig: () => ({}),
  getUiKitConfig: () => ({}),
});

export const ConfigProvider = ({ children }: IConfigProviderProps) => {
  const configFile = config;
  const getConfig = (id: string) => {
    const value = configFile.customizations[id];
    return value;
  };

  const parseConfigKeys = () => {
    const keys = Object.keys(configFile.customizations);
    const result = keys.map((key) => {
      const [page, component, element] = key.split('/');
      return { page, component, element };
    });
    return result;
  };

  const customSort = (
    a: {
      page: string;
      component: string;
      element: string;
    },
    b: {
      page: string;
      component: string;
      element: string;
    }
  ) => {
    if (a.page !== '*' && b.page === '*') return -1;
    if (a.page === '*' && b.page !== '*') return 1;
    if (a.component !== '*' && b.component === '*') return -1;
    if (a.component === '*' && b.component !== '*') return 1;
    if (a.element !== '*' && b.element === '*') return -1;
    if (a.element === '*' && b.element !== '*') return 1;
    return 0;
  };

  const getUiKitConfig = ({
    id,
    type,
    page,
    component,
  }: IUIKitConfigOptions) => {
    const configKeys = parseConfigKeys();
    const filteredKeys = configKeys.filter((key) => key[type] === id);
    if (filteredKeys.length === 0) return null;
    if (filteredKeys.length === 1)
      return configFile.customizations[
        `${filteredKeys[0].page}/${filteredKeys[0].component}/${filteredKeys[0].element}`
      ];
    const sortedKeys = filteredKeys.sort(customSort);
    const correctConfig = [];
    sortedKeys.forEach((item) => {
      if (type === 'page')
        return (correctConfig[0] = configFile.customizations[`${id}/*/*`]);
      if (type === 'component') {
        if (item.page === page)
          return (correctConfig[0] =
            configFile.customizations[`${page}/${id}/*`]);
        if (item.page === '*')
          if (correctConfig.length === 0)
            return (correctConfig[0] = configFile.customizations[`*/${id}/*`]);
      }
      if (item.page === page) {
        if (item.component === component)
          return (correctConfig[0] =
            configFile.customizations[`${page}/${component}/${id}`]);
        if (item.component === '*')
          if (correctConfig.length === 0)
            return (correctConfig[0] =
              configFile.customizations[`${page}/*/${id}`]);
      }
      if (item.page === '*') {
        if (correctConfig.length !== 0) return;
        if (item.component === component)
          return (correctConfig[0] =
            configFile.customizations[`*/${component}/${id}`]);
        if (item.component === '*')
          return (correctConfig[0] = configFile.customizations[`*/*/${id}`]);
      }
    });
    return correctConfig[0] ?? null;
  };
  const globalTheme = configFile.global_theme;
  const excludes = configFile.excludes;

  return (
    <ConfigContext.Provider
      value={{ globalTheme, excludes, getConfig, getUiKitConfig }}
    >
      {children}
    </ConfigContext.Provider>
  );
};
