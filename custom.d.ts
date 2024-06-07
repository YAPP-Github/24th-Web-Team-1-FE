import { SVGSVGElement } from "react";

declare global {
  module "*.svg" {
    const ReactComponent: React.FC<React.SVGProps<SVGSVGElement>>;
    export default ReactComponent;
  }
}
