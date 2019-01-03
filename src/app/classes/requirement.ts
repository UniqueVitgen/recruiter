export class Requirement {
  id?: number;
  name: string;
  public: boolean;
  required: boolean;
}
export class RequirementForm extends Requirement {
  options: any;
}
