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
  /**
   * Dynamic import a module from a remote entry file using Module Federation standard.
   *
   * Example:
   *
   * // using then
   *
   * remote().import("/app/my-vue/assets/remoteEntry.js", "myVue", "./myVue", "module").then((module) => { module.exportedFunction();});
   *
   * // using await
   *
   * const module = await remote().import("/app/my-vue/assets/remoteEntry.js", "myVue", "./myVue", "module");
   *
   * @param url Url to the remote entry file
   * @param scope remote scope name
   * @param module exported module name
   * @param type remote type, var or module
   * @returns promise to be resolved with the exported module
   */
  import: (
    url: string,
    scope: string,
    module: string,
    type?: "var" | "module"
  ) => Promise<any>;

  /**
   * register import functions for remote scope and modules to be used later.
   *
   * Example:
   *
   * remote()
   *  .register("/app/my-page/assets/remoteEntry.js", "myPage", "./myPage", "module");
   *  .register("/app/my-vue/assets/remoteEntry.js", "myVue", ["./myVue", "./myComponent"], "module");
   *
   * @param url Url to the remote entry file
   * @param scope remote scope name
   * @param module exported module(s) name(s). Can be a string or an array of strings
   * @param type remote type, var or module
   * @returns Remote instance
   */
  register: (
    url: string,
    scope: string,
    module: string | string[],
    type: "var" | "module"
  ) => Remote;

  /**
   * import a module that was previously registered.
   *
   * Example:
   *
   * // registered module
   *
   * remote()
   *  .register("/app/my-page/assets/remoteEntry.js", "myPage", "./myPage", "module");
   *
   * // import registered module
   *
   * remote().get("myPage/myPage").then((module) => { module.exportedFunction();});
   *
   * @param module The module name concatenating scope and module and removing any ./ from the beginning
   */
  get(module: string): Promise<any>;
}

let defaultScopePromise: any = undefined;

class RemoteImp implements Remote {
  private window: Window;

  private modules = {};

  private getters = {};

  constructor(window: Window) {
    this.window = window;
  }

  register(
    url: string,
    scope: string,
    module: string | string[],
    type: "var" | "module" = "var"
  ) {
    if (!Array.isArray(module)) {
      module = [module];
    }

    for (let m of module) {
      this.getters[`${scope}/${m.replace(/^\.\//, "")}`] = () =>
        this.import(url, scope, m, type);
    }

    return this;
  }

  get(module: string) {
    return this.getters[`${module}`]();
  }

  async import(
    url: string,
    scope: string,
    module: string,
    type: "var" | "module" = "var"
  ) {
    // if module was not loaded instantiated yet, instantiate it.
    if (!this.modules[`${scope}/${module}`]) {
      // if remote container was not loaded yet, load it.
      let container = this.getContainer(scope);
      if (!container) {
        container = await this.fetchRemoteEntry(url, scope, type);
        await this.initSharingScope();
        await container.init(__webpack_share_scopes__.default);
      }

      // load module from remote container
      let factory = await container.get(module);
      this.modules[`${scope}/${module}`] = factory();
    }

    return this.modules[`${scope}/${module}`];
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

let $remote: Remote | undefined = undefined;

export const remote = (global?: Window): Remote => {
  if (!$remote) {
    $remote = new RemoteImp(global || window);
  }
  return $remote;
};

export const destroyRemote = (): void => {
  $remote = undefined;
};
