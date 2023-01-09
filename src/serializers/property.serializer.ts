import * as yup from "yup";
import { SchemaOf } from "yup";
import { IPropertyRequest } from "../interfaces/properties";

const propertieSerializer: SchemaOf<IPropertyRequest> = yup.object().shape({
  value: yup.number().required(),
  size: yup.number().required(),
  address: yup.object().shape({
    district: yup.string().max(120).required(),
    zipCode: yup.string().length(8).required(),
    number: yup.string().max(30),
    city: yup.string().max(60).required(),
    state: yup.string().length(2).required(),
  }),
  categoryId: yup.string().required(),
});

export default propertieSerializer;
