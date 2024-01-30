export function AjsDependencies(
  dependencies: any[] = []
): (target: any) => void {
  return (target: any) => {
    if (dependencies && dependencies.length) {
      target.$inject = dependencies.map((dep: any) => {
        if (typeof dep === 'string') {
          return dep;
        }
        return dep.name;
      });
    }
  };
}
