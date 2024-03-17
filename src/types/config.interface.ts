export interface IUIKitConfigOptions {
  id: string;
  type: 'page' | 'component' | 'element';
  page?: string;
  component?: string;
  element?: string;
}

export interface IUIKitConfig {
  globalTheme: Record<string, any>;
  excludes: string[];
  getConfig: (id: string) => any;
  getUiKitConfig: ({
    id,
    type,
    page,
    component,
    element,
  }: IUIKitConfigOptions) => Record<
    string,
    string | string[] | Record<string, string>
  > | null;
}
