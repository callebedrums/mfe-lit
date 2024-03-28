const modules = {};

export async function importRemote(url, name, module) {
  if (!remotesMap[name]) {
    remotesMap[name] = {
      url,
      format: "esm",
      from: "vite",
    };

    modules[name] = {};
  }

  modules[name] = modules[name] || {};

  if (!modules[name][module]) {
    modules[name][module] = await __federation_method_getRemote(name, module);
  }

  return modules[name][module];
}

export default importRemote;
