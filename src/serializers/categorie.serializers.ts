import * as yup from "yup";
import { SchemaOf } from "yup";
import { ICategoryRequest, ICategory } from "../interfaces/categories";

const categoryRequestSerializer: SchemaOf<ICategoryRequest> = yup
  .object()
  .shape({
    name: yup.string().required(),
  });

const categoryResponseSerializer: SchemaOf<ICategory> = yup.object().shape({
  id: yup.string(),
  name: yup.string(),
});

const allCategoriesSerializer: SchemaOf<ICategory[]> = yup.array(
  yup.object().shape({
    id: yup.string(),
    name: yup.string(),
  })
);

export {
  categoryRequestSerializer,
  categoryResponseSerializer,
  allCategoriesSerializer,
};
