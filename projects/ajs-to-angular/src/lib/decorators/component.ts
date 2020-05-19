import { AjsDependencies } from './dependencies';

interface IComponentDescriptor {
  name?: string;
  controllerAs?: string;
  template?: string;
  styles?: string[];
  bindings?: any;
  dependencies?: any[];
  require?: any;
  transclude?: any;
}

const getComponentName = (target: any): string => {
  const name = target.name.replace(/Component$/, '');
  return name[0].toLowerCase() + name.substr(1);
};

const getStylesTags = (styles: any[]): string => {
  return styles.map((s) => `<style>${s}</style>`).join('');
};

const addTemplate = (descriptor: IComponentDescriptor, target: any) => {
  if (descriptor.template) {
    target.descriptor.template = getStylesTags(descriptor.styles || []) + descriptor.template;
  }
};

const addRequire = (descriptor: IComponentDescriptor, target: any) => {
  if (descriptor.require) {
    target.descriptor.require = descriptor.require;
  }
};

const addTransclude = (descriptor: IComponentDescriptor, target: any) => {
  if (descriptor.transclude) {
    target.descriptor.transclude = descriptor.transclude;
  }
};

const addBindings = (descriptor: IComponentDescriptor, target: any) => {
  if (descriptor.bindings) {
    target.descriptor.bindings = descriptor.bindings;
  }
};

export function AjsComponent(descriptor: IComponentDescriptor): (target: any) => void {
  return (target: any) => {
    AjsDependencies(descriptor.dependencies)(target);

    target.descriptor = {};
    target.component = true;

    target.descriptor.name = descriptor.name || getComponentName(target);
    target.descriptor.controller = target;
    target.descriptor.controllerAs = descriptor.controllerAs || '$ctrl';

    addTemplate(descriptor, target);
    addBindings(descriptor, target);
    addTransclude(descriptor, target);
    addRequire(descriptor, target);
  };
}
