
import { AjsDependencies } from './dependencies';

export function AjsController(dependencies: any[]): (target: any) => void {
    return (target: any) => {
        AjsDependencies(dependencies)(target);
        target.controller = true;
    };
}
