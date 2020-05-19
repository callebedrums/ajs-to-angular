import { AjsDependencies } from './dependencies';

interface IDirectiveDescriptor {
  priority?: number;
  name?: string;
  controllerAs?: string;
  template?: string;
  styles?: string[];
  restrict?: string;
  scope?: any;
  dependencies?: any[];
  require?: any;
  transclude?: any;
  bindToController?: boolean;
  multiElement?: boolean;
  compile?: any;
  link?: any;
  templateNamespace?: string;
}

const getDirectiveName = (target: any): string => {
  const name = target.name.replace(/Directive$/, '');
  return name[0].toLowerCase() + name.substr(1);
};

const getStylesTags = (styles: any[]): string => {
  return styles.map((s) => `<style>${s}</style>`).join('');
};

const addTemplate = (descriptor: IDirectiveDescriptor, target: any) => {
  if (descriptor.template) {
    target.descriptor.template = getStylesTags(descriptor.styles || []) + descriptor.template;
  }
};

const addDescriptorAttribute = (attr: string, descriptor: any, target: any) => {
  if (descriptor[attr]) {
    target.descriptor[attr] = descriptor[attr];
  }
};

function AjsDirective(descriptor: IDirectiveDescriptor): (target: any) => void {
  return (target: any) => {
    AjsDependencies(descriptor.dependencies)(target);

    target.descriptor = {};
    target.directive = true;

    target.descriptor.name = descriptor.name || getDirectiveName(target);
    target.descriptor.controller = target;

    addTemplate(descriptor, target);
    addDescriptorAttribute('priority', descriptor, target);
    addDescriptorAttribute('transclude', descriptor, target);
    addDescriptorAttribute('restrict', descriptor, target);
    addDescriptorAttribute('templateNamespace', descriptor, target);
    addDescriptorAttribute('scope', descriptor, target);
    addDescriptorAttribute('controllerAs', descriptor, target);
    addDescriptorAttribute('bindToController', descriptor, target);
    addDescriptorAttribute('require', descriptor, target);
    addDescriptorAttribute('multiElement', descriptor, target);
    addDescriptorAttribute('compile', descriptor, target);
    addDescriptorAttribute('link', descriptor, target);
  };
}

AjsDirective.getStylesTags = getStylesTags;
AjsDirective.getDirectiveName = getDirectiveName;

export { AjsDirective };

