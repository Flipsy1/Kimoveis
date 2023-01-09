import * as yup from "yup";
import { SchemaOf } from "yup";
import { IScheduleRequest, IScheduleData } from "../interfaces/schedules";

const createSchedulesRequestSerializer: SchemaOf<IScheduleRequest> = yup
  .object()
  .shape({
    date: yup.string().length(10).required(),
    hour: yup.string().required(),
    propertyId: yup.string().required(),
    userId: yup.string().required(),
  });

const createSchedulesDataSerializer: SchemaOf<IScheduleData> = yup
  .object()
  .shape({
    date: yup.string().length(10).required(),
    hour: yup.string().length(5).required(),
    propertyId: yup.string().required(),
    userId: yup.string().required(),
  });

export { createSchedulesRequestSerializer, createSchedulesDataSerializer };
