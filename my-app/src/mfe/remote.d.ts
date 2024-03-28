declare async function importRemote(
  url: string,
  name: string,
  module: string
): Promise<any>;
export default importRemote;
export { importRemote };
