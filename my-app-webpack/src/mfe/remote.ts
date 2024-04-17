declare global {
  interface Window {
    __remotes__: Record<string, string>;
    scopeLoading: Record<string, (module: any) => void>;
  }

  const __webpack_init_sharing__: (scope: string) => Promise<void>;
  const __webpack_share_scopes__: any;
}

interface ModuleFederationContainer {
  init: (args: any) => void;
  get: (module: string) => any;
}

export interface Remote {
  import: (
    url: string,
    scope: string,
    module: string,
    type?: "var" | "module"
  ) => Promise<any>;
}

let defaultScopePromise: any = undefined;

class RemoteImp implements Remote {
  private window: Window;

  constructor(window: Window) {
    this.window = window;
  }

  async import(
    url: string,
    scope: string,
    module: string,
    type: "var" | "module" = "var"
  ) {
    let container = this.getContainer(scope);
    if (!container) {
      container = await this.fetchRemoteEntry(url, scope, type);
      await this.initSharingScope();
      await container.init(__webpack_share_scopes__.default);
    }
    let factory = await container.get(module);
    return factory();
  }

  private getContainer(scope: string): ModuleFederationContainer {
    return (this.window as any)[scope] as ModuleFederationContainer;
  }

  private initSharingScope() {
    if (!defaultScopePromise) {
      defaultScopePromise = __webpack_init_sharing__("default");
    }

    return defaultScopePromise;
  }

  private fetchRemoteEntry(
    url: string,
    scope: string,
    type: "var" | "module" = "var"
  ): Promise<ModuleFederationContainer> {
    if (type === "module") {
      return this.fetchModuleRemoteEntry(url, scope);
    }
    return this.fetchWebPackRemoteEntry(url, scope);
  }

  private fetchWebPackRemoteEntry(
    url: string,
    scope: string
  ): Promise<ModuleFederationContainer> {
    const script = this.window.document.createElement("script");
    script.src = url;
    script.type = "text/javascript";
    script.async = true;

    const promise = new Promise<ModuleFederationContainer>((resolve) => {
      script.onload = () => {
        resolve(this.getContainer(scope));
      };
    });

    this.window.document.head.appendChild(script);

    return promise;
  }

  private fetchModuleRemoteEntry(
    url: string,
    scope: string
  ): Promise<ModuleFederationContainer> {
    const script = this.window.document.createElement("script");
    script.type = "module";
    script.innerHTML = `
      (async () => {
        const module = await import("${url}");
        window['${scope}'] = module;
        if (window['scopeLoading']['${scope}']) {
          window['scopeLoading']['${scope}'](module);
          delete window['scopeLoading']['${scope}'];
        }
      })();
    `;
    const promise = new Promise<ModuleFederationContainer>((resolve) => {
      this.window["scopeLoading"] = this.window["scopeLoading"] || {};
      this.window["scopeLoading"][scope] = resolve;
    });

    this.window.document.head.appendChild(script);

    return promise;
  }
}

let remote: Remote | undefined = undefined;

export const getRemote = (global?: Window): Remote => {
  if (!remote) {
    remote = new RemoteImp(global || window);
  }
  return remote;
};

export const destroyRemote = (): void => {
  remote = undefined;
};
