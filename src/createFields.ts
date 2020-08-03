import { createField, FieldConfig, FieldResult } from './createField';

export type CreateConfig = {
  [key: string]: FieldConfig;
};

type FieldsResult = {
  [key: string]: FieldResult;
};

export type CreateResult = {
  fields: FieldsResult;
};

export const createFields = ({ fields }: CreateConfig): CreateResult => {
  const storedFields = Object.keys(fields).reduce(
    (acc, fieldName) => ({
      ...acc,
      [fieldName]: createField(fields[fieldName]),
    }),
    {} as FieldsResult,
  );

  return {
    fields: storedFields,
  };
};
